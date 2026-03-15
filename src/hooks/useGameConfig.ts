import { Difficulty } from '../contexts/GameSettingsContext';

export interface GameConfig {
  rows: number;
  cols: number;
  cardCount: number;
  label: string;
  description: string;
}

const difficultyConfigs: Record<Difficulty, GameConfig> = {
  easy: {
    rows: 4,
    cols: 4,
    cardCount: 8,
    label: 'Easy',
    description: '4×4 grid (8 matches)',
  },
  medium: {
    rows: 4,
    cols: 6,
    cardCount: 12,
    label: 'Medium',
    description: '4×6 grid (12 matches)',
  },
  hard: {
    rows: 6,
    cols: 6,
    cardCount: 18,
    label: 'Hard',
    description: '6×6 grid (18 matches)',
  },
};

export function useGameConfig(difficulty: Difficulty): GameConfig {
  return difficultyConfigs[difficulty];
}

export function getGameConfig(difficulty: Difficulty): GameConfig {
  return difficultyConfigs[difficulty];
}
