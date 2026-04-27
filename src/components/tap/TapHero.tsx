'use client'

import { motion } from 'framer-motion'

function CoasterVisual() {
  return (
    <div className="relative flex items-center justify-center w-full h-[420px]">
      {/* Ambient glow behind coaster */}
      <div
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(var(--accent-rgb),0.18) 0%, transparent 70%)' }}
      />

      {/* Pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: `${200 + i * 70}px`,
            height: `${200 + i * 70}px`,
            borderColor: `rgba(var(--accent-rgb), ${0.22 - i * 0.06})`,
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 2.8, delay: i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Coaster */}
      <div
        className="relative w-48 h-48 rounded-full flex flex-col items-center justify-center gap-2 z-10"
        style={{
          background: 'radial-gradient(circle at 38% 32%, #221020, #0C1118)',
          border: '1px solid rgba(var(--accent-rgb),0.35)',
          boxShadow: '0 0 60px rgba(var(--accent-rgb),0.18), inset 0 0 40px rgba(0,0,0,0.6)',
        }}
      >
        {/* Inner ring */}
        <div
          className="absolute w-36 h-36 rounded-full"
          style={{ border: '1px solid rgba(var(--accent-rgb),0.12)' }}
        />
        {/* NFC symbol */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <path d="M10 7 L10 37" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          <path d="M10 13 Q30 13 30 22 Q30 31 10 31" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M10 19 Q22 19 22 22 Q22 25 10 25" stroke="var(--accent-light)" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
        <span
          className="text-[9px] tracking-[0.2em] uppercase font-semibold"
          style={{ color: 'var(--accent-light)' }}
        >
          Tap Here
        </span>
      </div>

      {/* Floating phone */}
      <motion.div
        className="absolute -top-4 right-8 z-20"
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            width: 72,
            height: 132,
            borderRadius: 18,
            background: 'linear-gradient(160deg, #1E1520, #0C1118)',
            border: '1.5px solid rgba(var(--accent-rgb),0.3)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.7), 0 0 20px rgba(var(--accent-rgb),0.12)',
          }}
        >
          {/* Dynamic island */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full bg-black"
            style={{ width: 28, height: 7 }}
          />
          {/* Screen content */}
          <div
            className="absolute rounded-xl overflow-hidden"
            style={{ inset: 5, top: 14, background: '#F5EEE6' }}
          >
            <div className="h-full p-1.5 space-y-1.5">
              <div
                className="h-4 rounded-md"
                style={{ background: 'var(--accent)', opacity: 0.85 }}
              />
              {['75%', '60%', '85%', '50%', '70%', '65%'].map((w, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded"
                  style={{ width: w, background: i % 2 === 0 ? '#D4C8BA' : '#E8DDD5' }}
                />
              ))}
              <div className="h-4 rounded-md mt-1" style={{ background: 'rgba(var(--accent-rgb),0.15)' }} />
            </div>
          </div>
        </div>

        {/* "Under 1s" pop */}
        <motion.div
          className="absolute -bottom-3 -left-16 px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap"
          style={{
            background: 'rgba(var(--accent-rgb),0.15)',
            border: '1px solid rgba(var(--accent-rgb),0.35)',
            color: 'var(--accent-light)',
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.4, type: 'spring' }}
        >
          ⚡ Under 1 second
        </motion.div>
      </motion.div>

      {/* Brand label below coaster */}
      <div
        className="absolute bottom-6 text-xs tracking-widest uppercase font-medium"
        style={{ color: 'var(--text-muted)' }}
      >
        Naira Tap Coaster
      </div>
    </div>
  )
}

export default function TapHero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 py-28 bg-naira-black overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, var(--accent-dark) 40%, transparent 70%)' }}
      />

      {/* Grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(var(--accent-rgb),0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--accent-rgb),0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-10">
                Naira Tap — NFC Digital Menu
              </span>
            </motion.div>

            <motion.h1
              className="font-display font-bold leading-tight mb-7"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="text-4xl md:text-6xl block">It is 2026.</span>
              <span className="text-xl md:text-2xl font-normal italic text-naira-text-muted block mt-3 mb-3">
                Is there still a peeling QR sticker on your table?
              </span>
              <span className="text-3xl md:text-5xl block text-gold-gradient">
                It&apos;s time to upgrade.
              </span>
            </motion.h1>

            <motion.p
              className="text-naira-text text-lg leading-relaxed mb-10 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Guests tap their phone.{' '}
              <span style={{ color: 'var(--accent)' }}>Menu appears instantly.</span>
              {' '}No app. No scan. No paper. Ever.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <a
                href="#roi"
                className="px-8 py-4 rounded-full text-sm font-semibold"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-dark) 0%, var(--accent) 100%)',
                  color: '#F0E9DE',
                  boxShadow: '0 0 0 1px rgba(var(--accent-rgb),0.35), 0 4px 24px rgba(var(--accent-rgb),0.25)',
                }}
              >
                Show me what I&apos;m missing
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-full border border-naira-border text-sm font-semibold text-naira-text-muted hover:text-naira-text hover:border-naira-gold/40 transition-colors"
              >
                Book a free sample
              </a>
            </motion.div>
          </div>

          {/* Right — coaster visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="hidden md:block"
          >
            <CoasterVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
