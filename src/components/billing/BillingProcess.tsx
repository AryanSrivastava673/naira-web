'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

const steps = [
  {
    num: '01',
    title: 'We set up your menu & config',
    desc: 'Share your menu, outlet details, and GST info. We configure your dashboard, KOT flow, Zomato/Swiggy integration, and cafeteria point of sale system settings — tailored to your format.',
  },
  {
    num: '02',
    title: 'Staff training in one session',
    desc: 'A 30-minute walkthrough for your team. Order entry, bill printing, KOT management. Most staff are confident by the end of day one.',
  },
  {
    num: '03',
    title: 'Go live & grow',
    desc: 'Start billing. Your first monthly growth report lands in 30 days with restaurant data analytics — AOV trends, peak-hour insights, and actionable optimisation suggestions.',
  },
]

export default function BillingProcess() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6" style={{ background: '#ffffff' }} ref={ref}>
      <div className="max-w-[1200px] mx-auto">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-3" style={{ color: PINK }}>
            Getting Started
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-5" style={{ color: '#1a1a1a' }}>
            Three steps to <span style={{ color: PINK }}>switch</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#6b7280' }}>
            You&apos;re live in under a week. No server racks, no IT team, no downtime. We set up everything and train your staff on-site.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div
            className="absolute left-8 top-10 bottom-10 w-px hidden md:block"
            style={{
              background: `linear-gradient(to bottom, transparent, rgba(${PINK_RGB},0.25) 20%, rgba(${PINK_RGB},0.25) 80%, transparent)`,
            }}
          />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative flex gap-6 items-start"
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              >
                <div
                  className="relative flex-shrink-0 w-16 h-16 flex items-center justify-center font-mono text-xl font-medium z-10"
                  style={{
                    background: '#ffffff',
                    border: `1px solid rgba(${PINK_RGB},0.30)`,
                    color: PINK,
                    borderRadius: 16,
                    boxShadow: `0 2px 8px rgba(${PINK_RGB},0.06), 0 4px 16px rgba(${PINK_RGB},0.04)`,
                  }}
                >
                  {step.num}
                </div>

                <div
                  className="flex-1 p-6 transition-all"
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: 16,
                  }}
                >
                  <h3 className="font-sans text-xl font-semibold mb-3" style={{ color: '#1a1a1a' }}>
                    {step.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#6b7280' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
