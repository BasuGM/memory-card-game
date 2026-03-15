'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameSettings {
  difficulty: Difficulty;
  audioEnabled: boolean;
  animationsEnabled: boolean;
}

interface GameSettingsContextType {
  settings: GameSettings;
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  toggleAudio: () => void;
  toggleAnimations: () => void;
}

const defaultSettings: GameSettings = {
  difficulty: 'medium',
  audioEnabled: true,
  animationsEnabled: true,
};

const GameSettingsContext = createContext<GameSettingsContextType | undefined>(
  undefined
);

export function GameSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);
  const [mounted, setMounted] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('gameSettings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved settings:', e);
      }
    }
    setMounted(true);
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('gameSettings', JSON.stringify(settings));
    }
  }, [settings, mounted]);

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const setDifficulty = (difficulty: Difficulty) => {
    updateSettings({ difficulty });
  };

  const toggleAudio = () => {
    updateSettings({ audioEnabled: !settings.audioEnabled });
  };

  const toggleAnimations = () => {
    updateSettings({ animationsEnabled: !settings.animationsEnabled });
  };

  // Prevent rendering until mounted to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <GameSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        setDifficulty,
        toggleAudio,
        toggleAnimations,
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
}

export function useGameSettings() {
  const context = useContext(GameSettingsContext);
  if (context === undefined) {
    throw new Error(
      'useGameSettings must be used within a GameSettingsProvider'
    );
  }
  return context;
}
