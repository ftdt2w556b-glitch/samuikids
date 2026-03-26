import Link from "next/link";
import Image from "next/image";
import { MapPin, CheckCircle } from "lucide-react";
import { Activity, AgeGroup } from "@/types";
import { CATEGORY_LABELS, CATEGORY_COLORS, PRICE_LABELS, PRICE_COLORS } from "@/lib/constants";

interface Props {
  activity: Activity;
}

const AGE_SHORT: Record<AgeGroup, string> = {
  toddlers: "0–3",
  kids: "4–10",
  tweens: "11–15",
  "all-ages": "All ages",
};

export default function ActivityCard({ activity }: Props) {
  const hasPhoto = activity.photos[0] && !activity.photos[0].includes("placeholder");

  return (
    <Link href={`/activities/${activity.slug}`} className="group block">
      <article className="activity-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
        {/* Photo */}
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-cyan-400 to-blue-500">
          {hasPhoto ? (
            <Image
              src={activity.photos[0]}
              alt={activity.title}
              fill
              className="object-contain activity-card-img p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : null}

          {/* Price badge */}
          <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${PRICE_COLORS[activity.priceRange]}`}>
            {PRICE_LABELS[activity.priceRange]}
          </span>

          {/* Verified badge */}
          {activity.verified && (
            <span className="absolute bottom-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle size={10} /> Verified
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-black text-gray-900 text-base leading-tight group-hover:text-cyan-600 transition-colors mb-1">
            {activity.title}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{activity.shortDesc}</p>

          {/* Age chips */}
          <div className="flex flex-wrap gap-1 mb-3">
            {activity.ageGroups.map((age) => (
              <span key={age} className="text-[10px] font-bold bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full border border-cyan-100">
                {AGE_SHORT[age]}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
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
