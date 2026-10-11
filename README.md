# Subramanian M — Data Science & Machine Learning Portfolio

A production-grade, MNC-ready developer portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

Designed and engineered with strict focus on WCAG 2.2 AA accessibility, Core Web Vitals, and Server Component architecture.

---

## Technical Stack & Architecture

- **Framework**: Next.js 14 (App Router, Server Components)
- **Language**: TypeScript (`strict: true`)
- **Styling**: Tailwind CSS with custom neon/glassmorphic design tokens
- **Animations**: Framer Motion & HTML5 Canvas particle engine with reduced-motion support
- **Icons**: Lucide React, React Icons (`si`)
- **SEO & Accessibility**: Next.js `robots.ts`, `sitemap.ts`, OpenGraph metadata, ARIA landmarks, WCAG 2.2 AA compliant contrast

---

## Project Structure

```text
Portfolio/
├── public/                     # Resume, PDF certifications, SVG badges, images
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Fonts, OpenGraph metadata, skip link
│   │   ├── page.tsx            # Server Component assembling section hierarchy
│   │   ├── robots.ts           # Robots.txt generator
│   │   ├── sitemap.ts          # Sitemap.xml generator
│   │   └── globals.css         # Glassmorphism & custom utility classes
│   ├── components/             # Section components (Hero, Experience, Projects, Skills, About, etc.)
│   └── data/
│       └── portfolio.ts        # Authoritative single-source-of-truth portfolio data
├── next.config.js              # Strict remotePatterns image security
├── tsconfig.json               # Strict TypeScript configuration
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Quality & Verification

Run strict typechecking and production build verification:

```bash
# Run TypeScript type check (0 errors)
npx tsc --noEmit

# Run ESLint check
npm run lint

# Build production bundle
npm run build
```

---

## Deployment

Deploy seamlessly to [Vercel](https://vercel.com):

```bash
npx vercel
```

---

© 2026 Subramanian M. All Rights Reserved.
