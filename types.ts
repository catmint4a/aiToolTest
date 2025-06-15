
export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  icon?: React.ElementType; // Optional: for visual flair
}

export interface QuizOption {
  text: string;
  value: string; // This value will be sent to Gemini
  icon?: React.ElementType; // Optional: for visual flair
}

export interface UserAnswer {
  questionId: string;
  questionText: string;
  answerValue: string; 
  answerText: string;
}

export interface RecommendedTool {
  name: string;
  plan: string;
  url: string;
  reasoning: string;
  level: string; // e.g., '強く推奨'
}

export interface AlternativeTool {
  name: string;
  description: string;
  url?: string;
}

export interface DiagnosisResult {
  recommendedTool: RecommendedTool;
  alternativeTools: AlternativeTool[];
}

// For Gemini API (subset of actual types, focusing on what's used)
// These are not directly from @google/genai but represent expected structures.
export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
  retrievedContext?: {
    uri?: string;
    title?: string;
  };
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
  searchQueries?: string[];
}
