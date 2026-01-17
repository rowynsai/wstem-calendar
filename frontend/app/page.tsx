"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type User = {
  username: string;
};

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // In a real app, check authentication from context/state management
    // For demo purposes, using a mock user
    setUser({ username: "Seeker" });
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950 text-white flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950 text-white flex flex-col justify-between p-6">

      {/* Top Bar */}
      <header className="flex items-center justify-between">
        <button
          onClick={() => console.log('Navigate to home')}
          aria-label="Home"
          className="w-16 h-16 hover:opacity-80 transition-opacity"
        >
          <Image src="/logo.png" alt="Logo" width={64} height={64} />
        </button>

        {user ? (
          <span className="text-sm opacity-90 font-light">
            Welcome, {user.username}
          </span>
        ) : (
          <button
            onClick={() => console.log('Navigate to login')}
            className="text-sm px-4 py-2 rounded-full bg-white text-indigo-900 font-medium hover:bg-opacity-90 transition-all"
          >
            Log in
          </button>
        )}
      </header>

      {/* Center Deck */}
      <section
        className="flex flex-col items-center gap-8 cursor-pointer select-none group"
        onClick={() => console.log('Navigate to reading')}
      >
        <div className="relative transform transition-transform duration-300 group-hover:scale-105">
          <Image 
            src="/cards/card-spread.png" 
            alt="Tarot deck" 
            width={220} 
            height={360}
            priority
            className="rounded-xl shadow-2xl"
          />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-light tracking-wider">Begin a Reading</h1>
          <p className="text-lg tracking-wide opacity-90 font-light">
            Tap the deck to begin
          </p>
        </div>
      </section>

      {/* Bottom Navigation */}
      <footer className="flex justify-around items-center pt-4">
        <button
          onClick={() => console.log('Navigate to daily card')}
          className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image src="/sun.png" alt="Daily card" width={64} height={64} />
          <span className="text-sm opacity-80 font-light">Card of the Day</span>
        </button>
      </footer>

    </main>
  );
}