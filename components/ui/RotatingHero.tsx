"use client";
import { useState, useEffect } from "react";

const headlines = [
  "Uncover Samui's Kid-Friendly Wonders",
  "Where Kids Lead the Adventure",
  "The Best Supervised Kids Activities on Koh Samui",
];

const subheadlines = [
  "Curated activities, age-appropriate adventures, and expert supervision for an unforgettable family holiday.",
  "Supervised spots where parents can take a well-earned break — every listing is kid-tested.",
  "NinjaGyms, cooking classes, art studios and more — every spot is built for children.",
  "Your kids get the spotlight. You get guilt-free downtime. That's the Samui Kids promise.",
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
      }, 500);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-1">
      <div className="min-h-[88px] sm:min-h-[80px] flex items-center justify-center mb-3">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-md transition-opacity duration-500 text-center"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {headlines[headlineIdx]}
        </h1>
      </div>
      <div className="min-h-[56px] flex items-center justify-center">
        <p
          className="text-white/90 text-sm sm:text-base font-semibold transition-opacity duration-500 leading-snug text-center max-w-sm mx-auto"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {subheadlines[subIdx]}
        </p>
      </div>
    </div>
  );
}
