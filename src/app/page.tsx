import Navbar from '@/components/Navbar'
import HeroShredder from '@/components/HeroShredder'
import PhoneNFCSection from '@/components/PhoneNFCSection'
import Products from '@/components/Products'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import BlogSection from '@/components/BlogSection'
import Footer from '@/components/Footer'
import GlobalShredBackground from '@/components/GlobalShredBackground'

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
