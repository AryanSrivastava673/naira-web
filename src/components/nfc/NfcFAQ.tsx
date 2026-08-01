'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

const faqs = [
  {
    q: 'Do guests need to turn NFC on?',
    a: 'On iPhones, NFC reading is always on — there is no switch. On most Androids it\'s on by default, and if someone uses tap-to-pay it\'s definitely on.',
  },
  {
    q: 'Does it work without internet?',
    a: 'The tap itself needs no internet. It hands the phone your menu link. Opening the menu uses the guest\'s mobile data or your restaurant Wi-Fi, same as any webpage.',
  },
  {
    q: 'Do guests need to install anything?',
    a: 'No. The menu opens in the phone\'s browser. No app, no account, no permissions. That\'s the whole point.',
  },
  {
    q: 'Is tapping safe for guests?',
    a: "Yes. The coaster only shares a link. It can't read anything from the phone, access payments, or transfer data. The phone always shows the link first, and the guest chooses to open it.",
  },
  {
    q: "What if a phone doesn't have NFC?",
    a: 'Every coaster has a QR code printed on it. Any phone with a camera scans it and lands on the same menu. Between tap and scan, coverage is 100%.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left text-sm text-white/80 font-medium hover:text-white transition-colors"
      >
        <span>{q}</span>
        <ChevronDown
          size={16}
          className="flex-shrink-0 ml-4 transition-transform duration-200"
          style={{ color: PINK, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="text-white/50 text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function NfcFAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
      <div ref={ref} className="max-w-[760px] mx-auto">

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase mb-3" style={{ color: PINK }}>
            Common questions
          </p>
          <h2
            className="text-white font-bold"
            style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', letterSpacing: '-0.02em' }}
          >
            Quick answers
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {faqs.map(f => <FAQItem key={f.q} {...f} />)}
        </motion.div>
      </div>
    </section>
  )
}
