'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

function PhoneMockup() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow */}
      <div
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${PINK_RGB},0.18) 0%, transparent 70%)` }}
      />

      {/* Phone shell */}
      <div
        className="relative w-56 rounded-[2.8rem] overflow-hidden"
        style={{
          background: '#111',
          border: '2px solid rgba(255,255,255,0.12)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)',
          height: '27rem',
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 rounded-b-2xl z-10" style={{ background: '#111' }} />

        {/* Status bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-1">
          <span className="text-white text-[10px] font-semibold">9:41</span>
          <span className="text-white/60 text-[10px]">●●●</span>
        </div>

        {/* NFC tap notification */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mx-3 mb-2 px-3 py-2 rounded-xl flex items-center gap-2"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)' }}
        >
          <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: PINK }}>
            <span className="text-white font-bold text-[10px]">N</span>
          </div>
          <div>
            <div className="text-white text-[10px] font-semibold leading-none mb-0.5">Naira Tap</div>
            <div className="text-white/55 text-[9px] leading-none">Tap to open menu →</div>
          </div>
          <div className="ml-auto">
            <div
              className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: `rgba(${PINK_RGB},0.2)`, color: PINK }}
            >
              &lt;1s
            </div>
          </div>
        </motion.div>

        {/* Menu content */}
        <div className="mx-3 rounded-xl overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="px-3 py-2.5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div className="text-white text-[11px] font-bold">The Grand Spice</div>
              <div className="text-[9px] font-mono font-medium tracking-widest mt-0.5" style={{ color: PINK }}>OPENED VIA TAP</div>
            </div>
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: PINK }}>
              <span className="text-white font-black text-[9px]">N</span>
            </div>
          </div>

          {[
            { name: 'Dal Makhani', desc: 'Black lentils', price: '₹380', hot: true },
            { name: 'Paneer Tikka', desc: 'Chargrilled', price: '₹320' },
            { name: 'Rogan Josh', desc: "Chef's pick", price: '₹680', special: true },
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.12 }}
              className="flex items-center justify-between px-3 py-2"
              style={{ borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
            >
              <div>
                <div className="text-white text-[10px] font-semibold">{item.name}</div>
                <div className="text-white/45 text-[9px]">{item.desc}</div>
              </div>
              <div className="flex items-center gap-1.5">
                {item.special && (
                  <span className="text-[7px] font-mono px-1 py-0.5 rounded" style={{ background: `rgba(${PINK_RGB},0.15)`, color: PINK }}>
                    PICK
                  </span>
                )}
                <span className="text-white text-[10px] font-bold">{item.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom coaster label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-1"
        >
          <div
            className="px-3 py-1 rounded-full text-[9px] font-mono font-semibold tracking-widest"
            style={{ background: `rgba(${PINK_RGB},0.12)`, color: PINK, border: `1px solid rgba(${PINK_RGB},0.25)` }}
          >
            TAP TO MENU
          </div>
        </motion.div>
      </div>

      {/* Coaster below phone */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute -bottom-6 w-32 h-8 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #1e1e1e, #2a2a2a)',
          border: `1px solid rgba(${PINK_RGB},0.35)`,
          boxShadow: `0 0 20px rgba(${PINK_RGB},0.15)`,
        }}
      >
        <span className="text-[9px] font-mono font-bold tracking-widest" style={{ color: PINK }}>NAIRA TAP</span>
      </motion.div>
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
