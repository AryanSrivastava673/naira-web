'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

const pillars = [
  {
    title: 'Easy navigation',
    desc: 'Best POS for a bar or cafe — role-based views for owners and staff. Learn in five minutes.',
  },
  {
    title: 'All payment modes',
    desc: 'UPI, card, cash, split billing. Your customers pay however they want.',
  },
  {
    title: 'Built to your needs',
    desc: 'Bar restaurant software, cafeteria POS systems, or custom workflows. We build it for you.',
  },
  {
    title: 'Customer support',
    desc: 'Real humans on call, WhatsApp, or email. Especially during service hours.',
  },
]

export default function BillingStats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-24 px-6 relative" style={{ background: '#ffffff' }} ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[12px] tracking-[0.12em] uppercase font-medium mb-3" style={{ color: PINK }}>
            Why Naira Billing
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em]" style={{ color: '#1a1a1a' }}>
            Your restaurant <span style={{ color: PINK }}>deserves</span> this
          </h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className="p-6 transition-all"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: 16,
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              whileHover={{
                y: -4,
                boxShadow: `0 8px 24px rgba(${PINK_RGB},0.10), 0 16px 48px rgba(${PINK_RGB},0.06)`,
              }}
            >
              <div className="font-mono text-[12px] tracking-[0.12em] uppercase font-medium mb-4" style={{ color: PINK }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: '#1a1a1a' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
