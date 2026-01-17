"use client";

import { useRouter } from "next/navigation";

export default function Header({ title, back = false }) {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-between mb-6">
      {back ? (
        <button
          onClick={() => router.back()}
          className="underline opacity-80"
        >
          Back
        </button>
      ) : (
        <div />
      )}

      <h1 className="text-xl font-serif text-center flex-1">
        {title}
      </h1>

      <div className="w-12" />
    </div>
  );
}
