import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PhoneNFCSection from '@/components/PhoneNFCSection'
import Products from '@/components/Products'
import Ecosystem from '@/components/Ecosystem'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import BlogSection from '@/components/BlogSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://nairamenus.in',
  },
}

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <PhoneNFCSection />
      <div className="section-divider" />
      <Products />
      <div className="section-divider" />
      <Ecosystem />
      <div className="section-divider" />
      <HowItWorks />
      <div className="section-divider" />
      <Pricing />
      <div className="section-divider" />
      <BlogSection />
      <Footer />
    </main>
  )
}
