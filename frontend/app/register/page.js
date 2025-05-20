"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ADMIN_SECRET_KEY = "iloverowyn";
const allSubjects = ["Math", "CPSC", "Chem", "Biol", "Phys", "APSC"];

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferences, setPreferences] = useState(allSubjects);
  const [wantsAdmin, setWantsAdmin] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRegister = async () => {
    const adminStatus = wantsAdmin && adminKey === ADMIN_SECRET_KEY;
    setIsAdmin(adminStatus);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, preferences: preference, isAdmin: adminStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/calendar");
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
      <div className="absolute top-6 left-6 cursor-pointer z-50">
        <Image
          src="/wstemlogo.png"
          alt="WSTEM Logo"
          width={120}
          height={38}
          priority
        />
      </div>

      <main className="max-w-md mx-auto mt-20 bg-white/70 p-8 rounded-2xl shadow-xl backdrop-blur-sm flex flex-col gap-6 items-center">
        <h1 className="text-xl font-bold text-center leading-tight">
          Register
          <div className="text-base font-normal">
            Join the UBC Women in STEM Calendar!
          </div>
        </h1>

        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
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

          <label className="mt-4 font-semibold">Subject preferences</label>
          <div className="flex flex-col gap-2 pl-2">
  {allSubjects.map((subject) => (
    <label key={subject} className="flex items-center gap-2">
      <input
        type="checkbox"
        value={subject}
        checked={preferences.includes(subject)}
        onChange={(e) => {
          if (e.target.checked) {
            setPreferences([...preferences, subject]);
          } else {
            setPreferences(preferences.filter((s) => s !== subject));
          }
        }}
      />
      {subject}
    </label>
  ))}
</div>

          <label className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={wantsAdmin}
              onChange={() => setWantsAdmin(!wantsAdmin)}
            />
            Register as admin
          </label>

          {wantsAdmin && (
            <input
              type="text"
              placeholder="Enter Admin Key"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          )}

          <button
            onClick={handleRegister}
            className="rounded-full bg-sky-600 text-white py-2 px-4 hover:bg-blue-900 mt-6"
          >
            Register
          </button>
          <button
            onClick={() => router.push("/")}
            className="self-center rounded-full bg-gray-400 text-white py-1 px-4 hover:bg-gray-600 w-auto mt-2"
          >
            Back to Login
          </button>
        </div>
      </main>
    </div>
  );
}
