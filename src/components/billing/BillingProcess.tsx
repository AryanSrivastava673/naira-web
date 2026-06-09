'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const B = '#10B981'
const B_LIGHT = '#34D399'
const B_RGB = '16,185,129'

const steps = [
  {
    num: '01',
    title: 'We set up your menu & config',
    desc: 'Share your menu, outlet details, and GST info. We configure your dashboard, KOT flow, Zomato/Swiggy integration, and floor plan. You do nothing but send us a WhatsApp.',
  },
  {
    num: '02',
    title: 'Staff training in one session',
    desc: 'A 30-minute walkthrough for your team covering order entry, bill printing, and KOT management. Most staff are comfortable by the end of the session.',
  },
  {
    num: '03',
    title: 'Go live & grow',
    desc: 'Start billing from day one. Your first monthly growth report lands in 30 days with actionable insights on what to change, cut, or double down on.',
  },
]

export default function BillingProcess() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6 bg-naira-black" ref={ref}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block px-3 py-1 rounded-full border text-xs font-medium tracking-widest uppercase mb-5"
            style={{ borderColor: `rgba(${B_RGB},0.3)`, color: B_LIGHT }}
          >
            Getting Started
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-medium tracking-tighter mb-5 text-naira-text"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Three steps to switch
          </h2>
          <p className="text-naira-text-muted text-lg max-w-xl mx-auto">
            You&apos;re live in under a week. No server racks, no IT team, no downtime.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-8 top-10 bottom-10 w-px hidden md:block"
            style={{
              background: `linear-gradient(to bottom, transparent, rgba(${B_RGB},0.3) 20%, rgba(${B_RGB},0.3) 80%, transparent)`,
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
                {/* Step number */}
                <div
                  className="relative flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center font-display text-xl font-semibold z-10"
                  style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    background: `rgba(${B_RGB},0.08)`,
                    border: `1px solid rgba(${B_RGB},0.25)`,
                    color: B_LIGHT,
                    boxShadow: `0 0 24px rgba(${B_RGB},0.1)`,
                  }}
                >
                  {step.num}
                </div>

                {/* Content */}
                <div
                  className="flex-1 rounded-2xl p-6 bg-naira-surface"
                  style={{ border: `1px solid rgba(${B_RGB},0.12)` }}
                >
                  <h3
                    className="text-xl font-semibold text-naira-text mb-3"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-naira-text-muted leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
