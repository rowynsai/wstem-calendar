"use client";

import Header from "@/components/Header";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";

export default function DailyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-green-900 text-white p-6 flex flex-col items-center">
      <Header title="Card of the Day" back />

      <Card label="Tap to reveal" />

      <div className="mt-6 w-full max-w-md bg-white/10 p-4 rounded-xl">
        <p className="opacity-80 italic">
          What does this card bring to mind today?
        </p>
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-6 underline opacity-80"
      >
        Return to Deck
      </button>
    </div>
  );
}
