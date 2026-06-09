'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Zap, Camera, RefreshCw, Palette, WifiOff, TrendingUp,
  BarChart3, Globe, Filter, Megaphone, Leaf, Repeat,
} from 'lucide-react'

const FEATURES = [
  { Icon: Zap,       title: 'Zero-friction tap',           tagline: 'Menu opens in under a second — no app, no QR.' },
  { Icon: Camera,    title: '4K food photography',         tagline: 'Crisp, appetising visuals on every device.' },
  { Icon: RefreshCw, title: 'Live updates',                tagline: 'Change a price in 4 seconds. Next tap shows it.' },
  { Icon: Palette,   title: 'Custom coaster design',       tagline: 'Six finishes, laser-etched with your logo.' },
  { Icon: WifiOff,   title: 'Works without wifi',          tagline: 'Cached delivery — opens even in a basement.' },
  { Icon: TrendingUp,title: 'Smart upsells & pairings',    tagline: 'Bestseller nudges that lift AOV by ₹45–₹90.' },
  { Icon: BarChart3, title: 'Weekly analytics',            tagline: 'See which dish gets clicked, which gets skipped.' },
  { Icon: Globe,     title: 'Multi-language',              tagline: 'English, Hindi, Marathi. One tap flips the menu.' },
  { Icon: Filter,    title: 'Allergen & dietary filters',  tagline: 'Jain, vegan, gluten-free. Guests filter instantly.' },
  { Icon: Megaphone, title: 'Event & offer banners',       tagline: 'Push a banner to every device in seconds.' },
  { Icon: Leaf,      title: 'Zero paper, zero waste',      tagline: "India's only fully paperless NFC menu platform." },
  { Icon: Repeat,    title: 'Lifetime updates',            tagline: 'One flat install. Forever software updates.' },
]

const A = '#ff2ba3'
const A_RGB = '255,43,163'

export default function TapFeatures() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="features"
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 15% 40%, rgba(255,43,163,0.07) 0%, transparent 65%), #0C1118',
      }}
    >
      <div ref={ref} className="max-w-4xl mx-auto relative z-10">

        <p className="text-xs font-medium tracking-widest uppercase text-naira-muted mb-2 text-center">
          What&apos;s inside
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tighter text-naira-text text-center mb-3">
          Twelve ways your menu starts earning again.
        </h2>
        <p className="text-naira-text-muted text-sm text-center mb-10 max-w-lg mx-auto">
          Every feature built for the moment a guest decides what to order.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map(({ Icon, title, tagline }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="rounded-2xl p-5 flex flex-col items-center text-center gap-3"
              style={{
                background: 'rgba(30,21,32,0.55)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `rgba(${A_RGB},0.1)`,
                  border: `1px solid rgba(${A_RGB},0.2)`,
                }}
              >
                <Icon size={20} color={A} />
              </div>
              <div>
                <p className="font-semibold text-naira-text text-sm mb-1">{title}</p>
                <p className="text-xs text-naira-muted leading-snug">{tagline}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
