'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Package, LayoutDashboard, Zap } from 'lucide-react'

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
    <section id="how-it-works" className="py-28 px-6 bg-naira-surface relative overflow-hidden">
      {/* Background decorative element */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-5">
            How It Works
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-medium tracking-tighter mb-5"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Up and running in a day
          </h2>
          <p className="text-naira-text-muted text-lg max-w-xl mx-auto">
            Getting started with Naira is simpler than printing a new menu.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-14 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-transparent via-naira-gold/30 to-transparent" />

          <div className="grid md:grid-cols-3 gap-10 relative">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  className="relative"
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  {/* Step number + icon */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-naira-gold/15 border border-naira-gold/30 flex items-center justify-center">
                        <Icon size={20} className="text-naira-gold" />
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-naira-black border border-naira-gold/40 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-naira-gold">{i + 1}</span>
                      </div>
                    </div>
                    <span
                      className="text-5xl font-bold text-naira-border/60 font-display select-none"
                      style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-semibold text-naira-text mb-3"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-naira-text-muted text-sm leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <p className="text-xs text-naira-muted border-l-2 border-naira-gold/30 pl-3 italic">
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
