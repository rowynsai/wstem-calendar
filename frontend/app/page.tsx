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
        // Optional: save token or user info in localStorage
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
    <div className="bg-[#fdf6e3] text-black grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          src="/header.png"
          alt="Header Image"
          width={180}
          height={38}
          priority
        />

        <ol className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="tracking-[-.01em]">Welcome to Women in STEM UBC-Calendar</li>
        </ol>

        {/* LOGIN FORM */}
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleLogin}
            className="rounded-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-700"
          >
            Login
          </button>
          <button
        onClick={handleRegister}
          className="rounded-full bg-green-500 text-white py-2 px-4 hover:bg-green-700"
>
  Register instead
</button>
        </div>

        {/* CALENDAR BUTTON */}
        <a
        className="self-center rounded-full bg-blue-500 text-white transition-colors flex items-center justify-center hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[220px]"
        href="/calendar"
        target="_blank"
        rel="noopener noreferrer"
          >
          Open Calendar without logging in
        </a>
      </main>

      {/* FOOTER */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Submit a comment
        </a>
      </footer>
    </div>
  );
}
