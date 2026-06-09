'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Layers, Sparkles, Droplets, Image, LayoutGrid, RefreshCw, TrendingDown, Clock, Battery, Shield, Package, Headphones } from 'lucide-react'

const modules = [
  {
    id: '01',
    subtitle: 'Your coaster, your identity',
    title: 'Brand Customisation',
    cards: [
      { icon: Layers,    label: 'Five premium finishes',   note: 'Metallic Black, Brushed Gold, Rose Copper, Walnut, Frosted Acrylic' },
      { icon: LayoutGrid, label: 'Four form factors',      note: 'Round coaster, square stand, discrete tag, table tent' },
      { icon: Sparkles,  label: 'Laser-etched branding',  note: 'Your logo etched permanently. Never fades, never peels.' },
      { icon: Image,     label: 'Full menu theming',       note: 'Colors, fonts, layout — matched to your brand identity.' },
    ],
  },
  {
    id: '02',
    subtitle: 'You own your menu, always',
    title: 'Real-Time Control',
    cards: [
      { icon: TrendingDown, label: 'Margin protection',     note: 'Flag low-margin items. Surface high-margin dishes at the top.' },
      { icon: Sparkles,    label: 'Event-night specials',   note: "Create a special menu for tonight's event in under 2 minutes." },
      { icon: RefreshCw,   label: 'Sold-out management',   note: 'Mark items unavailable instantly — no guest disappointment.' },
      { icon: Clock,       label: 'Price changes in 30s',  note: 'No reprint. No QR update. Just edit and save.' },
    ],
  },
  {
    id: '03',
    subtitle: 'Built to last forever',
    title: 'Hardware Durability',
    cards: [
      { icon: Battery,  label: 'No power or wires',          note: 'Passive NFC — no battery, no charging, no maintenance.' },
      { icon: Droplets, label: 'Waterproof & scratch-proof', note: 'Spills, drops, daily cleaning — it handles everything.' },
      { icon: Package,  label: 'One-time hardware cost',     note: 'Pay once for coasters. Software updates included forever.' },
      { icon: Headphones, label: 'Theft / damage cover',    note: 'Replacement coasters shipped within 48 hours at cost price.' },
    ],
  },
]

export default function TapDeepDive() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6 bg-naira-black" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-5">
            Deep Dive
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-medium tracking-tighter"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Every detail,{' '}
            <span className="text-gold-gradient">engineered</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.id}
              className="relative rounded-2xl overflow-hidden border border-naira-border bg-naira-surface p-8"
              style={{ boxShadow: '0 0 40px rgba(var(--accent-rgb),0.04)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
              />

              {/* Module header */}
              <div className="flex items-end gap-5 mb-8">
                <div
                  className="text-7xl font-bold leading-none select-none flex-shrink-0"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: 'rgba(var(--accent-rgb),0.12)' }}
                >
                  {mod.id}
                </div>
                <div>
                  <div className="text-naira-muted text-xs tracking-widest uppercase mb-1">{mod.subtitle}</div>
                  <h3
                    className="text-2xl font-bold text-naira-text"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {mod.title}
                  </h3>
                </div>
              </div>

              {/* Icon cards grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {mod.cards.map((card, j) => {
                  const Icon = card.icon
                  return (
                    <div
                      key={card.label}
                      className="rounded-xl p-4 border border-naira-border bg-naira-card hover:border-naira-gold/25 transition-colors group"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                        style={{ background: 'rgba(var(--accent-rgb),0.1)' }}
                      >
                        <Icon size={16} style={{ color: 'var(--accent)' }} />
                      </div>
                      <div className="text-naira-text text-xs font-semibold mb-1">{card.label}</div>
                      <div className="text-naira-muted text-[11px] leading-relaxed">{card.note}</div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
