'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const BULLETS = [
  {
    title: 'Protect margin on volatile ingredients',
    body: 'Paneer up ₹30 this week? Push the price change tonight. Every tap shows the new one.',
  },
  {
    title: 'Event-night specials, pushed live in seconds',
    body: 'Cricket final? Create a "Match Night" section with cocktail specials. Pull it down at midnight. Nothing prints, nothing wastes.',
  },
  {
    title: 'Sold out? Gone instantly.',
    body: 'Last portion of biryani out the kitchen? One tap on your phone hides it from the menu.',
  },
]

export default function TapMenuManagement() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 85% 50%, rgba(255,43,163,0.07) 0%, transparent 65%), #151018',
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs font-bold tracking-widest uppercase text-naira-muted mb-3">
            Deep dive 02 · Real-time control
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-naira-text mb-5 leading-tight">
            Change the whole menu from your phone in four seconds.
          </h2>

          <p className="text-naira-text-muted text-sm leading-relaxed mb-6">
            A reprint used to be a two-day operation. Now your restaurant menu management is instant.
          </p>

          <ul className="space-y-5">
            {BULLETS.map(({ title, body }, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="flex items-start gap-4"
              >
                <span
                  className="mt-0.5 w-5 h-5 rounded-lg shrink-0 flex items-center justify-center"
                  style={{ background: 'rgba(255,43,163,0.12)', border: '1px solid rgba(255,43,163,0.25)' }}
                >
                  <span style={{ color: '#ff2ba3', fontSize: '8px' }}>✓</span>
                </span>
                <div>
                  <p className="text-naira-text font-semibold text-sm mb-1">{title}</p>
                  <p className="text-naira-muted text-xs leading-relaxed">{body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <Image
            src="/tap/menu-management-sync.jpg"
            alt="Menu management screen with instant sync to coasters across outlets"
            width={640}
            height={480}
            className="w-full rounded-2xl object-cover"
            style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
          />
        </motion.div>

      </div>
    </section>
  )
}
