'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ReactNode } from 'react'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

function IntegrationVisual() {
  const orders = [
    { id: '#1042', src: 'Dine-in', desc: 'Table 5 — 3 items' },
    { id: '#1041', src: 'Swiggy', desc: 'Biryani × 2, Raita × 2' },
    { id: '#1040', src: 'Zomato', desc: 'Dal Makhani, Naan × 3' },
    { id: '#1039', src: 'Dine-in', desc: 'Table 12 — 2 items' },
  ]

  const srcStyle = (s: string) =>
    s === 'Dine-in'
      ? { bg: `rgba(${PINK_RGB},0.15)`, fg: PINK }
      : s === 'Swiggy'
        ? { bg: 'rgba(255,255,255,0.10)', fg: 'rgba(255,255,255,0.85)' }
        : { bg: 'rgba(255,255,255,0.06)', fg: 'rgba(255,255,255,0.65)' }

  return (
    <div className="w-full max-w-sm">
      <div
        className="glass-dark p-5"
        style={{
          borderRadius: 20,
          boxShadow: `0 8px 24px rgba(${PINK_RGB},0.10), 0 16px 48px rgba(${PINK_RGB},0.06)`,
        }}
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] font-medium text-white/70 mb-4">Unified Order Queue</div>
        <div className="space-y-2">
          {orders.map((o) => {
            const c = srcStyle(o.src)
            return (
              <div
                key={o.id}
                className="flex items-center gap-3 px-3 py-2.5"
                style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span
                  className="font-mono text-[9px] font-medium px-2 py-0.5 uppercase tracking-[0.08em] flex-shrink-0"
                  style={{ background: c.bg, color: c.fg, borderRadius: 8 }}
                >
                  {o.src}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] text-white/55">{o.id}</div>
                  <div className="text-[11px] text-white/75 truncate">{o.desc}</div>
                </div>
                <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: PINK }} />
              </div>
            )
          })}
        </div>
        <div
          className="mt-4 px-3 py-2 text-[11px]"
          style={{ background: `rgba(${PINK_RGB},0.08)`, border: `1px solid rgba(${PINK_RGB},0.20)`, borderRadius: 12 }}
        >
          <span className="font-mono uppercase tracking-[0.08em] text-[10px] font-medium" style={{ color: PINK }}>Menu sync active</span>
          <span className="text-white/55 ml-2 text-[10px]">· Zomato &amp; Swiggy prices updated</span>
        </div>
      </div>
    </div>
  )
}

function GrowthVisual() {
  return (
    <div className="w-full max-w-sm">
      <div
        className="glass-dark p-5"
        style={{
          borderRadius: 20,
          boxShadow: `0 8px 24px rgba(${PINK_RGB},0.10), 0 16px 48px rgba(${PINK_RGB},0.06)`,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] font-medium text-white/70">May 2026 Growth Report</div>
          <span
            className="font-mono text-[9px] px-2 py-0.5 font-medium uppercase tracking-[0.08em]"
            style={{ background: `rgba(${PINK_RGB},0.14)`, color: PINK, borderRadius: 8 }}
          >
            Monthly
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: 'Avg. Order Value', val: '₹714', delta: '+8%' },
            { label: 'Total Orders', val: '4,210', delta: '+14%' },
            { label: 'Monthly Revenue', val: '₹30L', delta: '+11%' },
            { label: 'Table Utilisation', val: '92%', delta: '+5%' },
          ].map((m) => (
            <div key={m.label} className="p-2.5" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="font-mono text-base font-medium" style={{ color: PINK, fontVariantNumeric: 'tabular-nums' }}>{m.val}</div>
              <div className="text-[10px] text-white/60 mt-0.5">{m.label}</div>
              <div className="font-mono text-[9px] font-medium mt-1 text-white/75" style={{ fontVariantNumeric: 'tabular-nums' }}>{m.delta} vs last month</div>
            </div>
          ))}
        </div>
        <div
          className="p-3"
          style={{ background: `rgba(${PINK_RGB},0.08)`, border: `1px solid rgba(${PINK_RGB},0.20)`, borderRadius: 12 }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] font-medium mb-1" style={{ color: PINK }}>Smart Insight</div>
          <div className="text-[11px] text-white/75 leading-relaxed">
            Your Biryani is your 4th most ordered item but has only 32% margin. Consider a bundle offer to drive AOV.
          </div>
        </div>
      </div>
    </div>
  )
}

function CustomisationVisual() {
  const items = [
    { title: 'Your logo on every bill', desc: 'Brand every invoice with your restaurant identity' },
    { title: 'Multi-language interface', desc: 'Hindi, Marathi, Tamil — staff use their language' },
    { title: 'Digital waiting queue', desc: 'SMS guests when their table is ready' },
    { title: 'Custom workflows', desc: 'Bar, cafe, cafeteria — fits your setup exactly' },
  ]

  return (
    <div className="w-full max-w-sm">
      <div
        className="glass-dark p-5"
        style={{
          borderRadius: 20,
          boxShadow: `0 8px 24px rgba(${PINK_RGB},0.10), 0 16px 48px rgba(${PINK_RGB},0.06)`,
        }}
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] font-medium text-white/70 mb-4">Customisation Options</div>
        <div className="space-y-3">
          {items.map((c, i) => (
            <div key={i} className="flex gap-3">
              <div
                className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs"
                style={{ background: `rgba(${PINK_RGB},0.14)`, color: PINK, borderRadius: 8 }}
              >
                ✓
              </div>
              <div>
                <div className="text-[12px] font-semibold text-white">{c.title}</div>
                <div className="text-[11px] text-white/65 mt-0.5">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-4 px-3 py-2 text-[11px]"
          style={{ background: `rgba(${PINK_RGB},0.08)`, border: `1px solid rgba(${PINK_RGB},0.20)`, borderRadius: 12 }}
        >
          <span style={{ color: PINK }}>Most custom features ship within two weeks.</span>
        </div>
      </div>
    </div>
  )
}

interface SectionProps {
  num: string
  tag: string
  headline: string
  accent: string
  body: string
  bullets: string[]
  visual: ReactNode
  reverse?: boolean
}

function DeepDiveSection({ num, tag, headline, accent, body, bullets, visual, reverse }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="max-w-[1200px] mx-auto px-6">
      <div className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${reverse ? 'md:[&>div:first-child]:order-2' : ''}`}>

        <motion.div
          initial={{ opacity: 0, x: reverse ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="font-mono text-[11px] font-medium px-2.5 py-1 uppercase tracking-[0.08em]"
              style={{ background: `rgba(${PINK_RGB},0.12)`, color: PINK, borderRadius: 8 }}
            >
              {num}
            </span>
            <span
              className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase"
              style={{ color: PINK }}
            >
              {tag}
            </span>
          </div>

          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] leading-[1.1] mb-5 text-white">
            {headline}{' '}
            <span style={{ color: PINK }}>{accent}</span>
          </h2>

          <p className="text-white/75 leading-relaxed mb-7 text-lg">{body}</p>

          <ul className="space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-white/75">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold"
                  style={{ background: `rgba(${PINK_RGB},0.15)`, color: PINK }}
                >
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? -30 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex justify-center"
        >
          {visual}
        </motion.div>

      </div>
    </div>
  )
}

export default function BillingDeepDive() {
  return (
    <section className="py-28 space-y-28 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div
        aria-hidden
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${PINK_RGB},0.08) 0%, transparent 70%)` }}
      />

      <DeepDiveSection
        num="01"
        tag="Third-Party Integrations"
        headline="Zomato order at Table 3. Swiggy at the pass. Dine-in at the bar."
        accent="One screen."
        body="Every order from every channel lands in the same dashboard — the restaurant POS integration that bars, cafes, and cafeterias have been waiting for. No switching apps. No missed tickets. Your staff see one unified queue, colour-coded by source."
        bullets={[
          'Auto-accept delivery orders — Zomato and Swiggy KOTs print the moment an order is confirmed',
          'Channel-wise revenue split — see exactly how much comes from dine-in, Zomato, and Swiggy',
          'Menu sync across platforms — update a price in Naira Billing and it reflects everywhere',
        ]}
        visual={<IntegrationVisual />}
      />
      <DeepDiveSection
        num="02"
        tag="Monthly Growth Reports"
        headline="Every month, a report that tells you exactly where your money went and"
        accent="why."
        body="Most POS systems give you raw data. Naira Billing turns it into restaurant business analytics you can act on. What sold more this month. What fell behind. Where the opportunity is. Delivered to your inbox every 30 days."
        bullets={[
          'Average Order Value trends tracked week over week — see if combos and upsells are moving the needle',
          'Revenue & order velocity — daily, weekly, monthly comparisons to spot your best days and slowest hours',
          '3 to 5 actionable suggestions specific to your restaurant, not just raw POS analytics',
        ]}
        visual={<GrowthVisual />}
        reverse
      />
      <DeepDiveSection
        num="03"
        tag="Customised For Your Restaurant"
        headline="Your restaurant is unique. Your billing should be"
        accent="too."
        body="Every restaurant has its own flow. Whether you need the best bar POS system, the most reliable POS software for cafes, or a full cafeteria POS system — we do not force you into a template. Tell us how your kitchen works and we shape the system around you."
        bullets={[
          'Waiting queue management — a digital queue that texts guests when their table is ready',
          'Multi-language interface — switch the billing language to Hindi, Marathi, or Tamil in one tap',
          'Custom branding & layout — your logo on every bill, your brand colours on the dashboard',
        ]}
        visual={<CustomisationVisual />}
      />
    </section>
  )
}
