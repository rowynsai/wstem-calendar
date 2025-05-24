"use client";

import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
const allSubjects = ["Math", "CPSC", "Chem", "Biol", "Phys", "APSC"];
const ADMIN_SECRET_KEY = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY;

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preferences, setPreferences] = useState(allSubjects);
  const [wantsAdmin, setWantsAdmin] = useState(false);
  const [wantsEmails, setWantsEmails] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [error, setError] = useState("");
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);

  const handleRegister = async () => {
    // reset error
    setError("");
    //(for if passwords dont match)
    if (password !== confirmPassword) {
      alert(`Registration failed: passwords must match`);
      return;
    }

    const adminStatus = wantsAdmin && adminKey === ADMIN_SECRET_KEY;
    const emailStatus = wantsEmails;

    if (!email || !password) {
      alert(`Registration failed: you must provide an email and a password`);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, preferences: preferences, isAdmin: adminStatus, emails: emailStatus}),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/calendar");
        //TODO more cases
      } else {
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      alert("Error connecting to server");
      console.error(error);
    }
  };


  //so you can have subject dropdown
  const toggleSubject = (subject) => {
    let newSelectedSubjects;
    if (preferences.includes(subject)) {
      newSelectedSubjects = preferences.filter((s) => s !== subject);
    } else {
      newSelectedSubjects = [...preferences, subject];
    }
    setPreferences(newSelectedSubjects);
  };


  return (
    <div className="relative min-h-screen bg-[#fdf6e3] text-black font-[family-name:var(--font-geist-sans)] px-6 pt-6 pb-6">
      <Link href="/" className="absolute left-0 top-0 cursor-pointer">
        <img
          src="/wstemlogo.png"
          alt="Home"
          width={175}
          height={100}
          className="object-contain"
        />
      </Link>

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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />

<div className="mt-4">
            <button
              type="button"
              onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-800"
            >
              Subject Preferences
            </button>

            {showSubjectDropdown && (
              <div className="mt-2 p-4 border rounded bg-white shadow-inner">
                <div className="flex flex-col gap-2 pl-2">
                  {allSubjects.map((subject) => (
                    <label key={subject} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={subject}
                        checked={preferences.includes(subject)}
                        onChange={() => toggleSubject(subject)}
                      />
                      {subject}
                    </label>
                  ))}
                </div>
              </div>
            )}
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
              type="password"
              placeholder="Enter Admin Key"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          )}

<label className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={wantsEmails}
              onChange={() => setWantsEmails(!wantsEmails)}
            />
            Opt in for email reminders (preferences only)
          </label>

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
