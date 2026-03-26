import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getAllToursAdmin } from "@/lib/tours";
import { deleteTour } from "./actions";

export default async function AdminToursPage() {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) redirect("/admin/login");

  const tours = await getAllToursAdmin();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-cyan-400 font-bold text-sm hover:text-cyan-300">
            ← Back
          </Link>
          <h1 className="text-lg font-black">Tours</h1>
        </div>
        <Link
          href="/admin/itineraries/new"
          className="bg-cyan-500 hover:bg-cyan-400 text-white font-black px-5 py-2 rounded-xl text-sm transition-colors"
        >
          + New Tour
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {tours.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg font-black mb-2">No tours yet</p>
            <p className="text-sm">Create your first guided day tour.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tours.map((tour) => (
              <div key={tour.id} className="bg-slate-800 rounded-2xl px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-black text-white">{tour.title}</p>
                    {!tour.active && (
                      <span className="bg-slate-600 text-slate-400 text-xs font-bold px-2 py-0.5 rounded-full">
                        Hidden
                      </span>
                    )}
                  </div>
                  {tour.area && <p className="text-slate-400 text-sm">{tour.area}</p>}
                  {tour.durationNote && <p className="text-slate-500 text-xs">{tour.durationNote}</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/itineraries/${tour.id}`}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors"
                  >
                    Edit / Stops
                  </Link>
                  <form action={deleteTour.bind(null, tour.id)}>
                    <button
                      type="submit"
                      className="bg-red-900/50 hover:bg-red-800 text-red-300 font-bold px-4 py-2 rounded-xl text-sm transition-colors"
                      onClick={(e) => { if (!confirm("Delete this tour?")) e.preventDefault(); }}
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
    </div>
  );
}
