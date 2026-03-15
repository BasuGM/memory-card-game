'use client';

import React from 'react';
import MemoryCard from './MemoryCard';
import { GameState } from '../../types/game';
import { useGameConfig } from '../../hooks/useGameConfig';
import { useHighScores } from '../../hooks/useHighScores';
import { Button } from '@/components/ui/button';

interface GameBoardProps {
  gameState: GameState;
  onCardFlip: (cardId: number) => void;
  onReset: () => void;
}

export default function GameBoard({ gameState, onCardFlip, onReset }: GameBoardProps) {
  const config = useGameConfig(gameState.difficulty);
  const totalPairs = gameState.cards.length / 2;
  const { getHighScore } = useHighScores();
  const highScore = getHighScore(gameState.difficulty);

  return (
    <div className="flex gap-8 w-full h-full">
      {/* Left Side - Game Grid */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="p-8 rounded-lg shadow-lg bg-slate-100 dark:bg-slate-900"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${config.cols}, minmax(90px, 1fr))`,
            gap: '8px',
          }}
        >
          {gameState.cards.map((card) => (
            <MemoryCard
              key={card.id}
              id={card.id}
              value={card.value}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={() => onCardFlip(card.id)}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Stats and Game Over */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Stats Bar */}
        <div className="flex flex-col gap-8 text-lg font-semibold mb-8">
          <div className="text-zinc-700 dark:text-zinc-300">
            Moves: <span className="text-blue-600 dark:text-blue-400">{gameState.moves}</span>
          </div>
          <div className="text-zinc-700 dark:text-zinc-300">
            Matches: <span className="text-green-600 dark:text-green-400">{gameState.matches}/{totalPairs}</span>
          </div>
          <div className="text-zinc-700 dark:text-zinc-300">
            High Score: <span className="text-purple-600 dark:text-purple-400">{highScore ?? '—'}</span>
          </div>
        </div>

        {/* Game Over Screen */}
        {gameState.gameOver && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
              🎉 You Won! 🎉
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6">
              You completed the game in <span className="font-bold text-blue-600 dark:text-blue-400">{gameState.moves}</span> moves!
            </p>
            {gameState.isNewHighScore && (
              <div className="bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-4 mb-6">
                <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">
                  ⭐ New High Score! ⭐
                </p>
                <p className="text-zinc-700 dark:text-zinc-300 mt-2">
                  Your new high score is <span className="font-bold text-yellow-600 dark:text-yellow-400">{gameState.moves}</span> moves!
                </p>
              </div>
            )}
            <Button
              onClick={onReset}
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-8 py-3 text-lg font-bold"
            >
              New Game
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
