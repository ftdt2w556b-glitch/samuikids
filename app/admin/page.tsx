import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getAllActivities } from "@/lib/activities";
import { logout } from "./actions";

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) redirect("/admin/login");

  const activities = await getAllActivities();
  const kids   = activities.filter(a => a.audience === "kids");
  const family = activities.filter(a => a.audience === "family");

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black">SamuiKids Admin</h1>
          <p className="text-slate-400 text-xs mt-0.5">{activities.length} total activities</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="text-cyan-400 text-sm font-bold hover:text-cyan-300">
            View Site
          </Link>
          <form action={logout}>
            <button className="text-slate-400 text-sm hover:text-white">Sign out</button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total",         value: activities.length,                        color: "bg-slate-700" },
            { label: "Just for Kids", value: kids.length,                              color: "bg-emerald-900" },
            { label: "Family",        value: family.length,                            color: "bg-blue-900"   },
            { label: "Featured",      value: activities.filter(a => a.featured).length, color: "bg-orange-900" },
          ].map(({ label, value, color }) => (
            <div key={label} className={`${color} rounded-2xl p-4 text-center`}>
              <div className="text-3xl font-black">{value}</div>
              <div className="text-slate-300 text-sm font-semibold mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Activities Table */}
        <div className="bg-slate-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="font-black text-lg">All Activities</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wide">
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Audience</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Area</th>
                  <th className="px-4 py-3 text-center">Featured</th>
                  <th className="px-4 py-3 text-center">Drop-off</th>
                  <th className="px-4 py-3 text-center">Discount</th>
                  <th className="px-4 py-3 text-left">Edit</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a) => (
                  <tr key={a.slug} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-white">{a.title}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        a.audience === "kids" ? "bg-emerald-500/20 text-emerald-300" : "bg-blue-500/20 text-blue-300"
                      }`}>
                        {a.audience === "kids" ? "Kids" : "Family"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300 capitalize">{a.category.replace("-", " ")}</td>
                    <td className="px-4 py-3 text-slate-400">{a.location.area}</td>
                    <td className="px-4 py-3 text-center">{a.featured ? "⭐" : <span className="text-slate-600">—</span>}</td>
                    <td className="px-4 py-3 text-center">{a.dropOff ? "✓" : <span className="text-slate-600">—</span>}</td>
                    <td className="px-4 py-3 text-center">{a.memberDiscount ? "✓" : <span className="text-slate-600">—</span>}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/edit/${a.slug}`}
                        className="text-cyan-400 font-bold text-xs hover:text-cyan-300 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
