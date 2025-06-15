
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { UserAnswer, DiagnosisResult, RecommendedTool, AlternativeTool, GroundingMetadata } from '../types';
import { AI_TOOLS_INFO } from '../constants';

function formatToolInfoForPrompt(): string {
  let toolDetails = "利用可能なAIツールとその特徴:\n";
  for (const toolKey in AI_TOOLS_INFO) {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const tool = (AI_TOOLS_INFO as any)[toolKey];
    if (tool.plans) { // For ChatGPT, Gemini, Claude
        toolDetails += `- ${tool.name}:\n`;
        tool.plans.forEach((plan: {name: string; price: string; features: string}) => {
            toolDetails += `  - プラン: ${plan.name} (${plan.price})\n    特徴: ${plan.features}\n`;
        });
        toolDetails += `  一般的な強み: ${tool.description}\n  公式サイト: ${tool.generalUrl}\n\n`;
    } else { // For Genpark
        toolDetails += `- ${tool.name}:\n  説明: ${tool.description}\n  公式サイト: ${tool.url || 'N/A'}\n\n`;
    }
  }
  return toolDetails;
}


export const getAiToolRecommendation = async (answers: UserAnswer[]): Promise<DiagnosisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("APIキーが設定されていません。環境変数 API_KEY を設定してください。");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const formattedAnswers = answers.map(a => `- ${a.questionText}: 「${a.answerText}」 (値: ${a.answerValue})`).join('\n');
  const toolInfoPrompt = formatToolInfoForPrompt();

  const prompt = `
あなたは経験豊富なAIツールアドバイザーです。以下のユーザーのクイズ回答に基づいて、最も適したAIツール（ChatGPT、Gemini、Claudeの中から）とその具体的なプランを推薦してください。

ユーザーの回答:
${formattedAnswers}

${toolInfoPrompt}

以下のJSON形式で回答を生成してください。理由はユーザーの回答とツールの強みに直接関連付け、簡潔に記述してください。推薦レベルは「強く推奨」「推奨」「検討の価値あり」のいずれかを使用してください。
「alternativeTools」には、Genpark（説明：「ChatGPTやClaudeなどとにかくいろいろ試したい人向け」）を必ず含め、さらに主要なAIツール（ChatGPT、Gemini、Claude）の中から、主要推薦でなかったもので、ユーザーのニーズに合いそうなものをもう1つ提案してください。すべてのテキスト（特にreasoning、description、name、plan、level）は日本語で記述してください。

JSON出力形式:
{
  "recommendedTool": {
    "name": "ツール名 (例: ChatGPT)",
    "plan": "プラン名 (例: Plus)",
    "url": "ツール/プランページへの直接リンク",
    "reasoning": "ユーザーの回答に基づいた推薦理由（簡潔に）",
    "level": "推薦レベル (例: 強く推奨)"
  },
  "alternativeTools": [
    {
      "name": "Genpark",
      "description": "ChatGPTやClaudeなどとにかくいろいろ試したい人向け",
      "url": "${AI_TOOLS_INFO.Genpark.url}"
    },
    {
      "name": "代替ツール名2 (ChatGPT, Gemini, Claudeのいずれか)",
      "description": "この代替ツールが適しているかもしれない簡潔な理由",
      "url": "代替ツール2の公式サイトリンク"
    }
  ]
}
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17", // Ensure this model supports JSON output and system instructions well
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.5, // Lower temperature for more factual/deterministic output for JSON
      }
    });
    
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedResult = JSON.parse(jsonStr) as DiagnosisResult;

    // Validate structure (basic validation)
    if (!parsedResult.recommendedTool || !parsedResult.alternativeTools) {
        throw new Error("AIからの応答形式が正しくありません。期待されるデータ構造ではありません。");
    }
    if (parsedResult.alternativeTools.length < 1) { // Expecting at least Genpark
        throw new Error("AIからの応答形式が正しくありません。代替ツールが含まれていません。");
    }

    // Ensure Genpark is present and correctly formatted if AI missed it (as a fallback)
    const genparkExists = parsedResult.alternativeTools.some(tool => tool.name === "Genpark");
    if (!genparkExists) {
        parsedResult.alternativeTools.unshift({
            name: "Genpark",
            description: "ChatGPTやClaudeなどとにかくいろいろ試したい人向け",
            url: AI_TOOLS_INFO.Genpark.url
        });
    }


    // Ensure URLs are populated for main tools if AI misses them
    const populateUrlIfNeeded = (tool: RecommendedTool | AlternativeTool) => {
        if (!tool.url) {
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            const toolData = (AI_TOOLS_INFO as any)[tool.name];
            if (toolData) {
                if ('plan' in tool && toolData.plans) { // RecommendedTool
                    const planData = toolData.plans.find((p: { name: string; }) => p.name === tool.plan);
                    tool.url = planData?.url || toolData.generalUrl || "#";
                } else { // AlternativeTool or main tool without specific plan
                    tool.url = toolData.generalUrl || toolData.url || "#";
                }
            } else {
                tool.url = "#"; // Default fallback
            }
        }
    };
    
    populateUrlIfNeeded(parsedResult.recommendedTool);
    parsedResult.alternativeTools.forEach(populateUrlIfNeeded);


    return parsedResult;

  } catch (error) {
    console.error("Gemini API呼び出しエラー:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
        throw new Error("Gemini APIキーが無効です。正しいAPIキーを設定してください。");
    }
    throw new Error(`AIによる診断の生成に失敗しました。詳細: ${error instanceof Error ? error.message : String(error)}`);
  }
};
