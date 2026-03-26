import type { Metadata } from "next";
import Link from "next/link";
import { getAllTours } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Day Tours",
  description:
    "Follow a SamuiKids.com guided day tour and hit the best kid activities in one area. Planned routes, numbered stops, and tips at every location.",
};

export default async function ToursPage() {
  const tours = await getAllTours();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-3">Day Tours</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Planned routes across Koh Samui hitting the best kid activities in one area.
          Each stop is numbered, timed, and family-tested.
        </p>
      </div>

      {tours.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl font-black mb-2">Tours coming soon</p>
          <p className="text-sm">We are building our first guided routes now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tours.map((tour) => (
            <Link
              key={tour.id}
              href={`/tours/${tour.slug}`}
              className="group bg-white border border-gray-200 rounded-3xl p-6 hover:border-cyan-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h2 className="text-xl font-black text-gray-900 group-hover:text-cyan-600 transition-colors">
                    {tour.title}
                  </h2>
                  {tour.area && (
                    <p className="text-cyan-600 font-bold text-sm mt-0.5">{tour.area}</p>
                  )}
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="bg-cyan-100 text-cyan-700 font-black text-sm px-3 py-1 rounded-full">
                    {tour.stopCount} stops
                  </div>
                </div>
              </div>
              {tour.description && (
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{tour.description}</p>
              )}
              {tour.durationNote && (
                <p className="text-gray-400 text-xs font-semibold">{tour.durationNote}</p>
              )}
              <div className="mt-4 text-cyan-600 font-black text-sm group-hover:text-cyan-700">
                View tour →
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
