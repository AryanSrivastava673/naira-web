'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Do all smartphones support NFC?',
    a: 'Nearly all modern smartphones in India, both Android and iPhone, support NFC. For the tiny minority that don\'t, every Naira Tap coaster also has a small QR code printed on the underside as a fallback. Nobody gets locked out.',
  },
  {
    q: 'How does my guest "tap" exactly?',
    a: 'They bring the top of their phone within about 1cm of the coaster. A notification pops up. They tap it. Menu opens. The whole thing takes about a second. No app install. No sign-up.',
  },
  {
    q: 'How long does it take to get set up?',
    a: 'Typically about a week. Day 1 to 2: design approval and coaster mockup. Day 3 to 5: menu build and photo shoot. Day 6 to 7: delivery and table placement. You\'re live.',
  },
  {
    q: 'Can I update my menu myself or do I need your team?',
    a: 'You update it yourself from your phone or laptop. Change prices, add dishes, hide sold-out items, create an event banner. Changes are live in seconds across every coaster.',
  },
  {
    q: 'What does it cost?',
    a: 'We keep it simple. A one-time cost for the custom coasters plus a flat monthly subscription for the software, hosting, and support. For most single-outlet restaurants, the subscription is offset in year one by savings on reprints alone.',
  },
  {
    q: 'What if a coaster gets damaged or stolen?',
    a: 'Replacement coasters ship within 48 hours, and most restaurants keep a small backup stock. A stolen coaster is useless outside your restaurant — its only role is to open your menu.',
  },
  {
    q: 'Can I integrate Naira Tap with my POS system?',
    a: 'Yes. We currently integrate with the major POS platforms used in Indian hospitality (Petpooja, Posist, and a growing list). Not on one of those? Tell us and we\'ll scope it.',
  },
  {
    q: 'How does Naira Tap help improve service in my restaurant?',
    a: 'Guests access a rich, photo-driven menu the moment they sit down. No waiting for a server to bring a worn-out booklet. Your staff spend less time answering "what\'s good here?" and more time delivering food.',
  },
  {
    q: 'Is Naira Tap a touchless menu? How is it different from a QR code?',
    a: 'Yes. Naira Tap is a fully touchless menu. Unlike a QR code that requires your guest to open a camera app, aim, and wait, Naira Tap opens the menu with a simple phone tap. NFC removes all the friction of a touchless menu QR code.',
  },
  {
    q: 'What are the latest restaurant technology trends in India?',
    a: 'The biggest restaurant technology trends in India right now are NFC-powered contactless dining, smart menu upselling, and real-time menu management. Naira Tap sits at the intersection of all three.',
  },
  {
    q: 'What makes Naira Tap one of the best tools for creating interactive restaurant menus?',
    a: 'Naira Tap gives you a live, photo-rich, interactive menu with smart pairings, allergen filters, multi-language support, and real-time updates — all accessible with a single tap. No app, no download, no friction.',
  },
]

const VISIBLE_BY_DEFAULT = 5

export default function TapFAQ() {
  const [open, setOpen]       = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? FAQS : FAQS.slice(0, VISIBLE_BY_DEFAULT)

  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background:
          '#0a0a0a',
      }}
    >
      <div className="max-w-3xl mx-auto relative z-10">

        <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase text-naira-muted mb-3 text-center">
          FAQ
        </p>
        <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] text-naira-text text-center mb-10">
          Every question you&apos;re afraid to ask.
        </h2>

        <div className="space-y-3 mb-3">
          {visible.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{
                background: 'rgba(30,21,32,0.6)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              >
                <span
                  className={`text-sm font-semibold transition-colors ${
                    open === i ? 'text-naira-gold' : 'text-naira-text'
                  }`}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  size={17}
                  className={`shrink-0 text-naira-muted transition-transform duration-200 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p
                      className="px-6 pb-5 text-sm text-naira-text-muted leading-relaxed pt-4"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowAll(s => !s)}
          className="w-full flex items-center justify-center gap-2 py-3 mb-10 text-xs text-naira-muted hover:text-naira-text-muted transition-colors"
        >
          <ChevronDown
            size={15}
            className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
          />
          {showAll ? 'Show less' : 'Show more'}
        </button>

      </div>
    </section>
  )
}
