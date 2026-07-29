'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const PRODUCT_LINKS = [
  {
    dot: '#ff2ba3',
    color: '#ff2ba3',
    prefix: 'Modernise your restaurant with ',
    label: 'Naira Tap',
    href: '/tap',
  },
  {
    dot: '#e0b23d',
    color: '#e0b23d',
    prefix: 'Manage billing & operations with ',
    label: 'Naira Billing',
    href: '/billing',
  },
  {
    dot: '#9b8afb',
    color: '#9b8afb',
    prefix: 'Get found first on Google & AI search with ',
    label: 'Naira Growth',
    href: '/growth',
  },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-5 pt-28 pb-14 md:px-6 md:pt-24 md:pb-20 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Background photo — faded into the dark canvas, strongest behind the copy.
          The source photo (2400x1600, 3:2) is narrower than the hero viewport at
          "cover" scale, so object-fit:cover has zero horizontal slack to pan with —
          object-position's X value does nothing on its own. Next/Image's `fill` prop
          must fill its immediate parent with no conflicting size overrides, so the
          oversized/offset box lives on a separate wrapper div — that's what actually
          creates the pannable overflow, clipped by the outer container below. */}
      <div aria-hidden className="absolute inset-0 opacity-55 lg:opacity-85 overflow-hidden">
        <div className="absolute inset-y-0" style={{ left: '-45%', width: '145%' }}>
          <Image
            src="/hero/barista.jpg"
            alt=""
            fill
            priority
            sizes="145vw"
            className="object-cover"
            style={{
              objectPosition: '50% 22%',
              filter: 'grayscale(0.15) saturate(0.85) contrast(1.05) brightness(0.82)',
            }}
          />
        </div>
      </div>

      {/* Vignette — the copy column spans nearly the full height below lg, so this needs to
          read as a solid dark wash (with a faint photo hint up top) rather than a light vignette */}
      <div
        aria-hidden
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.9) 32%, rgba(10,10,10,0.95) 100%)',
        }}
      />

      {/* Directional fade — dark left where copy sits, image breathes on the right at lg+ */}
      <div
        aria-hidden
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.6) 45%, rgba(10,10,10,0.28) 100%)',
        }}
      />

      {/* Top/bottom fade — blends the photo into the solid black sections above and below */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, #0a0a0a 0%, transparent 14%, transparent 86%, #0a0a0a 100%)',
        }}
      />

      {/* Ambient glows — one per product color, echoing the three links below */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,43,163,0.10) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(224,178,61,0.06) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(155,138,251,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center lg:mx-0 lg:text-left"
        >
          {/* Top group — wordmark, subhead, product links */}
          <div>
            <h1
              className="font-sans mb-8"
              style={{ fontWeight: 900, lineHeight: 0.92, letterSpacing: '-3px' }}
            >
              <span
                className="block text-[clamp(4.5rem,12vw,8.5rem)]"
                style={{ color: '#ff2ba3' }}
              >
                Naira
              </span>
              <span
                className="block text-[clamp(4.5rem,12vw,8.5rem)]"
                style={{ color: '#ffffff' }}
              >
                Menus<span style={{ color: '#ff2ba3' }}>.</span>
              </span>
            </h1>

            <h2
              className="font-sans mb-9 md:mb-10 text-[clamp(1.8rem,4vw,2.8rem)]"
              style={{
                fontWeight: 800,
                letterSpacing: '-1px',
                color: '#ffffff',
                lineHeight: 1.2,
              }}
            >
              Menus. Billing. Growth.{' '}
              <span style={{ color: '#ff2ba3' }}>One platform.</span>
            </h2>

            <div className="space-y-5 md:space-y-4">
              {PRODUCT_LINKS.map((p) => (
                <div key={p.href} className="flex items-center justify-center gap-3 lg:justify-start">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: p.dot }}
                  />
                  <p className="text-naira-text-muted text-[0.96rem] lg:text-[1.08rem] leading-snug">
                    {p.prefix}
                    <a
                      href={p.href}
                      className="font-bold underline underline-offset-4 decoration-1 transition-opacity hover:opacity-75"
                      style={{ color: p.color }}
                    >
                      {p.label} ↗
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom group — CTAs anchor at the foot of the column on mobile */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 md:mt-12 lg:justify-start">
            <a
              href="#contact"
              className="relative overflow-hidden flex items-center gap-2 px-6 py-3 md:px-7 md:py-3.5 rounded-full text-base font-bold group"
              style={{
                background:
                  'linear-gradient(135deg, var(--accent-dark) 0%, var(--accent) 60%, var(--accent-light) 100%)',
                color: 'var(--text)',
                boxShadow:
                  '0 0 0 1px rgba(var(--accent-rgb),0.35), 0 4px 24px rgba(var(--accent-rgb),0.25)',
              }}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
                }}
              />
              <span className="relative">Book a demo</span>
              <svg className="relative w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a
              href="#products"
              className="flex items-center gap-2 px-6 py-3 md:px-7 md:py-3.5 rounded-full text-base font-bold text-naira-text transition-all duration-200 hover:text-naira-gold"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              See what&apos;s inside
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
