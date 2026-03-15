/**
 * Fisher-Yates shuffle algorithm
 * Shuffles an array in-place and returns the shuffled array
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * Create an array of card pairs and shuffle them
 * @param symbols - Array of symbols to use for cards
 * @returns Shuffled array of card pairs
 */
export function generateShuffledCards(symbols: string[]) {
  const cards = symbols.flatMap(symbol => [symbol, symbol]);
  return shuffle(cards);
}
