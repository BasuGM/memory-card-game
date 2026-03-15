'use client';

import { useState, useEffect } from 'react';
import GameController from '../../components/GameController';

export default function GamePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-zinc-50 font-sans dark:bg-black">
        <main className="w-full max-w-6xl mx-auto flex-col items-center py-16 px-16 bg-white dark:bg-black sm:items-start flex">
          <div className="h-96" />
        </main>
      </div>
    );
  }

  return <GameController />;
}
