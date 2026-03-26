"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function HeroSearch() {
  const [searchText, setSearchText] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = `/activities${searchText ? `?search=${encodeURIComponent(searchText)}` : ""}`;
      }}
      className="flex w-full gap-2 mt-4"
    >
      <div className="flex-1 flex items-center bg-white rounded-2xl px-4 py-3 shadow-lg gap-2">
        <Search size={18} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder='Search ninja gyms, cooking classes, cat cafes...'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
        />
      </div>
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white font-black px-5 py-3 rounded-2xl shadow-lg transition-colors whitespace-nowrap"
      >
        Explore
      </button>
    </form>
  );
}
