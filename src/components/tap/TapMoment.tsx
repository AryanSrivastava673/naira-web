'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Smartphone, Wifi, BookOpen } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Smartphone,
    headline: 'Guest brings phone close',
    body: 'No camera, no app, no QR hunt. Just their phone 3 cm above the coaster.',
  },
  {
    number: '02',
    icon: Wifi,
    headline: 'NFC activates instantly',
    body: 'The chip sends the menu URL directly to the browser. No internet needed to initiate.',
  },
  {
    number: '03',
    icon: BookOpen,
    headline: 'Full menu in under a second',
    body: "A branded, always-current menu opens. They're browsing before you take the water order.",
  },
]

export default function TapMoment() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6 bg-naira-black" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-5">
            The Moment
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Three seconds that change{' '}
            <span className="text-gold-gradient">everything</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-transparent via-naira-gold/30 to-transparent" />

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  {/* Icon box */}
                  <div className="relative flex justify-center mb-6">
                    <div
                      className="w-[104px] h-[104px] rounded-2xl flex items-center justify-center"
                      style={{
                        background: 'rgba(var(--accent-rgb),0.08)',
                        border: '1px solid rgba(var(--accent-rgb),0.25)',
                      }}
                    >
                      <Icon size={36} style={{ color: 'var(--accent)' }} />
                    </div>
                    {/* Step badge */}
                    <div
                      className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border border-naira-black"
                      style={{ background: 'var(--accent)', color: '#F0E9DE' }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  <h3
                    className="text-lg font-bold text-naira-text mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {step.headline}
                  </h3>
                  <p className="text-naira-text-muted text-sm leading-relaxed">{step.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
