import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronRight } from "lucide-react";
import { getAllActivities, getKidActivities, getFamilyActivities } from "@/lib/activities";
import { CATEGORY_LABELS } from "@/lib/constants";
import ActivityCard from "@/components/activities/ActivityCard";
import HeroSearch from "@/components/ui/HeroSearch";
import { Category } from "@/types";

export default function HomePage() {
  const allActivities = getAllActivities();
  const totalCount = allActivities.length;
  const kidActivities = getKidActivities().slice(0, 6);
  const familyActivities = getFamilyActivities().slice(0, 3);

  const categories: { key: Category; image: string; color: string }[] = [
    { key: "nature-animals",    image: "/images/elephant.png",               color: "from-green-400 to-green-600"    },
    { key: "water-beaches",     image: "/images/playgroundslide.png",        color: "from-cyan-400 to-blue-500"      },
    { key: "creative-learning", image: "/images/artsandcrafts.png",          color: "from-orange-400 to-orange-600"  },
    { key: "adventure-sports",  image: "/images/monkeyclimb.png",            color: "from-yellow-400 to-amber-500"   },
    { key: "food-cafes",        image: "/images/samuikidscafe.png",          color: "from-pink-400 to-rose-500"      },
    { key: "entertainment",     image: "/images/samuikidsentertainment.png", color: "from-blue-400 to-indigo-500"    },
    { key: "cultural",          image: "/images/samuikidstemple.png",        color: "from-purple-400 to-purple-600"  },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-b from-sky-400 via-cyan-400 to-cyan-300 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-yellow-300/30 blur-2xl" />
          <div className="absolute top-20 -right-10 w-52 h-52 rounded-full bg-blue-300/40 blur-2xl" />
        </div>

        <div className="relative max-w-xl mx-auto px-5 pt-2 pb-8 text-center">

          {/* Logo */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto drop-shadow-2xl">
            <Image src="/images/samuikidslogo.png" alt="Samui Kids Fun Guide" fill className="object-contain" priority />
          </div>

          {/* Location pill */}
          <div className="inline-flex items-center gap-1.5 bg-white/30 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-bold text-xs tracking-widest uppercase mb-4">
            <MapPin size={11} />
            Koh Samui, Thailand
          </div>

          {/* Static headline */}
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
            Drop-off Supervised Kids Activities on Koh Samui
          </h1>

          {/* Subheadline — brand secondary dark teal */}
          <p className="text-cyan-900 font-semibold text-base sm:text-lg mb-6 leading-relaxed">
            Your kids get the spotlight. You get guilt-free downtime. Each location is built for children.
          </p>

          {/* Search */}
          <HeroSearch />

          {/* 4 WHY stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { icon: "/images/samuikidsshopping.png",  label: "Loyalty Discounts",  sub: "Members save more"    },
              { icon: "/images/samuikidsmap.png",        label: "Interactive Map",    sub: "Find what's nearby"   },
              { icon: "/images/samuikidselephant2.png",  label: "Drop-off Approved", sub: "Staff supervised"     },
              { icon: "/images/samuikidsninja.png",      label: "Kid Focused",        sub: "Built for children"  },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="bg-white/80 backdrop-blur-sm rounded-2xl px-3 py-4 flex flex-col items-center gap-2 border border-white/60 shadow-sm">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image src={icon} alt={label} fill className="object-contain" sizes="48px" />
                </div>
                <div className="text-cyan-900 font-black text-sm leading-tight text-center">{label}</div>
                <div className="text-cyan-700 text-xs font-semibold text-center">{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="h-10 bg-white" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
      </section>

      {/* CATEGORIES */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Browse by Category</h2>
        <p className="text-gray-500 mb-6">What kind of adventure are you looking for?</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
          {categories.map(({ key, image, color }) => {
            const count = allActivities.filter((a) => a.category === key).length;
            return (
              <Link
                key={key}
                href={`/activities?category=${key}`}
                className={`group bg-gradient-to-br ${color} rounded-2xl overflow-hidden flex flex-col items-center justify-end text-center hover:scale-105 transition-transform shadow-sm hover:shadow-md min-h-[110px] relative pt-2`}
              >
                <div className="relative w-full h-16 flex-shrink-0">
                  <Image src={image} alt={CATEGORY_LABELS[key]} fill className="object-contain" style={{ mixBlendMode: "screen" }} sizes="120px" />
                </div>
                <div className="pb-3 px-1">
                  <span className="text-white font-black text-xs leading-tight drop-shadow-sm block">{CATEGORY_LABELS[key]}</span>
                  <span className="text-white/80 text-[10px] font-bold">{count} spots</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* JUST FOR KIDS */}
      <section className="bg-gradient-to-b from-sky-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image src="/images/samuikidsshopping.png" alt="" fill className="object-contain" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900">Just for Kids</h2>
                <p className="text-gray-500 text-sm mt-0.5">Supervised spots with staff, drop-off friendly</p>
              </div>
            </div>
            <Link href="/activities?audience=kids" className="text-cyan-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {kidActivities.map((activity) => (
              <ActivityCard key={activity.slug} activity={activity} />
            ))}
          </div>
        </div>
      </section>

      {/* FAMILY ADVENTURES */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image src="/images/samuikidsfamily2.png" alt="" fill className="object-contain" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900">Family Adventures</h2>
                <p className="text-gray-500 text-sm mt-0.5">Experiences the whole family will love together</p>
              </div>
            </div>
            <Link href="/activities?audience=family" className="text-cyan-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {familyActivities.map((activity) => (
              <ActivityCard key={activity.slug} activity={activity} />
            ))}
          </div>
        </div>
      </section>

      {/* AGE FILTER CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8 text-white text-center relative overflow-hidden">
          <div className="absolute right-4 bottom-0 w-28 h-28 opacity-20 pointer-events-none">
            <Image src="/images/elephantwithhat.png" alt="" fill className="object-contain" style={{ mixBlendMode: "screen" }} />
          </div>
          <h2 className="text-2xl font-black mb-2">Find Activities by Age</h2>
          <p className="text-white/80 mb-6 font-semibold">Filter exactly what works for your family</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Toddlers 0–3", value: "toddlers" },
              { label: "Kids 4–10",    value: "kids"     },
              { label: "Tweens 11–15", value: "tweens"   },
              { label: "All Ages",     value: "all-ages" },
            ].map(({ label, value }) => (
              <Link key={value} href={`/activities?age=${value}`} className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold px-5 py-2.5 rounded-full transition-colors border border-white/30">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MAP CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 flex-shrink-0">
              <Image src="/images/samuikidsmap.png" alt="" fill className="object-contain" />
            </div>
            <div>
              <h2 className="text-xl font-black mb-1">Explore the Interactive Map</h2>
              <p className="text-slate-400 font-semibold">
                See all activities pinned on a map. Find what&apos;s near your hotel.
              </p>
            </div>
          </div>
          <Link href="/map" className="bg-cyan-500 hover:bg-cyan-400 text-white font-black px-8 py-3 rounded-2xl transition-colors shadow-lg whitespace-nowrap">
            Open Map
          </Link>
        </div>
      </section>
    </div>
  );
}
