"use client";
import { useState, useEffect } from "react";

const headlines = [
  "Where Kids Lead the Adventure, and Parents Find Their Freedom",
  "Discover Kid-Friendly Adventures on Koh Samui Today",
];

const subheadlines = [
  "Safe, supervised play zones and kid-focused locations designed for little explorers, with drop-and-go options.",
  "We put kids first: engaging activities, age-appropriate adventures, and supervision that lets children thrive.",
  "Whether it's a NinjaGym, Thai language classes, or creative workshops, every spot we feature is built for children.",
  "Your kids get the spotlight, so you can enjoy guilt-free downtime. Parents can recharge with peace of mind.",
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
      }, 800);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-5">
      {/* Fixed-height containers stop layout jump — sized to fit longest text */}
      <div className="h-[108px] sm:h-[88px] md:h-[100px] overflow-hidden mb-3">
        <h1
          className="text-3xl sm:text-3xl md:text-4xl font-black text-white leading-snug drop-shadow-sm transition-opacity duration-700"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {headlines[headlineIdx]}
        </h1>
      </div>
      <div className="h-[72px] sm:h-[56px] overflow-hidden">
        <p
          className="text-white/90 text-base md:text-lg font-semibold transition-opacity duration-700 leading-snug"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {subheadlines[subIdx]}
        </p>
      </div>
    </div>
  );
}
