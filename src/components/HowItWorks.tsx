'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Package, LayoutDashboard, Zap } from 'lucide-react'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

const steps = [
  {
    number: '01',
    icon: Package,
    title: 'Get your Naira kit',
    description:
      'We ship you branded NFC coasters and stands for your tables. They look great, feel premium, and last for years.',
    detail: 'Setup takes under 30 minutes — place the coasters, we do the rest.',
  },
  {
    number: '02',
    icon: LayoutDashboard,
    title: 'Build your digital menu',
    description:
      'Use the Naira dashboard to set up your menu. Add items, photos, prices, and descriptions. Customise the look to match your brand.',
    detail: 'Update prices, add seasonal specials, or 86 an item — all live in seconds.',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Guests tap. Orders flow.',
    description:
      'Customers tap their phone on the coaster. Your menu appears instantly. They browse, order, and pay — without leaving their seat.',
    detail: 'No app download. Works on any modern smartphone.',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="py-28 px-6 relative overflow-hidden" style={{ background: '#ffffff' }}>
      <div
        aria-hidden
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${PINK_RGB},0.05) 0%, transparent 70%)` }}
      />

      <div ref={ref} className="max-w-[1200px] mx-auto relative">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-3" style={{ color: PINK }}>
            How It Works
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-5" style={{ color: '#1a1a1a' }}>
            Up and running in a <span style={{ color: PINK }}>day</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#6b7280' }}>
            Getting started with Naira is simpler than printing a new menu.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="hidden md:block absolute top-14 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px"
            style={{ background: `linear-gradient(to right, transparent, rgba(${PINK_RGB},0.30), transparent)` }}
          />

          <div className="grid md:grid-cols-3 gap-10 relative">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  className="relative p-7"
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: 16,
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  whileHover={{
                    y: -4,
                    boxShadow: `0 8px 24px rgba(${PINK_RGB},0.10), 0 16px 48px rgba(${PINK_RGB},0.06)`,
                  }}
                >
                  {/* Step number + icon */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-12 h-12 flex items-center justify-center"
                        style={{
                          background: `rgba(${PINK_RGB},0.10)`,
                          border: `1px solid rgba(${PINK_RGB},0.22)`,
                          borderRadius: 12,
                        }}
                      >
                        <Icon size={20} style={{ color: PINK }} />
                      </div>
                    </div>
                    <span
                      className="font-mono text-5xl font-medium select-none"
                      style={{ color: 'rgba(255,43,163,0.12)' }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mb-3" style={{ color: '#1a1a1a' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#6b7280' }}>
                    {step.description}
                  </p>
                  <p className="text-xs italic pl-3" style={{ color: '#9ca3af', borderLeft: `2px solid rgba(${PINK_RGB},0.30)` }}>
                    {step.detail}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
