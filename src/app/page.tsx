import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import HeroShredder from '@/components/HeroShredder'
import LazySection from '@/components/LazySection'

const GlobalShredBackground = dynamic(() => import('@/components/GlobalShredBackground'), { ssr: false })
const PhoneNFCSection      = dynamic(() => import('@/components/PhoneNFCSection'),      { ssr: false })
const Products             = dynamic(() => import('@/components/Products'),             { ssr: false })
const HowItWorks           = dynamic(() => import('@/components/HowItWorks'),           { ssr: false })
const Pricing              = dynamic(() => import('@/components/Pricing'),              { ssr: false })
const BlogSection          = dynamic(() => import('@/components/BlogSection'),          { ssr: false })
const Footer               = dynamic(() => import('@/components/Footer'),              { ssr: false })

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <GlobalShredBackground />
      <HeroShredder />
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
