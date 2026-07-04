import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CosmicBackground from "@/components/CosmicBackground";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const devanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "VishalAstro | Premium Luxury Vedic Astrology",
    template: "%s | VishalAstro",
  },
  description: "Transform your destiny through ancient Vedic Astrology. Experience premium consulting for career, marriage, health, and Kundli reading.",
  keywords: ["Vedic Astrology", "Horoscope", "Kundli Reading", "Match Making", "Sade Sati", "Gemstone Recommendations"],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} ${devanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background-cosmic text-white font-sans">
        <CosmicBackground />
        <Navbar />
        <main className="flex-grow flex flex-col pt-[80px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
