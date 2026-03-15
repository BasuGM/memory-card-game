'use client';

import { useGameSettings } from '../contexts/GameSettingsContext';
import { useGameConfig } from '../hooks/useGameConfig';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { playSound } from '../utils/audio';

interface PlayButtonProps {
  onPlay?: () => void;
}

export default function PlayButton({ onPlay }: PlayButtonProps) {
  const { settings } = useGameSettings();
  const gameConfig = useGameConfig(settings.difficulty);

  const handlePlay = () => {
    // Play click sound
    playSound('click', settings.audioEnabled);

    // Call the callback if provided
    if (onPlay) {
      onPlay();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={handlePlay}
        size="lg"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-8 py-3 text-lg font-bold flex items-center gap-2"
      >
        <Play className="h-5 w-5 fill-current" />
        Start Game
      </Button>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Playing on <span className="font-semibold">{gameConfig.label}</span> difficulty
      </p>
    </div>
  );
}
