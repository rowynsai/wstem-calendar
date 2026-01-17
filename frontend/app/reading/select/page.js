"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";

const readings = [
  "Daily Insight",
  "Past • Present • Future",
  "Love Reading",
  "Career Reading",
  "Custom Spread",
];

export default function ReadingSelectPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-green-900 text-white p-6">
      <Header title="Choose a Reading" back />

      <div className="space-y-4 max-w-md mx-auto">
        {readings.map((r) => (
          <button
            key={r}
            onClick={() => router.push("/reading/shuffle")}
            className="w-full bg-white text-black p-4 rounded-xl"
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}
