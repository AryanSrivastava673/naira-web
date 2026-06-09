import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BillingHero from '@/components/billing/BillingHero'
import BillingStats from '@/components/billing/BillingStats'
import BillingFeatures from '@/components/billing/BillingFeatures'
import BillingProcess from '@/components/billing/BillingProcess'
import BillingDeepDive from '@/components/billing/BillingDeepDive'
import BillingFAQ from '@/components/billing/BillingFAQ'
import BillingFinalCTA from '@/components/billing/BillingFinalCTA'

export const metadata: Metadata = {
  title: 'Naira Billing — Smart POS for Indian Restaurants',
  description:
    'Cloud POS with real-time dashboards, GST invoicing, Zomato & Swiggy sync, inventory tracking, and monthly growth reports. Built for Indian food businesses.',
  openGraph: {
    title: 'Naira Billing — Smart POS for Indian Restaurants',
    description:
      'Real-time analytics, GST invoicing, Zomato & Swiggy sync. All in one place.',
    type: 'website',
  },
}

export default function BillingPage() {
  return (
    <main>
      <Navbar />
      <BillingHero />
      <div className="section-divider" />
      <BillingStats />
      <div className="section-divider" />
      <BillingFeatures />
      <div className="section-divider" />
      <BillingProcess />
      <div className="section-divider" />
      <BillingDeepDive />
      <div className="section-divider" />
      <BillingFAQ />
      <div className="section-divider" />
      <BillingFinalCTA />
      <Footer />
    </main>
  )
}
