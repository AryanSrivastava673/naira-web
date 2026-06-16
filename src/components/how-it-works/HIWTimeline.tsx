'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const milestones = [
  {
    when: 'Day 0',
    title: 'Onboarding call',
    desc: 'A quick 20-minute intake call where we understand your restaurant, products needed, and go-live timeline. We collect your menu, GST details, and branding.',
    color: '#ff2ba3',
    rgb: '255,43,163',
  },
  {
    when: 'Day 1–3',
    title: 'We set everything up',
    desc: 'Dashboard configured, menu built, Zomato/Swiggy integrated, coaster design approved. You do nothing — we handle the full setup.',
    color: '#ff2ba3',
    rgb: '255,43,163',
  },
  {
    when: 'Day 5–7',
    title: 'Go live',
    desc: 'Coasters on your tables, POS on your counter, staff trained in one 30-minute session. Your first guest taps. Your first bill prints. You\'re live.',
    color: '#ff2ba3',
    rgb: '255,43,163',
  },
  {
    when: 'Day 30',
    title: 'First monthly report',
    desc: 'Your first growth report lands — average order value, revenue by channel, best-selling items, peak hours, and 3–5 specific suggestions for next month.',
    color: '#ff2ba3',
    rgb: '255,43,163',
  },
  {
    when: 'Ongoing',
    title: 'Continuous improvement',
    desc: 'Monthly reports, live support during service hours, menu updates as needed, and ongoing SEO and review optimisation. We grow with you.',
    color: '#ff2ba3',
    rgb: '255,43,163',
  },
]

export default function HIWTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6 relative overflow-hidden" style={{ background: '#ffffff' }} ref={ref}>
      {/* Subtle pink glow — billing white-section treatment */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,43,163,0.05) 0%, transparent 70%)' }}
      />
      <div className="max-w-4xl mx-auto relative">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono inline-block px-3 py-1 rounded-[8px] bg-[rgba(255,43,163,0.12)] text-[#ff2ba3] text-[12px] font-medium tracking-[0.12em] uppercase mb-5">
            Your Journey
          </span>
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-[-0.02em]" style={{ color: '#1a1a1a' }}>
            Signed up today.{' '}
            <span style={{ color: '#ff2ba3' }}>Live this week.</span>
          </h2>
          <p className="text-lg mt-4 max-w-xl mx-auto" style={{ color: '#6b7280' }}>
            Everything is handled for you. Here&apos;s the full timeline from first call to first report.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[28px] top-6 bottom-6 w-px md:left-1/2 md:-translate-x-1/2"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(var(--accent-rgb),0.25) 10%, rgba(var(--accent-rgb),0.25) 90%, transparent)',
            }}
          />

          <div className="space-y-12">
            {milestones.map((m, i) => {
              const isRight = i % 2 !== 0
              return (
                <motion.div
                  key={m.when}
                  className="relative flex gap-6 md:gap-0 items-start"
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.12 }}
                >
                  {/* Dot — always at left on mobile, centred on desktop */}
                  <div
                    className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0"
                    style={{
                      background: `rgba(${m.rgb},0.12)`,
                      border: `2px solid rgba(${m.rgb},0.4)`,
                    }}
                  >
                    <span className="text-[10px] font-bold text-center leading-tight px-1" style={{ color: m.color }}>
                      {m.when}
                    </span>
                  </div>

                  {/* Content — alternating sides on desktop */}
                  <div
                    className={`flex-1 md:w-[calc(50%-3.5rem)] md:flex-none rounded-2xl p-5 ${
                      isRight
                        ? 'md:ml-[calc(50%+3.5rem)]'
                        : 'md:mr-[calc(50%+3.5rem)]'
                    }`}
                    style={{
                      background: '#ffffff',
                      border: '1px solid rgba(0,0,0,0.06)',
                    }}
                  >
                    {/* Accent line */}
                    <div
                      className="w-8 h-0.5 rounded-full mb-3"
                      style={{ background: '#ff2ba3' }}
                    />
                    <h3 className="text-base font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                      {m.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{m.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
