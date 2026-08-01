import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HIWHero from '@/components/how-it-works/HIWHero'
import HIWProducts from '@/components/how-it-works/HIWProducts'
import HIWTimeline from '@/components/how-it-works/HIWTimeline'
import HIWCTA from '@/components/how-it-works/HIWCTA'

export const metadata: Metadata = {
  alternates: { canonical: 'https://nairamenus.in/how-it-works' },
  title: 'How It Works — Naira Menus',
  description:
    'See exactly how Naira Tap, Naira Billing, and Naira Growth are set up and run — from signup to your first monthly report in under a week.',
  openGraph: {
    title: 'How It Works — Naira Menus',
    description: "From first tap to full analytics. Here's exactly how Naira works.",
    type: 'website',
  },
}

export default function HowItWorksPage() {
  return (
    <main>
      <Navbar />
      <HIWHero />
      <div className="section-divider" />
      <HIWProducts />
      <div className="section-divider" />
      <HIWTimeline />
      <div className="section-divider" />
      <HIWCTA />
      <Footer />
    </main>
  )
}
