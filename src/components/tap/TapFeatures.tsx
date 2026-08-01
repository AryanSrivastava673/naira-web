'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Smartphone, Camera, RefreshCw, Disc, Sparkles,
  BarChart3, Languages, Filter, Megaphone, Leaf, Infinity,
} from 'lucide-react'

const FEATURES = [
  { Icon: Smartphone, title: 'Zero-friction tap to open', tagline: 'Phone close. Menu opens in under a second.' },
  { Icon: Camera,     title: '4K food photography',       tagline: 'Crisp visuals that outsell paper every time.' },
  { Icon: RefreshCw,  title: 'Live updates',              tagline: 'Change a price in 4 seconds, live instantly.' },
  { Icon: Disc,       title: 'Custom coaster design',     tagline: 'Brushed metal, walnut, acrylic — your logo.' },
  { Icon: Sparkles,   title: 'Smart upsells & pairings',  tagline: 'Bestseller nudges lift AOV by ₹45–₹90.' },
  { Icon: BarChart3,  title: 'Weekly analytics',          tagline: 'Which dish gets clicked, which gets skipped.' },
  { Icon: Languages,  title: 'Multi-language switching',  tagline: 'English, Hindi, Marathi — one tap to flip.' },
  { Icon: Filter,     title: 'Allergen & dietary filters', tagline: 'Gluten-free, Jain, vegan — guest filtered.' },
  { Icon: Megaphone,  title: 'Event & offer banners',     tagline: 'Push a banner to every device in seconds.' },
  { Icon: Leaf,       title: 'Zero paper, zero waste',    tagline: "India's only fully paperless NFC platform." },
  { Icon: Infinity,   title: 'Lifetime hardware & software', tagline: 'One flat install. Forever updates.' },
]

export default function TapFeatures() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="features"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <div aria-hidden className="absolute inset-0 constellation-bg pointer-events-none" />
      <div ref={ref} className="max-w-5xl mx-auto relative z-10">

        <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-2 text-center" style={{ color: '#ff2ba3' }}>
          What&apos;s inside
        </p>
        <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white text-center mb-3">
          Eleven ways your menu starts <span style={{ color: '#ff2ba3' }}>earning again.</span>
        </h2>
        <p className="text-white/70 text-sm text-center mb-10 max-w-lg mx-auto">
          Every feature built for the moment a guest decides what to order.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ Icon, title, tagline }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(255,43,163,0.10), 0 16px 48px rgba(255,43,163,0.06)' }}
              className="glass-dark p-5 flex flex-col items-center text-center gap-3"
              style={{ borderRadius: 16 }}
            >
              <div
                className="w-11 h-11 flex items-center justify-center shrink-0"
                style={{
                  background: 'rgba(255,43,163,0.12)',
                  border: '1px solid rgba(255,43,163,0.22)',
                  borderRadius: 12,
                }}
              >
                <Icon size={20} color="#ff2ba3" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm mb-1">{title}</p>
                <p className="text-xs text-white/60 leading-snug">{tagline}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
