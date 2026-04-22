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
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,43,163,0.06) 0%, transparent 70%), #151018',
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* VS table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <p className="text-xs font-bold tracking-widest uppercase text-naira-muted mb-3 text-center">
            The difference
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-naira-text text-center mb-10">
            The restaurants winning the next decade get found today.
          </h2>

          <div className="rounded-2xl border border-naira-border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1.6fr)] bg-naira-card border-b border-naira-border">
              <div className="p-4" />
              <div className="p-4 text-xs font-bold text-red-400 uppercase tracking-wide flex items-center gap-2 border-l border-naira-border">
                <span className="w-4 h-4 rounded-full bg-red-500/10 inline-flex items-center justify-center text-[9px]">✕</span>
                Without
              </div>
              <div className="p-4 text-xs font-bold text-naira-gold uppercase tracking-wide flex items-center gap-2 border-l border-naira-border">
                <span className="w-4 h-4 rounded-full bg-naira-gold/10 inline-flex items-center justify-center text-[9px]">✓</span>
                With Naira Growth
              </div>
            </div>

            {VS_ROWS.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1.6fr)] border-b border-naira-border last:border-0 ${
                  i % 2 === 0 ? 'bg-naira-black' : 'bg-naira-surface'
                }`}
              >
                <div className="p-4 text-sm font-semibold text-naira-text">{row.label}</div>
                <div className="p-4 text-sm text-naira-muted border-l border-naira-border leading-snug">
                  {row.without}
                </div>
                <div className="p-4 text-sm text-naira-text border-l border-naira-border leading-snug">
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
