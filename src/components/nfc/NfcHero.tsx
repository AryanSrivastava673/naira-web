'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

const menuItems = [
  { price: '₹320', color: '#7c2d4a' },
  { price: '₹280', color: '#2d3748' },
  { price: '₹450', color: '#2d3748' },
]

// SVG QR pattern (simplified 5x5 approximation)
function QRIcon() {
  const cells = [
    [1,1,1,0,1],[1,0,1,0,1],[1,1,1,0,0],[0,0,0,0,1],[1,0,1,1,1],
  ]
  return (
    <svg width="28" height="28" viewBox="0 0 5 5" style={{ imageRendering: 'pixelated' }}>
      {cells.map((row, y) =>
        row.map((on, x) =>
          on ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="white" /> : null
        )
      )}
    </svg>
  )
}

function PhoneMockup() {
  return (
    /* Outer card */
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        backdropFilter: 'blur(12px)',
        width: 420,
        padding: '28px 28px 0 28px',
      }}
    >
      {/* Background pink glow inside card */}
      <div
        className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none"
        style={{ background: `radial-gradient(circle at 80% 80%, rgba(${PINK_RGB},0.18) 0%, transparent 65%)` }}
      />

      {/* Content row: tilted phone + NFC zone */}
      <div className="relative flex items-end gap-0" style={{ height: 340 }}>

        {/* Tilted phone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ transform: 'rotate(-10deg) translateX(-10px)', transformOrigin: 'bottom center', flexShrink: 0 }}
        >
          <div
            className="relative rounded-[2.2rem] overflow-hidden"
            style={{
              width: 200,
              height: 310,
              background: '#0f0f0f',
              border: '2px solid rgba(255,255,255,0.14)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
            }}
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-xl z-10" style={{ background: '#0f0f0f' }} />

            {/* Screen content */}
            <div className="pt-7 px-3">
              {/* Header */}
              <div className="flex items-start justify-between mb-3 px-1">
                <div>
                  <div className="text-white font-bold text-xs leading-tight">The Grand Spice</div>
                  <div className="font-mono text-[8px] tracking-widest mt-0.5" style={{ color: PINK }}>OPENED VIA TAP</div>
                </div>
              </div>

              {/* Menu items with image placeholders */}
              <div className="space-y-2">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.12 }}
                    className="flex items-center gap-2 rounded-xl px-2 py-2"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    {/* Image placeholder */}
                    <div className="w-9 h-9 rounded-lg flex-shrink-0" style={{ background: item.color }} />
                    {/* Text lines */}
                    <div className="flex-1 space-y-1">
                      <div className="h-1.5 rounded-full w-3/4" style={{ background: 'rgba(255,255,255,0.25)' }} />
                      <div className="h-1 rounded-full w-1/2" style={{ background: 'rgba(255,255,255,0.12)' }} />
                    </div>
                    <div className="text-white font-bold text-[10px] flex-shrink-0">{item.price}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* NFC tap zone — coaster visualization */}
        <div className="absolute right-0 bottom-10 flex flex-col items-center gap-2">
          {/* Pulsing dashed ring */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.12, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute rounded-full"
              style={{
                width: 120,
                height: 120,
                border: `1.5px dashed rgba(${PINK_RGB},0.55)`,
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.18, 0.06, 0.18] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="absolute rounded-full"
              style={{
                width: 150,
                height: 150,
                border: `1px dashed rgba(${PINK_RGB},0.25)`,
              }}
            />

            {/* N button */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="relative w-14 h-14 rounded-full flex items-center justify-center z-10"
              style={{
                background: PINK,
                boxShadow: `0 0 28px rgba(${PINK_RGB},0.55), 0 0 8px rgba(${PINK_RGB},0.8)`,
              }}
            >
              <span className="text-white font-black text-xl">N</span>
            </motion.div>
          </div>

          {/* TAP HERE label */}
          <span className="font-mono text-[9px] font-bold tracking-[0.18em] text-white/50">TAP HERE</span>

          {/* QR code */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="p-1.5 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <QRIcon />
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex items-center justify-between px-2 py-4 mt-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-white/40">TAP TO MENU</span>
        <span className="font-mono text-[10px] font-bold tracking-widest" style={{ color: PINK }}>&lt;1s</span>
      </div>
    </div>
  )
}

export default function NfcHero() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16 px-6"
      style={{ background: '#0a0a0a' }}
    >
      {/* Background radial */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${PINK_RGB},0.08) 0%, transparent 65%)` }}
      />
      <div aria-hidden className="absolute inset-0 constellation-bg pointer-events-none" />

      <div className="max-w-[1200px] mx-auto w-full relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase mb-5" style={{ color: PINK }}>
              NFC Compatibility
            </p>
            <h1
              className="text-white font-black mb-6 leading-[1.05]"
              style={{ fontSize: 'clamp(2.8rem,6vw,5rem)', letterSpacing: '-0.03em' }}
            >
              If it can tap to pay,{' '}
              <span style={{ color: PINK }}>it can tap your menu.</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-lg">
              Naira Tap runs on NFC — the same chip your guests already use for Google Pay, Apple Pay, and metro gates. No app. No download. The menu is open before the waiter reaches the table.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="#checker"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all"
                style={{ background: PINK, color: '#fff', boxShadow: `0 0 24px rgba(${PINK_RGB},0.30)` }}
              >
                Check your phone
              </Link>
              <Link
                href="/tap"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                See Naira Tap
              </Link>
            </div>

            <p className="text-white/35 text-xs font-mono">
              <span className="text-white/70 font-bold">700M+</span> smartphone users in India · most already tap to pay ·{' '}
              <span className="text-white/35">Statista, 2026</span>
            </p>
          </motion.div>

          {/* Right — phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end pb-8"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
