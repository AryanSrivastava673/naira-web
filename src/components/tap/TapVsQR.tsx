'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { X, Check, QrCode, Wifi } from 'lucide-react'

const rows = [
  { category: 'Time to open',     qr: '3–6 seconds of hunting and scanning',    tap: 'Under 1 second' },
  { category: 'User actions',     qr: 'Open camera → aim → wait → click link',  tap: 'Bring phone near. Done.' },
  { category: 'Dim lighting',     qr: 'Fails on glossy / laminated surfaces',    tap: 'Works perfectly every time' },
  { category: 'Menu currency',    qr: 'Reprint or manual QR update required',   tap: 'Live — always current' },
  { category: 'Brand perception', qr: 'Generic, budget, dated',                  tap: 'Premium, modern, memorable' },
  { category: 'Paper waste',      qr: 'Still reprinting twice a year',           tap: 'Zero paper, forever' },
]

export default function TapVsQR() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="compare" className="py-28 px-6 bg-naira-surface" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-5">
            QR vs Tap
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-medium tracking-tighter"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Why QR is{' '}
            <span className="text-gold-gradient">holding you back</span>
          </h2>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-naira-border overflow-hidden"
          style={{ boxShadow: '0 0 40px rgba(var(--accent-rgb),0.05)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-naira-card border-b border-naira-border">
            <div className="p-5" />
            <div className="p-5 border-l border-naira-border flex flex-col items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(239,68,68,0.1)' }}
              >
                <QrCode size={16} className="text-red-400" />
              </div>
              <span className="text-naira-muted text-xs font-semibold tracking-widest uppercase">QR Code</span>
            </div>
            <div
              className="p-5 border-l border-naira-border flex flex-col items-center gap-2"
              style={{ background: 'rgba(var(--accent-rgb),0.05)' }}
            >
              {/* Top accent line on winning column */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
              />
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center relative"
                style={{ background: 'rgba(var(--accent-rgb),0.15)' }}
              >
                <Wifi size={16} style={{ color: 'var(--accent)' }} />
              </div>
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: 'var(--accent-light)' }}
              >
                Naira Tap
              </span>
            </div>
          </div>

          {rows.map((row, i) => (
            <div
              key={row.category}
              className="grid grid-cols-3 border-b border-naira-border last:border-b-0"
              style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}
            >
              <div className="p-5 text-naira-text-muted text-sm font-medium flex items-center">
                {row.category}
              </div>
              <div className="p-5 border-l border-naira-border flex items-start gap-2 justify-center">
                <X size={13} className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-naira-text-muted text-xs leading-relaxed">{row.qr}</span>
              </div>
              <div
                className="p-5 border-l border-naira-border flex items-start gap-2 justify-center"
                style={{ background: 'rgba(var(--accent-rgb),0.03)' }}
              >
                <Check size={13} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
                <span className="text-naira-text text-xs leading-relaxed">{row.tap}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
