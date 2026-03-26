"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
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
        <p className="text-slate-400 mb-6">
          Thanks for reaching out. We&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-cyan-400 font-bold hover:underline text-sm"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-300 text-xs font-bold uppercase tracking-wide mb-1.5">
            Your Name <span className="text-orange-400">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith"
            className="w-full bg-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-400 border border-white/10 focus:border-cyan-400 transition"
          />
        </div>
        <div>
          <label className="block text-slate-300 text-xs font-bold uppercase tracking-wide mb-1.5">
            Email Address <span className="text-orange-400">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-400 border border-white/10 focus:border-cyan-400 transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-slate-300 text-xs font-bold uppercase tracking-wide mb-1.5">
          Subject
        </label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-white/10 text-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-400 border border-white/10 focus:border-cyan-400 transition"
        >
          <option value="" className="bg-slate-800">Select a subject…</option>
          <option value="Suggest an Activity" className="bg-slate-800">Suggest an Activity</option>
          <option value="List My Business" className="bg-slate-800">List My Business</option>
          <option value="Update a Listing" className="bg-slate-800">Update a Listing</option>
          <option value="General Question" className="bg-slate-800">General Question</option>
          <option value="Other" className="bg-slate-800">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-slate-300 text-xs font-bold uppercase tracking-wide mb-1.5">
          Message <span className="text-orange-400">*</span>
        </label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about the activity, your question, or how we can help…"
          rows={5}
          className="w-full bg-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-400 border border-white/10 focus:border-cyan-400 transition resize-none"
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
        className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 text-white font-black py-3.5 rounded-xl transition-colors shadow-lg"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send size={18} /> Send Message
          </>
        )}
      </button>
    </form>
  );
}
