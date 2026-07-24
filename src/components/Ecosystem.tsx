'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion'
import { Smartphone, Receipt, TrendingUp, ArrowUpRight } from 'lucide-react'

const NODES = [
  {
    key: 'tap',
    href: '/tap',
    icon: Smartphone,
    name: 'Naira Tap',
    role: 'Customer experience',
    color: '#ff2ba3',
    iconBg: 'rgba(255,43,163,0.15)',
    top: '12%',
    left: '50%',
  },
  {
    key: 'billing',
    href: '/billing',
    icon: Receipt,
    name: 'Naira Billing',
    role: 'Operations & insights',
    color: '#e0b23d',
    iconBg: 'rgba(200,165,77,0.18)',
    top: '85%',
    left: '17%',
  },
  {
    key: 'growth',
    href: '/growth',
    icon: TrendingUp,
    name: 'Naira Growth',
    role: 'Attract & retain',
    color: '#9b8afb',
    iconBg: 'rgba(108,92,231,0.15)',
    top: '85%',
    left: '83%',
  },
]

const SYNERGIES = [
  {
    badge: 'Billing + Tap',
    color: '#e0b23d',
    title: 'Billing data powers your menus.',
    desc: 'Your POS data — bestsellers, peak hours, what pairs well together — flows directly into Naira Tap. Smart pairings and upsells are curated from what actually sells at your restaurant. Not guesswork.',
  },
  {
    badge: 'Tap + Billing',
    color: '#ff2ba3',
    title: 'Customer insights fuel better decisions.',
    desc: "Naira Tap tells you what customers are liking, what they're skipping, and what dishes get the best reviews. Feed that back into operations and menu decisions owners actually need to make.",
  },
  {
    badge: 'Growth + Tap',
    color: '#9b8afb',
    title: 'Attract them. Then wow them.',
    desc: 'Growth brings customers to your door through internet presence and local event awareness. Tap gives them a dining experience worth coming back for. Banners on your menu promote the events Growth prepared you for.',
  },
  {
    badge: 'Growth + Billing',
    color: '#9b8afb',
    title: 'Nearby trends meet real sales data.',
    desc: 'Growth alerts you about upcoming events and local trends. Billing shows you what sold during similar events before. Together, you\'re prepared — not reacting.',
  },
]

type Offset = { x: number; y: number }
const ZERO_OFFSET: Offset = { x: 0, y: 0 }

// One draggable node. Reports its live pixel drag-offset up to the stage so the
// connecting line can be redrawn every frame — during the drag AND during the
// spring-back animation that follows release (dragSnapToOrigin drives both off
// the same x/y motion values, so this stays in sync automatically).
function OrbitNode({
  n,
  onOffsetChange,
}: {
  n: (typeof NODES)[number]
  onOffsetChange: (offset: Offset) => void
}) {
  const Icon = n.icon
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useMotionValueEvent(x, 'change', (latest) => onOffsetChange({ x: latest, y: y.get() }))
  useMotionValueEvent(y, 'change', (latest) => onOffsetChange({ x: x.get(), y: latest }))

  return (
    <div
      className="absolute"
      style={{ top: n.top, left: n.left, transform: 'translate(-50%,-50%)', zIndex: 4 }}
    >
      <motion.a
        href={n.href}
        drag
        dragSnapToOrigin
        dragElastic={0.15}
        dragMomentum={false}
        dragConstraints={{ left: -70, right: 70, top: -70, bottom: 70 }}
        dragTransition={{ bounceStiffness: 420, bounceDamping: 16 }}
        whileDrag={{ scale: 1.06, cursor: 'grabbing' }}
        className="flex cursor-grab items-center gap-3 rounded-2xl px-4 py-3.5 transition-shadow duration-300 hover:-translate-y-1.5 active:cursor-grabbing"
        onClick={(e) => {
          // Suppress the click that would otherwise fire right after a drag release
          if (Math.abs(x.get()) > 4 || Math.abs(y.get()) > 4) e.preventDefault()
        }}
        style={{
          x,
          y,
          width: 188,
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: `0 10px 34px ${n.color}24`,
        }}
      >
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{ background: n.iconBg, color: n.color }}
        >
          <Icon size={21} />
        </div>
        <div className="text-left">
          <div className="text-[0.92rem] font-bold leading-tight text-white">{n.name}</div>
          <div className="mt-0.5 text-[0.7rem] text-white/50">{n.role}</div>
        </div>
      </motion.a>
    </div>
  )
}

function OrbitStage() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [stageSize, setStageSize] = useState({ w: 660, h: 620 })
  const [offsets, setOffsets] = useState<Record<string, Offset>>({
    tap: ZERO_OFFSET,
    billing: ZERO_OFFSET,
    growth: ZERO_OFFSET,
  })

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => {
      const rect = el.getBoundingClientRect()
      setStageSize({ w: rect.width, h: rect.height })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={stageRef}
      className="relative mx-auto hidden lg:block"
      style={{ maxWidth: 660, aspectRatio: '1 / 0.94' }}
    >
      {/* Decorative orbit rings + live-tracking connector lines */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        <circle cx="50" cy="50" r="21" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="0.3" strokeDasharray="0.3 2.6" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,43,163,0.25)" strokeWidth="0.25" />
        {NODES.map((n) => {
          const offset = offsets[n.key] ?? ZERO_OFFSET
          const nx = parseFloat(n.left) + (offset.x / stageSize.w) * 100
          const ny = parseFloat(n.top) + (offset.y / stageSize.h) * 100
          return (
            <path
              key={n.key}
              d={`M 50 50 Q ${(50 + nx) / 2} ${(50 + ny) / 2} ${nx} ${ny}`}
              fill="none"
              stroke={n.color}
              strokeOpacity={0.28}
              strokeWidth="0.35"
            />
          )
        })}
      </svg>

      {/* Core */}
      <div
        className="absolute flex flex-col items-center justify-center text-center rounded-full"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 150,
          height: 150,
          background: 'radial-gradient(circle at 50% 36%, rgba(255,43,163,0.3), rgba(16,16,24,0.96) 68%)',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 0 0 6px rgba(255,43,163,0.05), 0 0 70px rgba(255,43,163,0.3), inset 0 0 36px rgba(255,43,163,0.18)',
          zIndex: 3,
        }}
      >
        <span className="font-display text-[2.6rem] font-black text-white leading-none" style={{ textShadow: '0 2px 20px rgba(255,43,163,0.6)' }}>
          N
        </span>
        <span className="mt-1.5 text-[0.6rem] font-bold uppercase tracking-[1.7px] text-white/65">
          One platform
        </span>
      </div>

      {/* Draggable nodes — snap back to their orbit position on release */}
      {NODES.map((n) => (
        <OrbitNode
          key={n.key}
          n={n}
          onOffsetChange={(offset) => setOffsets((prev) => ({ ...prev, [n.key]: offset }))}
        />
      ))}
    </div>
  )
}

function OrbitStageMobile() {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-9 lg:hidden">
      <div
        className="flex flex-col items-center justify-center rounded-full text-center"
        style={{
          width: 150,
          height: 150,
          background: 'radial-gradient(circle at 50% 36%, rgba(255,43,163,0.3), rgba(16,16,24,0.96) 68%)',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 0 0 6px rgba(255,43,163,0.05), 0 0 70px rgba(255,43,163,0.3), inset 0 0 36px rgba(255,43,163,0.18)',
        }}
      >
        <span className="font-display text-[2.6rem] font-black text-white leading-none" style={{ textShadow: '0 2px 20px rgba(255,43,163,0.6)' }}>
          N
        </span>
        <span className="mt-1.5 text-[0.6rem] font-bold uppercase tracking-[1.7px] text-white/65">
          One platform
        </span>
      </div>

      {NODES.map((n) => {
        const Icon = n.icon
        return (
          <Link
            key={n.key}
            href={n.href}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: `0 8px 28px rgba(0,0,0,0.25)`,
            }}
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ background: n.iconBg, color: n.color }}
            >
              <Icon size={21} />
            </div>
            <div className="text-left">
              <div className="text-[0.92rem] font-bold leading-tight text-white">{n.name}</div>
              <div className="mt-0.5 text-[0.7rem] text-white/50">{n.role}</div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default function Ecosystem() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="ecosystem"
      ref={ref}
      className="relative overflow-hidden px-6 py-24 lg:py-28"
      style={{ background: '#0a0a0a' }}
    >
      {/* Ambient glows — same three product colors as the Hero, tying the sections together */}
      <div
        aria-hidden
        className="absolute -left-20 top-0 h-[600px] w-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,43,163,0.10) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="absolute right-0 top-1/3 h-[450px] w-[450px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(224,178,61,0.07) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(155,138,251,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center lg:mb-24"
        >
          <div className="mb-6 flex flex-col items-center leading-[0.88]">
            <span
              className="block font-sans font-black"
              style={{ color: '#ff2ba3', fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '-2px' }}
            >
              Naira
            </span>
            <span
              className="block font-sans font-black text-white"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '-2px' }}
            >
              Ecosystem
            </span>
          </div>
          <h2 className="mb-4 font-sans text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
            Alone, they&apos;re powerful. Together, they&apos;re{' '}
            <span style={{ color: '#ff2ba3' }}>unstoppable.</span>
          </h2>
          <p className="text-base leading-relaxed text-white/55">
            When all three Naira products sync together, every insight from one feeds into
            the other. No data silos. No guessing. Just one operating system that knows
            your restaurant inside out.
          </p>
        </motion.div>

        {/* Orbit diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-20 lg:mb-24"
        >
          <OrbitStage />
          <OrbitStageMobile />
        </motion.div>

        {/* Synergy grid */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {SYNERGIES.map((s, i) => (
            <motion.div
              key={s.badge}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="rounded-[20px] p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="mb-4 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[1.2px]" style={{ color: s.color }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                {s.badge}
              </div>
              <h3 className="mb-2.5 text-[1.1rem] font-bold leading-snug text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed text-white/55">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Full-synergy closer */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mx-auto mt-7 max-w-4xl rounded-[20px] p-9 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,43,163,0.08), rgba(108,92,231,0.08))',
            border: '1px solid rgba(255,43,163,0.15)',
          }}
        >
          <h3 className="mb-2.5 text-[1.15rem] font-bold text-white">All three. Perfectly in sync.</h3>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/55">
            One login. Every insight from menus, billing, and online presence flowing into
            a single source of truth. The restaurant that runs on the full Naira stack
            doesn&apos;t just operate — it compounds.
          </p>
          <Link
            href="/#products"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-75"
            style={{ color: '#ff2ba3' }}
          >
            See how the stack fits together
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
