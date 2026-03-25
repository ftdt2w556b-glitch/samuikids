import Link from "next/link";
import { Search, MapPin, Star, ChevronRight } from "lucide-react";
import { getFeaturedActivities, getAllActivities } from "@/lib/activities";
import { CATEGORY_LABELS } from "@/lib/constants";
import ActivityCard from "@/components/activities/ActivityCard";
import { Category } from "@/types";

export default function HomePage() {
  const featured = getFeaturedActivities();
  const totalCount = getAllActivities().length;

  const categories: { key: Category; emoji: string; color: string }[] = [
    { key: "nature-animals", emoji: "🐘", color: "from-green-400 to-green-600" },
    { key: "water-beaches", emoji: "🌊", color: "from-cyan-400 to-blue-500" },
    { key: "creative-learning", emoji: "🎨", color: "from-orange-400 to-orange-600" },
    { key: "adventure-sports", emoji: "🧗", color: "from-yellow-400 to-amber-500" },
    { key: "food-cafes", emoji: "🍜", color: "from-pink-400 to-rose-500" },
    { key: "entertainment", emoji: "🎮", color: "from-blue-400 to-indigo-500" },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-b from-sky-400 via-cyan-400 to-cyan-300 overflow-hidden min-h-[460px] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-yellow-300/30 blur-2xl" />
          <div className="absolute top-20 -right-10 w-52 h-52 rounded-full bg-blue-300/40 blur-2xl" />
          <div
            className="absolute bottom-0 left-0 right-0 h-16 bg-white"
            style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-8 w-full">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-bold text-sm mb-4">
              <MapPin size={14} />
              Koh Samui, Thailand
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-sm mb-4">
              Discover Family
              <br />
              <span className="text-yellow-300">Adventures</span> on
              <br />
              Koh Samui 🌴
            </h1>
            <p className="text-white/90 text-lg mb-6 max-w-md font-semibold">
              {totalCount}+ kid-friendly activities — from elephant sanctuaries and water parks to jungle hikes and
              cooking classes.
            </p>

            <div className="flex gap-2 max-w-md">
              <div className="flex-1 flex items-center bg-white rounded-2xl px-4 py-3 shadow-lg gap-2">
                <Search size={18} className="text-gray-400 shrink-0" />
                <Link href="/activities" className="text-gray-400 text-sm w-full">
                  Search activities like &quot;Water Park&quot;...
                </Link>
              </div>
              <Link
                href="/activities"
                className="bg-orange-500 hover:bg-orange-600 text-white font-black px-5 py-3 rounded-2xl shadow-lg transition-colors whitespace-nowrap"
              >
                Explore
              </Link>
            </div>
          </div>

          <div className="flex-shrink-0 text-8xl md:text-9xl select-none">🏖️</div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="bg-white py-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-8">
          {[
            { icon: "🎯", label: `${totalCount}+ Activities`, sub: "Curated & verified" },
            { icon: "👨‍👩‍👧‍👦", label: "All Ages", sub: "Toddlers to teens" },
            { icon: "🗺️", label: "Interactive Map", sub: "Find what's nearby" },
            { icon: "💚", label: "Free to Use", sub: "No account needed" },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <div>
                <div className="font-black text-gray-900 text-sm">{label}</div>
                <div className="text-gray-400 text-xs">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Browse by Category</h2>
        <p className="text-gray-500 mb-6">What kind of adventure are you looking for?</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map(({ key, emoji, color }) => (
            <Link
              key={key}
              href={`/activities?category=${key}`}
              className={`group bg-gradient-to-br ${color} rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-center hover:scale-105 transition-transform shadow-sm hover:shadow-md min-h-[100px]`}
            >
              <span className="text-3xl">{emoji}</span>
              <span className="text-white font-black text-xs leading-tight">{CATEGORY_LABELS[key]}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED ACTIVITIES */}
      <section className="bg-gradient-to-b from-sky-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <Star size={22} className="text-yellow-400 fill-yellow-400" />
                Featured Activities
              </h2>
              <p className="text-gray-500 text-sm mt-1">Hand-picked family favourites on Koh Samui</p>
            </div>
            <Link
              href="/activities"
              className="text-cyan-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 6).map((activity) => (
              <ActivityCard key={activity.slug} activity={activity} />
            ))}
          </div>
        </div>
      </section>

      {/* AGE FILTERS CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 text-8xl opacity-20 -mt-4 -mr-4">🌺</div>
          <div className="absolute bottom-0 left-0 text-8xl opacity-20 -mb-4 -ml-4">🐠</div>
          <h2 className="text-2xl font-black mb-2">Find Activities by Age</h2>
          <p className="text-white/80 mb-6 font-semibold">Filter exactly what works for your family</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Toddlers 0–3", value: "toddlers", emoji: "👶" },
              { label: "Kids 4–10", value: "kids", emoji: "🧒" },
              { label: "Tweens 11–15", value: "tweens", emoji: "🧑" },
              { label: "All Ages", value: "all-ages", emoji: "👨‍👩‍👧‍👦" },
            ].map(({ label, value, emoji }) => (
              <Link
                key={value}
                href={`/activities?age=${value}`}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold px-5 py-2.5 rounded-full transition-colors border border-white/30"
              >
                {emoji} {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MAP CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div>
            <div className="text-4xl mb-3">🗺️</div>
            <h2 className="text-xl font-black mb-1">Explore the Interactive Map</h2>
            <p className="text-slate-400 font-semibold">
              See all activities pinned on a map — find what&apos;s near your hotel.
            </p>
          </div>
          <Link
            href="/map"
            className="bg-cyan-500 hover:bg-cyan-400 text-white font-black px-8 py-3 rounded-2xl transition-colors shadow-lg whitespace-nowrap flex items-center gap-2"
          >
            <MapPin size={18} /> Open Map
          </Link>
        </div>
      </section>
    </div>
  );
}
