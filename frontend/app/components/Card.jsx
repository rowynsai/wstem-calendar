"use client";

import Image from "next/image";

export default function Card({ image, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-48 h-72 rounded-xl overflow-hidden shadow-lg
                 bg-white/20 border border-white/40
                 flex items-center justify-center cursor-pointer"
    >
      {image ? (
        <Image
          src={image}
          alt={label || "Tarot card"}
          width={192}
          height={288}
          className="object-cover"
        />
      ) : (
        <span className="italic opacity-70">
          {label || "Tarot Card"}
        </span>
      )}
    </div>
  );
}
