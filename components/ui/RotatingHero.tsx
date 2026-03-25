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

export default function RotatingHero({ totalCount }: { totalCount: number }) {
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
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1
        className="text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-sm mb-4 transition-opacity duration-500"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {headlines[headlineIdx]}
      </h1>
      <p
        className="text-white/90 text-lg mb-6 max-w-md font-semibold transition-opacity duration-500"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {subheadlines[subIdx]}
      </p>
      <p className="text-white/70 text-sm mb-4 font-medium">
        {totalCount}+ kid-centric activities on Koh Samui 🌴
      </p>
    </div>
  );
}
