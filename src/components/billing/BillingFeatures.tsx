'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Receipt, UtensilsCrossed, ChefHat, LayoutGrid, RefreshCw,
  FileText, BarChart3, Package, Building2,
} from 'lucide-react'

const B = '#10B981'
const B_LIGHT = '#34D399'
const B_RGB = '16,185,129'

const features = [
  { Icon: Receipt,         title: 'Digital Billing & POS',    desc: 'Fast invoice generation for dine-in, takeaway, and delivery. All order types, one screen.' },
  { Icon: UtensilsCrossed, title: 'Menu Management',          desc: 'Add items, set variants, update prices. Changes go live instantly across all channels.' },
  { Icon: ChefHat,         title: 'KOT System',               desc: 'Kitchen Order Tickets auto-generated for every order. Printed or displayed on screen.' },
  { Icon: LayoutGrid,      title: 'Table Management',         desc: 'Visual floor plan with real-time status. Know which tables are open, occupied, or reserved.' },
  { Icon: RefreshCw,       title: 'Zomato & Swiggy Sync',     desc: 'Orders from all delivery platforms land in one dashboard. Auto-accepted, colour-coded.' },
  { Icon: FileText,        title: 'GST Invoicing',            desc: 'Every bill includes your GSTIN, auto-calculated CGST & SGST, and proper invoice numbering.' },
  { Icon: BarChart3,       title: 'Smart Dashboards',         desc: 'Real-time numbers that update the moment an order is placed. Owner view and staff view.' },
  { Icon: Package,         title: 'Inventory Tracking',       desc: 'Live stock levels, low-stock alerts, and recipe-level costing. Every ingredient tracked.' },
  { Icon: Building2,       title: 'Multi-Outlet Support',     desc: 'Manage all your locations from one login. Compare performance, consolidate reports instantly.' },
]

export default function BillingFeatures() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="features" className="py-20 px-6 bg-naira-black relative" ref={ref}>
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(${B_RGB},0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(${B_RGB},0.4) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium tracking-widest uppercase mb-2" style={{ color: B_LIGHT }}>
            Features
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tighter mb-3 text-naira-text">
            Your restaurant deserves this
          </h2>
          <p className="text-naira-text-muted text-sm max-w-lg mx-auto">
            Billing that <em>thinks ahead</em> so you can focus on what matters — your food and your guests.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="rounded-2xl p-5 flex flex-col items-center text-center gap-3"
              style={{
                background: 'rgba(30,21,32,0.55)',
                border: `1px solid rgba(${B_RGB},0.12)`,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `rgba(${B_RGB},0.1)`,
                  border: `1px solid rgba(${B_RGB},0.2)`,
                }}
              >
                <Icon size={20} style={{ color: B_LIGHT }} />
              </div>
              <div>
                <p className="font-semibold text-naira-text text-sm mb-1">{title}</p>
                <p className="text-xs text-naira-muted leading-snug">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
