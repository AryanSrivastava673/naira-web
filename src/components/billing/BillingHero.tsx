'use client'

import { motion } from 'framer-motion'

const B = '#10B981'
const B_LIGHT = '#34D399'
const B_DARK = '#059669'
const B_RGB = '16,185,129'

function DashboardVisual() {
  const orders = [
    { id: '#1042', desc: 'Butter Chicken + Naan', amount: '₹760', source: 'Dine-in' },
    { id: '#1041', desc: 'Biryani + Raita', amount: '₹1,890', source: 'Swiggy' },
    { id: '#1040', desc: 'Dal Makhani + Roti', amount: '₹520', source: 'Zomato' },
  ]

  const sourceStyle = (s: string) =>
    s === 'Dine-in'
      ? { bg: `rgba(${B_RGB},0.15)`, text: B_LIGHT }
      : s === 'Swiggy'
        ? { bg: 'rgba(255,102,0,0.15)', text: '#FF9944' }
        : { bg: 'rgba(220,50,50,0.15)', text: '#FF6666' }

  return (
    <div className="relative flex items-center justify-center w-full h-[480px]">
      {/* Ambient glow */}
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${B_RGB},0.14) 0%, transparent 70%)` }}
      />

      {/* Dashboard card */}
      <motion.div
        className="relative w-full max-w-[340px] rounded-2xl overflow-hidden z-10"
        style={{
          background: '#1B1528',
          border: `1px solid rgba(${B_RGB},0.28)`,
          boxShadow: `0 0 60px rgba(${B_RGB},0.1), 0 24px 60px rgba(0,0,0,0.5)`,
        }}
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Header */}
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ borderBottom: `1px solid rgba(${B_RGB},0.12)` }}
        >
          <span className="text-[11px] font-medium text-naira-text-muted">
            Live Dashboard — Today, 8:42 PM
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: B }} />
            <span className="text-[10px]" style={{ color: B_LIGHT }}>Live</span>
          </span>
        </div>

        {/* Key metrics */}
        <div
          className="grid grid-cols-3"
          style={{ borderBottom: `1px solid rgba(${B_RGB},0.08)` }}
        >
          {[
            { label: 'Revenue', value: '₹42,850' },
            { label: 'Orders', value: '67' },
            { label: 'Avg. Order', value: '₹639' },
          ].map((m, i) => (
            <div
              key={m.label}
              className="p-3 text-center"
              style={{ borderRight: i < 2 ? `1px solid rgba(${B_RGB},0.08)` : 'none' }}
            >
              <div className="text-sm font-bold text-naira-text">{m.value}</div>
              <div className="text-[10px] text-naira-text-muted mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div
          className="px-4 py-3"
          style={{ borderBottom: `1px solid rgba(${B_RGB},0.08)` }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-naira-text-muted">Today vs. target</span>
            <span className="text-[10px] font-semibold" style={{ color: B_LIGHT }}>86%</span>
          </div>
          <div className="h-1.5 rounded-full bg-naira-card overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${B_DARK}, ${B})` }}
              initial={{ width: 0 }}
              animate={{ width: '86%' }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Orders list */}
        <div className="px-4 py-3 space-y-2.5">
          {orders.map((o) => {
            const c = sourceStyle(o.source)
            return (
              <div key={o.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[10px] font-mono text-naira-muted flex-shrink-0">{o.id}</span>
                  <span className="text-[11px] text-naira-text-muted truncate">{o.desc}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{ background: c.bg, color: c.text }}
                  >
                    {o.source}
                  </span>
                  <span className="text-[11px] font-semibold text-naira-text">{o.amount}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* GST badge */}
        <div
          className="mx-4 mb-4 px-3 py-2 rounded-xl flex items-center justify-between"
          style={{
            background: `rgba(${B_RGB},0.07)`,
            border: `1px solid rgba(${B_RGB},0.18)`,
          }}
        >
          <span className="text-[11px] font-semibold" style={{ color: B_LIGHT }}>✓ GST Ready</span>
          <span className="text-[10px] text-naira-text-muted">Auto CGST & SGST</span>
        </div>
      </motion.div>

      {/* Floating pill */}
      <motion.div
        className="absolute bottom-8 -left-2 px-3 py-1.5 rounded-full text-[10px] font-semibold whitespace-nowrap z-20"
        style={{
          background: `rgba(${B_RGB},0.14)`,
          border: `1px solid rgba(${B_RGB},0.32)`,
          color: B_LIGHT,
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4, type: 'spring' }}
      >
        ⚡ Updates in real-time
      </motion.div>

      {/* Label */}
      <div
        className="absolute bottom-1 text-[10px] tracking-widest uppercase font-medium"
        style={{ color: 'var(--text-muted)' }}
      >
        Naira Billing Dashboard
      </div>
    </div>
  )
}

export default function BillingHero() {
  const pills = [
    'Digital Billing', 'KOT System', 'Menu Management',
    'GST Invoicing', 'Zomato & Swiggy', 'Inventory Tracking',
    'Table Management', 'Multi-Outlet', 'Growth Reports',
  ]

  return (
    <section className="relative min-h-screen flex items-center px-6 py-28 bg-naira-black overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${B} 0%, ${B_DARK} 40%, transparent 70%)` }}
      />

      {/* Grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(${B_RGB},0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(${B_RGB},0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full border text-xs font-medium tracking-widest uppercase mb-10"
                style={{ borderColor: `rgba(${B_RGB},0.3)`, color: B_LIGHT }}
              >
                Naira Billing — Cloud POS
              </span>
            </motion.div>

            <motion.h1
              className="font-display font-medium tracking-tighter leading-tight mb-7"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="text-4xl md:text-6xl block text-naira-text">A Smart Solution</span>
              <span className="text-xl md:text-2xl font-normal italic text-naira-text-muted block mt-3 mb-3">
                for all your billing problems.
              </span>
              <span className="text-3xl md:text-5xl block" style={{ color: B_LIGHT }}>
                Built for India.
              </span>
            </motion.h1>

            <motion.p
              className="text-naira-text-muted text-lg leading-relaxed mb-8 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Real-time analytics, Zomato & Swiggy sync, printed GST invoices, and monthly growth reports.{' '}
              <span style={{ color: B_LIGHT }}>All in one place.</span>
            </motion.p>

            {/* Feature pills */}
            <motion.div
              className="flex flex-wrap gap-2 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                  style={{
                    background: `rgba(${B_RGB},0.08)`,
                    border: `1px solid rgba(${B_RGB},0.2)`,
                    color: B_LIGHT,
                  }}
                >
                  {pill}
                </span>
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
                className="px-8 py-4 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: `linear-gradient(135deg, ${B_DARK} 0%, ${B} 100%)`,
                  color: '#F0E9DE',
                  boxShadow: `0 0 0 1px rgba(${B_RGB},0.35), 0 4px 24px rgba(${B_RGB},0.25)`,
                }}
              >
                Book a free demo
              </a>
              <a
                href="#features"
                className="px-8 py-4 rounded-full border border-naira-border text-sm font-semibold text-naira-text-muted hover:text-naira-text transition-colors"
              >
                Explore features
              </a>
            </motion.div>
          </div>

          {/* Right — dashboard visual */}
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
