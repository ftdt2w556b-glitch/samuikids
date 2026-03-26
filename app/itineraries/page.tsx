import type { Metadata } from "next";
import Link from "next/link";
import { getAllTours } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Itineraries",
  description:
    "Pre-planned self-guided itineraries for families on Koh Samui. Pick an area, follow the route, and collect member discounts at every stop.",
};

export default async function ItinerariesPage() {
  const itineraries = await getAllTours();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-gray-900 mb-3">Itineraries</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Pick an area of the island and follow a pre-planned day. Each stop is numbered and in order so you go at your own pace and collect member discounts along the way.
        </p>
      </div>

      {/* Member CTA */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-6 mb-10 text-white text-center">
        <p className="font-black text-lg mb-1">Members can also build their own</p>
        <p className="text-cyan-100 text-sm mb-4">
          Log in to create a custom itinerary from any listings on the island.
        </p>
        <Link
          href="/member"
          className="inline-block bg-white text-cyan-700 font-black px-6 py-2.5 rounded-full text-sm hover:bg-cyan-50 transition-colors"
        >
          My Itineraries
        </Link>
      </div>

      {itineraries.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl font-black mb-2">Itineraries coming soon</p>
          <p className="text-sm">Our first suggested routes are being put together now.</p>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-black text-gray-700 mb-4 uppercase tracking-wide text-sm">Suggested Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {itineraries.map((it) => (
              <Link
                key={it.id}
                href={`/itineraries/${it.slug}`}
                className="group bg-white border border-gray-200 rounded-3xl p-6 hover:border-cyan-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2 className="text-xl font-black text-gray-900 group-hover:text-cyan-600 transition-colors">
                      {it.title}
                    </h2>
                    {it.area && (
                      <p className="text-cyan-600 font-bold text-sm mt-0.5">{it.area}</p>
                    )}
                  </div>
                  <div className="bg-cyan-100 text-cyan-700 font-black text-sm px-3 py-1 rounded-full flex-shrink-0">
                    {it.stopCount} stops
                  </div>
                </div>
                {it.description && (
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{it.description}</p>
                )}
                {it.durationNote && (
                  <p className="text-gray-400 text-xs font-semibold">{it.durationNote}</p>
                )}
                <div className="mt-4 text-cyan-600 font-black text-sm group-hover:text-cyan-700">
                  View itinerary →
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
