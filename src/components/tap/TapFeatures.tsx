'use client'

import { useState } from 'react'
import Image from 'next/image'

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

export default function TapFeatures() {
  const [expanded, setExpanded] = useState(false)

  const visibleFeatures = expanded ? FEATURES : FEATURES.slice(0, 6)

  const handleToggle = () => {
    if (expanded) {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
    }
    setExpanded(!expanded)
  }

  return (
    <section
      id="features"
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 15% 40%, rgba(255,43,163,0.07) 0%, transparent 65%), #0C1118',
      }}
    >
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-4xl mx-auto relative z-10">

        <p className="text-xs font-medium tracking-widest uppercase text-naira-muted mb-2 text-center">
          What&apos;s inside
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tighter text-naira-text text-center mb-3">
          Twelve ways your menu starts earning again.
        </h2>
        <p className="text-naira-text-muted text-sm text-center mb-10 max-w-lg mx-auto">
          Every feature built for the moment a guest decides what to order.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {visibleFeatures.map(({ image, alt, title, tagline }, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden flex flex-col transition-colors duration-200"
              style={{
                background: 'rgba(30,21,32,0.55)',
                border: '1px solid rgba(255,255,255,0.06)',
                ...(i >= 6 ? {
                  animation: 'fadeSlideUp 0.35s ease forwards',
                  animationDelay: `${(i - 6) * 0.06}s`,
                  opacity: 0,
                } : {}),
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
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleToggle}
            aria-expanded={expanded}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '0',
              padding: '12px 28px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '999px',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = '#ff2ba3'
              el.style.color = '#ff2ba3'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = 'rgba(255,255,255,0.2)'
              el.style.color = '#ffffff'
            }}
          >
            {expanded ? 'Show less' : 'Show all 12 features'}
            <svg
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  )
}
