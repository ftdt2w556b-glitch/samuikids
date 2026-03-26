"use client";

import { useState, useTransition } from "react";
import { registerMember } from "./actions";
import { Loader2 } from "lucide-react";

export default function JoinForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await registerMember(fd);
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-400 text-gray-900 placeholder-gray-400";
  const labelClass = "block text-gray-600 text-xs font-bold uppercase tracking-wide mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Your Name</label>
        <input
          name="name"
          type="text"
          required
          placeholder="Jane Smith"
          className={inputClass}
          autoComplete="name"
        />
      </div>

      <div>
        <label className={labelClass}>Email Address</label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={inputClass}
          autoComplete="email"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black py-3.5 rounded-xl hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 transition-all shadow-lg"
      >
        {isPending ? (
          <><Loader2 size={18} className="animate-spin" /> Joining…</>
        ) : (
          "Get My Member Badge"
        )}
      </button>

      <p className="text-gray-400 text-xs text-center leading-relaxed">
        Free forever. No spam. No password needed.
      </p>
    </form>
  );
}
