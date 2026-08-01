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
          '#0a0a0a',
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase text-naira-muted mb-3">
            Deep dive 02 · Real-time control
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] text-naira-text mb-5 leading-tight">
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
          className="relative"
        >
          {/* Pink ambient glow behind */}
          <div
            aria-hidden
            className="absolute -inset-10 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,43,163,0.18) 0%, transparent 65%)',
              filter: 'blur(20px)',
              zIndex: 0,
            }}
          />

          {/* Offset accent panel (mirrored — tilts the opposite way so the two deep-dive images don't feel like the same gesture) */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: 'translate(-14px, 16px) rotate(1.4deg)',
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,43,163,0.10) 100%)',
              border: '1px solid rgba(255,43,163,0.18)',
              borderRadius: 20,
              zIndex: 1,
            }}
          />

          {/* Image frame — inset highlight + pink-tinted elevation */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative overflow-hidden"
            style={{
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow:
                '0 0 0 1px rgba(255,43,163,0.10), 0 8px 24px rgba(255,43,163,0.18), 0 24px 64px rgba(255,43,163,0.10), 0 40px 80px rgba(0,0,0,0.5)',
              zIndex: 2,
            }}
          >
            <Image
              src="/tap/menu-management-sync.jpg"
              alt="Menu management screen with instant sync to coasters across outlets"
              width={640}
              height={480}
              className="w-full block object-cover"
            />
            {/* Inset top highlight */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14)',
                borderRadius: 20,
              }}
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
