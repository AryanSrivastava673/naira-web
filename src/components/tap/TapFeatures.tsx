'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Camera, RefreshCw, Palette, WifiOff, TrendingUp, BarChart2, Globe, Filter, Star, Leaf, Shield } from 'lucide-react'

const features = [
  { icon: Zap,        title: 'Zero-friction tap',     desc: 'Menu loads before the guest puts their phone down.' },
  { icon: Camera,     title: '4K photography',        desc: 'Your dishes presented like a Michelin restaurant.' },
  { icon: RefreshCw,  title: 'Live menu updates',     desc: 'Change prices or mark sold-outs in 30 seconds.' },
  { icon: Palette,    title: 'Custom coaster design', desc: 'Five premium finishes. Laser-etched with your brand.' },
  { icon: WifiOff,    title: 'Offline-initiated',     desc: "NFC handshake works without the guest's data on." },
  { icon: TrendingUp, title: 'Smart upsells',         desc: 'Recommend pairings and add-ons automatically.' },
  { icon: BarChart2,  title: 'Weekly analytics',      desc: 'Know what your guests browse, skip, and order.' },
  { icon: Globe,      title: 'Multi-language',        desc: 'Hindi, English, or any regional language.' },
  { icon: Filter,     title: 'Allergen filters',      desc: 'Guests filter by dietary needs. Complaints drop.' },
  { icon: Star,       title: 'Event banners',         desc: "Promote tonight's special before they sit down." },
  { icon: Leaf,       title: 'Paperless forever',     desc: 'Zero menus printed. Zero laminates. Zero waste.' },
  { icon: Shield,     title: 'Lifetime hardware',     desc: 'One-time coaster cost. Software updates forever.' },
]

export default function TapFeatures() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" className="py-28 px-6 bg-naira-surface" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-5">
            Features
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Twelve ways Naira Tap{' '}
            <span className="text-gold-gradient">elevates your restaurant</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.title}
                className="group relative rounded-xl p-5 bg-naira-card border border-naira-border hover:border-naira-gold/30 transition-all overflow-hidden cursor-default"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                whileHover={{ boxShadow: '0 0 24px rgba(var(--accent-rgb),0.08)' }}
              >
                {/* Top accent line — appears on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
                />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors"
                  style={{ background: 'rgba(var(--accent-rgb),0.1)' }}
                >
                  <Icon size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <h4 className="text-naira-text text-sm font-semibold mb-1.5">{feat.title}</h4>
                <p className="text-naira-text-muted text-xs leading-relaxed">{feat.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
