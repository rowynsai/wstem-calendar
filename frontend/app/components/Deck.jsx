"use client";

export default function Deck({ onClick, isShuffling }) {
  return (
    <div
      onClick={onClick}
      className={`w-52 h-80 rounded-xl
        bg-white/20 border-2 border-white/40
        flex items-center justify-center cursor-pointer
        transition-transform duration-500
        ${isShuffling ? "animate-pulse scale-105" : ""}`}
    >
      <span className="font-serif opacity-80">
        Tarot Deck
      </span>
    </div>
  );
}
