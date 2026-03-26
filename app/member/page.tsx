import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMemberByToken } from "@/lib/members";
import { getMemberItineraries } from "@/lib/member-itineraries";
import { getAllTours } from "@/lib/tours";
import { deleteItinerary } from "./itineraries/actions";

export const metadata: Metadata = {
  title: "My Itineraries",
  description: "Plan your perfect day on Koh Samui. Build a custom itinerary or follow one of our suggested routes.",
};

export default async function MemberPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("member_session")?.value;
  if (!token) redirect("/join");

  const member = await getMemberByToken(token);
  if (!member) redirect("/join");

  const [myItineraries, suggested] = await Promise.all([
    getMemberItineraries(member.id),
    getAllTours(),
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-10">
        <div>
          <p className="text-gray-500 text-sm font-semibold mb-0.5">Welcome back</p>
          <h1 className="text-3xl font-black text-gray-900">{member.name}</h1>
          <p className="text-gray-400 text-sm">{member.email}</p>
        </div>
        <Link
          href="/badge"
          className="flex-shrink-0 bg-slate-900 text-yellow-400 font-black px-5 py-2.5 rounded-2xl text-sm hover:bg-slate-800 transition-colors shadow-md"
        >
          My Badge
        </Link>
      </div>

      {/* My custom itineraries */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-gray-900">My Itineraries</h2>
          <Link
            href="/member/itineraries/new"
            className="bg-cyan-500 hover:bg-cyan-400 text-white font-black px-4 py-2 rounded-xl text-sm transition-colors"
          >
            + Build New
          </Link>
        </div>

        {myItineraries.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 text-center">
            <p className="text-gray-400 font-semibold mb-2">No itineraries yet</p>
            <p className="text-gray-400 text-sm mb-4">Build a custom day plan from any listing on the island.</p>
            <Link
              href="/member/itineraries/new"
              className="inline-block bg-cyan-500 text-white font-black px-6 py-2.5 rounded-xl text-sm hover:bg-cyan-400 transition-colors"
            >
              Build My First Itinerary
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {myItineraries.map((it) => (
              <div key={it.id} className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-black text-gray-900">{it.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    {it.area && <span className="text-cyan-600 text-sm font-bold">{it.area}</span>}
                    <span className="text-gray-400 text-sm">{it.stopCount} stops</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/member/itineraries/${it.id}`}
                    className="bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold px-4 py-2 rounded-xl text-sm transition-colors"
                  >
                    View / Edit
                  </Link>
                  <form action={deleteItinerary.bind(null, it.id)}>
                    <button
                      type="submit"
                      className="text-red-400 hover:text-red-500 text-sm font-bold transition-colors px-2"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suggested routes */}
      {suggested.length > 0 && (
        <div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Suggested Routes</h2>
          <p className="text-gray-500 text-sm mb-5">Pre-planned days put together by SamuiKids.com. Follow the stops in order and collect discounts at each one.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggested.map((it) => (
              <Link
                key={it.id}
                href={`/itineraries/${it.slug}`}
                className="group bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-3xl p-5 hover:border-cyan-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-black text-gray-900 group-hover:text-cyan-700 transition-colors">{it.title}</h3>
                  <span className="bg-cyan-100 text-cyan-700 font-black text-xs px-2.5 py-1 rounded-full flex-shrink-0">
                    {it.stopCount} stops
                  </span>
                </div>
                {it.area && <p className="text-cyan-600 font-bold text-sm">{it.area}</p>}
                {it.description && <p className="text-gray-500 text-sm mt-1 line-clamp-2">{it.description}</p>}
                <p className="mt-3 text-cyan-600 font-black text-sm group-hover:text-cyan-700">View route →</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
