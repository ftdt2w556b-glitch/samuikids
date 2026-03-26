import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Member Badge",
  description: "Show this screen at any SamuiKids.com partner location to receive your member discount.",
};

export default function BadgePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-500 via-cyan-400 to-cyan-300 flex flex-col items-center justify-center px-4 py-8">

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Top gradient band */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 pt-5 pb-3 text-center">
          <div className="relative w-40 h-40 mx-auto mb-1 drop-shadow-xl">
            <Image
              src="/images/samuikidslogo.png"
              alt="SamuiKids.com Member Badge"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="text-white font-black text-xl tracking-wide">SamuiKids.com</div>
          <div className="text-cyan-100 font-bold text-sm uppercase tracking-widest mt-0.5">Drop-off Member</div>
        </div>

        {/* Discount message */}
        <div className="px-6 py-6 text-center border-b border-gray-100">
          <p className="text-gray-900 font-black text-lg leading-snug mb-2">
            Show this screen to receive your member discount
          </p>
          {/* Thai translation */}
          <p className="text-cyan-700 font-bold text-base leading-snug">
            แสดงหน้าจอนี้เพื่อรับส่วนลดสำหรับสมาชิก
          </p>
        </div>

        {/* For businesses */}
        <div className="bg-orange-50 px-6 py-4 text-center border-b border-orange-100">
          <p className="text-orange-700 font-black text-xs uppercase tracking-wide mb-1">For Businesses</p>
          <p className="text-orange-600 font-semibold text-sm leading-relaxed">
            This member has registered at SamuiKids.com. Please honour the agreed discount.
          </p>
          <p className="text-orange-500 font-semibold text-xs mt-1">
            สมาชิกจาก SamuiKids.com กรุณาให้ส่วนลดตามที่ตกลงไว้
          </p>
        </div>

        {/* Valid indicator */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-600 font-black text-sm">Active Member</span>
          </div>
          <div className="relative w-8 h-8">
            <Image src="/images/samuikidssquirel.png" alt="" fill className="object-contain" sizes="32px" />
          </div>
        </div>
      </div>

      {/* Sticker note */}
      <div className="mt-6 text-center text-white/80 text-sm font-semibold max-w-xs">
        No sticker yet? No problem. This screen is your badge. Show it at any listed location.
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="mt-6 text-white font-black text-sm underline underline-offset-2 hover:text-cyan-100 transition-colors"
      >
        Back to SamuiKids.com
      </Link>
    </div>
  );
}
