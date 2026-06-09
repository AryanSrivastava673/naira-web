'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const B_LIGHT = '#34D399'
const B_RGB = '16,185,129'

const faqs = [
  {
    q: 'Does Naira Billing handle payments?',
    a: 'Naira Billing generates the bill and invoice. Payment is handled directly between your guest and your restaurant, whichever way you prefer — cash, UPI, or card.',
  },
  {
    q: 'Is it GST compliant?',
    a: 'Yes. Every bill includes your GSTIN, auto-calculated CGST, SGST or IGST, and proper invoice numbering. Ready for filing from day one.',
  },
  {
    q: 'How does the Zomato and Swiggy integration work?',
    a: 'Orders from Zomato and Swiggy sync automatically into your Naira Billing dashboard. They appear in the same queue as dine-in orders — colour-coded by source, auto-accepted.',
  },
  {
    q: 'Can my staff use it without training?',
    a: 'Most staff are comfortable within 30 minutes. The interface is designed for restaurant environments — large touch targets, clear labels, minimal steps per order.',
  },
  {
    q: 'What kind of printer do I need?',
    a: 'Standard 80mm thermal printers. Bluetooth and USB both supported. If you need help sourcing one, we can recommend options at different price points.',
  },
  {
    q: 'What does the monthly growth report include?',
    a: 'Full restaurant analytics — average order value trends, revenue by channel, best and worst selling items, peak hours, table turnover rate, and 3 to 5 specific suggestions for the next month.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. Orders and bills continue to work even if your internet drops. Data syncs automatically once the connection is back. No interruption to service.',
  },
  {
    q: 'How do I reach support during a busy night?',
    a: 'WhatsApp, phone, or email. Available during restaurant service hours. Average response time is under 10 minutes during peak hours.',
  },
  {
    q: 'Does it work for bars, cafes, and cafeterias too?',
    a: 'Yes. Designed for all food service formats — bars with split billing, cafes with table service, cafeteria counters, and cloud kitchens with delivery-first workflows.',
  },
  {
    q: 'Can I add custom features later?',
    a: 'Absolutely. Waiting queue, loyalty tracking, language switching — we build to your needs. Most custom features ship within two weeks of request.',
  },
]

export default function BillingFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6 bg-naira-black" ref={ref}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block px-3 py-1 rounded-full border text-xs font-medium tracking-widest uppercase mb-5"
            style={{ borderColor: `rgba(${B_RGB},0.3)`, color: B_LIGHT }}
          >
            FAQ
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-medium tracking-tighter text-naira-text"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            FAQs restaurant owners actually ask
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{
                border: `1px solid ${open === i ? `rgba(${B_RGB},0.3)` : 'rgba(255,255,255,0.06)'}`,
                background: open === i ? `rgba(${B_RGB},0.04)` : '#1B1528',
                transition: 'border-color 0.3s, background 0.3s',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm font-medium text-naira-text pr-4">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                  style={{ color: open === i ? B_LIGHT : 'var(--text-muted)' }}
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
                    <p className="px-5 pb-4 text-sm text-naira-text-muted leading-relaxed">{faq.a}</p>
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
