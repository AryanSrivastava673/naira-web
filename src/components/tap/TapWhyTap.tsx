'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Waves, Languages, BarChart3 } from 'lucide-react'

const HERO_STAT = {
  value: 30,
  suffix: '%',
  prefix: 'Up to ',
  label: 'lift in average order value',
  detail:
    "India's best tap-to-menu system — smart upsells working on every single table, automatically. Photos, pairings and bestseller nudges appear right at the moment of decision.",
}

const SUPPORTING_STATS = [
  {
    icon: Waves,
    value: 20,
    suffix: '%',
    label: 'increase in average check',
    detail: 'after a beachfront venue in Bahrain rolled out a digital tap-to-menu',
    source: 'Bahrain hospitality case study',
    href: 'https://www.qsrmagazine.com/',
  },
  {
    icon: Languages,
    value: 38,
    suffix: '%',
    prefix: '23–',
    label: 'higher spend per guest',
    detail: 'at tourist-focused restaurants offering visuals and translations on every menu',
    source: 'International QSR benchmarks',
    href: 'https://www.qsrmagazine.com/',
  },
  {
    icon: BarChart3,
    value: 340,
    suffix: '%',
    label: 'first-year ROI',
    detail: 'a 15-location mid-sized chain saw, driven mostly by larger checks',
    source: 'Restaurant chain rollout study',
    href: 'https://www.restaurantbusinessonline.com/',
  },
]

function CountUp({ to, duration = 1.2, inView }: { to: number; duration?: number; inView: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setN(Math.round(eased * to))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, duration, inView])
  return <>{n}</>
}

const RADIUS = 78
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function HeroRing({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-[200px] h-[200px] flex items-center justify-center shrink-0">
      <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
        <defs>
          <linearGradient id="tap-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cc2282" />
            <stop offset="100%" stopColor="#ff2ba3" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={RADIUS} stroke="rgba(255,255,255,0.06)" strokeWidth="10" fill="none" />
        <motion.circle
          cx="100"
          cy="100"
          r={RADIUS}
          stroke="url(#tap-ring-gradient)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={inView ? { strokeDashoffset: CIRCUMFERENCE * (1 - HERO_STAT.value / 100) } : {}}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div
            className="font-mono text-5xl font-medium"
            style={{
              color: '#ff2ba3',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
            }}
          >
            <CountUp to={HERO_STAT.value} inView={inView} />
            {HERO_STAT.suffix}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            AOV uplift
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniBar({ percent, inView, delay }: { percent: number; inView: boolean; delay: number }) {
  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${Math.min(percent, 100)}%` } : {}}
        transition={{ duration: 1, ease: 'easeOut', delay }}
        className="h-full rounded-full"
        style={{ background: 'linear-gradient(90deg, #cc2282, #ff2ba3)' }}
      />
    </div>
  )
}

export default function TapWhyTap() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,43,163,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: '#ff2ba3' }}>
            What a Tap-driven menu unlocks
          </p>
          <h2
            className="font-sans text-3xl md:text-5xl font-bold tracking-[-0.02em] max-w-3xl mx-auto"
            style={{ color: '#ffffff' }}
          >
            Every table.
            <br />
            <span style={{ color: '#ff2ba3' }}>Quietly earning more.</span>
          </h2>
        </motion.div>

        {/* Hero stat block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl border p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-10"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,43,163,0.08) 0%, rgba(255,43,163,0.02) 100%)',
            borderColor: 'rgba(255,43,163,0.22)',
            boxShadow:
              '0 1px 0 rgba(255,43,163,0.06) inset, 0 24px 60px -20px rgba(255,43,163,0.25)',
          }}
        >
          <HeroRing inView={inView} />
          <div className="flex-1 text-center md:text-left">
            <h3
              className="font-sans text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-3"
              style={{ color: '#ffffff' }}
            >
              {HERO_STAT.prefix}
              <span style={{ color: '#ff2ba3' }}>
                {HERO_STAT.value}
                {HERO_STAT.suffix}
              </span>{' '}
              {HERO_STAT.label}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {HERO_STAT.detail}
            </p>
          </div>
        </motion.div>

        {/* Supporting stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {SUPPORTING_STATS.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                className="group rounded-2xl border p-6 md:p-7 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(255,43,163,0.12)', color: '#ff2ba3' }}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div
                      className="font-mono text-4xl md:text-[40px] font-medium leading-none"
                      style={{
                        color: '#ff2ba3',
                        fontVariantNumeric: 'tabular-nums',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {s.prefix}
                      <CountUp to={s.value} inView={inView} duration={1.1} />
                      {s.suffix}
                    </div>
                    <p className="font-sans text-sm font-semibold mt-1.5" style={{ color: '#ffffff' }}>
                      {s.label}
                    </p>
                  </div>
                </div>

                <MiniBar percent={s.value} inView={inView} delay={0.4 + i * 0.08} />

                <p className="text-sm leading-snug mt-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {s.detail}
                </p>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] underline underline-offset-2 mt-3 inline-block transition-colors"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  Source: {s.source}
                </a>
              </motion.article>
            )
          })}
        </div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div
            aria-hidden
            className="mx-auto mb-6 h-px w-24"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,43,163,0.6), transparent)' }}
          />
          <h3
            className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em]"
            style={{ color: '#ffffff' }}
          >
            We help you{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #cc2282, #ff2ba3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              achieve this.
            </span>
          </h3>
        </motion.div>

      </div>
    </section>
  )
}
