import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactPage from '@/components/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Sales — Naira Menus',
  description:
    'Get in touch with the Naira Menus team. Book a demo, ask about our products, or just say hello.',
  openGraph: {
    title: 'Contact Sales — Naira Menus',
    description:
      'Talk to us about Naira Billing, Naira Tap, or Naira Growth for your restaurant.',
    type: 'website',
  },
}

export default function Contact() {
  return (
    <main>
      <Navbar />
      <ContactPage />
      <Footer />
    </main>
  )
}
