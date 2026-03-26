import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { readdirSync } from "fs";
import { join } from "path";
import { getActivityBySlug } from "@/lib/activities";
import { updateActivity } from "../../actions";

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
          <p className="text-slate-500 text-xs mb-4">
            Click a thumbnail to select it. Add new images by dropping a .png into /public/images/ and redeploying.
          </p>

          {/* Current image preview */}
          {currentImage && (
            <div className="flex items-center gap-3 mb-4 bg-slate-700/50 rounded-xl p-3">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-600">
                <Image src={currentImage} alt="Current" fill className="object-contain p-1" sizes="64px" />
              </div>
              <div>
                <p className="text-slate-300 text-xs font-bold uppercase tracking-wide mb-0.5">Current image</p>
                <p className="text-slate-400 text-xs font-mono">{currentImage.replace("/images/", "")}</p>
              </div>
            </div>
          )}

          {/* Scrollable grid of all available images */}
          <div className="overflow-y-auto max-h-72 rounded-xl border border-slate-700 p-3 bg-slate-900/40">
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {imageFiles.map((src) => {
                const isSelected = src === currentImage;
                return (
                  <label
                    key={src}
                    title={src.replace("/images/", "")}
                    className={`relative cursor-pointer rounded-lg overflow-hidden aspect-square border-2 transition-all hover:scale-105 ${
                      isSelected
                        ? "border-cyan-400 ring-2 ring-cyan-400/50"
                        : "border-slate-600 hover:border-slate-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="primary_image"
                      value={src}
                      defaultChecked={isSelected}
                      className="sr-only"
                    />
                    <Image
                      src={src}
                      alt={src.replace("/images/", "")}
                      fill
                      className="object-contain p-1 bg-slate-700"
                      sizes="80px"
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-2">{imageFiles.length} images available</p>
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
