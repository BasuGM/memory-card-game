'use client';

import { useGameSettings } from '../contexts/GameSettingsContext';
import DifficultySelector from './DifficultySelector';
import PlayButton from './PlayButton';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface GameStarterContentProps {
  onPlayGame?: () => void;
}

export default function GameStarterContent({ onPlayGame }: GameStarterContentProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Wait for hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render content after hydration to ensure context is available
  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-8 text-center w-full">
        <div className="h-96" />
      </div>
    );
  }

  const handlePlayGame = () => {
    router.push('/game');
  };

  return (
    <div className="flex flex-col items-center gap-8 text-center w-full">
      {/* Title */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold text-black dark:text-white">
          Memory Card Game
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Test your memory and match all the cards!
        </p>
      </div>

      {/* Difficulty Selector */}
      <DifficultySelector />

      {/* Play Button */}
      <PlayButton onPlay={handlePlayGame} />
    </div>
  );
}
