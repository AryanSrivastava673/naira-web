# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
npm start        # Serve production build
```

## Architecture

Next.js 14 App Router landing page for Naira Menus (NFC-powered digital menus for Indian restaurants). Single-page marketing site with a Sanity-powered blog.

### Stack
- Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- Sanity CMS for blog content (client in `src/lib/sanity.ts`, types in `src/lib/types.ts`)
- Icons: Lucide React

### Page composition
`src/app/page.tsx` composes the landing page from section components in order:
Navbar → GlobalShredBackground → HeroShredder → PhoneNFCSection → Products → HowItWorks → Pricing → BlogSection → Footer

### Blog routes
- `/blog` — listing page (`src/app/blog/page.tsx`)
- `/blog/[slug]` — post detail (`src/app/blog/[slug]/page.tsx`)

Blog data is fetched server-side via GROQ queries in `src/lib/sanity.ts`. The Sanity document type is `post` with fields: headline, slug, headerImage, excerpt, author (reference), publishedAt, categories, body (Portable Text).

### Design tokens
Custom Tailwind color tokens are defined in `tailwind.config.ts` under the `naira-*` namespace (e.g., `naira-black`, `naira-gold`, `naira-text`). Two font families: `font-display` (Playfair) for headings, `font-sans` (Inter) for body.

### Environment variables
Required in `.env.local`:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
