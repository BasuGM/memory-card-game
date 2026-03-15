'use client';

import { useState, useEffect } from 'react';
import { Difficulty } from '../contexts/GameSettingsContext';

interface HighScores {
  easy?: number;
  medium?: number;
  hard?: number;
}

const STORAGE_KEY = 'gameHighScores';

export function useHighScores() {
  const [highScores, setHighScores] = useState<HighScores>({});
  const [mounted, setMounted] = useState(false);

  // Load high scores from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHighScores(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load high scores:', e);
      }
    }
    setMounted(true);
  }, []);

  // Save high scores to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(highScores));
    }
  }, [highScores, mounted]);

  const getHighScore = (difficulty: Difficulty): number | undefined => {
    return highScores[difficulty];
  };

  const updateHighScore = (difficulty: Difficulty, moves: number): boolean => {
    const currentHighScore = highScores[difficulty];
    
    // Update high score only if there's no previous score or current score is better (lower moves)
    if (currentHighScore === undefined || moves < currentHighScore) {
      setHighScores((prev) => ({
        ...prev,
        [difficulty]: moves,
      }));
      return true; // New high score achieved
    }
    
    return false; // Did not beat high score
  };

  // Prevent rendering until mounted to avoid hydration mismatch
  const isReady = mounted;

  return {
    highScores,
    getHighScore,
    updateHighScore,
    isReady,
  };
}
