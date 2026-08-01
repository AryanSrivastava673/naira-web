'use client'

import { motion } from 'framer-motion'

const products = [
  { name: 'Naira Tap', desc: 'NFC digital menus', color: 'var(--accent)', rgb: 'var(--accent-rgb)' },
  { name: 'Naira Billing', desc: 'Cloud POS', color: '#ff2ba3', rgb: '255,43,163' },
  { name: 'Naira Growth', desc: 'Online presence', color: '#ff2ba3', rgb: '255,43,163' },
]

export default function HIWHero() {
  return (
    <section className="relative min-h-[75vh] flex items-center px-6 py-32 overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, var(--accent) 0%, transparent 70%)' }}
      />
      {/* Grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(var(--accent-rgb),0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--accent-rgb),0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono inline-block px-3 py-1 rounded-[8px] bg-[rgba(255,43,163,0.12)] text-[#ff2ba3] text-[12px] font-medium tracking-[0.12em] uppercase mb-8">
            How It Works
          </span>
        </motion.div>

        <motion.h1
          className="font-sans font-bold tracking-[-0.02em] leading-tight mb-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="text-4xl md:text-6xl block text-naira-text">
            From first tap to full analytics.
          </span>
          <span className="text-2xl md:text-3xl font-normal italic text-naira-text-muted block mt-4">
            Here&apos;s exactly how Naira works.
          </span>
        </motion.h1>

        <motion.p
          className="text-naira-text-muted text-lg leading-relaxed mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Three products. One platform. Set up in under a week — with a dedicated team handling everything for you.
        </motion.p>

        {/* Product badges */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{
                background: `rgba(${typeof p.rgb === 'string' && p.rgb.startsWith('var') ? '255,43,163' : p.rgb},0.07)`,
                border: `1px solid rgba(${typeof p.rgb === 'string' && p.rgb.startsWith('var') ? '255,43,163' : p.rgb},0.2)`,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: p.color }}
              />
              <div className="text-left">
                <div className="text-sm font-semibold text-naira-text">{p.name}</div>
                <div className="text-[10px] text-naira-text-muted">{p.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
