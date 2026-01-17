"use client";

export default function Toggle({ label, description, value, onChange }) {
  return (
    <div className="flex justify-between items-center bg-white text-black p-4 rounded-xl">
      <div>
        <p className="font-medium">{label}</p>
        {description && (
          <p className="text-sm opacity-70">{description}</p>
        )}
      </div>

      <button
        onClick={onChange}
        className={`w-12 h-6 rounded-full transition ${
          value ? "bg-green-700" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
