import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getTourById } from "@/lib/tours";
import { getAllActivities } from "@/lib/activities";
import { updateTour, addTourStop, removeTourStop } from "../actions";

export default async function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) redirect("/admin/login");

  const { id } = await params;
  const [tour, activities] = await Promise.all([getTourById(id), getAllActivities()]);
  if (!tour) notFound();

  const nextStop = (tour.stops.length > 0
    ? Math.max(...tour.stops.map((s) => s.stopNumber)) + 1
    : 1);

  const updateWithId   = updateTour.bind(null, id);
  const removeStop     = removeTourStop;

  const fieldClass =
    "w-full bg-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400 border border-slate-600";
  const labelClass = "block text-slate-300 text-xs font-bold uppercase tracking-wide mb-1";

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center gap-4">
        <Link href="/admin/tours" className="text-cyan-400 font-bold text-sm hover:text-cyan-300">
          ← Tours
        </Link>
        <h1 className="text-lg font-black">{tour.title}</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">

        {/* Edit tour details */}
        <form action={updateWithId} className="bg-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="font-black text-slate-300 text-xs uppercase tracking-widest">Tour Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Title</label>
              <input name="title" defaultValue={tour.title} required className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Area</label>
              <input name="area" defaultValue={tour.area ?? ""} className={fieldClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Duration</label>
            <input name="duration_note" defaultValue={tour.durationNote ?? ""} placeholder="e.g. Full day (9am – 9pm)" className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea name="description" defaultValue={tour.description ?? ""} rows={3} className={`${fieldClass} resize-y`} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 text-sm font-semibold">
            <input type="checkbox" name="active" defaultChecked={tour.active} className="w-4 h-4 accent-cyan-400" />
            Active (visible on site)
          </label>
          <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-white font-black px-6 py-2.5 rounded-xl text-sm transition-colors">
            Save Details
          </button>
        </form>

        {/* Current stops */}
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="font-black text-slate-300 text-xs uppercase tracking-widest mb-4">
            Stops ({tour.stops.length})
          </h2>

          {tour.stops.length === 0 ? (
            <p className="text-slate-500 text-sm">No stops yet. Add the first one below.</p>
          ) : (
            <div className="space-y-3">
              {tour.stops.map((stop) => (
                <div key={stop.id} className="flex items-start gap-4 bg-slate-700/50 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-black text-sm flex-shrink-0">
                    {stop.stopNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm">{stop.activitySlug}</p>
                    {stop.stopNote && (
                      <p className="text-slate-400 text-xs mt-0.5 italic">{stop.stopNote}</p>
                    )}
                  </div>
                  <form action={removeStop.bind(null, stop.id, id)}>
                    <button type="submit" className="text-red-400 hover:text-red-300 text-xs font-bold transition-colors flex-shrink-0">
                      Remove
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add stop */}
        <form action={addTourStop} className="bg-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="font-black text-slate-300 text-xs uppercase tracking-widest">Add Next Stop</h2>
          <input type="hidden" name="tour_id" value={id} />
          <input type="hidden" name="stop_number" value={nextStop} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Activity <span className="text-orange-400">*</span></label>
              <select name="activity_slug" required className={fieldClass}>
                <option value="" className="bg-slate-800">Select activity…</option>
                {activities.map((a) => (
                  <option key={a.slug} value={a.slug} className="bg-slate-800">
                    {a.title} ({a.location.area})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Stop {nextStop} Tip (optional)</label>
              <input
                name="stop_note"
                placeholder={`e.g. Try the mango smoothie here!`}
                className={fieldClass}
              />
            </div>
          </div>

          <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-2.5 rounded-xl text-sm transition-colors">
            Add Stop {nextStop}
          </button>
        </form>

        {/* Preview link */}
        <div className="text-center">
          <Link
            href={`/tours/${tour.slug}`}
            target="_blank"
            className="text-cyan-400 text-sm font-bold hover:text-cyan-300 underline underline-offset-2"
          >
            Preview tour on site →
          </Link>
        </div>
      </div>
    </div>
  );
}
