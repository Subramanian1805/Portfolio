# Subramanian M — Portfolio

A premium, dark, glassmorphic developer portfolio built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Stack

- Next.js 15 + React 18 + TypeScript
- Tailwind CSS (custom design tokens for the dark/neon palette)
- Framer Motion (scroll reveals, page-load sequence, micro-interactions)
- Lucide React (icons)
- Canvas-based particle + cursor-glow background

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/
    layout.tsx       # fonts, SEO metadata, root shell
    page.tsx          # assembles all sections
    globals.css       # glassmorphism + neon utility classes
  components/          # one component per section (Hero, About, Projects, ...)
  data/
    portfolio.ts       # ALL content lives here — edit this file to update copy
  lib/
    utils.ts           # `cn()` class merge helper
```

## Editing content

Everything visible on the page — name, roles, projects, skills, achievements,
products, badges, experience, certifications, education, blog posts, and
contact info — is sourced from **`src/data/portfolio.ts`**. Update that file
and every section re-renders automatically; you shouldn't need to touch the
component files for routine content edits.

## Swapping in real assets

- Replace the Unsplash URLs in `portfolio.ts` (profile photo, project images,
  blog images) with your own hosted images, or drop files into `/public` and
  reference them as `/your-file.jpg`.
- Add a real `resume.pdf` to `/public` (the hero's "View Resume" button
  points at `/resume.pdf`).
- Wire the contact form in `src/components/Contact.tsx` to a real endpoint
  (e.g. Formspree, Resend, or an API route) — it currently simulates a send.
- The GitHub stats in `GithubStats.tsx` are static sample numbers; swap in a
  live GitHub API call if you want real-time data.

## Notes

- A literal Three.js WebGL scene was intentionally left out of this pass in
  favor of a lightweight, dependency-light canvas particle system + ambient
  cursor glow, which gives the same depth without the bundle-size and
  performance cost. `three`, `@react-three/fiber`, and `@react-three/drei`
  are already included in `package.json` if you want to add a 3D hero scene
  later.
- `prefers-reduced-motion` is respected globally.
- Build was verified locally with `next build` — production build is clean.

## Deploying

Works out of the box on Vercel:

```bash
npm i -g vercel
vercel
```
