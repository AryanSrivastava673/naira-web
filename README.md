# Naira Menus — Landing Page

Marketing landing page for [Naira Menus](https://nairamenus.in) — NFC-powered digital menus, smart POS, and growth tools for Indian restaurants.

## Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS with custom design tokens
- **Animation**: Framer Motion
- **CMS**: Sanity v5 (blog section)
- **Icons**: Lucide React

## Key Features

- Scroll-driven paper menu shredder animation (hero section)
- Interactive NFC phone-tap demo with physics animation
- Blog section powered by Sanity CMS
- Fully responsive, mobile-first layout
- "Coming Soon" pricing with email waitlist

## Colour Palette

Based on [ColorHunt Palette](https://colorhunt.co/palette/f5efe6e8dfca6d94c5cbdceb) with a dark navy interpretation:

| Token | Hex | Role |
|---|---|---|
| `naira-black` | `#0C1118` | Primary background |
| `naira-surface` | `#121B28` | Alternate sections |
| `naira-gold` | `#6D94C5` | Primary accent (steel blue) |
| `naira-gold-light` | `#CBDCEB` | Secondary accent (powder blue) |
| `naira-text` | `#F0E9DE` | Headings & body text (warm cream) |
| `naira-warm` | `#F5EFE6` | Paper menu colours |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## Project Structure

```
src/
├── app/
│   ├── blog/          # Blog listing + post detail pages
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx       # Landing page (composes all sections)
├── components/
│   ├── HeroShredder.tsx        # Scroll-driven shredder animation
│   ├── GlobalShredBackground.tsx  # Falling paper strips overlay
│   ├── PhoneNFCSection.tsx     # NFC tap demo
│   ├── Products.tsx
│   ├── Pricing.tsx
│   ├── HowItWorks.tsx
│   ├── BlogSection.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
└── lib/
    ├── sanity.ts       # Sanity client + GROQ queries
    └── types.ts        # TypeScript interfaces
```

## Structured Data (JSON-LD)

The site includes schema.org structured data for SEO rich results, injected via `<script type="application/ld+json">`.

### Root Layout (`src/app/layout.tsx`)

Applied site-wide on every page:

| Schema | Purpose |
|---|---|
| `Organization` | Company name, URL, logo, description. Linked via `@id` so other schemas can reference it. |
| `WebSite` | Site identity and publisher reference back to the Organization. |

### Blog Post (`src/app/blog/[slug]/page.tsx`)

Generated dynamically from Sanity post data:

| Schema | Purpose |
|---|---|
| `Article` | Headline, author, publisher, publish date, featured image, excerpt. Enables article rich results. |
| `FAQPage` | Conditionally included when a post has FAQs. Each Q&A is a `Question` + `AcceptedAnswer` pair. Enables FAQ rich results in Google. |

### Blog Listing (`src/app/blog/page.tsx`)

| Schema | Purpose |
|---|---|
| `CollectionPage` | Page metadata with an `ItemList` of all posts (position, URL, name). Helps search engines understand the blog index structure. |

### Validation

Use [Google's Rich Results Test](https://search.google.com/test/rich-results) or the [Schema Markup Validator](https://validator.schema.org/) to verify after deploying.

## Products

| Product | Description |
|---|---|
| **Naira Billing** | Smart POS built for Indian restaurants |
| **Naira Tap** | NFC + QR digital menus with table ordering |
| **Naira Growth** | Online presence and reputation management |
