'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function TapHero() {
  return (
    <section
      id="hero"
      className="relative px-6 pt-24 pb-20 min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Ambient pink glow — same treatment as the billing hero */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,43,163,0.10) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,43,163,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Full-bleed hero image */}
      <div aria-hidden className="absolute inset-0 hidden md:block">
        <Image
          src="/tap/Naira Tap hero image.PNG"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: 'right center', transform: 'translateX(5%) scale(0.88)', transformOrigin: 'right center' }}
          priority
        />
        {/* Left-to-right fade so text remains readable */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, #0a0a0a 0%, #0a0a0a 30%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.1) 75%, transparent 100%)',
        }} />
        {/* Top and bottom fades */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, #0a0a0a 0%, transparent 15%, transparent 85%, #0a0a0a 100%)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col justify-between max-w-xl min-h-[70vh] py-4"
        >
          {/* Top group — wordmark + subhead + description */}
          <div>
            {/* Eyebrow pill — mobile only */}
            <span
              className="md:hidden self-start inline-flex items-center px-3 py-1 rounded-full font-mono text-[11px] font-medium tracking-[0.12em] uppercase mb-5"
              style={{
                background: 'rgba(255,43,163,0.12)',
                color: '#ff80c8',
                border: '1px solid rgba(255,43,163,0.25)',
              }}
            >
              Naira Tap
            </span>

            <h1
              className="font-sans mb-6"
              style={{ fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.04em', marginTop: '-2px' }}
            >
              <span
                className="block"
                style={{ color: '#ff2ba3', fontSize: 'clamp(3.5rem, 7vw, 6.5rem)' }}
              >
                Naira
              </span>
              <span
                className="block"
                style={{ color: '#ffffff', fontSize: 'clamp(3.5rem, 7vw, 6.5rem)' }}
              >
                Tap<span style={{ color: '#ff2ba3' }}>.</span>
              </span>
            </h1>

            <h2
              className="font-sans mb-6"
              style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                lineHeight: 1.2,
              }}
            >
              Earn more from{' '}
              <span style={{ color: '#ff2ba3' }}>your menus.</span>
            </h2>

            <p className="text-naira-text-muted text-base md:text-lg leading-relaxed max-w-md">
              Smart pairings, auto-combos, and bestseller nudges — right when your
              guest is deciding. The only contactless dining solution that turns
              every table into a silent upsell machine.
            </p>
          </div>

          {/* Bottom group — value-prop checklist sits at the foot of the hero column */}
          <div className="space-y-3 mt-12">
            {[
              'Tap to open the menu in under a second — no app, no QR fumbling',
              'Works on every modern smartphone, with a QR fallback built in',
              'Smart upsells and live menu updates from your phone',
              'Custom-branded coasters, delivered and live in about a week',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-naira-text-muted">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold"
                  style={{ background: 'rgba(255,43,163,0.15)', color: '#ff2ba3' }}
                >
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>
        </motion.div>


      </div>

      {/* Showcase disclaimer */}
      <div className="hidden md:flex absolute bottom-5 right-6 lg:right-10 xl:right-16 items-center gap-1.5 px-3 py-1.5 rounded-full pointer-events-none max-w-[calc(100%-3rem)]"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>ⓘ</span>
        <span className="font-mono text-[10px] tracking-wide" style={{ color: 'rgba(255,255,255,0.38)' }}>
          illustrative render — final product may vary
        </span>
      </div>
    </section>
  )
}
