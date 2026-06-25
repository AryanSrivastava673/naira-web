'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Camera, BadgeCheck, MapPin } from 'lucide-react'

const HERO_STAT = {
  value: 70,
  suffix: '%',
  prefix: 'Up to ',
  label: 'more in-store visits, every month',
  detail:
    "India's best local SEO and Google Business Profile partner for restaurants — get found, ranked and chosen on Google organically, backed by Google's own benchmark.",
  source: 'Google',
  href: 'https://www.thinkwithgoogle.com/marketing-strategies/search/near-me-searches/',
}

const SUPPORTING_STATS = [
  {
    icon: TrendingUp,
    value: 20,
    suffix: '%',
    prefix: '15–',
    label: 'more profile interactions',
    detail: 'when restaurants post weekly to their Google Business Profile',
    source: 'Restolabs / Reactll',
    href: 'https://www.restolabs.com/blog',
  },
  {
    icon: Camera,
    value: 42,
    suffix: '%',
    label: 'more calls & direction requests',
    detail: 'for listings with quality photos of food, interiors and the team',
    source: 'Google',
    href: 'https://support.google.com/business/answer/6335804',
  },
  {
    icon: BadgeCheck,
    value: 80,
    suffix: '%',
    label: 'higher chance to show up in search',
    detail: 'for verified, fully-completed Google Business Profiles',
    source: 'Google',
    href: 'https://support.google.com/business/answer/7091',
  },
  {
    icon: MapPin,
    value: 76,
    suffix: '%',
    label: 'visit a store within 24 hours',
    detail: 'after running a "near me" mobile search for a place to eat',
    source: 'Think with Google',
    href: 'https://www.thinkwithgoogle.com/marketing-strategies/search/near-me-searches/',
  },
]

// Animated number that counts up when in view
function CountUp({ to, duration = 1.2, inView }: { to: number; duration?: number; inView: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      // ease-out cubic
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
          <linearGradient id="growth-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cc2282" />
            <stop offset="100%" stopColor="#ff2ba3" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={RADIUS} stroke="#f3e5ef" strokeWidth="10" fill="none" />
        <motion.circle
          cx="100"
          cy="100"
          r={RADIUS}
          stroke="url(#growth-ring-gradient)"
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
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] mt-1" style={{ color: '#9ca3af' }}>
            organic uplift
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniBar({ percent, inView, delay }: { percent: number; inView: boolean; delay: number }) {
  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#f3e5ef' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${percent}%` } : {}}
        transition={{ duration: 1, ease: 'easeOut', delay }}
        className="h-full rounded-full"
        style={{ background: 'linear-gradient(90deg, #cc2282, #ff2ba3)' }}
      />
    </div>
  )
}

export default function GrowthWhyNaira() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden" style={{ background: '#ffffff' }}>
      {/* Ambient glow — matches the rest of the white sections */}
      <div
        aria-hidden
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,43,163,0.06) 0%, transparent 70%)' }}
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
            Why your restaurant needs this
          </p>
          <h2 className="font-sans text-3xl md:text-5xl font-bold tracking-[-0.02em] max-w-3xl mx-auto" style={{ color: '#1a1a1a' }}>
            The customers are already searching.
            <br />
            <span style={{ color: '#ff2ba3' }}>Are they finding you?</span>
          </h2>
        </motion.div>

        {/* Hero stat block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl border p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-10"
          style={{
            background: 'linear-gradient(135deg, #fff5fb 0%, #ffffff 60%)',
            borderColor: 'rgba(255,43,163,0.18)',
            boxShadow: '0 1px 0 rgba(255,43,163,0.04), 0 20px 50px -20px rgba(255,43,163,0.18)',
          }}
        >
          <HeroRing inView={inView} />
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-sans text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-3" style={{ color: '#1a1a1a' }}>
              {HERO_STAT.prefix}
              <span style={{ color: '#ff2ba3' }}>{HERO_STAT.value}{HERO_STAT.suffix}</span>{' '}
              {HERO_STAT.label}
            </h3>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#4b5563' }}>
              {HERO_STAT.detail}
            </p>
            <a
              href={HERO_STAT.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] underline underline-offset-2 transition-colors"
              style={{ color: '#9ca3af' }}
            >
              Source: {HERO_STAT.source}
            </a>
          </div>
        </motion.div>

        {/* Supporting stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
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
                  background: '#ffffff',
                  borderColor: '#f0e6eb',
                  boxShadow: '0 1px 0 rgba(0,0,0,0.02)',
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                    style={{ background: 'rgba(255,43,163,0.08)', color: '#ff2ba3' }}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div
                      className="font-mono text-4xl md:text-[44px] font-medium leading-none"
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
                    <p
                      className="font-sans text-sm font-semibold mt-1.5"
                      style={{ color: '#1a1a1a' }}
                    >
                      {s.label}
                    </p>
                  </div>
                </div>

                <MiniBar percent={s.value} inView={inView} delay={0.4 + i * 0.08} />

                <p className="text-sm leading-snug mt-4" style={{ color: '#6b7280' }}>
                  {s.detail}
                </p>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] underline underline-offset-2 mt-3 inline-block"
                  style={{ color: '#9ca3af' }}
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
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,43,163,0.5), transparent)' }}
          />
          <h3 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em]" style={{ color: '#1a1a1a' }}>
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
