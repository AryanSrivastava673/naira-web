'use client'

import { motion } from 'framer-motion'

const PINK = '#ff2ba3'
const PINK_HOVER = '#e6258f'
const PINK_RGB = '255,43,163'

function ConstellationBg() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="constellation-hero" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="30" r="1.4" fill={`rgba(${PINK_RGB},0.18)`} />
          <circle cx="80" cy="60" r="1" fill={`rgba(${PINK_RGB},0.12)`} />
          <circle cx="40" cy="90" r="1.6" fill={`rgba(${PINK_RGB},0.14)`} />
          <circle cx="100" cy="20" r="0.9" fill={`rgba(${PINK_RGB},0.10)`} />
          <line x1="20" y1="30" x2="80" y2="60" stroke={`rgba(${PINK_RGB},0.06)`} strokeWidth="0.5" />
          <line x1="80" y1="60" x2="40" y2="90" stroke={`rgba(${PINK_RGB},0.06)`} strokeWidth="0.5" />
          <line x1="80" y1="60" x2="100" y2="20" stroke={`rgba(${PINK_RGB},0.06)`} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#constellation-hero)" />
    </svg>
  )
}

function DashboardVisual() {
  const orders = [
    { id: '#1042', desc: 'Butter Chicken + Naan', amount: '₹760', source: 'Dine-in' },
    { id: '#1041', desc: 'Biryani + Raita', amount: '₹1,890', source: 'Swiggy' },
    { id: '#1040', desc: 'Dal Makhani + Roti', amount: '₹520', source: 'Zomato' },
  ]

  const sourceStyle = (s: string) =>
    s === 'Dine-in'
      ? { bg: `rgba(${PINK_RGB},0.15)`, text: PINK }
      : s === 'Swiggy'
        ? { bg: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.75)' }
        : { bg: 'rgba(255,255,255,0.05)', text: 'rgba(255,255,255,0.55)' }

  return (
    <div className="relative flex items-center justify-center w-full h-[480px]">
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${PINK_RGB},0.18) 0%, transparent 70%)` }}
      />

      <motion.div
        className="glass-dark relative w-full max-w-[340px] overflow-hidden z-10"
        style={{
          borderRadius: 20,
          boxShadow: `0 8px 24px rgba(${PINK_RGB},0.10), 0 16px 48px rgba(${PINK_RGB},0.06)`,
        }}
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-white/70">
            Live Dashboard · Today, 8:42 PM
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: PINK }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: PINK }}>Live</span>
          </span>
        </div>

        <div
          className="grid grid-cols-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            { label: 'Revenue', value: '₹42,850' },
            { label: 'Orders', value: '67' },
            { label: 'Avg. Order', value: '₹639' },
          ].map((m, i) => (
            <div
              key={m.label}
              className="p-3 text-center"
              style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
            >
              <div className="font-mono text-sm font-medium text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
              <div className="text-[10px] text-white/60 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        <div
          className="px-4 py-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-white/60">Today vs. target</span>
            <span className="font-mono text-[10px] font-medium" style={{ color: PINK, fontVariantNumeric: 'tabular-nums' }}>86%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: PINK }}
              initial={{ width: 0 }}
              animate={{ width: '86%' }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        <div className="px-4 py-3 space-y-2.5">
          {orders.map((o) => {
            const c = sourceStyle(o.source)
            return (
              <div key={o.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-[10px] text-white/55 flex-shrink-0">{o.id}</span>
                  <span className="text-[11px] text-white/70 truncate">{o.desc}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span
                    className="font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-[0.08em]"
                    style={{ background: c.bg, color: c.text }}
                  >
                    {o.source}
                  </span>
                  <span className="font-mono text-[11px] font-medium text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>{o.amount}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className="mx-4 mb-4 px-3 py-2 rounded-xl flex items-center justify-between"
          style={{
            background: `rgba(${PINK_RGB},0.08)`,
            border: `1px solid rgba(${PINK_RGB},0.20)`,
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] font-medium" style={{ color: PINK }}>✓ GST Ready</span>
          <span className="text-[10px] text-white/60">Auto CGST &amp; SGST</span>
        </div>
      </motion.div>

      <motion.div
        className="glass-dark absolute bottom-8 -left-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] font-medium whitespace-nowrap z-20"
        style={{
          borderRadius: 999,
          color: PINK,
          border: `1px solid rgba(${PINK_RGB},0.35)`,
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4, type: 'spring' }}
      >
        Updates in real-time
      </motion.div>

      <div className="absolute bottom-1 font-mono text-[10px] tracking-[0.12em] uppercase font-medium text-white/45">
        Naira Billing Dashboard
      </div>
    </div>
  )
}

export default function BillingHero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 py-32 overflow-hidden" style={{ background: '#0a0a0a' }}>
      <ConstellationBg />

      <div
        aria-hidden
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${PINK_RGB},0.10) 0%, transparent 70%)` }}
      />

      <div className="max-w-[1200px] mx-auto w-full relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          <div>
            <span
              className="md:hidden font-mono inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium tracking-[0.12em] uppercase mb-5"
              style={{ background: `rgba(${PINK_RGB},0.12)`, color: '#ff80c8', border: `1px solid rgba(${PINK_RGB},0.25)` }}
            >
              Naira Billing
            </span>

            <motion.h1
              className="font-sans mb-6"
              style={{ fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.04em', marginTop: '-2px' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="block" style={{ color: PINK, fontSize: 'clamp(4.5rem, 9vw, 8.5rem)' }}>
                Naira
              </span>
              <span className="block" style={{ color: '#ffffff', fontSize: 'clamp(4.5rem, 9vw, 8.5rem)' }}>
                Billing<span style={{ color: PINK }}>.</span>
              </span>
            </motion.h1>

            <motion.h2
              className="font-sans mb-5"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', fontWeight: 600, letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1.2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A smart solution for all your{' '}
              <span style={{ color: PINK }}>billing problems.</span>
            </motion.h2>

            <motion.p
              className="text-white/75 text-sm md:text-base leading-relaxed mb-8 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              The best point of sale system for bar, restaurant, cafe, and cafeteria operations. Real-time restaurant analytics, Zomato &amp; Swiggy sync, printed GST invoices, and monthly growth reports. Built for Indian food businesses that want to stop guessing and start growing.
            </motion.p>

            <motion.div
              className="space-y-3 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                'Real-time Zomato & Swiggy sync',
                'GST invoices, auto-calculated',
                'Monthly growth reports included',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold"
                    style={{ background: `rgba(${PINK_RGB},0.15)`, color: PINK }}
                  >
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href="#contact"
                className="px-6 py-3.5 text-sm font-semibold transition-all"
                style={{
                  background: PINK,
                  color: '#ffffff',
                  borderRadius: 12,
                  boxShadow: `0 0 40px rgba(${PINK_RGB},0.20)`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = PINK_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.background = PINK)}
              >
                Book a free demo
              </a>
              <a
                href="#features"
                className="px-6 py-3.5 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                style={{
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 12,
                }}
              >
                Explore features
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="hidden md:flex justify-center"
          >
            <DashboardVisual />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
