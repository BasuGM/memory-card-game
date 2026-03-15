'use client';

import React from 'react';

interface MemoryCardProps {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export default function MemoryCard({
  id,
  value,
  isFlipped,
  isMatched,
  onClick,
}: MemoryCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isFlipped || isMatched}
      className={`
        w-20 h-20 rounded-lg font-bold text-2xl transition-all duration-300
        ${isMatched ? 'opacity-50 cursor-default' : 'cursor-pointer'}
        ${isFlipped ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}
      `}
    >
      {isFlipped || isMatched ? value : '?'}
    </button>
  );
}
