import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Activity, AgeGroup } from "@/types";
import { CATEGORY_LABELS, CATEGORY_COLORS, PRICE_LABELS, PRICE_COLORS } from "@/lib/constants";

interface Props {
  activity: Activity;
  audienceContext?: "dropoff" | "family";
}

const AGE_SHORT: Record<AgeGroup, string> = {
  toddlers:   "0–3",
  kids:       "4–10",
  tweens:     "11–15",
  "all-ages": "All ages",
};

export default function ActivityCard({ activity, audienceContext }: Props) {
  const hasPhoto = activity.photos[0] && !activity.photos[0].includes("placeholder");

  // "both" activities show context-aware badge; no context = show "Drop-off + Family"
  const isBothNoContext = activity.audience === "both" && !audienceContext;
  const isDropOff =
    activity.audience === "kids" ||
    (activity.audience === "both" && audienceContext === "dropoff");
  const isFamily =
    activity.audience === "family" ||
    (activity.audience === "both" && audienceContext === "family");
  const ageLabel = activity.ageMin != null && activity.ageMax != null
    ? `Ages ${activity.ageMin}–${activity.ageMax}`
    : null;

  return (
    <Link href={`/activities/${activity.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 h-full flex flex-col">

        {/* Photo */}
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0">
          {hasPhoto && (
            <Image
              src={activity.photos[0]}
              alt={activity.title}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {/* Price badge — top right */}
          <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${PRICE_COLORS[activity.priceRange]}`}>
            {PRICE_LABELS[activity.priceRange]}
          </span>

          {/* Audience badge — top left */}
          {isBothNoContext && (
            <span className="absolute top-3 left-3 bg-purple-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm">
              Drop-off + Family
            </span>
          )}
          {isDropOff && (
            <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm">
              Drop-off OK
            </span>
          )}
          {isFamily && (
            <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm">
              Family Activity
            </span>
          )}

          {/* Member discount ribbon — bottom left */}
          {activity.memberDiscount && (
            <span className="absolute bottom-3 left-3 bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              Member Discount
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-black text-gray-900 text-base leading-tight group-hover:text-cyan-600 transition-colors mb-1">
            {activity.title}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
            {activity.shortDesc}
          </p>

          {/* Info chips */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {ageLabel ? (
              <span className="text-xs font-bold bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full border border-cyan-100">
                {ageLabel}
              </span>
            ) : (
              activity.ageGroups.map((age) => (
                <span key={age} className="text-xs font-bold bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full border border-cyan-100">
                  {AGE_SHORT[age]}
                </span>
              ))
            )}
            {activity.englishSpoken && (
              <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
                English
              </span>
            )}
            {activity.sessionType && (
              <span className="text-xs font-bold bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full border border-purple-100 capitalize">
                {activity.sessionType === "both" ? "Private or Group" : activity.sessionType}
              </span>
            )}
            {activity.sessionLengths?.map((l) => (
              <span key={l} className="text-xs font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-100 capitalize">
                {l === "half-day" ? "Half-day" : l.charAt(0).toUpperCase() + l.slice(1)}
              </span>
            ))}
            {(activity.hasFood || activity.hasDrinks) && (
              <span className="text-xs font-bold bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full border border-pink-100">
                {activity.hasFood && activity.hasDrinks ? "Food + Drinks" : activity.hasFood ? "Food" : "Drinks"}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${CATEGORY_COLORS[activity.category]}`}>
              {CATEGORY_LABELS[activity.category]}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <MapPin size={11} />
              {activity.location.area}
            </span>
          </div>

          {activity.priceNote && (
            <p className="text-xs text-gray-400 mt-2 font-medium">{activity.priceNote}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
