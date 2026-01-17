"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!username.trim()) return alert("Enter a username");

    localStorage.setItem(
      "tarotUser",
      JSON.stringify({ username })
    );

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-green-900 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-80 text-black space-y-4">
        <h1 className="text-xl font-serif text-center">
          Tarot Deck
        </h1>

        <input
          className="w-full border p-2 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-800 text-white py-2 rounded"
        >
          Enter
        </button>
      </div>
    </div>
  );
}
