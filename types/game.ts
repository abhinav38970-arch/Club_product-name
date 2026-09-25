export type Difficulty = "easy" | "medium";

export interface Riddle {
  id: string;
  answer: string;
  acceptedAnswers: string[];
  category: string;
  difficulty: Difficulty;
  clues: [string, string, string];
  fallbackFeedback: string;
  fallbackHint: string;
}

export type GamePhase =
  | "intro"
  | "clues"
  | "awaitingFirst"
  | "evaluatingFirst"
  | "aiThinking"
  | "aiFeedback"
  | "awaitingSecond"
  | "evaluatingSecond"
  | "success"
  | "failure";

export interface AIFeedback {
  feedback: string;
  hint: string;
  encouragement: string;
  fallbackUsed: boolean;
}

export interface FeedbackApiRequest {
  riddleId: string;
  guess: string;
  requestId: string;
}

export interface FeedbackApiResponse {
  correct: boolean;
  feedback: string;
  hint: string;
  encouragement: string;
  fallbackUsed: boolean;
}
