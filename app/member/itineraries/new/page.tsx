import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getMemberByToken } from "@/lib/members";
import { createItinerary } from "../actions";

export default async function NewItineraryPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("member_session")?.value;
  if (!token) redirect("/join");
  const member = await getMemberByToken(token);
  if (!member) redirect("/join");

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-400 text-gray-900 placeholder-gray-400";
  const labelClass = "block text-gray-600 text-xs font-bold uppercase tracking-wide mb-1.5";

  const AREAS = ["Chaweng","Lamai","Bophut","Maenam","Choeng Mon","Bangrak","Nathon","Mixed / All Island"];

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <Link href="/member" className="text-cyan-600 font-bold text-sm hover:text-cyan-700 mb-6 inline-block">
        ← My Itineraries
      </Link>
      <h1 className="text-3xl font-black text-gray-900 mb-2">Build Your Day</h1>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Give your itinerary a name, pick an area, and then add activities one by one. You go at your own pace and can adjust any time.
      </p>

      <form action={createItinerary} className="space-y-5">
        <div>
          <label className={labelClass}>Itinerary Name <span className="text-red-400">*</span></label>
          <input
            name="title"
            type="text"
            required
            placeholder="e.g. Bophut Family Day, Beach &amp; Build"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Area of the Island</label>
          <select name="area" className={inputClass}>
            <option value="">Any / not sure yet</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black py-3.5 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg"
        >
          Create Itinerary
        </button>
      </form>
    </div>
  );
}
