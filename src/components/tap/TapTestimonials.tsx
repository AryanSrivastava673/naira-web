'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CASES = [
  {
    restaurant: 'Aish Kitchen, Bandra',
    metric: '+22% AOV',
    metricLabel: '90 days post-switch',
    quote:
      '"The coaster alone gets photographed. Guests post it before the food arrives."',
  },
  {
    restaurant: 'The Grain Table, Koregaon Park',
    metric: '₹46k saved',
    metricLabel: 'on printing, year one',
    quote:
      '"We used to reprint every six weeks. Now I update the whole menu in 4 seconds from my phone."',
  },
  {
    restaurant: 'Cafe Nord, Vagator',
    metric: '+18%',
    metricLabel: 'walk-in conversion',
    quote:
      '"Multilingual switching was the game-changer. Our French guests felt seen. They spend more when they feel seen."',
  },
]

export default function TapTestimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(255,43,163,0.06) 0%, transparent 65%), #0C1118',
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">

        <p className="text-xs font-medium tracking-widest uppercase text-naira-muted mb-3 text-center">
          From the field
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tighter text-naira-text text-center mb-12">
          Restaurants that made the switch.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="rounded-2xl p-8 flex flex-col gap-4"
              style={{
                background: 'rgba(30,21,32,0.55)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
            >
              <div>
                <div className="font-display text-3xl font-medium tracking-tighter text-naira-gold">{c.metric}</div>
                <div className="text-xs text-naira-muted mt-0.5">{c.metricLabel}</div>
              </div>

              <p className="text-naira-text-muted text-sm leading-relaxed italic flex-1">{c.quote}</p>

              <p className="text-xs font-semibold text-naira-text-muted pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                {c.restaurant}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
