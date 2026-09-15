import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://subramanian.dev"),
  title: `${profile.name} | Data Scientist`,
  description:
    "Portfolio of Subramanian M — a Data Scientist and UI/UX Designer crafting fast, accessible, and beautifully animated web experiences.",
  keywords: [
    "Subramanian M",
    "Data Scientist",
    "UI/UX Designer",
    "Next.js Developer",
    "React Developer Portfolio",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | Data Scientist & UI/UX Designer`,
    description:
      "Explore projects, skills, and experience from Subramanian M — Data Scientist & UI/UX Designer.",
    url: "https://subramanian.dev",
    siteName: profile.name,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Data Scientist & UI/UX Designer`,
    description: "Portfolio of Subramanian M — Data Scientist & UI/UX Designer.",
    images: ["/og-image.jpg"],
  },
  icons: { icon: "/favicon.ico" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-bg-primary text-ink-primary font-body antialiased selection:bg-brand-cyan/30">
        {children}
      </body>
    </html>
  );
}
