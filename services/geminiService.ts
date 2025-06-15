
import { UserAnswer, DiagnosisResult, RecommendedTool, AlternativeTool } from '../types';
import { AI_TOOLS_INFO } from '../constants';

// formatToolInfoForPrompt 関数は不要になったため削除しました。

export const getAiToolRecommendation = async (answers: UserAnswer[]): Promise<DiagnosisResult> => {
  // APIキーのチェックとGoogleGenAIクライアントの初期化を削除
  // console.log("ユーザーの回答（デバッグ用）:", answers); // デバッグ用

  // 静的なモックデータを生成して返す
  const mockResult: DiagnosisResult = {
    recommendedTool: {
      name: "ChatGPT",
      plan: "Plus",
      url: AI_TOOLS_INFO.ChatGPT.plans.find(p => p.name === "Plus")?.url || AI_TOOLS_INFO.ChatGPT.generalUrl || "#",
      reasoning: "あなたの回答に基づくと、多機能で創造的なタスクにも対応できるChatGPT Plusが最適です。幅広い用途で高いパフォーマンスを発揮します。",
      level: "強く推奨"
    },
    alternativeTools: [
      {
        name: "Genpark",
        description: AI_TOOLS_INFO.Genpark.description,
        url: AI_TOOLS_INFO.Genpark.url || "#"
      },
      {
        name: "Gemini",
        description: "Googleサービスとの連携や最新情報へのアクセスを重視する場合に適しています。無料版でも高性能なGemini Proを利用可能です。",
        url: AI_TOOLS_INFO.Gemini.generalUrl || "#"
      },
      {
        name: "Claude",
        description: "特に長文の読解や生成、自然な日本語での対話を重視する場合に優れた選択肢です。無料版でもSonnetモデルを利用できます。",
        url: AI_TOOLS_INFO.Claude.generalUrl || "#"
      }
    ]
  };

  // 実際のAPI呼び出しの代わりにモックデータを返す
  // 意図的に少し遅延させて、ローディング表示をシミュレートする場合
  // await new Promise(resolve => setTimeout(resolve, 1000));

  // ユーザーの回答に基づいてモックデータを少し変更する例 (任意)
  // 例えば、特定の回答があれば推奨ツールを変えるなど
  const budgetAnswer = answers.find(a => a.questionId === 'q6');
  if (budgetAnswer?.answerValue === '予算無料') {
    mockResult.recommendedTool = {
      name: "Gemini",
      plan: "Free (旧Bard)",
      url: AI_TOOLS_INFO.Gemini.plans.find(p => p.name === "Free (旧Bard)")?.url || AI_TOOLS_INFO.Gemini.generalUrl || "#",
      reasoning: "無料プランをご希望とのことですので、高性能なGemini Proモデルを無料で利用できるGeminiの無料版をおすすめします。Googleサービスとの連携も魅力です。",
      level: "強く推奨"
    };
    // 代替ツールからGeminiを削除し、ChatGPT Freeを追加するなど調整
     mockResult.alternativeTools = mockResult.alternativeTools.filter(tool => tool.name !== "Gemini");
     mockResult.alternativeTools.push({
        name: "ChatGPT",
        description: "基本的な対話や文章作成に利用できる無料プランがあります。",
        url: AI_TOOLS_INFO.ChatGPT.plans.find(p => p.name === "Free")?.url || AI_TOOLS_INFO.ChatGPT.generalUrl || "#"
     });
  }


  // エラーハンドリングはシンプルに (API呼び出しがないため、主に予期せぬ内部エラー用)
  try {
    // ここでは同期的にデータを返しているため、大きなエラーは発生しにくい
    return mockResult;
  } catch (error) {
    console.error("診断結果の生成中にエラーが発生しました:", error);
    throw new Error(`診断結果の生成に失敗しました。詳細: ${error instanceof Error ? error.message : String(error)}`);
  }
};
