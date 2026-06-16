'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Receipt, UtensilsCrossed, ChefHat, LayoutGrid, RefreshCw,
  FileText, BarChart3, Package, Building2,
} from 'lucide-react'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

const features = [
  { Icon: Receipt,         title: 'Digital Billing & POS',    desc: 'The best bar restaurant POS system for fast invoice generation — dine-in, takeaway, and delivery. Tap, bill, done.' },
  { Icon: UtensilsCrossed, title: 'Menu Management',          desc: 'Item categories, size variants, add-ons, and pricing. Update once, reflect everywhere — POS, KOT, and aggregator menus.' },
  { Icon: ChefHat,         title: 'KOT System',               desc: 'Direct order-to-kitchen flow. Auto-printed KOTs with table number, order type, and item modifications. No verbal relay.' },
  { Icon: LayoutGrid,      title: 'Table Management',         desc: 'Visual floor plan with live table status. Merge tables, split bills, track occupancy. Manage reservations at a glance.' },
  { Icon: RefreshCw,       title: 'Zomato & Swiggy Sync',     desc: 'Orders from Zomato and Swiggy flow into your dashboard automatically. One screen for dine-in, delivery, and takeaway.' },
  { Icon: FileText,        title: 'GST Invoicing',            desc: 'GST-compliant invoicing with auto tax calculation. GSTIN on every bill, CGST/SGST/IGST handled. Print or share digitally.' },
  { Icon: BarChart3,       title: 'Smart Dashboards',         desc: 'Restaurant POS analytics at a glance — revenue, orders, AOV, table status, peak hours, and staff performance. Updating in real time.' },
  { Icon: Package,         title: 'Inventory Tracking',       desc: 'Live stock levels, low-stock alerts, and recipe-level costing. Kitchen inventory management that prevents waste and shortages.' },
  { Icon: Building2,       title: 'Multi-Outlet Support',     desc: 'Centralised menu, pricing, and reporting across all your locations. One login, every outlet. Compare performance side by side.' },
]

export default function BillingFeatures() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="features" className="py-24 px-6 relative overflow-hidden" style={{ background: '#0a0a0a' }} ref={ref}>
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="constellation-feat" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1.3" fill={`rgba(${PINK_RGB},0.14)`} />
            <circle cx="100" cy="80" r="1" fill={`rgba(${PINK_RGB},0.10)`} />
            <circle cx="60" cy="110" r="1.5" fill={`rgba(${PINK_RGB},0.12)`} />
            <line x1="30" y1="30" x2="100" y2="80" stroke={`rgba(${PINK_RGB},0.05)`} strokeWidth="0.5" />
            <line x1="100" y1="80" x2="60" y2="110" stroke={`rgba(${PINK_RGB},0.05)`} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#constellation-feat)" />
      </svg>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-3" style={{ color: PINK }}>
            Features
          </p>
          <h2 className="font-sans text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-4 text-white">
            Your restaurant <span style={{ color: PINK }}>deserves</span> this
          </h2>
          <p className="text-white/70 text-base max-w-lg mx-auto">
            Billing that <em>thinks ahead</em> so you can focus on what matters most — your food and your guests.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="glass-dark p-6 flex flex-col gap-4 transition-all"
              style={{ borderRadius: 16 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{
                y: -4,
                boxShadow: `0 8px 24px rgba(${PINK_RGB},0.10), 0 16px 48px rgba(${PINK_RGB},0.06)`,
                borderColor: `rgba(${PINK_RGB},0.30)`,
              }}
            >
              <div
                className="w-11 h-11 flex items-center justify-center shrink-0"
                style={{
                  background: `rgba(${PINK_RGB},0.12)`,
                  border: `1px solid rgba(${PINK_RGB},0.22)`,
                  borderRadius: 12,
                }}
              >
                <Icon size={20} style={{ color: PINK }} />
              </div>
              <div>
                <p className="font-semibold text-white text-base mb-1.5">{title}</p>
                <p className="text-sm text-white/65 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
