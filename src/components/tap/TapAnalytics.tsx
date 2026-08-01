'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const CHIPS = [
  { label: '7,520', sub: 'Total Taps' },
  { label: '1,842', sub: 'Unique Guests' },
  { label: '+18.6%', sub: 'vs last 30 days' },
]

export default function TapAnalytics() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background:
          '#0a0a0a',
      }}
    >
      <div className="max-w-5xl mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase text-naira-muted mb-3">
            Analytics
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] text-naira-text">
            Weekly analytics — see what&apos;s earning and what&apos;s not.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-2xl overflow-hidden mb-8"
          style={{
            background: 'rgba(14,8,16,0.9)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
          }}
        >
          <Image
            src="/tap/analytics-dashboard.jpg"
            alt="Analytics dashboard showing dish popularity chart, Tap Share donut, and KPI cards"
            width={1000}
            height={560}
            className="w-full object-cover rounded-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {CHIPS.map((c, i) => (
            <div
              key={i}
              className="rounded-xl px-6 py-4 text-center min-w-[140px]"
              style={{
                background: 'rgba(30,21,32,0.7)',
                border: '1px solid rgba(255,43,163,0.15)',
              }}
            >
              <p className="font-mono text-2xl font-medium tracking-[-0.01em] text-naira-gold">{c.label}</p>
              <p className="text-xs text-naira-muted mt-1">{c.sub}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
