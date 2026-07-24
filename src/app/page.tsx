import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LazySection from '@/components/LazySection'

const PhoneNFCSection      = dynamic(() => import('@/components/PhoneNFCSection'),      { ssr: false })
const Products             = dynamic(() => import('@/components/Products'),             { ssr: false })
const Ecosystem            = dynamic(() => import('@/components/Ecosystem'),            { ssr: false })
const HowItWorks           = dynamic(() => import('@/components/HowItWorks'),           { ssr: false })
const Pricing              = dynamic(() => import('@/components/Pricing'),              { ssr: false })
const BlogSection          = dynamic(() => import('@/components/BlogSection'),          { ssr: false })
const Footer               = dynamic(() => import('@/components/Footer'),              { ssr: false })

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <LazySection>
        <PhoneNFCSection />
      </LazySection>
      <div className="section-divider" />
      <LazySection>
        <Products />
      </LazySection>
      <div className="section-divider" />
      <LazySection>
        <Ecosystem />
      </LazySection>
      <div className="section-divider" />
      <LazySection>
        <HowItWorks />
      </LazySection>
      <div className="section-divider" />
      <LazySection>
        <Pricing />
      </LazySection>
      <div className="section-divider" />
      <LazySection>
        <BlogSection />
      </LazySection>
      <LazySection minHeight="400px">
        <Footer />
      </LazySection>
    </main>
  )
}
