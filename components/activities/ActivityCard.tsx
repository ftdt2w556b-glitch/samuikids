import Link from "next/link";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { Activity } from "@/types";
import { CATEGORY_LABELS, CATEGORY_COLORS, PRICE_LABELS, PRICE_COLORS } from "@/lib/constants";

interface Props {
  activity: Activity;
}

export default function ActivityCard({ activity }: Props) {
  const hasPhoto = activity.photos[0] && !activity.photos[0].includes("placeholder");

  return (
    <Link href={`/activities/${activity.slug}`} className="group block">
      <article className="activity-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
        {/* Photo */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-400 to-blue-500">
          {hasPhoto ? (
            <Image
              src={activity.photos[0]}
              alt={activity.title}
              fill
              className="object-contain activity-card-img p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {activity.category === "nature-animals" && "🐘"}
              {activity.category === "water-beaches" && "🌊"}
              {activity.category === "creative-learning" && "🎨"}
              {activity.category === "adventure-sports" && "🧗"}
              {activity.category === "food-cafes" && "🍜"}
              {activity.category === "cultural" && "🏛️"}
              {activity.category === "entertainment" && "🎮"}
            </div>
          )}
          {/* Price badge */}
          <span
            className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${PRICE_COLORS[activity.priceRange]}`}
          >
            {PRICE_LABELS[activity.priceRange]}
          </span>
          {activity.featured && (
            <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Star size={10} fill="white" /> Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-black text-gray-900 text-base leading-tight group-hover:text-cyan-600 transition-colors">
              {activity.title}
            </h3>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{activity.shortDesc}</p>

          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-bold px-2 py-1 rounded-full ${CATEGORY_COLORS[activity.category]}`}
            >
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
