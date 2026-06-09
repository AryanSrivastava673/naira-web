'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function formatINR(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  if (n >= 1000) return `₹${Math.round(n / 1000)}k`
  return `₹${n}`
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-naira-text-muted">{label}</span>
        <span className="text-naira-text font-semibold">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${pct}%, #2E1E2A ${pct}%, #2E1E2A 100%)`,
          outline: 'none',
        }}
      />
      <div className="flex justify-between text-naira-muted text-xs">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

export default function TapROI() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [outlets, setOutlets]   = useState(1)
  const [covers, setCovers]     = useState(120)
  const [aov, setAov]           = useState(650)
  const [reprints, setReprints] = useState(4)

  const menuReprint       = reprints * outlets * 6000
  const lostAov           = Math.round(covers * 365 * outlets * aov * 0.0074 / 500) * 500
  const missedUpsells     = Math.round(covers * 365 * outlets * aov * 0.00461 / 500) * 500
  const nairaSubscription = 3000 * 12 * outlets
  const netSavings        = menuReprint + lostAov + missedUpsells - nairaSubscription

  return (
    <section id="roi" className="py-28 px-6 bg-naira-black" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-5">
            ROI Calculator
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-medium tracking-tighter mb-4"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            See what your QR menu{' '}
            <span className="text-gold-gradient">is costing you</span>
          </h2>
          <p className="text-naira-text-muted text-lg">Move the sliders. The numbers are real.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Sliders */}
          <motion.div
            className="relative rounded-2xl overflow-hidden border border-naira-border bg-naira-surface p-8 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
            />
            <Slider
              label="Number of outlets"
              value={outlets} min={1} max={10} step={1}
              display={`${outlets} outlet${outlets > 1 ? 's' : ''}`}
              onChange={setOutlets}
            />
            <Slider
              label="Covers per day"
              value={covers} min={20} max={500} step={10}
              display={`${covers} covers`}
              onChange={setCovers}
            />
            <Slider
              label="Average order value"
              value={aov} min={200} max={2000} step={50}
              display={`₹${aov}`}
              onChange={setAov}
            />
            <Slider
              label="Menu reprints per year"
              value={reprints} min={1} max={12} step={1}
              display={`${reprints}× / yr`}
              onChange={setReprints}
            />
          </motion.div>

          {/* Output */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { label: 'Menu reprinting costs',          value: menuReprint,       loss: true },
              { label: 'Revenue lost from QR friction',  value: lostAov,           loss: true },
              { label: 'Missed upsell revenue',          value: missedUpsells,     loss: true },
              { label: 'Naira Tap subscription (annual)', value: nairaSubscription, loss: false },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between p-4 rounded-xl border"
                style={{
                  background: row.loss ? 'rgba(255,80,80,0.04)' : 'rgba(var(--accent-rgb),0.05)',
                  borderColor: row.loss ? 'rgba(255,80,80,0.14)' : 'rgba(var(--accent-rgb),0.2)',
                }}
              >
                <span className="text-naira-text-muted text-sm">{row.label}</span>
                <span
                  className="font-semibold text-sm tabular-nums"
                  style={{ color: row.loss ? '#ff7070' : 'var(--accent-light)' }}
                >
                  {row.loss && '− '}{formatINR(row.value)}/yr
                </span>
              </div>
            ))}

            {/* Net savings */}
            <div
              className="relative p-6 rounded-2xl border mt-1 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(var(--accent-rgb),0.1) 0%, rgba(var(--accent-rgb),0.03) 100%)',
                borderColor: 'rgba(var(--accent-rgb),0.35)',
                boxShadow: '0 0 40px rgba(var(--accent-rgb),0.08)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
              />
              <div className="text-naira-text-muted text-sm mb-1">Estimated net annual savings</div>
              <div
                className="text-5xl font-bold tabular-nums"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: 'var(--accent-light)' }}
              >
                {netSavings > 0 ? formatINR(netSavings) : '₹0'}
              </div>
              <div className="text-naira-muted text-xs mt-2">Based on your inputs. Actual results vary.</div>
            </div>

            <a
              href="#contact"
              className="text-center py-4 rounded-full text-sm font-semibold mt-1"
              style={{
                background: 'linear-gradient(135deg, var(--accent-dark) 0%, var(--accent) 100%)',
                color: '#F0E9DE',
                boxShadow: '0 4px 20px rgba(var(--accent-rgb),0.2)',
              }}
            >
              Get my Tap setup →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
