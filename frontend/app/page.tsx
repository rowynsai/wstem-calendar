"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      alert("Error connecting to server");
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      alert("Error connecting to server");
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fdf6e3] text-black font-[family-name:var(--font-geist-sans)] p-6 sm:p-12">
      {/* Logo in top-left corner */}
      <div className="absolute top-4 left-4">
        <Image
          src="/wstemlogo.png"
          alt="WSTEM Logo"
          width={120}
          height={38}
          priority
        />
      </div>

      {/* Centered, raised main content */}
      <main className="max-w-md mx-auto mt-20 bg-white/70 p-8 rounded-2xl shadow-xl backdrop-blur-sm flex flex-col gap-6 items-center">
      <h1 className="text-xl font-bold text-center leading-tight">
  WELCOME
  <div className="text-base font-normal">
    to the UBC Women in STEM Calendar !
  </div>
</h1>

        <div className="flex flex-col gap-2 w-full">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleLogin}
            className="rounded-full bg-sky-400 text-white py-2 px-4 hover:bg-blue-700"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="self-center rounded-full bg-sky-600 text-white py-1 px-4 hover:bg-blue-900 w-auto"
          >
            Register Instead
          </button>
        </div>

        <a
          className="rounded-full bg-blue-500 text-white transition-colors flex items-center justify-center hover:bg-blue-700 font-medium text-sm h-10 px-4 w-auto"
          href="/calendar"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Calendar without logging in
        </a>
      </main>

      {/* Footer */}
      <footer className="mt-12 flex justify-center">
      <a
  className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm"
  href="mailto:rowynsai+calendar@gmail.com?subject=Suggestion for Women in STEM UBC Calendar"
  target="_blank"
  rel="noopener noreferrer"
>
  <Image src="/globe.svg" alt="Globe icon" width={16} height={16} />
  Suggest an event / newsletter !
</a>
      </footer>
    </div>
  );
}
