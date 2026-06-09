'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Palette, UtensilsCrossed, MapPin } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: Palette,
    title: 'Design your Tap',
    desc: 'Choose your finish, form factor, and upload your logo. We produce a render for your approval before anything is manufactured.',
    detail: 'Five finishes. Four form factors. Your brand, perfectly.',
  },
  {
    step: '02',
    icon: UtensilsCrossed,
    title: 'We build your menu',
    desc: 'Share your existing menu or start fresh. We photograph dishes, configure categories, set up upsells, and push it live.',
    detail: 'Fully done for you. Zero tech knowledge needed.',
  },
  {
    step: '03',
    icon: MapPin,
    title: 'Place & tap',
    desc: "Coasters arrive within 7 days. Place them on tables. Your first guest taps. That's it — you're live.",
    detail: 'From sign-up to live in under a week.',
  },
]

export default function TapProcess() {
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
            Getting Started
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-medium tracking-tighter"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Live in{' '}
            <span className="text-gold-gradient">under a week</span>
          </h2>
          <p className="text-naira-text-muted text-lg mt-4 max-w-lg mx-auto">
            Getting started with Naira Tap is simpler than printing a new menu.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-transparent via-naira-gold/30 to-transparent" />

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  className="relative"
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  {/* Icon + step badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-[104px] h-[104px] rounded-2xl flex items-center justify-center"
                        style={{
                          background: 'rgba(var(--accent-rgb),0.08)',
                          border: '1px solid rgba(var(--accent-rgb),0.22)',
                        }}
                      >
                        <Icon size={36} style={{ color: 'var(--accent)' }} />
                      </div>
                      <div
                        className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border border-naira-black"
                        style={{ background: 'var(--accent)', color: '#F0E9DE' }}
                      >
                        {i + 1}
                      </div>
                    </div>
                  </div>

                  <h3
                    className="text-xl font-semibold text-naira-text mb-3"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-naira-text-muted text-sm leading-relaxed mb-3">{step.desc}</p>
                  <p className="text-xs text-naira-muted border-l-2 border-naira-gold/30 pl-3 italic">
                    {step.detail}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold"
            style={{
              background: 'linear-gradient(135deg, var(--accent-dark) 0%, var(--accent) 100%)',
              color: '#F0E9DE',
              boxShadow: '0 4px 20px rgba(var(--accent-rgb),0.22)',
            }}
          >
            Start my setup →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
