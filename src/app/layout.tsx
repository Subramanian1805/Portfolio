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
  metadataBase: new URL("https://subramanian-portfolio.vercel.app"),
  title: `${profile.name} | Data Scientist & ML Engineer`,
  description:
    "Portfolio of Subramanian M — Data Scientist, Machine Learning & NLP Engineer. Specialized in dataset engineering, model evaluation, and building scalable intelligent AI applications.",
  keywords: [
    "Subramanian M",
    "Data Scientist",
    "Machine Learning Engineer",
    "NLP Engineer",
    "Python Developer",
    "React Developer Portfolio",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | Data Scientist & Machine Learning Engineer`,
    description:
      "Explore ML flagships, interactive skills galaxy, and experience of Subramanian M.",
    url: "https://subramanian-portfolio.vercel.app",
    siteName: profile.name,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Data Scientist & ML Engineer`,
    description: "Portfolio of Subramanian M — Data Scientist & Machine Learning Engineer.",
    images: ["/og-image.jpg"],
  },
  icons: { icon: "/favicon.ico" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-bg-primary text-ink-primary font-body antialiased selection:bg-brand-cyan/30">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-brand-cyan text-black font-bold rounded-lg shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
