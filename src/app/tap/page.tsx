import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TapHero from '@/components/tap/TapHero'
import TapStats from '@/components/tap/TapStats'
import TapMoment from '@/components/tap/TapMoment'
import TapFeatures from '@/components/tap/TapFeatures'
import TapROI from '@/components/tap/TapROI'
import TapVsQR from '@/components/tap/TapVsQR'
import TapProcess from '@/components/tap/TapProcess'
import TapCaseStudies from '@/components/tap/TapCaseStudies'
import TapDeepDive from '@/components/tap/TapDeepDive'
import TapFAQ from '@/components/tap/TapFAQ'
import TapFinalCTA from '@/components/tap/TapFinalCTA'

export const metadata: Metadata = {
  title: 'Naira Tap — NFC Digital Menu for Indian Restaurants',
  description:
    'Replace your QR stickers with premium NFC coasters. Guests tap their phone, menu appears instantly. No app. No scan. No paper. Ever.',
  openGraph: {
    title: 'Naira Tap — NFC Digital Menu',
    description: 'Guests tap their phone. Menu appears. No app. No scan. No paper. Ever.',
    type: 'website',
  },
}

export default function TapPage() {
  return (
    <main>
      <Navbar />
      <TapHero />
      <div className="section-divider" />
      <TapStats />
      <div className="section-divider" />
      <TapMoment />
      <div className="section-divider" />
      <TapFeatures />
      <div className="section-divider" />
      <TapROI />
      <div className="section-divider" />
      <TapVsQR />
      <div className="section-divider" />
      <TapProcess />
      <div className="section-divider" />
      <TapCaseStudies />
      <div className="section-divider" />
      <TapDeepDive />
      <div className="section-divider" />
      <TapFAQ />
      <div className="section-divider" />
      <TapFinalCTA />
      <Footer />
    </main>
  )
}
