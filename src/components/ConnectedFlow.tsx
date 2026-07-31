'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

const steps = [
  {
    n: '01',
    product: 'Naira Tap',
    title: 'A guest taps the table.',
    body: 'The menu loads instantly — no app, no wait. Photos, reviews, and smart pairings guide them to order more, and better.',
  },
  {
    n: '02',
    product: 'Naira Billing',
    title: 'The order flows into billing.',
    body: "Every item lands in your POS the moment it's placed. Staff move faster, the kitchen stays in sync, and the bill is ready before they ask.",
  },
  {
    n: '03',
    product: 'Naira Growth',
    title: 'The visit fuels your growth.',
    body: 'Sales and reviews feed your online presence automatically, so the next hungry guest nearby finds you first on Google and AI search.',
  },
]

const menuItems = [
  { name: 'Butter Chicken', price: '₹340', from: '#f97362', to: '#e94f8a' },
  { name: 'Paneer Tikka', price: '₹280', from: '#6fd08c', to: '#8ad6b4' },
  { name: 'Garlic Naan', price: '₹60', from: '#f5a55f', to: '#f2c98a' },
  { name: 'Gulab Jamun', price: '₹120', from: '#7b6ef0', to: '#9b8afb' },
]

function PhoneMockup({ inView }: { inView: boolean }) {
  return (
    <div className="relative mx-auto" style={{ maxWidth: 340 }}>
      {/* Ambient glow behind the device */}
      <div
        aria-hidden
        className="absolute -inset-10 rounded-[60px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 45%, rgba(${PINK_RGB},0.16) 0%, transparent 70%)` }}
      />

      <div
        className="relative rounded-[42px] p-3"
        style={{
          background: 'linear-gradient(160deg, #1b1b1f 0%, #101013 100%)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: `0 30px 80px rgba(0,0,0,0.65), 0 0 60px rgba(${PINK_RGB},0.10)`,
        }}
      >
        {/* Speaker slot */}
        <div
          className="mx-auto mb-4 mt-1 rounded-full"
          style={{ width: 92, height: 5, background: 'rgba(255,255,255,0.16)' }}
        />

        <div className="px-4 pb-6">
          {/* Screen header */}
          <div className="flex items-center justify-between mb-5">
            <span className="font-mono text-[11px] tracking-[0.16em] text-white/70">NAIRA TAP</span>
            <span className="font-mono text-[11px] tracking-[0.16em]" style={{ color: PINK }}>
              MENU
            </span>
          </div>

          {/* Menu rows */}
          <div className="space-y-3">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.25 + i * 0.09 }}
                className="flex items-center gap-3 rounded-2xl p-3"
                style={{
                  background: 'rgba(255,255,255,0.035)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex-shrink-0"
                  style={{ background: `linear-gradient(145deg, ${item.from}, ${item.to})` }}
                />
                <div className="min-w-0">
                  <div className="text-white text-sm font-semibold leading-tight truncate">{item.name}</div>
                  <div className="font-mono text-[12px] mt-0.5" style={{ color: PINK }}>
                    {item.price}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConnectedFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative overflow-hidden py-24 lg:py-28 px-6" style={{ background: 'transparent' }}>
      <div ref={ref} className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-14 lg:gap-16 items-start">
        {/* Left — narrative */}
        <div>
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="w-8 h-px" style={{ background: PINK }} />
            <span
              className="font-mono text-[12px] font-medium tracking-[0.16em] uppercase"
              style={{ color: PINK }}
            >
              One connected flow
            </span>
          </motion.div>

          <motion.h2
            className="font-sans font-black tracking-[-0.02em] leading-[1.06] text-white mb-10"
            style={{ fontSize: 'clamp(2rem,4.4vw,3.25rem)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            One tap sets your whole <span style={{ color: PINK }}>restaurant</span> in motion.
          </motion.h2>

          <div>
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.12 }}
                className="py-7"
                style={{ borderTop: '1px solid rgba(255,255,255,0.09)' }}
              >
                <div className="font-mono text-[12px] tracking-[0.14em] mb-3" style={{ color: PINK }}>
                  {step.n} · {step.product}
                </div>
                <h3 className="text-white font-bold text-xl lg:text-2xl tracking-[-0.01em] mb-3">
                  {step.title}
                </h3>
                <p className="text-white/55 text-[15px] leading-relaxed max-w-lg">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — device */}
        <motion.div
          className="lg:sticky lg:top-28"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <PhoneMockup inView={inView} />
        </motion.div>
      </div>
    </section>
  )
}
