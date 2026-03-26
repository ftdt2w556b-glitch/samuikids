import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "About",
  description:
    "SamuiKids.com: the drop-off guide for kid-focused supervised activities on Koh Samui, Thailand. Every location is built for children.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto mb-6">
          <Image src="/images/samuikidslogo.png" alt="Samui Kids Drop-off Guide" fill className="object-contain" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">About SamuiKids.com</h1>
        <p className="text-xl text-cyan-900 max-w-2xl mx-auto font-semibold">
          The only guide on Koh Samui built around one idea: kids who are happy and supervised, and parents who are free.
        </p>
      </div>

      {/* Three Pillars */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">What Makes Us Different</h2>
        <p className="text-gray-500 text-center mb-8">Every location on SamuiKids.com meets all three of these standards. No exceptions.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "/images/samuikidselephant2.png",
              title: "Drop-off Approved",
              color: "from-emerald-50 to-green-50",
              border: "border-emerald-200",
              label: "bg-emerald-500",
              desc: "Drop-off means you can literally leave. Not sit nearby. Not hover. Leave. Every location we list has trained staff who take over so parents can go recharge, explore, or just breathe. No guilt. No obligation to stay.",
            },
            {
              icon: "/images/samuikidsninja.png",
              title: "Fully Supervised",
              color: "from-cyan-50 to-sky-50",
              border: "border-cyan-200",
              label: "bg-cyan-500",
              desc: "Supervised does not mean a staff member is somewhere in the building. It means qualified people are actively engaged with every child, every session. Hands-on. Present. Responsible. That is the standard we hold every listing to.",
            },
            {
              icon: "/images/samuikidstemple.png",
              title: "Built for Kids",
              color: "from-orange-50 to-amber-50",
              border: "border-orange-200",
              label: "bg-orange-500",
              desc: "Kid-focused means the entire business was designed around children as the main customer. Not a cafe with a kids menu. Not a beach club with a shallow end. Think: a gym built around obstacle courses and ninja training. A cafe that exists because of LEGO. A studio where every class, space and staff member exists for the kids.",
            },
          ].map(({ icon, title, color, border, label, desc }) => (
            <div key={title} className={`bg-gradient-to-br ${color} border ${border} rounded-3xl p-6`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <Image src={icon} alt={title} fill className="object-contain" sizes="64px" />
              </div>
              <div className={`${label} text-white text-xs font-black px-3 py-1 rounded-full inline-block mb-3`}>{title}</div>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Membership Badge */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8 mb-10 text-white">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-40 h-40 flex-shrink-0">
            <Image src="/images/samuikidslogo.png" alt="SamuiKids.com Member Badge" fill className="object-contain drop-shadow-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-black mb-3">The SamuiKids.com Badge</h2>
            <p className="text-white/90 leading-relaxed mb-4 text-base">
              The logo you see above is your badge. Every business listed on SamuiKids.com has agreed to offer exclusive discounts to our members. Show your digital membership badge, wear the SamuiKids.com shirt, or flash your member card and the discount is yours.
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              We personally visit and verify every location before it goes live. If a business stops meeting our three standards, it comes off the list. Simple.
            </p>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-3xl p-8 mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-4">Our Mission</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed text-base">
          <p>
            SamuiKids.com was built with one simple goal: make it easy for parents to find kid-centric facilities that actually let them take a break. Whether you are a tourist spending two weeks on the island or a family living here full time, finding places that are genuinely designed for children is harder than it should be.
          </p>
          <p>
            We do not want to be another general Samui travel guide. There are plenty of those. We want to be the one place parents trust when they need to know their kids are in good hands so they can enjoy themselves too.
          </p>
        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="bg-slate-800 rounded-3xl p-8 text-white mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image src="/images/samuikidscat.png" alt="" fill className="object-contain" sizes="40px" />
          </div>
          <h2 className="text-2xl font-black">Get in Touch</h2>
        </div>
        <p className="text-slate-400 mb-6 text-base">
          Know a great drop-off location we are missing? Want to list your business? We would love to hear from you.
        </p>
        <ContactForm />
        <p className="text-slate-500 text-sm mt-6">
          Based on Koh Samui, Surat Thani, Thailand
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/activities"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black px-8 py-4 rounded-2xl hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg text-lg"
        >
          <span className="relative w-8 h-8 flex-shrink-0">
            <Image src="/images/samuikidssquirel.png" alt="" fill className="object-contain" />
          </span>
          Find Drop-off Activities
        </Link>
      </div>
    </div>
  );
}
