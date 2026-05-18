'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const FEATURES = [
  { image: '/tap/tap-hero.jpg',               alt: 'Phone tapping NFC coaster, menu opens instantly',                             title: 'Zero-friction tap to open',            tagline: 'Guests bring their phone close. Menu opens in under a second — no app, no QR.' },
  { image: '/tap/dietary-filters.jpg',         alt: 'Phone showing beautiful food photos with dietary filter pills',                title: '4K food photography',                  tagline: 'Crisp, appetising visuals on every device. Photos outsell paper every time.' },
  { image: '/tap/menu-management-sync.jpg',    alt: 'Menu management dashboard syncing to NFC coasters instantly',                  title: 'Live updates from your phone',         tagline: 'Change a price in 4 seconds. The next tap shows the new reality.' },
  { image: '/tap/five-coasters.jpg',           alt: 'Five Naira Tap coaster finishes — black, gold, walnut, acrylic, copper',      title: 'Custom coaster design',                tagline: 'Metallic black, brushed gold, walnut, frosted acrylic, rose copper. Your logo laser-etched.' },
  { image: '/tap/tap-hero.jpg',                alt: 'Phone showing cached menu delivery without internet connection',                title: 'Works without wifi',                   tagline: 'Cached delivery means the menu opens even in a basement with spotty signal.' },
  { image: '/tap/pairing-upsell.jpg',          alt: 'Butter Chicken dish page with Goes great with pairings and revenue impact',    title: 'Smart upsells & pairings',             tagline: '"Goes great with" tags, bestsellers, add-on nudges. Lifts AOV by ₹45–₹90 per cover.' },
  { image: '/tap/analytics-dashboard.jpg',     alt: 'Naira Tap analytics dashboard showing dish popularity and tap stats',          title: 'Weekly analytics',                     tagline: 'See which dish gets clicked, which section gets skipped.' },
  { image: '/tap/multilanguage-switching.jpg', alt: 'Two phones showing English to Hindi menu switching with language options',     title: 'Multi-language switching',             tagline: 'English, Hindi, Marathi, and more. One tap flips the whole menu.' },
  { image: '/tap/dietary-filters.jpg',         alt: 'Dietary filter pills — Vegan, Protein, Low Carb on digital menu',             title: 'Allergen & dietary filters',           tagline: 'Gluten-free, Jain, vegan, nut-free. Guests filter with one tap.' },
  { image: '/tap/event-banner.jpg',            alt: 'Promo banner scheduling interface with countdown timer',                       title: 'Event & offer banners',                tagline: 'Push a banner to every device from your phone in seconds.' },
  { image: '/tap/paper-vs-nfc.jpg',            alt: 'Before and after — paper menus versus NFC digital menu',                      title: 'Zero paper, zero waste',               tagline: "India's only fully paperless NFC menu platform." },
  { image: '/tap/infinity-timeline.jpg',       alt: 'NFC coaster with infinity symbol and product roadmap timeline',                title: 'Lifetime hardware, lifetime software', tagline: 'One flat install. Forever updates.' },
]

const PAGE_SIZE = 6

export default function TapFeatures() {
  const [page, setPage]           = useState(0)
  const [direction, setDirection] = useState(1)
  const totalPages = Math.ceil(FEATURES.length / PAGE_SIZE)

  const go = (next: number) => {
    setDirection(next > page ? 1 : -1)
    setPage(next)
  }

  const pageItems = FEATURES.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <section
      id="features"
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 15% 40%, rgba(255,43,163,0.07) 0%, transparent 65%), #0C1118',
      }}
    >
      <div className="max-w-4xl mx-auto relative z-10">

        <p className="text-xs font-bold tracking-widest uppercase text-naira-muted mb-2 text-center">
          What&apos;s inside
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-naira-text text-center mb-3">
          Twelve ways your menu starts earning again.
        </h2>
        <p className="text-naira-text-muted text-sm text-center mb-10 max-w-lg mx-auto">
          Every feature built for the moment a guest decides what to order.
        </p>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.26, ease: 'easeInOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8"
          >
            {pageItems.map(({ image, alt, title, tagline }, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden flex flex-col transition-colors duration-200"
                style={{
                  background: 'rgba(30,21,32,0.55)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
              >
                <div className="relative w-full" style={{ aspectRatio: '16/9', background: '#0C1118' }}>
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="px-5 py-4">
                  <p className="font-semibold text-naira-text text-sm mb-1">{title}</p>
                  <p className="text-xs text-naira-muted leading-snug">{tagline}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => go(page - 1)}
            disabled={page === 0}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-25 disabled:cursor-not-allowed"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
          >
            <ChevronLeft size={16} className="text-naira-text-muted" />
          </button>
          <span className="text-xs text-naira-muted tabular-nums">{page + 1} / {totalPages}</span>
          <button
            onClick={() => go(page + 1)}
            disabled={page === totalPages - 1}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-25 disabled:cursor-not-allowed"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
          >
            <ChevronRight size={16} className="text-naira-text-muted" />
          </button>
        </div>

      </div>
    </section>
  )
}
