"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Activity } from "@/types";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/constants";

const ActivityMap = dynamic(() => import("@/components/map/ActivityMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-sky-100 flex items-center justify-center text-cyan-600 font-bold animate-pulse">
      Loading map...
    </div>
  ),
});

interface Props {
  activities: Activity[];
}

export default function MapClient({ activities }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-900 mb-1 flex items-center gap-2">
          <MapPin className="text-cyan-500" /> Activity Map
        </h1>
        <p className="text-gray-500">Click any pin to see activity details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <ActivityMap activities={activities} />
        </div>

        {/* Sidebar list */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-sky-50">
            <h2 className="font-black text-gray-900 text-sm uppercase tracking-wide">
              {activities.length} Activities
            </h2>
          </div>
          <div className="overflow-y-auto max-h-[450px] filter-scroll">
            {activities.map((activity) => (
              <Link
                key={activity.slug}
                href={`/activities/${activity.slug}`}
                className="flex items-start gap-3 p-3 border-b border-gray-50 hover:bg-sky-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-base flex-shrink-0">
                  {activity.category === "nature-animals" && "🐘"}
                  {activity.category === "water-beaches" && "🌊"}
                  {activity.category === "creative-learning" && "🎨"}
                  {activity.category === "adventure-sports" && "🧗"}
                  {activity.category === "food-cafes" && "🍜"}
                  {activity.category === "entertainment" && "🎮"}
                  {activity.category === "cultural" && "🏛️"}
                </div>
                <div className="min-w-0">
                  <div className="font-black text-gray-900 text-sm truncate group-hover:text-cyan-600 transition-colors">
                    {activity.title}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="text-gray-400" />
                    <span className="text-xs text-gray-400">{activity.location.area}</span>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ml-1 ${CATEGORY_COLORS[activity.category]}`}>
                      {CATEGORY_LABELS[activity.category]}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
