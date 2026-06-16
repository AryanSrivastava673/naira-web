'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const FEATURES = [
  {
    img: '/tap/tap-hero.jpg',
    title: 'Zero-friction tap to open',
    desc: 'Guests bring their phone close. Menu opens in under a second — no app, no QR.',
  },
  {
    img: '/tap/promo-banner.jpg',
    title: '4K food photography',
    desc: 'Crisp, appetising visuals on every device. Photos outsell paper every time.',
  },
  {
    img: '/tap/menu-management-sync.jpg',
    title: 'Live updates from your phone',
    desc: 'Change a price in 4 seconds. The next tap shows the new reality.',
  },
  {
    img: '/tap/five-coasters.jpg',
    title: 'Custom coaster design',
    desc: 'Metallic black, brushed gold, walnut, frosted acrylic, rose copper. Your logo laser-etched.',
  },
  {
    img: '/tap/pairing-upsell.jpg',
    title: 'Smart upsells & pairings',
    desc: '"Goes great with" tags, bestsellers, add-on nudges. Lifts AOV by ₹45–₹90 per cover.',
  },
  {
    img: '/tap/analytics-dashboard.jpg',
    title: 'Weekly analytics',
    desc: 'See which dish gets clicked, which section gets skipped.',
  },
  {
    img: '/tap/multilanguage-switching.jpg',
    title: 'Multi-language switching',
    desc: 'English, Hindi, Marathi, and more. One tap flips the whole menu.',
  },
  {
    img: '/tap/dietary-filters.jpg',
    title: 'Allergen & dietary filters',
    desc: 'Gluten-free, Jain, vegan, nut-free. Guests filter with one tap.',
  },
  {
    img: '/tap/event-banner.jpg',
    title: 'Event & offer banners',
    desc: 'Push a banner to every device from your phone in seconds.',
  },
  {
    img: '/tap/paper-vs-nfc.jpg',
    title: 'Zero paper, zero waste',
    desc: "India's only fully paperless NFC menu platform.",
  },
  {
    img: '/tap/infinity-timeline.jpg',
    title: 'Lifetime hardware, lifetime software',
    desc: 'One flat install. Forever updates.',
  },
]

export default function TapFeatures() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="features"
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <div ref={ref} className="max-w-5xl mx-auto relative z-10">

        <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase text-naira-muted mb-2 text-center">
          What&apos;s inside
        </p>
        <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] text-naira-text text-center mb-3">
          Twelve ways your menu starts earning again.
        </h2>
        <p className="text-naira-text-muted text-sm text-center mb-10 max-w-lg mx-auto">
          Every feature built for the moment a guest decides what to order.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {FEATURES.map(({ img, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: 'rgba(20,14,22,0.8)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Image */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Text */}
              <div className="p-5 flex flex-col gap-1">
                <p className="font-semibold text-white text-sm leading-snug">{title}</p>
                <p className="text-xs text-white/50 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
