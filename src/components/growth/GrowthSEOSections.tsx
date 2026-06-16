'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, ShieldCheck, TrendingUp } from 'lucide-react'

const SECTIONS = [
  {
    Icon: Search,
    eyebrow: 'Restaurant SEO Services',
    heading: 'Your restaurant deserves to be found.',
    body: [
      'Most diners never type a restaurant name into Google — they type a craving. "Best biryani near me." "Rooftop dinner Bandra." If your restaurant isn\'t showing up for those searches, you\'re invisible to the people most ready to spend.',
      'As a restaurant SEO agency, Naira Growth handles the entire search presence stack — Google Business Profile optimisation, local citation building, on-page restaurant web SEO, structured data, and keyword-targeted content. The kind of best local SEO services that compound month after month.',
    ],
    tags: ['Restaurant SEO Agency', 'Local SEO', 'GBP Optimisation', 'Restaurant Web SEO'],
  },
  {
    Icon: ShieldCheck,
    eyebrow: 'Restaurant Reputation Management',
    heading: 'Your rating is your storefront.',
    body: [
      'A 4.2 rating doesn\'t just look bad — it costs you bookings every single day. Our e-reputation restaurant service monitors every review platform in real time, drafts replies in your voice within hours, and flags negative sentiment before it compounds.',
      'Our restaurant feedback system goes beyond review replies — it identifies patterns in what diners say so you can fix root causes. Online reputation management for restaurants that keeps you ahead of the conversation, not chasing it.',
    ],
    tags: ['Online Reputation Management', 'Restaurant Review Monitoring', 'Restaurant Feedback System', 'E-Reputation'],
  },
  {
    Icon: TrendingUp,
    eyebrow: 'Digital Marketing for Restaurants',
    heading: 'One plan. Every channel. No tab-switching.',
    body: [
      'Digital marketing for restaurants isn\'t about doing more — it\'s about doing the right things on the right channels. Your restaurant marketing plan should cover Google, Instagram, email, and your neighbourhood\'s inbox, all working together toward the same goal: more covers, more often.',
      'Naira Growth is the internet marketing partner for restaurants that builds and runs that plan for you — from restaurant Instagram marketing to email marketing for restaurants — under one monthly engagement with one point of contact.',
    ],
    tags: ['Digital Marketing for Restaurants', 'Restaurant Marketing Plan', 'Restaurant Instagram Marketing', 'Email Marketing for Restaurants'],
  },
]

export default function GrowthSEOSections() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <div aria-hidden className="absolute inset-0 constellation-bg pointer-events-none" />
      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        {SECTIONS.map((s, i) => {
          const { Icon } = s
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="glass-dark p-8 md:p-10 grid md:grid-cols-[auto_1fr] gap-8"
              style={{ borderRadius: 20 }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 flex items-center justify-center shrink-0"
                style={{
                  background: 'rgba(255,43,163,0.12)',
                  border: '1px solid rgba(255,43,163,0.22)',
                  borderRadius: 12,
                }}
              >
                <Icon size={22} color="#ff2ba3" />
              </div>

              {/* Content */}
              <div>
                <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-2" style={{ color: '#ff2ba3' }}>
                  {s.eyebrow}
                </p>
                <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-[-0.02em] text-white mb-4">
                  {s.heading}
                </h2>
                <div className="space-y-3 mb-6">
                  {s.body.map((para, j) => (
                    <p key={j} className="text-white/70 text-sm leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
                {/* Keyword tags */}
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="font-mono text-[11px] px-3 py-1 uppercase tracking-[0.08em]"
                      style={{ background: 'rgba(255,43,163,0.10)', color: '#ff2ba3', borderRadius: 8 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
