'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Does NFC work on all smartphones?',
    a: 'NFC is supported on all iPhones from 2014 (iPhone 6+) and virtually every Android phone since 2015. We estimate over 97% of smartphones in active use in India are NFC-capable. For the rare exception, every coaster includes a discreet QR code fallback.',
  },
  {
    q: "What if a guest's NFC is turned off?",
    a: "Every Naira Tap coaster includes a QR code as a fallback — placed discreetly so it doesn't interrupt the premium look. In our pilot, less than 3% of interactions used the QR fallback.",
  },
  {
    q: 'How does the tap actually work?',
    a: "The coaster contains a passive NFC chip — no battery, no power required. When a phone comes within 2–4 cm, the chip transmits the menu URL directly to the phone's browser. It's the same technology behind contactless bank cards.",
  },
  {
    q: 'How long does setup take?',
    a: 'From sign-up to live: typically 5–7 working days. Day 1–2 for design approval, Day 3–4 for menu build, Day 5–7 for coaster production and express shipping.',
  },
  {
    q: 'Can I update the menu myself?',
    a: 'Yes. Our dashboard lets you edit prices, mark items as sold out, add new dishes, rearrange categories, and run event specials — in real time. No technical knowledge required.',
  },
  {
    q: 'How is Naira Tap priced?',
    a: "There's a one-time hardware cost for the coasters (based on finish and quantity) and a monthly software subscription per outlet. Contact us for a quote based on your setup.",
  },
  {
    q: 'What if a coaster is damaged or stolen?',
    a: 'Replacement coasters are shipped within 48 hours at cost price. Since your menu lives in the cloud, there is no data loss — you just replace the physical hardware.',
  },
  {
    q: 'Does it integrate with your POS system?',
    a: 'Naira Tap works seamlessly with Naira Billing (our POS) for a fully integrated experience — orders flow directly from the table to the kitchen. Third-party POS integration is on our roadmap.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-naira-border last:border-b-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-naira-text text-sm font-medium group-hover:text-naira-text transition-colors">
          {q}
        </span>
        <ChevronDown
          size={16}
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            color: open ? 'var(--accent)' : '#A07A8E',
          }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-naira-text-muted text-sm leading-relaxed pb-5 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TapFAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="faq" className="py-28 px-6 bg-naira-surface" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-5">
            FAQ
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-medium tracking-tighter"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Questions? We&apos;ve got{' '}
            <span className="text-gold-gradient">answers</span>
          </h2>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-naira-border bg-naira-card px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
