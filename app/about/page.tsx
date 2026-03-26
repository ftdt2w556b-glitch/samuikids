import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "About",
  description:
    "SamuiKids.com: the one-stop resource for parents to find kid-centric activities and facilities on Koh Samui, Thailand.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="relative w-48 h-48 mx-auto mb-4">
          <Image src="/images/samuikidslogo.png" alt="Samui Kids" fill className="object-contain" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">About SamuiKids.com</h1>
        <p className="text-xl text-cyan-900 max-w-2xl mx-auto font-semibold">
          Kid-centric adventures on Koh Samui. Where kids lead and parents find their freedom.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-3xl p-8 mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-4">Our Mission</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed text-base">
          <p>
            SamuiKids.com was created with one simple goal: to make it easy for parents to find
            kid-centric facilities and in turn, make family travel or life on the island easier,
            happier, and more balanced.
          </p>
          <p>
            We know parents want both quality time with their children and a chance to relax.
            That&apos;s why we highlight destinations and activities designed for kids that are
            supervised and fun, giving parents the choice to take a well-deserved break.
          </p>
        </div>
      </div>

      {/* Goal cards — custom PNG icons only */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {[
          {
            icon: "/images/samuikidsninja.png",
            title: "Kid-Friendly First",
            desc: "Each location is chosen for its safety, creativity, and ability to spark children's curiosity.",
          },
          {
            icon: "/images/samuikidselephant2.png",
            title: "Drop-Off Options",
            desc: "We flag activities that offer drop-off playtime so parents can take a guilt-free break.",
          },
          {
            icon: "/images/samuikidstemple.png",
            title: "Cultural Connection",
            desc: "Experiences that celebrate Thailand's rich culture, food, and traditions, made exciting for kids.",
          },
          {
            icon: "/images/elephantwithhat.png",
            title: "Peace of Mind",
            desc: "Professional supervision and age-appropriate activities ensure your children are safe, happy, and engaged.",
          },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-start gap-4">
            <div className="relative w-14 h-14 flex-shrink-0">
              <Image src={icon} alt={title} fill className="object-contain" sizes="56px" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 mb-2 text-base">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Why Families Love Us */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8 mb-10 text-white text-center">
        <h2 className="text-2xl font-black mb-3">Why Families Love Us</h2>
        <p className="text-white/90 leading-relaxed max-w-2xl mx-auto text-base">
          Parents trust SamuiKids.com because we understand what matters most: happy kids, relaxed
          parents, and meaningful family memories. We&apos;re not just listing places. You&apos;re
          joining a community built around fun, independence, and adventure.
        </p>
      </div>

      {/* Contact */}
      <div id="contact" className="bg-slate-800 rounded-3xl p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image src="/images/samuikidscat.png" alt="" fill className="object-contain" sizes="40px" />
          </div>
          <h2 className="text-2xl font-black">Get in Touch</h2>
        </div>
        <p className="text-slate-400 mb-6 text-base">
          Know a great activity we&apos;re missing? Want to list your business? We&apos;d love to hear from you.
        </p>

        <ContactForm />

        <p className="text-slate-500 text-sm mt-6">
          Based on Koh Samui, Surat Thani, Thailand
        </p>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <Link
          href="/activities"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black px-8 py-4 rounded-2xl hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg text-lg"
        >
          <span className="relative w-8 h-8 flex-shrink-0">
            <Image src="/images/samuikidssquirel.png" alt="" fill className="object-contain" />
          </span>
          Start Exploring
        </Link>
      </div>
    </div>
  );
}
