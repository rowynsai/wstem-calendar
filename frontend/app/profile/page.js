"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
const allSubjects = ["Math", "CPSC", "Chem", "Biol", "Phys", "APSC"];
const ADMIN_SECRET_KEY = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY;

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [wantsAdmin, setWantsAdmin] = useState(false);
  const [wantsEmails, setWantsEmails] = useState(false);
  const [adminKey, setAdminKey] = useState("");

  useEffect(() => {
    // if user not logged in go to homepage
    try {
        const storedUserRaw = localStorage.getItem("user");
        if (!storedUserRaw) {
          router.push("/page");
          return;
        }
    
        const storedUser = JSON.parse(storedUserRaw);
    
        // Normalize MongoDB id object if needed
        let normalizedId = storedUser.id;
        if (typeof normalizedId === "object" && normalizedId !== null && "$oid" in normalizedId) {
          normalizedId = normalizedId.$oid;
        }
    
        const storedPrefs = storedUser.preferences || {};
        const selectedPrefs = Object.entries(storedPrefs)
          .filter(([_, value]) => value)
          .map(([subject]) => subject);
    
        setUser({ ...storedUser, id: normalizedId });
        setName(storedUser.name || "");
        setEmail(storedUser.email || "");
        setPreferences(selectedPrefs);
        setWantsAdmin(storedUser.isAdmin || false);
        setWantsEmails(storedUser.emails || false);
      } catch (err) {
        alert("Please log in or register to view profile details");
        return;
        console.error("Invalid user data in localStorage:", err);
      }
    }, [router]);

    
  const handleProfile = async () => {
    const adminStatus = wantsAdmin && adminKey === ADMIN_SECRET_KEY;
    const emailStatus = wantsEmails;

    // subject array into object for backend
    const preferenceObj = allSubjects.reduce((obj, subj) => {
      obj[subj] = preferences.includes(subj);
      return obj;
    }, {});

    try {
      const response = await fetch("http://localhost:5000/api/auth/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            //safe? normalized
          id: user.id,
          name,
          email,
          password,
          preferences: preferenceObj,
          isAdmin: adminStatus,
          emails: emailStatus,
        }),
      });

      const data = await response.json();
      //debugging
      //console.log("user.id:", user.id);

      if (response.ok) {
        alert("Profile Updated!");
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/calendar");
      } else {
        alert(`Update failed: ${data.message}`);
      }
    } catch (error) {
      alert("Error connecting to server");
      console.error(error);
    }
  };

  //needed?
  if (!user) return null;

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
          Edit Profile
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
            placeholder="New Password"
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
            Opt in/out for email reminders (preferences only)
          </label>

          <button
            onClick={handleProfile}
            className="rounded-full bg-sky-600 text-white py-2 px-4 hover:bg-blue-900 mt-6"
          >
            Save Changes
          </button>
          <button
            onClick={() => router.push("/calendar")}
            className="self-center rounded-full bg-gray-400 text-white py-1 px-4 hover:bg-gray-600 w-auto mt-2"
          >
            Back to Calendar
          </button>
        </div>
      </main>
    </div>
  );
}
