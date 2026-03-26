import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTourBySlug, getAllTours } from "@/lib/tours";

export async function generateStaticParams() {
  const tours = await getAllTours();
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return {};
  return {
    title: tour.title,
    description: tour.description ?? `A guided SamuiKids.com day tour with ${tour.stops.length} stops.`,
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-10">
        <Link href="/tours" className="text-cyan-600 font-bold text-sm hover:text-cyan-700 mb-4 inline-block">
          ← All Tours
        </Link>
        <h1 className="text-4xl font-black text-gray-900 mb-2">{tour.title}</h1>
        <div className="flex flex-wrap gap-3 mb-4">
          {tour.area && (
            <span className="bg-cyan-100 text-cyan-700 font-bold text-sm px-3 py-1 rounded-full">
              {tour.area}
            </span>
          )}
          {tour.durationNote && (
            <span className="bg-orange-100 text-orange-700 font-bold text-sm px-3 py-1 rounded-full">
              {tour.durationNote}
            </span>
          )}
          <span className="bg-gray-100 text-gray-600 font-bold text-sm px-3 py-1 rounded-full">
            {tour.stops.length} stops
          </span>
        </div>
        {tour.description && (
          <p className="text-gray-500 text-base leading-relaxed">{tour.description}</p>
        )}
      </div>

      {/* Stops */}
      {tour.stops.length === 0 ? (
        <p className="text-gray-400 text-center py-12">Stops coming soon.</p>
      ) : (
        <div className="space-y-4">
          {tour.stops.map((stop, idx) => {
            const a = stop.activity;
            return (
              <div
                key={stop.id}
                className="flex gap-4 bg-white border border-gray-200 rounded-3xl p-5 hover:border-cyan-200 hover:shadow-md transition-all"
              >
                {/* Step number */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-cyan-500 text-white font-black text-base flex items-center justify-center shadow-md">
                    {stop.stopNumber}
                  </div>
                  {idx < tour.stops.length - 1 && (
                    <div className="w-0.5 h-4 bg-cyan-200 mx-auto mt-1" />
                  )}
                </div>

                {/* Activity card */}
                <div className="flex-1 min-w-0">
                  {a ? (
                    <>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <Link
                          href={`/activities/${a.slug}`}
                          className="font-black text-gray-900 hover:text-cyan-600 transition-colors text-lg leading-snug"
                        >
                          {a.title}
                        </Link>
                        {a.photos?.[0] && (
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                              src={a.photos[0]}
                              alt={a.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-cyan-600 text-sm font-bold mb-1">{a.location.area}</p>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{a.shortDesc}</p>
                      {stop.stopNote && (
                        <div className="mt-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                          <p className="text-amber-700 text-sm font-semibold">{stop.stopNote}</p>
                        </div>
                      )}
                      <Link
                        href={`/activities/${a.slug}`}
                        className="mt-2 inline-block text-cyan-600 font-black text-xs hover:text-cyan-700"
                      >
                        View details →
                      </Link>
                    </>
                  ) : (
                    <p className="text-gray-400 text-sm">Activity not found: {stop.activitySlug}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CTA */}
      <div className="mt-10 text-center">
        <Link
          href="/join"
          className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black px-8 py-4 rounded-2xl hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg"
        >
          Get Your Member Badge for Discounts
        </Link>
        <p className="text-gray-400 text-xs mt-3">
          Free forever. Show the badge at every stop for your member discount.
        </p>
      </div>
    </div>
  );
}
