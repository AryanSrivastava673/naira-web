import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NfcHero from '@/components/nfc/NfcHero'
import NfcEveryday from '@/components/nfc/NfcEveryday'
import NfcChecker from '@/components/nfc/NfcChecker'
import NfcDeepDive from '@/components/nfc/NfcDeepDive'
import NfcGuestExperience from '@/components/nfc/NfcGuestExperience'
import NfcStats from '@/components/nfc/NfcStats'
import NfcFAQ from '@/components/nfc/NfcFAQ'
import NfcCTA from '@/components/nfc/NfcCTA'

export const metadata: Metadata = {
  alternates: { canonical: 'https://nairamenus.in/nfc' },
  title: 'NFC Compatibility — Works on Every Phone | Naira Tap',
  description:
    'If your guests can tap to pay, they can tap your menu. Naira Tap uses the same NFC chip as Google Pay and Apple Pay. Check if your guests\' phones are compatible.',
  keywords:
    'nfc menu compatibility, nfc restaurant menu, does my phone support nfc menu, naira tap nfc, contactless menu india, nfc coaster restaurant',
  openGraph: {
    title: 'NFC Compatibility — Works on Every Phone | Naira Tap',
    description: 'If it can tap to pay, it can tap your menu. Check phone compatibility.',
    type: 'website',
    url: 'https://nairamenus.in/nfc',
  },
}

export default function NfcPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <Navbar />
      <NfcHero />
      <NfcEveryday />
      <NfcChecker />
      <NfcDeepDive />
      <NfcGuestExperience />
      <NfcStats />
      <NfcFAQ />
      <NfcCTA />
      <Footer />
    </main>
  )
}
