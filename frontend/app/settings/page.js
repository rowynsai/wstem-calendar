"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Toggle from "@/components/Toggle";

export default function SettingsPage() {
  const [daily, setDaily] = useState(false);
  const [animations, setAnimations] = useState(true);

  return (
    <div className="min-h-screen bg-green-800 text-white p-6">
      <Header title="Settings" back />

      <div className="space-y-4 max-w-md mx-auto">
        <Toggle
          label="Daily Card"
          description="Receive a card each day"
          value={daily}
          onChange={() => setDaily(!daily)}
        />

        <Toggle
          label="Animations"
          description="Enable shuffle effects"
          value={animations}
          onChange={() => setAnimations(!animations)}
        />
      </div>
    </div>
  );
}
