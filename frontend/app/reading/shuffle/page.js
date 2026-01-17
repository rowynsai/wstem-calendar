"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Deck from "@/components/Deck";
import { useRouter } from "next/navigation";

export default function ShufflePage() {
  const [shuffling, setShuffling] = useState(false);
  const router = useRouter();

  const shuffle = () => {
    setShuffling(true);
    setTimeout(() => setShuffling(false), 2000);
  };

  return (
    <div className="min-h-screen bg-green-900 text-white p-6 flex flex-col items-center">
      <Header title="Shuffling" back />

      <Deck onClick={shuffle} isShuffling={shuffling} />

      {!shuffling && (
        <button
          onClick={() => router.push("/daily")}
          className="mt-6 bg-white text-black px-6 py-2 rounded-xl"
        >
          Draw Cards
        </button>
      )}
    </div>
  );
}
