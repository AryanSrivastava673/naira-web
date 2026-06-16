'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CASES = [
  {
    restaurant: 'Aish Kitchen, Bandra',
    metric: '+217%',
    metricLabel: 'Google organic traffic in 90 days',
    quote:
      '"We were invisible on Google. Now we get 40 calls a week from people who found us in search. That never happened before."',
    duration: '3 months on Naira Growth',
  },
  {
    restaurant: 'The Grain Table, Koramangala',
    metric: '4.1 → 4.7',
    metricLabel: 'Google rating jump in 60 days',
    quote:
      '"The review engine is what got us. We used to dread negative reviews. Now we reply fast, and it\'s completely changed how people see us."',
    duration: '2 months on Naira Growth',
  },
  {
    restaurant: 'Tandoor Street, Baner',
    metric: '#1',
    metricLabel: 'Ranked for "Mughlai near me" in Baner',
    quote:
      '"I didn\'t believe SEO could work this fast. We went from page 3 to the local pack in six weeks. My partner thought I\'d paid someone off."',
    duration: '6 weeks on Naira Growth',
  },
]

const VS_ROWS = [
  {
    label: 'Mental load',
    without: 'Overwhelmed by 6 tools, 4 dashboards, and vocabulary you never signed up to learn',
    with: 'One dashboard, one growth partner, zero jargon to memorise',
  },
  {
    label: 'Google visibility',
    without: 'Missing "near me" searches every day while competitors quietly take your share',
    with: 'Tracked rankings, weekly improvements, present where diners actually search',
  },
  {
    label: 'Reviews',
    without: 'Reviews pile up unanswered — one bad weekend can dent your rating for months',
    with: 'Replies drafted in your voice within hours; alerts before things spiral',
  },
  {
    label: 'Marketing spend',
    without: 'Bleeding money on Zomato promos and ads that stop working the moment you stop paying',
    with: 'Investing in assets you own — content, reviews, GBP, newsletter — that compound forever',
  },
  {
    label: '12 months later',
    without: 'Same struggle. Higher ad spend. A year of traffic gone to the restaurant next door',
    with: 'Ranking content, hundreds of reviews, a newsletter list, and an unfair advantage',
  },
]

export default function GrowthProof() {
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
        className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,43,163,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative">

        {/* VS table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-3 text-center" style={{ color: '#ff2ba3' }}>
            The difference
          </p>
          <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-[-0.02em] text-center mb-10" style={{ color: '#1a1a1a' }}>
            The restaurants winning the next decade get <span style={{ color: '#ff2ba3' }}>found today.</span>
          </h2>

          <div className="overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16 }}>
            {/* Header */}
            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1.6fr)]" style={{ background: '#f5f5f5', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div className="p-4" />
              <div className="font-mono p-4 text-[11px] font-semibold uppercase tracking-[0.08em] flex items-center gap-2" style={{ color: '#dc2626', borderLeft: '1px solid rgba(0,0,0,0.08)' }}>
                <span className="w-4 h-4 rounded-full inline-flex items-center justify-center text-[9px]" style={{ background: 'rgba(220,38,38,0.1)' }}>✕</span>
                Without
              </div>
              <div className="font-mono p-4 text-[11px] font-semibold uppercase tracking-[0.08em] flex items-center gap-2" style={{ color: '#ff2ba3', borderLeft: '1px solid rgba(0,0,0,0.08)' }}>
                <span className="w-4 h-4 rounded-full inline-flex items-center justify-center text-[9px]" style={{ background: 'rgba(255,43,163,0.1)' }}>✓</span>
                With Naira Growth
              </div>
            </div>

            {VS_ROWS.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1.6fr)]"
                style={{
                  borderBottom: i < VS_ROWS.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                  background: i % 2 === 0 ? '#ffffff' : '#fafafa',
                }}
              >
                <div className="p-4 text-sm font-semibold" style={{ color: '#1a1a1a' }}>{row.label}</div>
                <div className="p-4 text-sm leading-snug" style={{ color: '#9ca3af', borderLeft: '1px solid rgba(0,0,0,0.06)' }}>
                  {row.without}
                </div>
                <div className="p-4 text-sm leading-snug" style={{ color: '#1a1a1a', borderLeft: '1px solid rgba(0,0,0,0.06)' }}>
                  {row.with}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
