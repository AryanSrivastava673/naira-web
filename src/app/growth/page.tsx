import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GrowthHero from '@/components/growth/GrowthHero'
import GrowthStats from '@/components/growth/GrowthStats'
import GrowthWhyNaira from '@/components/growth/GrowthWhyNaira'
import GrowthFeatures from '@/components/growth/GrowthFeatures'
import GrowthProof from '@/components/growth/GrowthProof'
import GrowthSEOSections from '@/components/growth/GrowthSEOSections'
import GrowthFAQ from '@/components/growth/GrowthFAQ'
import BlogSection from '@/components/BlogSection'

export const metadata: Metadata = {
  title: 'Restaurant SEO Agency & Online Presence Management | Naira Growth',
  description:
    'Naira Growth is a restaurant SEO agency trusted by 800+ restaurants across India. Local SEO, online reputation management, review monitoring, and digital marketing for restaurants — all in one platform.',
  keywords:
    'restaurant seo agency, restaurant seo company, best local seo services for restaurants, online reputation management for restaurants, digital marketing for restaurants, restaurant marketing plan, restaurant feedback system, restaurant review monitoring, restaurant instagram marketing, email marketing for restaurants, restaurant web design agency, internet marketing for restaurants',
  openGraph: {
    title: 'Restaurant SEO Agency & Online Presence Management | Naira Growth',
    description:
      'Trusted by 800+ restaurants. Local SEO, reputation management, and digital marketing built exclusively for Indian restaurants.',
    type: 'website',
    url: 'https://nairamenus.in/growth',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Naira Menus',
  url: 'https://nairamenus.in',
  logo: 'https://nairamenus.in/brand_logo.png',
  description:
    'Restaurant SEO agency and online presence management platform for Indian restaurants. Local SEO, review management, and digital marketing for restaurants.',
  sameAs: [
    'https://www.instagram.com/naira.menus/',
    'https://www.linkedin.com/in/naira-menus-8973633b7/',
    'https://x.com/NairaMenus',
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What makes Naira Growth different from a typical restaurant SEO agency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most restaurant SEO agencies hand you a report and walk away. Naira Growth is a done-for-you service — we implement the changes, publish the content, manage your reviews, and track your rankings every week. You get a dedicated growth partner, not a PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer restaurant website design?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our restaurant web design agency service is audit-first — we check whether your existing site needs a full rebuild or targeted fixes. If a rebuild is the right call, we design and launch a fast, SEO-ready site. If not, we fix what is broken. No unnecessary invoices.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does your restaurant feedback system handle negative reviews?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our restaurant review monitoring system sends you a real-time alert the moment a negative review lands. We draft a professional reply in your voice within hours, and our restaurant feedback system flags patterns so you can fix root causes before they repeat.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Naira Growth handle restaurant Instagram marketing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our restaurant Instagram marketing service ties every post to a search intent — so your content does double duty on social and in Google. We handle post planning, captions, and timing tied to local events and searches in your area.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does your restaurant marketing plan include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your restaurant marketing plan covers local SEO, Google Business Profile optimisation, review management, monthly content, social post planning, a hyperlocal newsletter, competitor tracking, and a live dashboard — all managed for you under one monthly engagement.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the free audit work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You enter your website URL or answer 5 quick questions. We run a diagnostic across common restaurant visibility issues — GBP, reviews, social activity, and technical signals. You get a score out of 100 and one specific fix to start with.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly will I see results from restaurant SEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GBP improvements and review velocity show results fastest — typically 4 to 8 weeks. Content and backlinks compound over 3 to 6 months. Most clients see their first ranking changes within 30 days.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide digital marketing for restaurants outside Mumbai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Everywhere in India. We provide digital marketing for restaurants across Mumbai, Bengaluru, Delhi, Hyderabad, Chennai, Ahmedabad, Kochi, and beyond.',
      },
    },
  ],
}

export default function GrowthPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <GrowthHero />
      <GrowthStats />
      <GrowthWhyNaira />
      <GrowthFeatures />
      <GrowthProof />
      <GrowthSEOSections />
      <GrowthFAQ />
      <BlogSection />
      <Footer />
    </main>
  )
}
