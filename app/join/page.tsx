import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import JoinForm from "./JoinForm";

export const metadata: Metadata = {
  title: "Become a Member",
  description:
    "Join SamuiKids.com free and unlock member discounts at every listed location on Koh Samui.",
};

export default async function JoinPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("member_session")) redirect("/badge");

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-500 via-cyan-400 to-cyan-300 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-6 text-center">
          <div className="relative w-28 h-28 mx-auto mb-3 drop-shadow-xl">
            <Image
              src="/images/samuikidsshirtyellow.png"
              alt="SamuiKids.com"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-yellow-400 font-black text-2xl">Join SamuiKids.com</h1>
          <p className="text-slate-400 text-sm mt-1">Free membership. Instant discounts.</p>
        </div>

        {/* Benefits */}
        <div className="bg-cyan-50 px-6 py-4 border-b border-cyan-100">
          <ul className="space-y-1.5">
            {[
              "Member discounts at every listed location",
              "Digital badge — show on your phone",
              "First access to new listings and tours",
            ].map((b) => (
              <li key={b} className="flex items-center gap-2 text-cyan-800 text-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <div className="px-8 py-8">
          <JoinForm />
        </div>
      </div>

      {/* Drop-off rule notice */}
      <div className="mt-6 bg-slate-900/80 backdrop-blur-sm rounded-2xl px-5 py-4 max-w-sm text-center">
        <p className="text-orange-400 font-black text-xs uppercase tracking-wide mb-1">Drop-off Policy</p>
        <p className="text-slate-300 text-xs leading-relaxed">
          Children must be toilet-trained and able to use the restroom independently to be left without a parent or guardian at any drop-off supervised activity.
        </p>
      </div>

      <Link
        href="/"
        className="mt-5 text-white/70 font-bold text-sm hover:text-white transition-colors"
      >
        Back to SamuiKids.com
      </Link>
    </div>
  );
}
