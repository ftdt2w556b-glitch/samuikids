import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMemberByToken } from "@/lib/members";

export const metadata: Metadata = {
  title: "Member Badge",
  description:
    "Show this screen at any SamuiKids.com partner location to receive your member discount.",
};

export default async function BadgePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("member_session")?.value;

  if (!token) redirect("/join");

  const member = await getMemberByToken(token);
  if (!member) redirect("/join");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 flex flex-col items-center justify-center px-4 py-8">

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header — dark so yellow logo pops */}
        <div className="bg-slate-900 px-6 pt-6 pb-4 text-center">
          <div className="relative w-36 h-36 mx-auto mb-2 drop-shadow-xl">
            <Image
              src="/images/samuikidsshirtyellow.png"
              alt="SamuiKids.com Member Badge"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="text-yellow-400 font-black text-xl tracking-wide">SamuiKids.com</div>
          <div className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-0.5">
            Drop-off Member
          </div>
        </div>

        {/* Member name */}
        <div className="px-6 py-5 text-center border-b border-gray-100 bg-gray-50">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">Member</p>
          <p className="text-gray-900 font-black text-xl">{member.name}</p>
          <p className="text-gray-500 text-sm mt-0.5">{member.email}</p>
        </div>

        {/* Discount message */}
        <div className="px-6 py-5 text-center border-b border-gray-100">
          <p className="text-gray-900 font-black text-base leading-snug mb-2">
            Show this screen to receive your member discount
          </p>
          <p className="text-cyan-700 font-bold text-sm leading-snug">
            แสดงหน้าจอนี้เพื่อรับส่วนลดสำหรับสมาชิก
          </p>
        </div>

        {/* For businesses */}
        <div className="bg-orange-50 px-6 py-4 text-center border-b border-orange-100">
          <p className="text-orange-700 font-black text-xs uppercase tracking-wide mb-1">
            For Businesses
          </p>
          <p className="text-orange-600 font-semibold text-sm leading-relaxed">
            This member is registered at SamuiKids.com. Please honour the agreed member discount.
          </p>
          <p className="text-orange-400 font-semibold text-xs mt-1">
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
            <Image
              src="/images/samuikidssquirel.png"
              alt=""
              fill
              className="object-contain"
              sizes="32px"
            />
          </div>
        </div>
      </div>

      {/* Sticker note */}
      <div className="mt-6 text-center text-white/60 text-sm font-semibold max-w-xs">
        No sticker yet? No problem. This screen is your badge.
      </div>

      <Link
        href="/"
        className="mt-5 text-white/70 font-black text-sm hover:text-white transition-colors underline underline-offset-2"
      >
        Back to SamuiKids.com
      </Link>
    </div>
  );
}
