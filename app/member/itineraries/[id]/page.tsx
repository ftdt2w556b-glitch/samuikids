import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getMemberByToken } from "@/lib/members";
import { getMemberItineraryById } from "@/lib/member-itineraries";
import { getAllActivities } from "@/lib/activities";
import { addStop, removeStop } from "../actions";

export default async function MemberItineraryPage({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("member_session")?.value;
  if (!token) redirect("/join");
  const member = await getMemberByToken(token);
  if (!member) redirect("/join");

  const { id } = await params;
  const [itinerary, activities] = await Promise.all([
    getMemberItineraryById(id, member.id),
    getAllActivities(),
  ]);
  if (!itinerary) notFound();

  const fieldClass =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400 text-gray-900 placeholder-gray-400";

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/member" className="text-cyan-600 font-bold text-sm hover:text-cyan-700 mb-6 inline-block">
        ← My Itineraries
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">{itinerary.title}</h1>
        <div className="flex items-center gap-3 mt-1">
          {itinerary.area && <span className="text-cyan-600 font-bold text-sm">{itinerary.area}</span>}
          <span className="text-gray-400 text-sm">{itinerary.stops.length} stops</span>
        </div>
      </div>

      {/* Stops */}
      <div className="mb-10">
        <h2 className="text-base font-black text-gray-700 uppercase tracking-wide mb-4">Your Stops</h2>
        {itinerary.stops.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center text-gray-400">
            <p className="font-semibold mb-1">No stops yet</p>
            <p className="text-sm">Add your first activity below.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {itinerary.stops.map((stop, idx) => {
              const a = stop.activity;
              return (
                <div key={stop.id} className="flex gap-4 bg-white border border-gray-200 rounded-2xl p-4 hover:border-cyan-200 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-cyan-500 text-white font-black text-sm flex items-center justify-center">
                      {stop.stopNumber}
                    </div>
                    {idx < itinerary.stops.length - 1 && (
                      <div className="w-0.5 h-3 bg-cyan-200 mx-auto mt-1" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    {a ? (
                      <>
                        <div className="flex items-start justify-between gap-2">
                          <Link href={`/activities/${a.slug}`} className="font-black text-gray-900 hover:text-cyan-600 transition-colors leading-snug">
                            {a.title}
                          </Link>
                          {a.photos?.[0] && (
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                              <Image src={a.photos[0]} alt={a.title} fill className="object-cover" sizes="48px" />
                            </div>
                          )}
                        </div>
                        <p className="text-cyan-600 text-xs font-bold mt-0.5">{a.location.area}</p>
                        {a.memberOffer && (
                          <p className="text-emerald-600 text-xs font-semibold mt-1">Member offer: {a.memberOffer}</p>
                        )}
                        {stop.stopNote && (
                          <p className="text-amber-600 text-xs mt-1 italic">{stop.stopNote}</p>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-400 text-sm">{stop.activitySlug}</p>
                    )}
                  </div>
                  <form action={removeStop.bind(null, stop.id, id)}>
                    <button type="submit" className="text-red-300 hover:text-red-400 text-xs font-bold flex-shrink-0 transition-colors">
                      Remove
                    </button>
                  </form>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add stop */}
      <form action={addStop} className="bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-4">
        <h2 className="font-black text-gray-700 text-sm uppercase tracking-wide">Add a Stop</h2>
        <input type="hidden" name="itinerary_id" value={id} />
        <div>
          <label className="block text-gray-600 text-xs font-bold uppercase tracking-wide mb-1.5">Activity</label>
          <select name="activity_slug" required className={fieldClass}>
            <option value="">Choose an activity…</option>
            {activities.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.title} — {a.location.area}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-600 text-xs font-bold uppercase tracking-wide mb-1.5">Your note (optional)</label>
          <input name="stop_note" type="text" placeholder="e.g. Book ahead, kids loved this last time" className={fieldClass} />
        </div>
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-400 text-white font-black px-6 py-2.5 rounded-xl text-sm transition-colors"
        >
          Add to Itinerary
        </button>
      </form>

      {/* Badge reminder */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 text-center">
        <p className="text-amber-700 font-black text-sm">Remember your member badge</p>
        <p className="text-amber-600 text-xs mt-1">Show it at each stop to collect your discount.</p>
        <Link href="/badge" className="inline-block mt-3 bg-slate-900 text-yellow-400 font-black px-5 py-2 rounded-xl text-xs hover:bg-slate-800 transition-colors">
          Open Badge
        </Link>
      </div>
    </div>
  );
}
