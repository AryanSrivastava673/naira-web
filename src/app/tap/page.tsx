import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BlogSection from '@/components/BlogSection'
import TapHero from '@/components/tap/TapHero'
import TapStats from '@/components/tap/TapStats'
import TapMoment from '@/components/tap/TapMoment'
import TapFeatures from '@/components/tap/TapFeatures'
import TapUpsells from '@/components/tap/TapUpsells'
import TapWhyTap from '@/components/tap/TapWhyTap'
import TapMenuManagement from '@/components/tap/TapMenuManagement'
import TapHardware from '@/components/tap/TapHardware'
import TapPricing from '@/components/tap/TapPricing'
import TapVsQR from '@/components/tap/TapVsQR'
import TapHowItWorksCTA from '@/components/tap/TapHowItWorksCTA'
import TapFAQ from '@/components/tap/TapFAQ'
import TapViewDemoTab from '@/components/tap/TapViewDemoTab'

export const metadata: Metadata = {
  alternates: { canonical: 'https://nairamenus.in/tap' },
  title: 'Naira Tap — NFC Menus for Restaurants | The Tap is the New Scan',
  description:
    "India's only 100% paperless NFC menu platform. Guests tap. Menu opens instantly. Custom coasters, real-time updates, smart upsells. Design your Tap free.",
  keywords:
    'nfc tap for restaurants, nfc menus, contactless dining technology, contactless dining solutions, contactless menu, contactless digital menus, contactless ordering restaurants, interactive menus, restaurant menu management, restaurant new technology',
  openGraph: {
    title: 'Naira Tap — NFC Menus for Restaurants',
    description: "India's only 100% paperless NFC menu platform.",
    type: 'website',
    url: 'https://nairamenus.in/tap',
    images: [{ url: '/tap/tap-hero.jpg', width: 1200, height: 630 }],
  },
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Naira Tap',
  description:
    'NFC-powered contactless digital menu for Indian restaurants. Tap-to-open menus, real-time updates, custom branded coasters. The only 100% paperless menu platform in India.',
  brand: { '@type': 'Brand', name: 'Naira Menus' },
  category: 'Contactless Dining Technology',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do all smartphones support NFC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Nearly all modern smartphones in India, both Android and iPhone, support NFC. For the tiny minority that don't, every Naira Tap coaster also has a small QR code printed on the underside as a fallback. Nobody gets locked out.",
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if our wifi goes down at service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your Naira Tap menu is cached on the device from the last tap, so guests still see your contactless digital menu with images even with bad signal. Only updates sync when wifi is back.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does my guest "tap" exactly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'They bring the top of their phone within about 1cm of the coaster. A notification pops up. They tap it. Menu opens. The whole thing takes about a second. No app install. No sign-up.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to get set up?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Typically about a week. Day 1 to 2: design approval and coaster mockup. Day 3 to 5: menu build and photo shoot. Day 6 to 7: delivery and table placement. You're live.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I update my menu myself or do I need your team?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You update it yourself from your phone or laptop. Change prices, add dishes, hide sold-out items, create an event banner. Changes are live in seconds across every coaster.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does it cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A one-time cost for the custom coasters plus a flat monthly subscription for the software, hosting, and support. For most single-outlet restaurants, the subscription is offset in year one by savings on reprints alone.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if a coaster gets damaged or stolen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Replacement coasters ship within 48 hours, and most restaurants keep a small backup stock. A stolen coaster is useless outside your restaurant — its only role is to open your menu.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I integrate Naira Tap with my POS system?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. We currently integrate with the major POS platforms used in Indian hospitality (Petpooja, Posist, and a growing list). Not on one of those? Tell us and we'll scope it.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does Naira Tap help improve service in my restaurant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Guests access a rich, photo-driven menu the moment they sit down. No waiting for a server to bring a worn-out booklet. Your staff spend less time answering \"what's good here?\" and more time delivering food.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Naira Tap a touchless menu? How is it different from a QR code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Naira Tap is a fully touchless menu. Unlike a QR code that requires your guest to open a camera app, aim, and wait, Naira Tap opens the menu with a simple phone tap. NFC removes all the friction of a touchless menu QR code.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the latest restaurant technology trends in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The biggest restaurant technology trends in India right now are NFC-powered contactless dining, smart menu upselling, and real-time menu management. Naira Tap sits at the intersection of all three.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes Naira Tap one of the best tools for creating interactive restaurant menus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Naira Tap gives you a live, photo-rich, interactive menu with smart pairings, allergen filters, multi-language support, and real-time updates — all accessible with a single tap. No app, no download, no friction.',
      },
    },
  ],
}

export default function TapPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />
      <TapViewDemoTab />

      {/* 1 — Hero + Interactive Tool */}
      <TapHero />

      {/*
        TICKER — commented out until real restaurant logos/data available
        <section id="social-proof">
          <div className="proof-caption">Live on tables across India</div>
          <div className="proof-logos">
            The Spice House · Aish Kitchen · The Grain Table · Tandoor Street · Chai & Co · Masala Box · Biryani Base · Cafe Nord
          </div>
        </section>
      */}

      {/* 2 — Stats Bar */}
      <TapStats />

      {/* 3 — The Moment */}
      <TapMoment />

      {/* 4 — Features Grid */}
      <TapFeatures />

      {/* 5 — Deep Dive 01: Revenue */}
      <TapUpsells />

      {/* 5b — Proof: AOV / ROI stats */}
      <TapWhyTap />

      {/* 6 — Deep Dive 02: Real-Time Control */}
      <TapMenuManagement />

      {/* 7 — Deep Dive 03: Hardware */}
      <TapHardware />

      {/* 8 — Pricing */}
      <TapPricing />

      {/* 9 — QR vs Naira Tap */}
      <TapVsQR />

      {/* 10 — How It Works + Final CTA */}
      <TapHowItWorksCTA />

      {/* 11 — CASE STUDIES — placeholder data, not live yet */}
      {/*
      <section id="cases">
        <div>Aish Kitchen, Bandra — +22% AOV, 90 days post-switch</div>
        <div>The Grain Table, Koregaon Park — ₹46k saved on printing, year one</div>
        <div>Cafe Nord, Vagator — +18% walk-in conversion</div>
      </section>
      */}

      {/* 12 — Blog */}
      <BlogSection />

      {/* 13 — FAQ */}
      <TapFAQ />

      <Footer />
    </main>
  )
}
