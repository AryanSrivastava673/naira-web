'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ReactNode } from 'react'
import {
  Receipt,
  UtensilsCrossed,
  ChefHat,
  LayoutGrid,
  RefreshCw,
  FileText,
  BarChart3,
  Package,
  Building2,
} from 'lucide-react'

const B = '#10B981'
const B_LIGHT = '#34D399'
const B_RGB = '16,185,129'

interface Feature {
  icon: React.ElementType
  title: string
  desc: string
  preview: ReactNode
}

const features: Feature[] = [
  {
    icon: Receipt,
    title: 'Digital Billing & POS',
    desc: 'Fast invoice generation for dine-in, takeaway, and delivery. All order types, one screen.',
    preview: (
      <div
        className="mt-3 rounded-lg p-2.5 text-[10px] font-mono space-y-1.5"
        style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid rgba(${B_RGB},0.1)` }}
      >
        {[['Butter Chicken', '₹380'], ['Garlic Naan', '₹120'], ['Dal Makhani', '₹260']].map(([n, p]) => (
          <div key={n} className="flex justify-between text-naira-text-muted">
            <span>{n}</span><span>{p}</span>
          </div>
        ))}
        <div className="h-px" style={{ background: `rgba(${B_RGB},0.15)` }} />
        <div className="flex justify-between font-semibold" style={{ color: B_LIGHT }}>
          <span>Total</span><span>₹760</span>
        </div>
      </div>
    ),
  },
  {
    icon: UtensilsCrossed,
    title: 'Menu Management',
    desc: 'Add items, set variants, update prices. Changes go live instantly across all channels.',
    preview: (
      <div className="mt-3 space-y-1.5">
        {[
          { name: 'Paneer Tikka', sub: '3 variants', price: '₹280' },
          { name: 'Chicken 65', sub: 'Add-ons', price: '₹320' },
          { name: 'Veg Spring Roll', sub: '2 variants', price: '₹180' },
        ].map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded px-2 py-1.5"
            style={{ background: 'rgba(0,0,0,0.25)' }}
          >
            <div>
              <div className="text-[10px] text-naira-text">{item.name}</div>
              <div className="text-[9px]" style={{ color: B_LIGHT }}>{item.sub}</div>
            </div>
            <div className="text-[10px] font-semibold text-naira-text-muted">{item.price}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: ChefHat,
    title: 'KOT System',
    desc: 'Kitchen Order Tickets auto-generated for every order. Printed or displayed on screen.',
    preview: (
      <div className="mt-3 space-y-1.5">
        {[
          { id: 'KOT #47', items: 'Butter Chicken × 1, Naan × 2', from: 'Table 5', time: 'Now' },
          { id: 'KOT #46', items: 'Biryani × 2, Raita × 2', from: 'Swiggy #1041', time: '3m' },
        ].map((k) => (
          <div
            key={k.id}
            className="rounded px-2 py-1.5"
            style={{ background: 'rgba(0,0,0,0.25)', border: `1px solid rgba(${B_RGB},0.1)` }}
          >
            <div className="flex justify-between mb-0.5">
              <span className="text-[10px] font-semibold text-naira-text">{k.id}</span>
              <span className="text-[9px]" style={{ color: k.time === 'Now' ? B_LIGHT : 'var(--text-muted)' }}>{k.time}</span>
            </div>
            <div className="text-[9px] text-naira-text-muted">{k.items}</div>
            <div className="text-[9px] mt-0.5" style={{ color: B_LIGHT }}>{k.from}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: LayoutGrid,
    title: 'Table Management',
    desc: 'Visual floor plan with real-time status. Know which tables are open, occupied, or reserved.',
    preview: (
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {[
          { t: 'T1', s: 'open' }, { t: 'T2', s: 'occ' }, { t: 'T3', s: 'occ' }, { t: 'T4', s: 'res' },
          { t: 'T5', s: 'occ' }, { t: 'T6', s: 'open' }, { t: 'T7', s: 'occ' }, { t: 'T8', s: 'open' },
        ].map((tbl) => (
          <div
            key={tbl.t}
            className="rounded flex items-center justify-center text-[9px] font-semibold py-1.5"
            style={{
              background:
                tbl.s === 'open' ? `rgba(${B_RGB},0.15)` :
                tbl.s === 'occ' ? 'rgba(255,31,160,0.12)' :
                'rgba(255,165,0,0.12)',
              color:
                tbl.s === 'open' ? B_LIGHT :
                tbl.s === 'occ' ? '#ff8fd3' :
                '#FFB347',
            }}
          >
            {tbl.t}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: RefreshCw,
    title: 'Zomato & Swiggy Sync',
    desc: 'Orders from all delivery platforms land in one dashboard. Auto-accepted, colour-coded by source.',
    preview: (
      <div className="mt-3 space-y-1.5">
        {[
          { src: 'Dine-in', orders: '38 today', color: B_LIGHT, bg: `rgba(${B_RGB},0.12)` },
          { src: 'Zomato', orders: '17 today', color: '#FF6666', bg: 'rgba(220,50,50,0.12)' },
          { src: 'Swiggy', orders: '12 today', color: '#FF9944', bg: 'rgba(255,102,0,0.12)' },
        ].map((ch) => (
          <div
            key={ch.src}
            className="flex items-center justify-between rounded px-2.5 py-1.5"
            style={{ background: ch.bg }}
          >
            <span className="text-[10px] font-semibold" style={{ color: ch.color }}>{ch.src}</span>
            <span className="text-[10px] text-naira-text-muted">{ch.orders}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: FileText,
    title: 'GST Invoicing',
    desc: 'Every bill includes your GSTIN, auto-calculated CGST & SGST, and proper invoice numbering.',
    preview: (
      <div
        className="mt-3 rounded-lg p-2.5 text-[9px] space-y-1"
        style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid rgba(${B_RGB},0.1)` }}
      >
        <div className="text-center font-semibold text-naira-text text-[10px] mb-1.5">Aish Kitchen</div>
        <div className="text-naira-muted">GSTIN: 27AABCT1234A1ZA</div>
        <div className="h-px" style={{ background: `rgba(${B_RGB},0.12)` }} />
        <div className="flex justify-between text-naira-text-muted"><span>Subtotal</span><span>₹760</span></div>
        <div className="flex justify-between text-naira-muted"><span>CGST 2.5%</span><span>₹19</span></div>
        <div className="flex justify-between text-naira-muted"><span>SGST 2.5%</span><span>₹19</span></div>
        <div className="h-px" style={{ background: `rgba(${B_RGB},0.12)` }} />
        <div className="flex justify-between font-semibold" style={{ color: B_LIGHT }}>
          <span>Total</span><span>₹798</span>
        </div>
      </div>
    ),
  },
  {
    icon: BarChart3,
    title: 'Smart Dashboards',
    desc: 'Real-time numbers that update the moment an order is placed. Owner view and staff view.',
    preview: (
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        {[
          { label: "Today's Sales", val: '₹1.2L' },
          { label: 'Orders', val: '142' },
          { label: 'Avg Order', val: '₹845' },
          { label: 'Tables Active', val: '18' },
        ].map((m) => (
          <div key={m.label} className="rounded p-2 text-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <div className="text-sm font-bold" style={{ color: B_LIGHT }}>{m.val}</div>
            <div className="text-[9px] text-naira-text-muted mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Package,
    title: 'Inventory Tracking',
    desc: 'Live stock levels, low-stock alerts, and recipe-level costing. Every ingredient tracked as orders are placed.',
    preview: (
      <div className="mt-3 space-y-1.5">
        {[
          { item: 'Basmati Rice', qty: '42 kg', ok: true },
          { item: 'Chicken', qty: '8 kg', ok: true },
          { item: 'Paneer', qty: '1.5 kg', ok: false },
          { item: 'Cooking Oil', qty: '15 L', ok: true },
        ].map((s) => (
          <div key={s.item} className="flex items-center justify-between">
            <span className="text-[10px] text-naira-text-muted">{s.item}</span>
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
              style={{
                background: s.ok ? `rgba(${B_RGB},0.1)` : 'rgba(255,100,50,0.12)',
                color: s.ok ? B_LIGHT : '#FF8866',
              }}
            >
              {s.qty}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Building2,
    title: 'Multi-Outlet Support',
    desc: 'Manage all your locations from one login. Compare performance, consolidate reports instantly.',
    preview: (
      <div className="mt-3 space-y-1.5">
        {[
          { loc: 'Koramangala', rev: '₹1.4L today' },
          { loc: 'Indiranagar', rev: '₹1.1L today' },
          { loc: 'HSR Layout', rev: '₹86K today' },
        ].map((l) => (
          <div
            key={l.loc}
            className="flex items-center justify-between rounded px-2.5 py-1.5"
            style={{ background: 'rgba(0,0,0,0.25)' }}
          >
            <span className="text-[10px] text-naira-text-muted">{l.loc}</span>
            <span className="text-[10px] font-semibold" style={{ color: B_LIGHT }}>{l.rev}</span>
          </div>
        ))}
      </div>
    ),
  },
]

export default function BillingFeatures() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" className="py-28 px-6 bg-naira-black relative" ref={ref}>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(${B_RGB},0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(${B_RGB},0.4) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block px-3 py-1 rounded-full border text-xs font-medium tracking-widest uppercase mb-5"
            style={{ borderColor: `rgba(${B_RGB},0.3)`, color: B_LIGHT }}
          >
            Features
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-medium tracking-tighter mb-5 text-naira-text"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Your restaurant deserves this
          </h2>
          <p className="text-naira-text-muted text-lg max-w-2xl mx-auto">
            Billing that <em>thinks ahead</em> so you can focus on what matters most — your food and your guests.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.title}
                className="rounded-2xl p-5 bg-naira-surface relative overflow-hidden group"
                style={{
                  border: `1px solid rgba(${B_RGB},0.15)`,
                  boxShadow: `0 0 30px rgba(${B_RGB},0.04)`,
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, rgba(${B_RGB},0.5), transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `rgba(${B_RGB},0.1)` }}
                >
                  <Icon size={18} style={{ color: B_LIGHT }} />
                </div>

                <h3 className="text-sm font-semibold text-naira-text mb-1.5">{feat.title}</h3>
                <p className="text-xs text-naira-text-muted leading-relaxed">{feat.desc}</p>
                {feat.preview}

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ boxShadow: `inset 0 0 30px rgba(${B_RGB},0.06)` }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
