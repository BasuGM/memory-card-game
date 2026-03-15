'use client';

import { useState, useCallback } from 'react';
import GameStarterContent from "./GameStarterContent";
import GameBoard from "./game/GameBoard";
import { useGameSettings } from '../contexts/GameSettingsContext';
import { useGameConfig } from '../hooks/useGameConfig';
import { Card, GameState } from '../types/game';
import { generateShuffledCards } from '../utils/shuffle';
import { playSound } from '../utils/audio';

const CARD_SYMBOLS = ['🌟', '🎨', '🎭', '🎪', '🎬', '🎸', '🎹', '🎺', '🎻', '🥁', '🎲', '🎯', '🎳', '🎮', '🎰', '🎱', '⚽', '🏀'];

export default function HomeGame() {
  const { settings } = useGameSettings();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
  const [canFlip, setCanFlip] = useState(true);

  // Initialize game with shuffled cards based on difficulty
  const initializeGame = useCallback(() => {
    const config = useGameConfig(settings.difficulty);
    const symbols = CARD_SYMBOLS.slice(0, config.cardCount);
    const shuffledSymbols = generateShuffledCards(symbols);

    const cards: Card[] = shuffledSymbols.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setGameState({
      cards,
      moves: 0,
      matches: 0,
      gameOver: false,
      difficulty: settings.difficulty,
    });

    setSelectedCardIds([]);
    setCanFlip(true);
    setIsPlaying(true);
  }, [settings.difficulty]);

  // Play game when button is clicked
  const handlePlayGame = useCallback(() => {
    playSound('click', settings.audioEnabled);
    initializeGame();
  }, [initializeGame, settings.audioEnabled]);

  // Handle card flip
  const handleCardFlip = useCallback((cardId: number) => {
    if (!gameState || !canFlip) return;

    const card = gameState.cards[cardId];
    if (card.isFlipped || card.isMatched) return;

    // Play flip sound
    playSound('cardFlip', settings.audioEnabled);

    // Update card flipped state
    const updatedCards = gameState.cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );

    const newSelectedIds = [...selectedCardIds, cardId];
    setSelectedCardIds(newSelectedIds);
    setGameState({ ...gameState, cards: updatedCards });

    // Check match if two cards are selected
    if (newSelectedIds.length === 2) {
      setCanFlip(false);
      checkMatch(updatedCards, newSelectedIds);
    }
  }, [gameState, canFlip, selectedCardIds, settings.audioEnabled]);

  // Check if two flipped cards match
  const checkMatch = useCallback((cards: Card[], flippedIds: number[]) => {
    const [id1, id2] = flippedIds;
    const card1 = cards[id1];
    const card2 = cards[id2];

    const isMatch = card1.value === card2.value;
    const delay = isMatch ? 500 : 1000;

    setTimeout(() => {
      const updatedCards = cards.map(card => {
        if (card.id === id1 || card.id === id2) {
          return { ...card, isMatched: isMatch, isFlipped: isMatch ? true : false };
        }
        return card;
      });

      const newMatches = gameState!.matches + (isMatch ? 1 : 0);
      const newMoves = gameState!.moves + 1;
      const isGameOver = newMatches === gameState!.cards.length / 2;

      // Play appropriate sound
      if (isMatch) {
        playSound('match', settings.audioEnabled);
      } else {
        playSound('error', settings.audioEnabled);
      }

      if (isGameOver) {
        playSound('win', settings.audioEnabled);
        setGameState({
          ...gameState!,
          cards: updatedCards,
          moves: newMoves,
          matches: newMatches,
          gameOver: true,
        });
      } else {
        setGameState({
          ...gameState!,
          cards: updatedCards,
          moves: newMoves,
          matches: newMatches,
        });
      }

      setSelectedCardIds([]);
      setCanFlip(true);
    }, delay);
  }, [gameState, settings.audioEnabled]);

  // Reset game and return to starter
  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setGameState(null);
    setSelectedCardIds([]);
    setCanFlip(true);
  }, []);

  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-6xl mx-auto flex-col items-center py-16 px-16 bg-white dark:bg-black sm:items-start flex">
        {isPlaying && gameState ? (
          <GameBoard
            gameState={gameState}
            onCardFlip={handleCardFlip}
            onReset={handleReset}
          />
        ) : (
          <GameStarterContent onPlayGame={handlePlayGame} />
        )}
      </main>
    </div>
  );
}
