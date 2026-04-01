import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import InstallPrompt from "@/components/InstallPrompt";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "SamuiKids.com — Kids Activities on Koh Samui",
    template: "%s | SamuiKids.com",
  },
  description:
    "The drop-off guide for supervised kids activities on Koh Samui, Thailand. Every listing is built for children, fully supervised, and offers member discounts.",
  keywords: [
    "kids activities Koh Samui",
    "drop-off supervised kids Koh Samui",
    "things to do with kids Koh Samui",
    "family activities Koh Samui",
    "children activities Samui Thailand",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samuikids.com",
    siteName: "SamuiKids.com",
    title: "SamuiKids.com — Kids Activities on Koh Samui",
    description: "The drop-off guide for supervised kids activities on Koh Samui, Thailand. Every listing is built for children, fully supervised, and offers member discounts.",
    images: [
      {
        url: "https://samuikids.com/images/samuikidsog.jpg",
        width: 1200,
        height: 630,
        alt: "SamuiKids.com — Drop-off Supervised Kids Activities on Koh Samui",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SamuiKids.com — Kids Activities on Koh Samui",
    description: "The drop-off guide for supervised kids activities on Koh Samui, Thailand. Every listing is built for children, fully supervised, and offers member discounts.",
    images: ["https://samuikids.com/images/samuikidsog.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon.png",
    apple: "/icons/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SamuiKids",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#06b6d4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <body className="font-[family-name:var(--font-nunito)] antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <InstallPrompt />
      </body>
    </html>
  );
}
