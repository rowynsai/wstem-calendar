"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import cardSpread from "../public/cards/card-spread.png";

type User = {
  username: string;
};

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <main className="min-h-screen text-white flex flex-col justify-between p-6">

      {/* ───────── Top Bar ───────── */}
      <header className="flex items-center justify-between">
        {user ? (
          <span className="text-sm opacity-90">
            Welcome, {user.username}
          </span>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="text-sm px-4 py-1 rounded-full bg-white text-black"
          >
            Log in
          </button>
        )}

        <button
          onClick={() => router.push("/settings")}
          aria-label="Settings"
        >
          <Image
            src="/icons/settings.svg"
            alt="Settings"
            width={28}
            height={28}
          />
        </button>
      </header>

      {/* ───────── Center Deck ───────── */}
      <section
        className="flex flex-col items-center gap-6 cursor-pointer select-none"
        onClick={() => router.push("/reading")}
      >
        <div className="relative">
          <Image
            src={cardSpread}
            alt="Tarot deck"
            width={220}
            height={360}
            priority
            className="rounded-xl shadow-2xl"
          />
        </div>

        <p className="text-lg tracking-wide opacity-90">
          Tap the deck to begin
        </p>
      </section>

      {/* ───────── Bottom Navigation ───────── */}
      <footer className="flex justify-around items-center text-xs opacity-80">
        <button
          onClick={() => router.push("/daily")}
          className="flex flex-col items-center gap-1"
        >
          <Image src="/icons/daily.svg" alt="Daily" width={24} height={24} />
          Draw a Card of the Day
        </button>

      </footer>

    </main>
  );
}
