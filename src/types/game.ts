export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  moves: number;
  matches: number;
  gameOver: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  isNewHighScore?: boolean;
}
