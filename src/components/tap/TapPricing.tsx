'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { X, Check } from 'lucide-react'
import LeadModal from './LeadModal'

const OLD_ITEMS = [
  { label: 'Menu printing (4×/year)',       cost: '₹18,000' },
  { label: 'Lamination & binding',          cost: '₹4,000' },
  { label: 'QR code stickers / stands',     cost: '₹2,500' },
  { label: 'Design changes',                cost: '₹6,000' },
  { label: 'Staff time managing menus',     cost: '₹3,500' },
]

const NEW_ITEMS = [
  { label: '20 NFC coasters (one-time)',    cost: '₹15,000' },
  { label: 'Menu design & setup',           cost: 'Free' },
  { label: 'Unlimited menu updates',        cost: 'Free' },
  { label: 'Analytics dashboard',           cost: 'Free' },
  { label: 'Reprinting / replacement',      cost: '₹0' },
]

export default function TapPricing() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} variant="design" />
      <section
        ref={ref}
        className="py-20 px-6 relative overflow-hidden"
        style={{
          background:
            '#0a0a0a',
        }}
      >
        <div className="max-w-5xl mx-auto relative z-10">

          <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase text-naira-muted mb-3 text-center">
            Pricing
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] text-naira-text text-center mb-3">
            What you&apos;re spending now vs. what you could be.
          </h2>
          <p className="text-naira-text-muted text-sm text-center mb-12 max-w-xl mx-auto">
            No hidden fees. No contracts. Straightforward costs for a single outlet with 20 tables.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          >
            {/* Old */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(239,68,68,0.04)',
                border: '1px solid rgba(239,68,68,0.15)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center">
                  <X size={11} className="text-red-400" />
                </div>
                <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase text-red-400">What you pay today</p>
              </div>
              <p className="text-naira-text-muted text-sm mb-6">Paper menus + QR codes</p>
              <ul className="space-y-3 mb-6">
                {OLD_ITEMS.map((item, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span className="text-naira-muted">{item.label}</span>
                    <span className="text-naira-text font-semibold">{item.cost}</span>
                  </li>
                ))}
              </ul>
              <div
                className="rounded-xl p-4"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-naira-text">Yearly recurring cost</span>
                  <span className="font-sans text-xl font-semibold tracking-[-0.01em] text-red-400">₹34,000</span>
                </div>
                <p className="text-[10px] text-red-400/60">and it repeats every single year</p>
              </div>
            </div>

            {/* New */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(255,43,163,0.06)',
                border: '1px solid rgba(255,128,200,0.2)',
                boxShadow: '0 8px 40px rgba(255,43,163,0.08)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,43,163,0.15)' }}>
                  <Check size={11} color="#ff2ba3" />
                </div>
                <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase text-naira-gold">With Naira Tap</p>
              </div>
              <p className="text-naira-text-muted text-sm mb-6">One-time setup. Forever updates.</p>
              <ul className="space-y-3 mb-6">
                {NEW_ITEMS.map((item, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span className="text-naira-muted">{item.label}</span>
                    <span className="text-naira-gold font-semibold">{item.cost}</span>
                  </li>
                ))}
              </ul>
              <div
                className="rounded-xl p-4"
                style={{ background: 'rgba(255,43,163,0.1)', border: '1px solid rgba(255,43,163,0.2)' }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-naira-text">Total from year 2 onwards</span>
                  <span className="font-sans text-xl font-semibold tracking-[-0.01em] text-naira-gold">₹0</span>
                </div>
                <p className="text-[10px] text-naira-gold/60">no subscriptions, no renewals</p>
              </div>
            </div>
          </motion.div>

          <div className="text-center">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background:
                  'linear-gradient(135deg, rgba(204,34,130,0.9) 0%, rgba(255,43,163,0.9) 60%, rgba(255,128,200,0.85) 100%)',
                color: '#ffffff',
                border: '1px solid rgba(255,128,200,0.35)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 32px rgba(255,43,163,0.3)',
              }}
            >
              Get a custom quote
              <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

        </div>
      </section>
    </>
  )
}
