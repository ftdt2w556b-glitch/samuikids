import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createTour } from "../actions";

export default async function NewTourPage() {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) redirect("/admin/login");

  const fieldClass =
    "w-full bg-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400 border border-slate-600";
  const labelClass = "block text-slate-300 text-xs font-bold uppercase tracking-wide mb-1";

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center gap-4">
        <Link href="/admin/itineraries" className="text-cyan-400 font-bold text-sm hover:text-cyan-300">
          ← Tours
        </Link>
        <h1 className="text-lg font-black">New Tour</h1>
      </div>

      <form action={createTour} className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-slate-800 rounded-2xl p-6 space-y-4">
          <div>
            <label className={labelClass}>Tour Title <span className="text-orange-400">*</span></label>
            <input name="title" required placeholder="e.g. North Samui Family Day" className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Area / Starting Point</label>
            <input name="area" placeholder="e.g. Bophut / Chaweng" className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Duration</label>
            <input name="duration_note" placeholder="e.g. Full day (9am – 9pm), Half day (morning)" className={fieldClass} />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Brief overview of the tour, what to expect, who it suits…"
              className={`${fieldClass} resize-y`}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-400 text-white font-black px-8 py-3 rounded-xl transition-colors shadow-lg"
          >
            Create Tour
          </button>
          <Link
            href="/admin/itineraries"
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-8 py-3 rounded-xl transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
