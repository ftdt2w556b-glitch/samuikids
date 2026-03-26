"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full bg-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-400 border border-white/10 focus:border-cyan-400 transition";
const labelClass = "block text-slate-300 text-xs font-bold uppercase tracking-wide mb-1.5";

export default function ContactForm() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [subject, setSubject]   = useState("");
  const [message, setMessage]   = useState("");
  const [status, setStatus]     = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Business listing fields
  const [bizName, setBizName]         = useState("");
  const [bizArea, setBizArea]         = useState("");
  const [bizWebsite, setBizWebsite]   = useState("");
  const [bizAgeRange, setBizAgeRange] = useState("");
  const [bizEnglish, setBizEnglish]   = useState(false);
  const [bizPrivate, setBizPrivate]   = useState(false);
  const [bizGroup, setBizGroup]       = useState(false);
  const [bizBoth, setBizBoth]         = useState(false);
  const [bizHourly, setBizHourly]     = useState(false);
  const [bizHalfDay, setBizHalfDay]   = useState(false);
  const [bizFullDay, setBizFullDay]   = useState(false);
  const [bizFood, setBizFood]         = useState(false);
  const [bizDrinks, setBizDrinks]     = useState(false);
  const [bizDropOff, setBizDropOff]   = useState(false);
  const [bizLegal, setBizLegal]       = useState(false);
  const [bizOffer, setBizOffer]       = useState("");

  const isListing    = subject === "List My Business";
  const isEmployment = subject === "Work at a Listed Location";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const bizDetails = isListing ? {
      businessName: bizName,
      area: bizArea,
      website: bizWebsite,
      ageRange: bizAgeRange,
      englishSpoken: bizEnglish,
      sessionTypes: [bizPrivate && "Private", bizGroup && "Group", bizBoth && "Both"].filter(Boolean).join(", "),
      sessionLengths: [bizHourly && "Hourly", bizHalfDay && "Half-day", bizFullDay && "Full day"].filter(Boolean).join(", "),
      hasFood: bizFood,
      hasDrinks: bizDrinks,
      dropOff: bizDropOff,
      legallyRegistered: bizLegal,
      memberOffer: bizOffer,
    } : null;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, bizDetails }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle size={52} className="text-green-400 mb-4" />
        <h3 className="text-xl font-black text-white mb-2">Message Sent!</h3>
        <p className="text-slate-400 mb-6">Thanks for reaching out. We will get back to you soon.</p>
        <button onClick={() => setStatus("idle")} className="text-cyan-400 font-bold hover:underline text-sm">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Your Name <span className="text-orange-400">*</span></label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email <span className="text-orange-400">*</span></label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Subject</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)} className={inputClass}>
          <option value="" className="bg-slate-800">Select a subject…</option>
          <option value="List My Business" className="bg-slate-800">List My Business</option>
          <option value="Work at a Listed Location" className="bg-slate-800">Work at a Listed Location</option>
          <option value="Suggest an Activity" className="bg-slate-800">Suggest an Activity</option>
          <option value="Update a Listing" className="bg-slate-800">Update a Listing</option>
          <option value="General Question" className="bg-slate-800">General Question</option>
          <option value="Other" className="bg-slate-800">Other</option>
        </select>
      </div>

      {isListing && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
          <p className="text-cyan-300 font-black text-sm uppercase tracking-wide">Business Details</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Business Name <span className="text-orange-400">*</span></label>
              <input type="text" required={isListing} value={bizName} onChange={(e) => setBizName(e.target.value)} placeholder="e.g. NinjaGym Samui" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Area in Samui</label>
              <select value={bizArea} onChange={(e) => setBizArea(e.target.value)} className={inputClass}>
                <option value="" className="bg-slate-800">Select area…</option>
                {["Chaweng","Lamai","Bophut","Maenam","Choeng Mon","Bangrak","Nathon","Other"].map(a => (
                  <option key={a} value={a} className="bg-slate-800">{a}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Website or Social</label>
              <input type="text" value={bizWebsite} onChange={(e) => setBizWebsite(e.target.value)} placeholder="https://…" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Age Range Served</label>
              <input type="text" value={bizAgeRange} onChange={(e) => setBizAgeRange(e.target.value)} placeholder="e.g. 3–12 years" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className={labelClass}>Session Types</p>
              <div className="space-y-2">
                {[
                  { label: "Private (1-on-1)", val: bizPrivate, set: setBizPrivate },
                  { label: "Group (mixed kids)", val: bizGroup, set: setBizGroup },
                  { label: "Both", val: bizBoth, set: setBizBoth },
                ].map(({ label, val, set }) => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer text-slate-300 text-sm font-semibold">
                    <input type="checkbox" checked={val} onChange={(e) => set(e.target.checked)} className="w-4 h-4 rounded accent-cyan-400" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className={labelClass}>Session Lengths</p>
              <div className="space-y-2">
                {[
                  { label: "Hourly", val: bizHourly, set: setBizHourly },
                  { label: "Half-day", val: bizHalfDay, set: setBizHalfDay },
                  { label: "Full day", val: bizFullDay, set: setBizFullDay },
                ].map(({ label, val, set }) => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer text-slate-300 text-sm font-semibold">
                    <input type="checkbox" checked={val} onChange={(e) => set(e.target.checked)} className="w-4 h-4 rounded accent-cyan-400" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className={labelClass}>Offerings</p>
              <div className="space-y-2">
                {[
                  { label: "English spoken", val: bizEnglish, set: setBizEnglish },
                  { label: "Food available", val: bizFood, set: setBizFood },
                  { label: "Drinks available", val: bizDrinks, set: setBizDrinks },
                  { label: "Drop-off option", val: bizDropOff, set: setBizDropOff },
                ].map(({ label, val, set }) => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer text-slate-300 text-sm font-semibold">
                    <input type="checkbox" checked={val} onChange={(e) => set(e.target.checked)} className="w-4 h-4 rounded accent-cyan-400" />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 space-y-2">
            <p className="text-cyan-300 font-black text-xs uppercase tracking-wide">Member Offer <span className="text-orange-400">*</span></p>
            <p className="text-slate-400 text-xs leading-relaxed">
              All SamuiKids.com listings provide a free offer to members. This could be a free water with every session, 10% off any purchase, a free intro class, or similar. What will your offer be?
            </p>
            <input
              type="text"
              required={isListing}
              value={bizOffer}
              onChange={(e) => setBizOffer(e.target.value)}
              placeholder="e.g. Free water with every drop-off session"
              className={inputClass}
            />
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required={isListing} checked={bizLegal} onChange={(e) => setBizLegal(e.target.checked)} className="w-4 h-4 rounded accent-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-white font-black text-sm">My business is legally registered in Thailand <span className="text-orange-400">*</span></span>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">Required for all listings. We verify registration before any business goes live on SamuiKids.com.</p>
              </div>
            </label>
          </div>
        </div>
      )}

      {isEmployment && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
          <p className="text-cyan-300 font-black text-sm uppercase tracking-wide">Employment Details</p>
          <p className="text-slate-400 text-xs leading-relaxed">
            We pass employment enquiries directly to our listed businesses. Tell us what kind of role you are looking for and we will forward your details to relevant locations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Role / Skills</label>
              <input type="text" placeholder="e.g. Kids activity instructor, swim coach…" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Preferred Area</label>
              <select className={inputClass}>
                <option value="" className="bg-slate-800">Any area</option>
                {["Chaweng","Lamai","Bophut","Maenam","Choeng Mon","Bangrak","Nathon"].map(a => (
                  <option key={a} value={a} className="bg-slate-800">{a}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div>
        <label className={labelClass}>Message <span className="text-orange-400">*</span></label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isListing    ? "Tell us what makes your business special for kids…" :
            isEmployment ? "Tell us about your experience working with children, languages spoken, and availability…" :
            "Tell us how we can help…"
          }
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 text-white font-black py-3.5 rounded-xl transition-colors shadow-lg text-base"
      >
        {status === "loading" ? (
          <><Loader2 size={18} className="animate-spin" /> Sending…</>
        ) : (
          isListing ? "Submit My Business" : "Send Message"
        )}
      </button>
    </form>
  );
}
