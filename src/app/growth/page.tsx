import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BlogSection from '@/components/BlogSection'
import Hero from '@/components/growth/brochure/Hero'
import WhyItMatters from '@/components/growth/brochure/WhyItMatters'
import Customers from '@/components/growth/brochure/Customers'
import Symptoms from '@/components/growth/brochure/Symptoms'
import WhatYouGet from '@/components/growth/brochure/WhatYouGet'
import HowWeWork from '@/components/growth/brochure/HowWeWork'
import BusinessTypes from '@/components/growth/brochure/BusinessTypes'
import ProfileAnatomy from '@/components/growth/brochure/ProfileAnatomy'
import Returns from '@/components/growth/brochure/Returns'
import Results from '@/components/growth/brochure/Results'
import Comparison from '@/components/growth/brochure/Comparison'
import Pricing from '@/components/growth/brochure/Pricing'
import FAQ from '@/components/growth/brochure/FAQ'
import ClosingCTA from '@/components/growth/brochure/ClosingCTA'
import WhatsAppFab from '@/components/growth/brochure/WhatsAppFab'
import MobileActionBar from '@/components/growth/brochure/MobileActionBar'
import { jakarta, playfairDisplay } from './fonts'
import styles from './growth.module.css'

export const metadata: Metadata = {
  alternates: { canonical: 'https://nairamenus.in/growth' },
  title: 'Naira Growth — Local Online Presence, Managed For You',
  description:
    'Local online presence, managed for you. Naira Growth gets Indian restaurants and local businesses found on Google Search and Google Maps.',
  openGraph: {
    title: 'Naira Growth — Local Online Presence, Managed For You',
    description:
      'Local online presence, managed for you. Naira Growth gets Indian restaurants and local businesses found on Google Search and Google Maps.',
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
    'Local online presence management for Indian restaurants and local businesses. Google Business Profile management, review management, and local SEO.',
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
      name: 'What does the free first look actually include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We go through your Google Business Profile, your Maps pin, your reviews, your Zomato and Swiggy pages and your website, and we compare you against the three closest businesses competing for the same searches. You get what we found and the one fix we would start with. No payment, and no sales call unless you ask for one.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long before I see something change?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Profile fixes usually show up in four to eight weeks. Reviews and photos move quickly. Content and citations build over three to six months. Anyone promising page one in two weeks is either paying for ads or not telling you the truth.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I have to sign a contract?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. There is no lock-in and no minimum term. If you continue on a retainer it is month to month, and you can stop whenever you like. We would rather you stay because the numbers are moving.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this work alongside Zomato and Swiggy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, and it should. Aggregators bring orders but they own the customer. Your Google profile, your reviews and your newsletter are yours. We clean up your aggregator pages too, so the details match everywhere.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who writes the content and the review replies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We do, in your voice, and you approve before anything goes live. If you would rather write them yourself, we will hand you the drafts and the calendar and stay out of the way.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does it cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Two stages. The first two months cost ₹25,000 to ₹30,000 for both months together, and your website is included in that, along with blog posts and the keyword groundwork. After that a retainer starts at ₹2,500 a month, and it is optional. What moves you inside the range is how crowded your area is, how much needs fixing at the start, and whether you already have a website we can improve instead of building one. You get the exact number after the free look, and nothing is charged until you have seen what we found.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I pay, and do I get a GST invoice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bank transfer, UPI or card. You get a proper GST invoice from NairaMenus Pvt Ltd every month. Nothing is charged before we have shown you what we found.',
      },
    },
  ],
}

export default function GrowthPage() {
  return (
    <div className={`${jakarta.variable} ${playfairDisplay.variable} ${styles.root}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className={styles.navScrim} aria-hidden="true" />
      <Navbar />
      <Hero />
      <WhyItMatters />
      <Customers />
      <Symptoms />
      <WhatYouGet />
      <HowWeWork />
      <BusinessTypes />
      <ProfileAnatomy />
      <Returns />
      <Results />
      <Comparison />
      <Pricing />
      <FAQ />
      <ClosingCTA />
      <BlogSection />
      <Footer />
      <WhatsAppFab />
      <MobileActionBar />
    </div>
  )
}
