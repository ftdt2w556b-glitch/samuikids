import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { readdirSync } from "fs";
import { join } from "path";
import { getActivityBySlug } from "@/lib/activities";
import { updateActivity } from "../../actions";
import ImagePicker from "./ImagePicker";

const CATEGORIES = ["nature-animals","water-beaches","creative-learning","adventure-sports","food-cafes","cultural","entertainment"];
const PRICE_RANGES = ["free","budget","mid","premium"];

export default async function EditActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) redirect("/admin/login");

  const { slug } = await params;
  const a = await getActivityBySlug(slug);
  if (!a) notFound();

  // Read available images from /public/images at build/request time
  const imageFiles = readdirSync(join(process.cwd(), "public/images"))
    .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .sort()
    .map((f) => `/images/${f}`);

  const currentImage = a.photos?.[0] ?? "";

  const updateWithSlug = updateActivity.bind(null, slug);

  const fieldClass = "w-full bg-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400 border border-slate-600";
  const labelClass = "block text-slate-300 text-xs font-bold uppercase tracking-wide mb-1";
  const checkClass = "w-4 h-4 accent-cyan-400";

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-cyan-400 font-bold text-sm hover:text-cyan-300">
          ← Back
        </Link>
        <h1 className="text-lg font-black">Edit: {a.title}</h1>
      </div>

      <form action={updateWithSlug} className="max-w-4xl mx-auto px-6 py-8 space-y-6">

        {/* Basic info */}
        <div className="bg-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="font-black text-slate-300 text-xs uppercase tracking-widest mb-4">Basic Info</h2>

          <div>
            <label className={labelClass}>Title</label>
            <input name="title" defaultValue={a.title} required className={fieldClass} />
          </div>

          <div>
            <label className={labelClass}>Short Description</label>
            <input name="short_desc" defaultValue={a.shortDesc} required className={fieldClass} />
          </div>

          <div>
            <label className={labelClass}>Full Description</label>
            <textarea name="description" defaultValue={a.description} rows={5} required className={`${fieldClass} resize-y`} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className={labelClass}>Category</label>
              <select name="category" defaultValue={a.category} className={fieldClass}>
                {CATEGORIES.map(c => <option key={c} value={c} className="bg-slate-800 capitalize">{c.replace("-"," ")}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Price Range</label>
              <select name="price_range" defaultValue={a.priceRange} className={fieldClass}>
                {PRICE_RANGES.map(p => <option key={p} value={p} className="bg-slate-800 capitalize">{p}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Audience</label>
              <select name="audience" defaultValue={a.audience} className={fieldClass}>
                <option value="kids" className="bg-slate-800">Drop-off Supervised</option>
                <option value="family" className="bg-slate-800">Family (parents join)</option>
                <option value="both" className="bg-slate-800">Both (drop-off + family)</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Price Note</label>
            <input name="price_note" defaultValue={a.priceNote} className={fieldClass} />
          </div>
        </div>

        {/* Primary Image */}
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="font-black text-slate-300 text-xs uppercase tracking-widest mb-1">Primary Image</h2>
          <p className="text-slate-400 text-sm mb-4">
            Click any image below to select it for this listing.
          </p>

          {/* How to add new images — plain English for non-technical staff */}
          <details className="mb-5 bg-amber-900/30 border border-amber-700/40 rounded-xl overflow-hidden">
            <summary className="px-4 py-3 text-amber-300 font-black text-xs uppercase tracking-wide cursor-pointer select-none hover:bg-amber-900/20 transition-colors">
              How to add a new image to this list
            </summary>
            <div className="px-4 pb-4 pt-2 space-y-3 text-slate-300 text-sm leading-relaxed">
              <p>You do not need to touch any code. Follow these steps from any browser:</p>
              <ol className="space-y-2.5 list-none">
                {[
                  <>Go to <span className="font-black text-white">github.com</span> and sign in. Open the SamuiKids repository.</>,
                  <>Click into the folders: <span className="font-mono text-amber-300 text-xs bg-black/30 px-1.5 py-0.5 rounded">public</span> → <span className="font-mono text-amber-300 text-xs bg-black/30 px-1.5 py-0.5 rounded">images</span></>,
                  <>Click <span className="font-black text-white">Add file</span> (top right) → <span className="font-black text-white">Upload files</span>.</>,
                  <>Drag your <span className="font-black text-white">.png file</span> into the box. Use a simple lowercase filename with no spaces, e.g. <span className="font-mono text-amber-300 text-xs bg-black/30 px-1.5 py-0.5 rounded">samuikidsnewplace.png</span></>,
                  <>Scroll down and click <span className="font-black text-white">Commit changes</span>. Leave the default message as-is.</>,
                  <>Wait about <span className="font-black text-white">2 minutes</span> for the site to rebuild automatically. Then come back here and your new image will appear in the grid below.</>,
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="text-slate-500 text-xs border-t border-slate-700 pt-3 mt-3">
                If something does not look right after 2 minutes, do a hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows).
              </p>
            </div>
          </details>

          <ImagePicker imageFiles={imageFiles} currentImage={currentImage} />
        </div>

        {/* Location */}
        <div className="bg-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="font-black text-slate-300 text-xs uppercase tracking-widest mb-4">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Area</label>
              <input name="area" defaultValue={a.location.area} className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input name="address" defaultValue={a.location.address} className={fieldClass} />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="font-black text-slate-300 text-xs uppercase tracking-widest mb-4">Contact & Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Opening Hours</label>
              <input name="opening_hours" defaultValue={a.openingHours ?? ""} className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <input name="website" defaultValue={a.website ?? ""} type="url" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input name="phone" defaultValue={a.phone ?? ""} className={fieldClass} />
            </div>
          </div>
        </div>

        {/* Age + Sessions */}
        <div className="bg-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="font-black text-slate-300 text-xs uppercase tracking-widest mb-4">Ages and Sessions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className={labelClass}>Min Age (years)</label>
              <input name="age_min" type="number" min="0" max="18" defaultValue={a.ageMin ?? ""} className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Max Age (years)</label>
              <input name="age_max" type="number" min="0" max="18" defaultValue={a.ageMax ?? ""} className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Session Type</label>
              <select name="session_type" defaultValue={a.sessionType ?? ""} className={fieldClass}>
                <option value="" className="bg-slate-800">Not set</option>
                <option value="private" className="bg-slate-800">Private</option>
                <option value="group" className="bg-slate-800">Group</option>
                <option value="both" className="bg-slate-800">Both</option>
              </select>
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="bg-slate-800 rounded-2xl p-6">
          <h2 className="font-black text-slate-300 text-xs uppercase tracking-widest mb-4">Features and Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "featured",           label: "Featured",            val: a.featured               },
              { name: "member_discount",    label: "Member Discount",     val: a.memberDiscount         },
              { name: "booking_required",   label: "Booking Required",    val: a.bookingRequired        },
              { name: "english_spoken",     label: "English Spoken",      val: a.englishSpoken          },
              { name: "air_conditioned",    label: "Air Conditioned",     val: a.airConditioned         },
              { name: "indoor",             label: "Indoor",              val: a.indoor                 },
              { name: "nanny_welcome",      label: "Nanny/Helper Welcome",val: a.nannyWelcome           },
              { name: "has_food",           label: "Has Food",            val: a.hasFood                },
              { name: "has_drinks",         label: "Has Drinks",          val: a.hasDrinks              },
              { name: "all_day_option",     label: "All-day Option",      val: a.allDayOption           },
              { name: "legally_registered", label: "Legally Registered",  val: a.legallyRegistered ?? true },
            ].map(({ name, label, val }) => (
              <label key={name} className="flex items-center gap-2 cursor-pointer text-slate-300 text-sm font-semibold">
                <input type="checkbox" name={name} defaultChecked={val ?? false} className={checkClass} />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Member Offer */}
        <div className="bg-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="font-black text-slate-300 text-xs uppercase tracking-widest mb-4">Member Discount Offer</h2>
          <div>
            <label className={labelClass}>What discount does this location offer members?</label>
            <input
              name="member_offer"
              defaultValue={a.memberOffer ?? ""}
              placeholder="e.g. 10% off any session, free water with every drop-off, free intro session"
              className={fieldClass}
            />
            <p className="text-slate-500 text-xs mt-1">Shown on the activity page and included in the listing email to the business.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-white font-black px-8 py-3 rounded-xl transition-colors shadow-lg">
            Save Changes
          </button>
          <Link href="/admin" className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-8 py-3 rounded-xl transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
