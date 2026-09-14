'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Wifi, ShieldCheck, TrendingUp } from 'lucide-react'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

const CARDS = [
  {
    Icon: Wifi,
    title: 'No power. No wires. No maintenance.',
    body: 'NFC chips draw energy from the guest\'s phone for the 200ms they need. There\'s nothing to plug in, recharge, or replace.',
  },
  {
    Icon: ShieldCheck,
    title: 'Waterproof',
    body: 'Spilled wine? Chai all over the table? Wipe and carry on. Rated for daily restaurant environments.',
  },
  {
    Icon: TrendingUp,
    title: 'One-time hardware, lifetime software.',
    body: 'You pay for the coasters once. Every update, feature, analytics dashboard, and photo refresh ships straight to the menu forever.',
  },
]

function CoasterShowcase() {
  return (
    <div className="relative">
      {/* Ambient brand-pink glow behind the card, pulsing on a slow loop */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 55%, rgba(${PINK_RGB},0.22) 0%, transparent 70%)` }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className="relative rounded-3xl overflow-hidden p-8 flex items-center justify-center"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          aspectRatio: '1 / 1',
        }}
      >
        {/* Gentle idle float + rock — reads as "alive" without the baked-in
            text ever going upside down, since rotation stays within a few degrees */}
        <motion.div
          className="relative w-full h-full"
          style={{ position: 'relative' }}
          animate={{ y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src="/tap/coaster/coaster-front.jpg"
            alt="Naira Tap NFC coaster — brushed steel disc with your restaurant logo engraved"
            fill
            sizes="(min-width: 768px) 480px, 90vw"
            className="object-contain"
          />
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
        <span
          className="font-mono text-[10px] font-medium tracking-[0.14em] uppercase px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(10,10,10,0.6)', color: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(8px)' }}
        >
          Brushed steel · NFC + QR
        </span>
      </div>
    </div>
  )
}

export default function TapHardware() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <div className="max-w-5xl mx-auto relative z-10">

        <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase text-naira-muted mb-3 text-center">
          Deep dive 03 · Hardware built to last
        </p>
        <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] text-naira-text text-center mb-4">
          One install. No wires. Forever updates.
        </h2>
        <p className="text-naira-text-muted text-sm text-center mb-12 max-w-xl mx-auto">
          The NFC chip has no battery, no screen, no moving parts. It has no reason to fail.
          The coaster surface is made of the same stuff your best lamps and tables are. Built
          to earn a place on your table.
        </p>

        {/* Hero: coaster visual + feature cards side by side */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <CoasterShowcase />
          </motion.div>

          <div className="flex flex-col gap-5">
            {CARDS.map(({ Icon, title, body }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="rounded-2xl p-6 flex flex-col gap-4 flex-1 justify-center"
                style={{
                  background: 'rgba(30,21,32,0.55)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `rgba(${PINK_RGB},0.1)`,
                    border: `1px solid rgba(${PINK_RGB},0.2)`,
                  }}
                >
                  <Icon size={22} color={PINK} />
                </div>
                <div>
                  <p className="font-semibold text-naira-text text-sm mb-2">{title}</p>
                  <p className="text-xs text-naira-muted leading-relaxed">{body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Spec sheet strip — every angle, presented once, no loop (it's a technical reference, not a hero) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="px-6 pt-6 flex items-center justify-between">
            <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase" style={{ color: PINK }}>
              Every angle, engineered
            </p>
            <span className="text-white/35 text-xs">Ø 120mm coaster</span>
          </div>
          <div className="relative w-full" style={{ position: 'relative', aspectRatio: '1402 / 1122' }}>
            <Image
              src="/tap/coaster/coaster-views.jpg"
              alt="Naira Tap coaster shown from five angles: angled, top, side, low side angle, and base with mounting points"
              fill
              sizes="(min-width: 768px) 900px, 100vw"
              className="object-contain p-4"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
