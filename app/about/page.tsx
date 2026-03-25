import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Samui Kids Fun Guide — the best resource for families exploring Koh Samui, Thailand.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🌴</div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">About Samui Kids Fun Guide</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-semibold">
          We help families discover the best adventures on Koh Samui — without the endless Googling.
        </p>
      </div>

      {/* Story */}
      <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-3xl p-8 mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-4">Our Story</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Koh Samui is one of Thailand&apos;s most beautiful islands — but finding genuinely great activities
            for kids and families can be surprisingly hard. Most guides are outdated, full of ads, or just not
            written for families.
          </p>
          <p>
            Samui Kids Fun Guide was built by families, for families. Every activity listed here has been
            selected for being genuinely welcoming to children, safe, and worth your time and money.
          </p>
          <p>
            From the elephant sanctuary at Namuang to the ninja gym in Chaweng, we cover the full range —
            free hikes, budget-friendly beach days, and premium experiences that create memories for life.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: "✅",
            title: "Curated & Verified",
            desc: "Every listing is hand-selected. We only include activities that are genuinely family-friendly.",
          },
          {
            icon: "🆓",
            title: "Always Free",
            desc: "No paywalls, no sign-up required. Just find activities and go explore.",
          },
          {
            icon: "🔄",
            title: "Regularly Updated",
            desc: "Koh Samui changes fast. We keep listings fresh with current prices and hours.",
          },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="font-black text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div id="contact" className="bg-slate-800 rounded-3xl p-8 text-white">
        <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
          <Mail size={22} className="text-cyan-400" /> Get in Touch
        </h2>
        <p className="text-slate-400 mb-6">
          Know a great activity we&apos;re missing? Want to list your business? We&apos;d love to hear from you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="mailto:hello@samuikids.com"
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition-colors"
          >
            <Mail size={18} className="text-cyan-400" />
            <div>
              <div className="font-black text-sm">Email Us</div>
              <div className="text-slate-400 text-xs">hello@samuikids.com</div>
            </div>
          </a>
          <a
            href="mailto:list@samuikids.com"
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition-colors"
          >
            <Heart size={18} className="text-orange-400" />
            <div>
              <div className="font-black text-sm">List Your Activity</div>
              <div className="text-slate-400 text-xs">list@samuikids.com</div>
            </div>
          </a>
        </div>
        <p className="text-slate-500 text-xs mt-6 flex items-center gap-1">
          <MapPin size={12} /> Based on Koh Samui, Surat Thani, Thailand
        </p>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <Link
          href="/activities"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black px-8 py-4 rounded-2xl hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg text-lg"
        >
          🌴 Start Exploring
        </Link>
      </div>
    </div>
  );
}
