import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Samui Kids Fun Guide: Family Activities on Koh Samui",
    template: "%s | Samui Kids Fun Guide",
  },
  description:
    "Discover the best kid-friendly and family activities on Koh Samui, Thailand. From elephant sanctuaries and water parks to cooking classes and beach adventures.",
  keywords: [
    "family activities Koh Samui",
    "things to do with kids Koh Samui",
    "kid friendly Koh Samui",
    "Samui family guide",
    "children activities Koh Samui",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samuikids.com",
    siteName: "SamuiKids.com",
    title: "SamuiKids.com — Drop-off Supervised Kids Activities on Koh Samui",
    description: "The drop-off guide for supervised kid activities on Koh Samui, Thailand. Every listing is built for children.",
    images: [
      {
        url: "https://samuikids.com/images/samuikidsog.png",
        width: 1200,
        height: 630,
        alt: "SamuiKids.com — Drop-off Supervised Kids Activities on Koh Samui",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SamuiKids.com — Drop-off Supervised Kids Activities on Koh Samui",
    description: "The drop-off guide for supervised kid activities on Koh Samui, Thailand.",
    images: ["https://samuikids.com/images/samuikidsog.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <body className="font-[family-name:var(--font-nunito)] antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
