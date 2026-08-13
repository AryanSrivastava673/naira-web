import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import NairaIntelligence from '@/components/NairaIntelligence'
import ConnectedFlow from '@/components/ConnectedFlow'
import Products from '@/components/Products'
import Ecosystem from '@/components/Ecosystem'
import HowItWorks from '@/components/HowItWorks'
import DayOnNaira from '@/components/DayOnNaira'
import WhyNaira from '@/components/WhyNaira'
// Pricing is temporarily hidden — restore this import and the <Pricing /> usage
// below, plus the Pricing entry in Navbar's NAV_LINKS, to bring it back.
// import Pricing from '@/components/Pricing'
import BuildTogether from '@/components/BuildTogether'
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
      <WhyNaira />
      <div className="section-divider" />
      <NairaIntelligence />
      <div className="section-divider" />
      <ConnectedFlow />
      <div className="section-divider" />
      <Products />
      <div className="section-divider" />
      <Ecosystem />
      <div className="section-divider" />
      <HowItWorks />
      <div className="section-divider" />
      <DayOnNaira />
      <div className="section-divider" />
      {/* <Pricing /> — temporarily hidden */}
      <BuildTogether />
      <div className="section-divider" />
      <BlogSection />
      <Footer />
    </main>
  )
}
