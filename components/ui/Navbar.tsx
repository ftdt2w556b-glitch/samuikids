"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, MapPin } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-cyan-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
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

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
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
