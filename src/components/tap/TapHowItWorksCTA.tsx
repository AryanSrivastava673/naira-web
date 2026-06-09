'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import LeadModal from './LeadModal'

const STEPS = [
  {
    n: '01',
    title: 'Send us your menu',
    body: 'WhatsApp, email, PDF, photo of a napkin — any format works. We take it from there. No tech knowledge needed.',
  },
  {
    n: '02',
    title: 'We design, brand & configure',
    body: 'We build your digital menu with your branding, photos, translations, and smart upsell pairings. You approve before it goes live.',
  },
  {
    n: '03',
    title: 'Coasters arrive. Guests tap.',
    body: 'Place a coaster on each table. Guests tap their phone and your menu loads instantly. Old QR codes and paper menus go in the bin.',
  },
]

export default function TapHowItWorksCTA() {
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
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,43,163,0.06) 0%, transparent 65%), #151018',
        }}
      >
        <div className="max-w-5xl mx-auto relative z-10">

          {/* Steps header */}
          <p className="text-xs font-medium tracking-widest uppercase text-naira-muted mb-3 text-center">
            Three steps to switch
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tighter text-naira-text text-center mb-3">
            Your upgrade happens in a week.
          </h2>
          <p className="text-naira-text-muted text-sm text-center mb-12 max-w-xl mx-auto">
            No app installs, no staff training, no disruption to service. Switching to a
            contactless restaurant setup is easier than you think — we handle the heavy lifting.
          </p>

          {/* Steps with arrow connectors */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 mb-8 items-stretch">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-stretch flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="rounded-2xl p-6 flex flex-col flex-1"
                  style={{
                    background: 'rgba(30,21,32,0.55)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="text-3xl font-medium font-display mb-3"
                    style={{ color: 'rgba(255,43,163,0.3)' }}
                  >
                    {s.n}
                  </div>
                  <p className="font-semibold text-naira-text mb-2 text-sm">{s.title}</p>
                  <p className="text-xs text-naira-muted leading-relaxed">{s.body}</p>
                </motion.div>
                {/* Arrow connector */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:flex items-center px-3 text-naira-muted">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Timeline badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="text-center mb-16"
          >
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{
                background: 'rgba(255,43,163,0.08)',
                border: '1px solid rgba(255,43,163,0.2)',
                color: 'var(--text)',
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Live in under <strong style={{ color: '#ff2ba3' }}>48 hours</strong> from your first message</span>
            </span>
          </motion.div>

          {/* Final CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.55 }}
            className="rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{
              background: 'rgba(255,43,163,0.07)',
              border: '1px solid rgba(255,128,200,0.2)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 48px rgba(255,43,163,0.12)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,43,163,0.15) 0%, transparent 70%)',
              }}
            />

            <p className="text-xs font-medium tracking-widest uppercase text-naira-muted mb-3 relative">
              Two free samples. Zero risk.
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tighter text-naira-text mb-4 relative">
              Stop making guests scan.{' '}
              <span className="text-gold-gradient">Start making them tap.</span>
            </h2>
            <p className="text-naira-text-muted text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto relative">
              We&apos;ll design your custom coaster, ship you a physical sample, and put your
              contactless dining solution on a private preview link. All free. No card,
              no commitment.
            </p>

            <div className="flex flex-wrap justify-center gap-4 relative">
              <button
                onClick={() => setModalOpen(true)}
                className="relative overflow-hidden flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold group"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(204,34,130,0.9) 0%, rgba(255,43,163,0.9) 60%, rgba(255,128,200,0.85) 100%)',
                  color: '#F0E9DE',
                  border: '1px solid rgba(255,128,200,0.35)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 32px rgba(255,43,163,0.35)',
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)' }}
                />
                <span className="relative">Claim my free sample</span>
                <svg className="relative w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <a
                href="#hero"
                className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-naira-text transition-all hover:text-naira-gold"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                Design mine first
              </a>
            </div>

            <p className="text-naira-muted text-xs mt-6 relative">
              No pressure. No sales call until you say so.
            </p>
          </motion.div>

        </div>
      </section>
    </>
  )
}
