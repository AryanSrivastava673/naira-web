import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import HeroShredder from '@/components/HeroShredder'
import GlobalShredBackground from '@/components/GlobalShredBackground'
import PhoneNFCSection from '@/components/PhoneNFCSection'
import Products from '@/components/Products'
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
      <GlobalShredBackground />
      <HeroShredder />
      <div className="section-divider" />
      <PhoneNFCSection />
      <div className="section-divider" />
      <Products />
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
