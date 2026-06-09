'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const faqs = [
  {
    q: 'Do I need to be tech-savvy?',
    a: 'Not at all. We handle the entire setup. Your staff needs 30 minutes of training — that\'s it.',
  },
  {
    q: 'Can I use just one product?',
    a: 'Yes. Naira Tap, Billing, and Growth are independent. Start with what you need and add later.',
  },
  {
    q: 'What if my internet goes down?',
    a: 'Naira Billing works offline. Orders and bills continue — data syncs when the connection is back.',
  },
  {
    q: 'Is there a long-term contract?',
    a: 'No contracts, no lock-in. Month-to-month across all products.',
  },
]

export default function HIWCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6 bg-naira-black relative overflow-hidden" ref={ref}>
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left — quick FAQs */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-6">
              Quick Answers
            </span>
            <h2
              className="font-display text-3xl md:text-4xl font-medium tracking-tighter text-naira-text mb-10"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Questions you&apos;re probably asking
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                >
                  <div className="flex gap-3">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold"
                      style={{
                        background: 'rgba(var(--accent-rgb),0.12)',
                        color: 'var(--accent-light)',
                      }}
                    >
                      Q
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-naira-text mb-1">{faq.q}</p>
                      <p className="text-sm text-naira-text-muted leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — CTA */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="md:sticky md:top-28"
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--accent), var(--accent-light), var(--accent), transparent)',
              }}
            />

            <div
              className="rounded-2xl p-8 bg-naira-surface"
              style={{ border: '1px solid rgba(var(--accent-rgb),0.2)' }}
            >
              <h3
                className="font-display text-3xl font-medium tracking-tighter text-naira-text mb-3"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Ready to get started?
              </h3>
              <p className="text-naira-text-muted text-sm leading-relaxed mb-8">
                Book a free demo call. We&apos;ll walk you through the right product mix for your
                restaurant and have you live within a week.
              </p>

              <div className="space-y-3">
                <a
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--accent-dark) 0%, var(--accent) 100%)',
                    color: '#F0E9DE',
                    boxShadow:
                      '0 0 0 1px rgba(var(--accent-rgb),0.35), 0 4px 24px rgba(var(--accent-rgb),0.25)',
                  }}
                >
                  Book a free demo
                </a>
                <a
                  href="https://wa.me/919021044699"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full border border-naira-border text-sm font-semibold text-naira-text-muted hover:text-naira-text hover:border-naira-gold/30 transition-colors"
                >
                  WhatsApp us instead
                </a>
              </div>

              <p className="text-naira-muted text-xs text-center mt-6">
                No contracts. No lock-in. Built in Pune, live across India.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
