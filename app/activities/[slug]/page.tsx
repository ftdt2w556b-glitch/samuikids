import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Globe, Phone, ArrowLeft, Star, ChevronRight } from "lucide-react";
import { getAllActivities, getActivityBySlug } from "@/lib/activities";
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  PRICE_LABELS,
  PRICE_COLORS,
  AGE_LABELS,
} from "@/lib/constants";
import ActivityCard from "@/components/activities/ActivityCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const activities = await getAllActivities();
  return activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);
  if (!activity) return {};
  return {
    title: activity.title,
    description: activity.shortDesc,
    openGraph: {
      title: activity.title,
      description: activity.shortDesc,
      images: activity.photos[0] ? [{ url: activity.photos[0] }] : [],
    },
  };
}

export default async function ActivityPage({ params }: Props) {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);
  if (!activity) notFound();

  const allActivities = await getAllActivities();
  const similar = allActivities
    .filter((a) => a.slug !== activity.slug && a.category === activity.category)
    .slice(0, 3);

  const hasPhoto = activity.photos[0] && !activity.photos[0].includes("placeholder");

  const EMOJI_MAP: Record<string, string> = {
    "nature-animals": "🐘",
    "water-beaches": "🌊",
    "creative-learning": "🎨",
    "adventure-sports": "🧗",
    "food-cafes": "🍜",
    cultural: "🏛️",
    entertainment: "🎮",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-cyan-600 transition-colors">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link href="/activities" className="hover:text-cyan-600 transition-colors">
          Activities
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-700 font-semibold truncate">{activity.title}</span>
      </div>

      {/* Back link */}
      <Link
        href="/activities"
        className="inline-flex items-center gap-1 text-cyan-600 font-bold text-sm hover:gap-2 transition-all mb-4"
      >
        <ArrowLeft size={16} /> Back to Activities
      </Link>

      {/* Hero image */}
      <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-400 to-blue-500 mb-8">
        {hasPhoto ? (
          <Image
            src={activity.photos[0]}
            alt={activity.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-9xl">
            {EMOJI_MAP[activity.category] || "🌴"}
          </div>
        )}
        {activity.featured && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow">
            <Star size={12} fill="white" /> Featured
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${CATEGORY_COLORS[activity.category]}`}>
              {CATEGORY_LABELS[activity.category]}
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${PRICE_COLORS[activity.priceRange]}`}>
              {PRICE_LABELS[activity.priceRange]}
            </span>
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-3">{activity.title}</h1>
          <p className="text-lg text-gray-600 font-semibold mb-4">{activity.shortDesc}</p>

          <p className="text-gray-600 leading-relaxed mb-6">{activity.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {activity.tags.map((tag) => (
              <Link
                key={tag}
                href={`/activities?search=${encodeURIComponent(tag)}`}
                className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-cyan-100 hover:text-cyan-700 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* Age suitability */}
          <div className="bg-sky-50 rounded-2xl p-4 mb-6">
            <h3 className="font-black text-gray-800 mb-2 text-sm uppercase tracking-wide">Suitable Ages</h3>
            <div className="flex flex-wrap gap-2">
              {activity.ageGroups.map((age) => (
                <span key={age} className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {AGE_LABELS[age]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Info sidebar */}
        <div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm sticky top-20">
            <h3 className="font-black text-gray-900 mb-4 text-sm uppercase tracking-wide">Details</h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-gray-600">
                <MapPin size={16} className="text-cyan-500 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-gray-700">{activity.location.area}</div>
                  <div className="text-gray-400 text-xs">{activity.location.address}</div>
                </div>
              </div>

              {activity.openingHours && (
                <div className="flex items-start gap-2 text-gray-600">
                  <Clock size={16} className="text-cyan-500 mt-0.5 shrink-0" />
                  <span>{activity.openingHours}</span>
                </div>
              )}

              <div className="pt-2 pb-2 border-t border-gray-100">
                <div className="font-black text-gray-800 text-base">{activity.priceNote}</div>
              </div>

              {activity.website && (
                <a
                  href={activity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-bold"
                >
                  <Globe size={16} /> Visit Website
                </a>
              )}

              {activity.phone && (
                <a
                  href={`tel:${activity.phone}`}
                  className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-bold"
                >
                  <Phone size={16} /> {activity.phone}
                </a>
              )}
            </div>

            {/* Map placeholder */}
            <div className="mt-4 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-xl h-32 flex items-center justify-center text-sm text-cyan-600 font-bold border border-cyan-200">
              <Link href="/map" className="flex flex-col items-center gap-1 hover:text-cyan-700">
                <MapPin size={20} />
                View on Map
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Similar activities */}
      {similar.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-black text-gray-900 mb-6">More {CATEGORY_LABELS[activity.category]}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((a) => (
              <ActivityCard key={a.slug} activity={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
