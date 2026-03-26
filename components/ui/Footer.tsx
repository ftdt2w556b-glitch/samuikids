import Link from "next/link";
import { MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-black text-lg">
              S
            </div>
            <div>
              <span className="block font-black text-cyan-400">Samui Kids</span>
              <span className="block text-[10px] font-bold text-orange-400 uppercase tracking-wide">Drop-off Guide</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            The drop-off guide for supervised kid activities on Koh Samui, Thailand.
          </p>
          <div className="flex gap-3 mt-4">
            <Link href="/about#contact" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-sm font-bold">
              <Mail size={16} /> Contact
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-black text-white mb-3 uppercase tracking-wide text-sm">Explore</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <Link href="/activities" className="hover:text-cyan-400 transition-colors">
                All Activities
              </Link>
            </li>
            <li>
              <Link href="/activities?category=water-beaches" className="hover:text-cyan-400 transition-colors">
                Water &amp; Beaches
              </Link>
            </li>
            <li>
              <Link href="/activities?category=nature-animals" className="hover:text-cyan-400 transition-colors">
                Nature &amp; Animals
              </Link>
            </li>
            <li>
              <Link href="/activities?category=adventure-sports" className="hover:text-cyan-400 transition-colors">
                Adventure &amp; Sports
              </Link>
            </li>
            <li>
              <Link href="/tours" className="hover:text-cyan-400 transition-colors">
                Day Tours
              </Link>
            </li>
            <li>
              <Link href="/map" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                <MapPin size={12} /> Map View
              </Link>
            </li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="font-black text-white mb-3 uppercase tracking-wide text-sm">Info</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <Link href="/about" className="hover:text-cyan-400 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/about#contact" className="hover:text-cyan-400 transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/about#contact" className="hover:text-cyan-400 transition-colors">
                List Your Activity
              </Link>
            </li>
            <li>
              <Link href="/join" className="hover:text-cyan-400 transition-colors">
                Member Badge
              </Link>
            </li>
          </ul>
          <p className="text-slate-500 text-xs mt-6">
            © {new Date().getFullYear()} SamuiKids.com · Koh Samui, Thailand
          </p>
        </div>
      </div>
    </footer>
  );
}
