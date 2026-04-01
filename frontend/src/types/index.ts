export interface Question {
  id: number;
  question: string;
  choices: string[];
  correct_answer: string;
  level: number;
}

export interface QuizState {
  currentLevel: number;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  timeRemaining: number;        // Global timer in seconds (300s = 5mins)
  isGameOver: boolean;
  gameResultMessage: string | null;
  loading: boolean;
  error: string | null;
}
