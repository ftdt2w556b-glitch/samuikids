"use client";
import { useState, useEffect } from "react";

const headlines = [
  "Where Kids Lead the Adventure",
  "Discover Kid-Friendly Adventures on Koh Samui",
];

const subheadlines = [
  "Supervised spots where parents can take a well-earned break.",
  "We put kids first: age-appropriate adventures with staff supervision.",
  "NinjaGyms, language classes, creative workshops — built for children.",
  "Your kids get the spotlight. Parents recharge with peace of mind.",
];

export default function RotatingHero() {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setHeadlineIdx((i) => (i + 1) % headlines.length);
        setSubIdx((i) => (i + 1) % subheadlines.length);
        setVisible(true);
      }, 600);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-5">
      {/* min-h prevents layout jump; text never overflows on any screen size */}
      <div className="min-h-[80px] sm:min-h-[72px] md:min-h-[96px] mb-3">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-snug drop-shadow-sm transition-opacity duration-600"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {headlines[headlineIdx]}
        </h1>
      </div>
      <div className="min-h-[52px] sm:min-h-[44px]">
        <p
          className="text-white/90 text-sm sm:text-base md:text-lg font-semibold transition-opacity duration-600 leading-snug"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {subheadlines[subIdx]}
        </p>
      </div>
    </div>
  );
}
