'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'How does the free audit actually work?',
    a: 'You enter your website URL or answer 5 quick questions. We run a diagnostic across common restaurant visibility issues — Google Business Profile, reviews, social activity, and technical signals. You get a score out of 100 and one specific fix to start with.',
  },
  {
    q: 'Is the audit genuinely free?',
    a: "Yes. Completely free. The only follow-up is one email with your full report. No credit card. No sales call booked without your consent. If the report isn't useful, we've failed — not you.",
  },
  {
    q: "What's the difference between the free audit and paid Naira Growth?",
    a: "The free audit is a snapshot. Naira Growth is the engine that improves your score month after month — weekly GBP updates, content written for you, competitor tracking, review management, and a live dashboard that updates daily.",
  },
  {
    q: 'Does Naira Growth work alongside Zomato and Swiggy?',
    a: "Yes. Naira Growth works on the channels you own: Google, your website, reviews, and socials. Zomato and Swiggy are rented land. Every diner you own through Google or your own website is a diner who costs you 0% commission every time they return. We help you diversify away from delivery platforms, not abandon them.",
  },
  {
    q: 'Who writes the content — me or you?',
    a: "We write it. You approve it. Our team researches what your diners are searching for, drafts content in your restaurant's voice, and publishes it. You spend about 10 minutes a month reviewing. Your time is too expensive to spend writing about the history of biryani.",
  },
  {
    q: 'Do you work with restaurants outside Mumbai?',
    a: "Everywhere in India. We have clients across Mumbai, Bengaluru, Delhi, Hyderabad, Chennai, Ahmedabad, Kochi, and beyond. Google doesn't care which city you're in — and neither do we.",
  },
  {
    q: 'How quickly can I get started after signing up?',
    a: 'Within 24 hours of signing up, you get an onboarding call, a baseline audit of your current visibility, and your first set of GBP improvements pushed live. Content kicks in by week two. Week one is all about fixing the quick wins that move the needle fastest. Most clients see their first ranking change within 30 days.',
  },
  {
    q: 'What makes Naira Growth different from a typical restaurant SEO agency?',
    a: "Most restaurant SEO companies offer generic packages built for any small business. Naira Growth is a restaurant SEO agency built exclusively for food businesses. Our restaurant SEO services include GBP optimisation, local citation building, menu-driven content strategy, and competitor tracking — all calibrated to how diners search in your specific area. We are not a generalist agency that happens to take restaurant clients. This is all we do.",
  },
  {
    q: 'Do you offer restaurant website design as part of the service?',
    a: "Yes. If your restaurant needs a new website, our restaurant website design agency team builds fast, mobile-first, SEO-ready sites designed to convert diners. But we audit first — most restaurants do not need a full rebuild. Often, fixing page speed, adding schema markup, and restructuring existing content delivers better results than starting from scratch. We only recommend a restaurant website development project when it genuinely makes sense for your business.",
  },
  {
    q: 'Does a restaurant need online presence management even if it already has good footfall?',
    a: "Absolutely. Good footfall today does not guarantee good footfall six months from now. Consumer behavior has shifted permanently — 90% of diners now research online before visiting. If a new competitor in your area invests in their digital presence and you have not, you will start seeing a decline without understanding the cause. Online presence management protects the business you already have while opening doors to customers who have never walked past your location.",
  },
  {
    q: 'How does your restaurant feedback system handle negative reviews?',
    a: "Our restaurant review monitoring sends a real-time alert the moment a negative review lands. We draft a professional reply in your voice within hours, and our restaurant feedback system flags recurring patterns so you can fix root causes before they repeat.",
  },
  {
    q: 'Can Naira Growth handle restaurant Instagram marketing?',
    a: "Yes. Our restaurant Instagram marketing ties every post to a search intent — so your content does double duty on social and in Google. We handle post planning, captions, and timing tied to local events and searches in your area.",
  },
  {
    q: 'What does your restaurant marketing plan include?',
    a: "Your restaurant marketing plan covers local SEO, Google Business Profile optimisation, review management, monthly content, social post planning, a hyperlocal newsletter, competitor tracking, and a live dashboard — all managed for you under one monthly engagement.",
  },
]

const VISIBLE_BY_DEFAULT = 5

export default function GrowthFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? FAQS : FAQS.slice(0, VISIBLE_BY_DEFAULT)

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: '#ffffff' }}
    >
      <div
        aria-hidden
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,43,163,0.05) 0%, transparent 70%)' }}
      />
      <div className="max-w-3xl mx-auto relative z-10">

        <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-3 text-center" style={{ color: '#ff2ba3' }}>
          FAQ
        </p>
        <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] text-center mb-10" style={{ color: '#1a1a1a' }}>
          Every question you&apos;re <span style={{ color: '#ff2ba3' }}>afraid to ask.</span>
        </h2>

        <div className="space-y-3 mb-3">
          {visible.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden"
              style={{
                background: open === i ? 'rgba(255,43,163,0.04)' : '#ffffff',
                border: `1px solid ${open === i ? 'rgba(255,43,163,0.30)' : 'rgba(0,0,0,0.06)'}`,
                borderRadius: 16,
                transition: 'border-color 0.3s, background 0.3s',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              >
                <span
                  className="text-sm font-semibold transition-colors"
                  style={{ color: open === i ? '#ff2ba3' : '#1a1a1a' }}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  size={17}
                  className={`shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                  style={{ color: open === i ? '#ff2ba3' : '#9ca3af' }}
                />
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p
                      className="px-6 pb-5 text-sm leading-relaxed pt-4"
                      style={{ color: '#6b7280', borderTop: '1px solid rgba(0,0,0,0.06)' }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowAll(s => !s)}
          className="w-full flex items-center justify-center gap-2 py-3 mb-10 text-xs transition-colors"
          style={{ color: '#9ca3af' }}
        >
          <ChevronDown
            size={15}
            className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
          />
          {showAll ? 'Show less' : 'Show more'}
        </button>

        {/* CTA */}
        <div
          className="text-center relative overflow-hidden p-8 md:p-10"
          style={{
            background: 'rgba(255,43,163,0.05)',
            border: '1px solid rgba(255,43,163,0.18)',
            borderRadius: 20,
          }}
        >
          {/* inner glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,43,163,0.15) 0%, transparent 70%)',
            }}
          />
          <h3 className="font-sans text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-3 relative" style={{ color: '#1a1a1a' }}>
            Ready to own your <span style={{ color: '#ff2ba3' }}>growth?</span>
          </h3>
          <p className="text-sm mb-7 max-w-sm mx-auto relative" style={{ color: '#6b7280' }}>
            Start with a free visibility audit. Know exactly where you stand in
            30 seconds.
          </p>
          <a
            href="#audit"
            className="relative inline-flex items-center gap-2 text-sm font-semibold transition-all"
            style={{
              background: '#ff2ba3',
              color: '#ffffff',
              padding: '14px 28px',
              borderRadius: 12,
              boxShadow: '0 0 40px rgba(255,43,163,0.25)',
            }}
          >
            Get your free audit
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
