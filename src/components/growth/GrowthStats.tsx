'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  {
    value: '76%',
    label: 'of diners Google a restaurant before visiting',
    source: 'TripAdvisor Consumer Survey',
    href: 'https://www.tripadvisor.com/business/insights/',
  },
  {
    value: '88%',
    label: 'of clicks go to page one — nothing else exists',
    source: 'Think with Google',
    href: 'https://www.thinkwithgoogle.com/marketing-strategies/search/near-me-searches/',
  },
  {
    value: '4.2×',
    label: 'more revenue with a 4.5+ star Google rating',
    source: 'Google Business Profile Help',
    href: 'https://support.google.com/business/answer/7091',
  },
  {
    value: '9 in 10',
    label: 'restaurant owners say Google is their top source',
    source: 'BrightLocal Review Survey 2023',
    href: 'https://www.brightlocal.com/research/local-consumer-review-survey/',
  },
]

const ROI = [
  { channel: 'SEO & Content', back: 1300, accent: true },
  { channel: 'Reviews / GBP', back: 1100, accent: true },
  { channel: 'Email & Newsletter', back: 900, accent: true },
  { channel: 'WhatsApp Broadcasts', back: 380, accent: true },
  { channel: 'Google / Meta Ads', back: 110, accent: false },
  { channel: 'Zomato Promotions', back: 60, accent: false },
]
const MAX_ROI = 1300

export default function GrowthStats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: '#ffffff' }}
    >
      {/* Subtle pink glow — billing white-section treatment */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,43,163,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div
                className="font-mono text-4xl md:text-5xl font-medium mb-2"
                style={{ color: '#ff2ba3', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}
              >
                {s.value}
              </div>
              <p className="text-sm leading-snug mb-2" style={{ color: '#6b7280' }}>{s.label}</p>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] transition-colors underline underline-offset-2"
                style={{ color: '#9ca3af' }}
              >
                {s.source}
              </a>
            </motion.div>
          ))}
        </div>

        {/* ROI bar chart */}
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-1 text-center" style={{ color: '#ff2ba3' }}>
            Return per ₹100 spent
          </p>
          <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-[-0.02em] text-center mb-2" style={{ color: '#1a1a1a' }}>
            Not all rupees are <span style={{ color: '#ff2ba3' }}>equal.</span>
          </h2>
          <p className="text-sm text-center mb-8" style={{ color: '#6b7280' }}>
            The channels most owners ignore deliver the highest returns.
          </p>

          <div className="space-y-3">
            {ROI.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.45 }}
                className="flex items-center gap-3"
              >
                <span
                  className="text-xs w-36 text-right shrink-0"
                  style={{ color: r.accent ? '#1a1a1a' : '#9ca3af' }}
                >
                  {r.channel}
                </span>
                <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ background: '#f0f0f0' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${(r.back / MAX_ROI) * 100}%` } : {}}
                    transition={{ delay: 0.4 + i * 0.07, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-lg"
                    style={{
                      background: r.accent
                        ? 'linear-gradient(90deg, #cc2282, #ff2ba3)'
                        : '#d4d4d4',
                    }}
                  />
                </div>
                <span
                  className="font-mono text-xs font-semibold w-16 shrink-0"
                  style={{ color: r.accent ? '#ff2ba3' : '#9ca3af', fontVariantNumeric: 'tabular-nums' }}
                >
                  ₹{r.back.toLocaleString('en-IN')}
                </span>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-center mt-4" style={{ color: '#9ca3af' }}>
            Same ₹100. Very different outcomes.{' '}
            <a
              href="https://www.hubspot.com/state-of-marketing"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              HubSpot State of Marketing
            </a>
          </p>
        </div>

      </div>
    </section>
  )
}
