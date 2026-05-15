'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Wifi, ShieldCheck, TrendingUp } from 'lucide-react'

const CARDS = [
  {
    Icon: Wifi,
    title: 'No power. No wires. No maintenance.',
    body: 'NFC chips draw energy from the guest\'s phone for the 200ms they need. There\'s nothing to plug in, recharge, or replace.',
  },
  {
    Icon: ShieldCheck,
    title: 'Waterproof, scratch-resistant.',
    body: 'Spilled wine? Chai all over the table? Wipe and carry on. Rated for daily restaurant environments.',
  },
  {
    Icon: TrendingUp,
    title: 'One-time hardware, lifetime software.',
    body: 'You pay for the coasters once. Every update, feature, analytics dashboard, and photo refresh ships straight to the menu forever.',
  },
]

export default function TapHardware() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 85% 50%, rgba(255,43,163,0.07) 0%, transparent 65%), #0C1118',
      }}
    >
      <div className="max-w-5xl mx-auto relative z-10">

        <p className="text-xs font-bold tracking-widest uppercase text-naira-muted mb-3 text-center">
          Deep dive 03 · Hardware built to last
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-naira-text text-center mb-4">
          One install. No wires. Forever updates.
        </h2>
        <p className="text-naira-text-muted text-sm text-center mb-12 max-w-xl mx-auto">
          The NFC chip has no battery, no screen, no moving parts. It has no reason to fail.
          The coaster surface is made of the same stuff your best lamps and tables are. Built
          to earn a place on your table.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CARDS.map(({ Icon, title, body }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: 'rgba(30,21,32,0.55)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: 'rgba(255,43,163,0.1)',
                  border: '1px solid rgba(255,43,163,0.2)',
                }}
              >
                <Icon size={22} color="#ff2ba3" />
              </div>
              <div>
                <p className="font-semibold text-naira-text text-sm mb-2">{title}</p>
                <p className="text-xs text-naira-muted leading-relaxed">{body}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
