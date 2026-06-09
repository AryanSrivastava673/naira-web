'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const B_LIGHT = '#34D399'
const B_RGB = '16,185,129'

const pillars = [
  {
    title: 'Setup in under a week',
    desc: 'We configure your dashboard, menu, and integrations. You just show up on day one.',
  },
  {
    title: 'No lock-in, ever',
    desc: 'Month-to-month. No contracts, no exit fees. Stay because it works, not because you\'re stuck.',
  },
  {
    title: 'Real humans on support',
    desc: 'WhatsApp, phone, or email during service hours. Under 10 minutes average response at peak.',
  },
  {
    title: 'Built for Indian restaurants',
    desc: 'GST-native, aggregator-ready, multi-cuisine — not a foreign POS retrofitted for India.',
  },
]

export default function BillingStats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-20 px-6 bg-naira-black" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: `rgba(${B_RGB},0.12)` }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className="bg-naira-black px-6 py-7"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <div
                className="w-7 h-0.5 mb-4 rounded-full"
                style={{ background: `rgba(${B_RGB},0.5)` }}
              />
              <h3 className="text-base font-semibold text-naira-text mb-2">{p.title}</h3>
              <p className="text-xs text-naira-text-muted leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
