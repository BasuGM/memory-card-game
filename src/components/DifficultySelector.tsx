'use client';

import { useGameSettings } from '../contexts/GameSettingsContext';
import { useGameConfig } from '../hooks/useGameConfig';
import { Card } from '@/components/ui/card';

export default function DifficultySelector() {
  const { settings, setDifficulty } = useGameSettings();
  const difficulties = ['easy', 'medium', 'hard'] as const;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
        Select Difficulty
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {difficulties.map((difficulty) => {
          const config = useGameConfig(difficulty);
          const isSelected = settings.difficulty === difficulty;

          return (
            <button
              key={difficulty}
              onClick={() => setDifficulty(difficulty)}
              className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50'
                  : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  {config.label}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  {config.description}
                </p>
                <div className="flex justify-center gap-2">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Grid
                    </span>
                    <span className="font-semibold text-black dark:text-white">
                      {config.rows}×{config.cols}
                    </span>
                  </div>
                  <div className="flex flex-col items-center border-l border-zinc-300 dark:border-zinc-600 pl-2">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Matches
                    </span>
                    <span className="font-semibold text-black dark:text-white">
                      {config.cardCount}
                    </span>
                  </div>
                </div>
              </div>
              {isSelected && (
                <div className="mt-4 flex justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
