"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, MapPin, Search } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/activities${searchText ? `?search=${encodeURIComponent(searchText)}` : ""}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-cyan-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/images/elephantwithhat.png"
              alt="Samui Kids Fun Guide"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="leading-none">
            <span className="block text-base font-black text-cyan-600">Samui Kids</span>
            <span className="block text-[10px] font-bold text-orange-500 uppercase tracking-wide">Fun Guide</span>
          </div>
        </Link>

        {/* Sticky search — slides in after scrolling past hero */}
        <form
          onSubmit={handleSearch}
          className={`hidden md:flex items-center flex-1 max-w-xs transition-all duration-300 ${
            scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
          }`}
        >
          <div className="flex items-center w-full bg-gray-100 rounded-full px-3 py-1.5 gap-2">
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search activities..."
              className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
        </form>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-bold flex-shrink-0">
          <Link href="/" className="text-gray-700 hover:text-cyan-600 transition-colors">
            Home
          </Link>
          <Link href="/activities" className="text-gray-700 hover:text-cyan-600 transition-colors">
            Activities
          </Link>
          <Link href="/map" className="text-gray-700 hover:text-cyan-600 transition-colors flex items-center gap-1">
            <MapPin size={14} />
            Map
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-cyan-600 transition-colors">
            About
          </Link>
          <Link
            href="/activities"
            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-full hover:from-orange-500 hover:to-orange-600 transition-all shadow-sm font-bold"
          >
            Explore Now
          </Link>
        </nav>

        {/* Mobile: search icon (when scrolled) + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          {scrolled && (
            <Link
              href="/activities"
              className="p-2 rounded-full bg-gray-100 text-gray-600"
              aria-label="Search"
            >
              <Search size={18} />
            </Link>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3 text-sm font-bold shadow-lg">
          <Link href="/" onClick={() => setOpen(false)} className="text-gray-700 py-2 border-b border-gray-100">
            Home
          </Link>
          <Link href="/activities" onClick={() => setOpen(false)} className="text-gray-700 py-2 border-b border-gray-100">
            Activities
          </Link>
          <Link href="/map" onClick={() => setOpen(false)} className="text-gray-700 py-2 border-b border-gray-100">
            Map View
          </Link>
          <Link href="/about" onClick={() => setOpen(false)} className="text-gray-700 py-2">
            About
          </Link>
        </div>
      )}
    </header>
  );
}
