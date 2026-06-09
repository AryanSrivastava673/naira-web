'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ReactNode } from 'react'

const B = '#10B981'
const B_LIGHT = '#34D399'
const B_RGB = '16,185,129'

function IntegrationVisual() {
  const orders = [
    { id: '#1042', src: 'Dine-in', desc: 'Table 5 — 3 items', color: B_LIGHT, bg: `rgba(${B_RGB},0.12)` },
    { id: '#1041', src: 'Swiggy', desc: 'Biryani × 2, Raita × 2', color: '#FF9944', bg: 'rgba(255,102,0,0.12)' },
    { id: '#1040', src: 'Zomato', desc: 'Dal Makhani, Naan × 3', color: '#FF6666', bg: 'rgba(220,50,50,0.12)' },
    { id: '#1039', src: 'Dine-in', desc: 'Table 12 — 2 items', color: B_LIGHT, bg: `rgba(${B_RGB},0.12)` },
  ]

  return (
    <div className="w-full max-w-sm">
      <div
        className="rounded-2xl p-5"
        style={{
          background: '#1B1528',
          border: `1px solid rgba(${B_RGB},0.2)`,
          boxShadow: `0 0 40px rgba(${B_RGB},0.08)`,
        }}
      >
        <div className="text-xs font-semibold text-naira-text-muted mb-4">Unified Order Queue</div>
        <div className="space-y-2">
          {orders.map((o) => (
            <div
              key={o.id}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5"
              style={{ background: 'rgba(0,0,0,0.3)' }}
            >
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: o.bg, color: o.color }}
              >
                {o.src}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono text-naira-muted">{o.id}</div>
                <div className="text-[11px] text-naira-text-muted truncate">{o.desc}</div>
              </div>
              <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: B }} />
            </div>
          ))}
        </div>
        <div
          className="mt-4 rounded-xl px-3 py-2 text-[11px]"
          style={{ background: `rgba(${B_RGB},0.07)`, border: `1px solid rgba(${B_RGB},0.15)` }}
        >
          <span style={{ color: B_LIGHT }}>Menu sync active</span>
          <span className="text-naira-muted ml-2">· Zomato & Swiggy prices updated</span>
        </div>
      </div>
    </div>
  )
}

function GrowthVisual() {
  return (
    <div className="w-full max-w-sm">
      <div
        className="rounded-2xl p-5"
        style={{
          background: '#1B1528',
          border: `1px solid rgba(${B_RGB},0.2)`,
          boxShadow: `0 0 40px rgba(${B_RGB},0.08)`,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-semibold text-naira-text-muted">May 2026 Growth Report</div>
          <span
            className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
            style={{ background: `rgba(${B_RGB},0.12)`, color: B_LIGHT }}
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
            <div key={m.label} className="rounded-xl p-2.5" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <div className="text-base font-bold text-naira-text">{m.val}</div>
              <div className="text-[9px] text-naira-text-muted mt-0.5">{m.label}</div>
              <div className="text-[9px] font-semibold mt-1" style={{ color: B_LIGHT }}>{m.delta} vs last month</div>
            </div>
          ))}
        </div>
        <div
          className="rounded-xl p-3"
          style={{ background: `rgba(${B_RGB},0.07)`, border: `1px solid rgba(${B_RGB},0.15)` }}
        >
          <div className="text-[10px] font-semibold mb-1" style={{ color: B_LIGHT }}>Smart Insight</div>
          <div className="text-[10px] text-naira-text-muted leading-relaxed">
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
        className="rounded-2xl p-5"
        style={{
          background: '#1B1528',
          border: `1px solid rgba(${B_RGB},0.2)`,
          boxShadow: `0 0 40px rgba(${B_RGB},0.08)`,
        }}
      >
        <div className="text-xs font-semibold text-naira-text-muted mb-4">Customisation Options</div>
        <div className="space-y-3">
          {items.map((c, i) => (
            <div key={i} className="flex gap-3">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs"
                style={{ background: `rgba(${B_RGB},0.12)`, color: B_LIGHT }}
              >
                ✓
              </div>
              <div>
                <div className="text-[11px] font-semibold text-naira-text">{c.title}</div>
                <div className="text-[10px] text-naira-text-muted mt-0.5">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-4 rounded-xl px-3 py-2 text-[11px]"
          style={{ background: `rgba(${B_RGB},0.07)`, border: `1px solid rgba(${B_RGB},0.15)` }}
        >
          <span style={{ color: B_LIGHT }}>Most custom features ship within two weeks.</span>
        </div>
      </div>
    </div>
  )
}

interface SectionProps {
  num: string
  tag: string
  headline: string
  body: string
  bullets: string[]
  visual: ReactNode
  reverse?: boolean
}

function DeepDiveSection({ num, tag, headline, body, bullets, visual, reverse }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="max-w-6xl mx-auto px-6">
      <div className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${reverse ? 'md:[&>div:first-child]:order-2' : ''}`}>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-xs font-mono font-semibold px-2.5 py-1 rounded"
              style={{ background: `rgba(${B_RGB},0.1)`, color: B_LIGHT }}
            >
              {num}
            </span>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: B_LIGHT }}
            >
              {tag}
            </span>
          </div>

          <h2
            className="font-display text-3xl md:text-4xl font-medium tracking-tighter leading-snug mb-5 text-naira-text"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            {headline}
          </h2>

          <p className="text-naira-text-muted leading-relaxed mb-7">{body}</p>

          <ul className="space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-naira-text-muted">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold"
                  style={{ background: `rgba(${B_RGB},0.15)`, color: B_LIGHT }}
                >
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Visual */}
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
    <section className="py-28 bg-naira-black space-y-28">
      <DeepDiveSection
        num="01"
        tag="Third-Party Integrations"
        headline="Zomato order at Table 3. Swiggy at the pass. Dine-in at the bar. One screen."
        body="Every order from every channel lands in the same dashboard. Auto-accepted, colour-coded by source. One unified queue — no missed orders, no double entries, no switching between apps."
        bullets={[
          'Auto-accept delivery orders from Zomato and Swiggy',
          'Channel-wise revenue split — see exactly where money comes from',
          'Menu sync across platforms — update once, reflect everywhere',
        ]}
        visual={<IntegrationVisual />}
      />
      <DeepDiveSection
        num="02"
        tag="Monthly Growth Reports"
        headline="Every month, a report that tells you exactly where your money went and why."
        body="Most POS systems give you raw data. Naira Billing turns it into restaurant business analytics you can act on — AOV trends, channel splits, and 3–5 specific suggestions every month."
        bullets={[
          'Average Order Value trends tracked week over week',
          'Revenue & order velocity — daily, weekly, monthly comparisons',
          '3 to 5 actionable suggestions specific to your restaurant',
        ]}
        visual={<GrowthVisual />}
        reverse
      />
      <DeepDiveSection
        num="03"
        tag="Customisation"
        headline="Your restaurant is unique. Your billing should be too."
        body="Every restaurant has its own flow — a bar needs split billing, a cafeteria needs a queue system, a cloud kitchen needs delivery-first KOTs. We do not force you into a template."
        bullets={[
          'Your logo and brand colours on every bill',
          'Multi-language interface for staff (Hindi, Marathi, Tamil & more)',
          'Waiting queue system with SMS alerts for guests',
        ]}
        visual={<CustomisationVisual />}
      />
    </section>
  )
}
