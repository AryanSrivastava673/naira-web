'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

const faqs = [
  {
    q: 'Does Naira Billing handle payments?',
    a: 'Naira Billing generates the bill and invoice. Unlike many bar restaurant POS solutions, payment is handled directly between your guest and your restaurant, whichever way you prefer: cash, UPI, card. We do not sit in the middle of any payment flow. Your money, your terms.',
  },
  {
    q: 'Is it GST compliant?',
    a: 'Yes. Every bill includes your GSTIN, auto-calculated CGST, SGST or IGST, and proper invoice numbering. The format meets all current GST requirements for Indian restaurants.',
  },
  {
    q: 'How does the Zomato and Swiggy integration work?',
    a: 'Orders from Zomato and Swiggy sync automatically into your Naira Billing dashboard. They appear alongside your dine-in orders, colour-coded by source. KOTs print automatically. No copy-pasting, no switching between apps.',
  },
  {
    q: 'Can my staff use it without training?',
    a: 'Most staff are comfortable within 30 minutes. The interface is designed for restaurant environments: large touch targets, clear labels, minimal steps to create an order. We also provide a short on-site training session during setup.',
  },
  {
    q: 'What kind of printer do I need?',
    a: 'Naira Billing works with standard 80mm thermal printers, which most restaurants already have. Bluetooth and USB both supported. If you need a recommendation, we can suggest options that work well with the system.',
  },
  {
    q: 'What does the monthly growth report include?',
    a: 'Full restaurant analytics — average order value trends, revenue by channel, best and worst selling items, peak hours, table turnover rate, and 3 to 5 specific suggestions to improve performance. Think of it as restaurant data analytics delivered to your email and also accessible from the dashboard.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. Orders and bills continue to work even if your internet drops during service. Data syncs automatically once the connection is back. No lost orders, no service disruption.',
  },
  {
    q: 'How do I reach support during a busy night?',
    a: 'WhatsApp, phone, or email. Our support team is available during restaurant service hours, because that is when you need us most. Average response time under 10 minutes during peak hours.',
  },
  {
    q: 'Does it work for bars, cafes, and cafeterias too?',
    a: 'Yes. Naira Billing is designed as the best bar POS system, the most reliable POS software for cafes, and a complete cafeteria point of sale system — all in one. Menu structure, KOT flow, and reporting all adjust to match how you operate.',
  },
  {
    q: 'Can I add custom features later?',
    a: 'Absolutely. Waiting queue, loyalty tracking, language switching, custom bill layouts, staff performance reports — tell us what you need and we scope it. Most custom features ship within two weeks.',
  },
]

export default function BillingFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6" style={{ background: '#ffffff' }} ref={ref}>
      <div className="max-w-3xl mx-auto">

        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-3" style={{ color: PINK }}>
            FAQ
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-[-0.02em]" style={{ color: '#1a1a1a' }}>
            FAQs restaurant owners <span style={{ color: PINK }}>actually</span> ask
          </h2>
          <p className="text-base mt-4 max-w-lg mx-auto" style={{ color: '#6b7280' }}>
            Everything you were about to ask us.
          </p>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="overflow-hidden transition-all"
              style={{
                border: `1px solid ${open === i ? `rgba(${PINK_RGB},0.30)` : 'rgba(0,0,0,0.06)'}`,
                background: open === i ? `rgba(${PINK_RGB},0.04)` : '#ffffff',
                borderRadius: 16,
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-base font-medium pr-4" style={{ color: '#1a1a1a' }}>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                  style={{ color: open === i ? PINK : '#9ca3af' }}
                />
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: '#6b7280' }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
