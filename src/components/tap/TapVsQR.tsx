'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Wifi } from 'lucide-react'

const ROWS = [
  { feature: 'Time to menu open',         old: '3 to 6 seconds, sometimes more',              tap: 'Under 1 second' },
  { feature: 'Actions the guest takes',   old: 'Unlock, camera app, aim, wait, tap link',     tap: 'Tap. Done.' },
  { feature: 'Works in dim lighting',     old: "Struggles. Camera can't focus.",               tap: 'Perfect every time' },
  { feature: 'Menu always current',       old: 'Depends on last reprint',                     tap: 'Live, every tap' },
  { feature: 'Brand feel on the table',   old: 'Same as a petrol pump receipt',               tap: 'Bespoke to your restaurant' },
  { feature: 'Paper used per year',       old: 'Hundreds of pages',                           tap: 'Zero' },
]

export default function TapVsQR() {
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
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase text-naira-muted mb-3 text-center">
            QR vs. Naira Tap
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] text-naira-text text-center mb-3">
            A side-by-side no one can argue with.
          </h2>
          <p className="text-naira-text-muted text-sm text-center mb-12 max-w-xl mx-auto">
            You already have a QR somewhere on your table. Here&apos;s how contactless ordering
            in restaurants stacks up when you compare the old way to the new way, honestly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-2xl border border-naira-border overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1.4fr)] bg-naira-card border-b border-naira-border">
            <div className="p-4 text-xs font-bold text-naira-muted uppercase tracking-wide">
              What guests experience
            </div>
            <div className="p-4 text-xs font-bold text-red-400 uppercase tracking-wide flex items-center gap-2 border-l border-naira-border">
              <span className="text-base">▣</span>
              Old QR sticker
            </div>
            <div className="p-4 text-xs font-bold text-naira-gold uppercase tracking-wide flex items-center gap-2 border-l border-naira-border">
              <Wifi size={14} color="#ff2ba3" />
              Naira Tap
            </div>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1.4fr)] border-b border-naira-border last:border-0 ${
                i % 2 === 0 ? 'bg-naira-black' : 'bg-naira-surface'
              }`}
            >
              <div className="p-4 text-sm font-semibold text-naira-text">{row.feature}</div>
              <div className="p-4 text-sm text-naira-muted border-l border-naira-border leading-snug">{row.old}</div>
              <div className="p-4 text-sm font-semibold border-l border-naira-border leading-snug" style={{ color: '#ff2ba3' }}>
                {row.tap}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-10">
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
            style={{
              background: 'rgba(255,43,163,0.08)',
              border: '1px solid rgba(255,43,163,0.28)',
              boxShadow: '0 6px 24px -8px rgba(255,43,163,0.35)',
            }}
          >
            <span
              className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(255,43,163,0.18)',
                color: '#ff80c8',
              }}
            >
              Also Available
            </span>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Prefer QR? We offer that too —{' '}
              <a
                href="/contact"
                className="font-semibold underline underline-offset-2 transition-colors"
                style={{ color: '#ff2ba3' }}
              >
                get in touch
              </a>
              .
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
