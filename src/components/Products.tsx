'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Monitor, Smartphone, TrendingUp, ArrowRight } from 'lucide-react'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

const products = [
  {
    id: 'billing',
    icon: Monitor,
    tag: 'Naira Billing',
    headline: 'The Smart POS Built for Restaurants',
    description:
      'A cloud-native point-of-sale that keeps up with the pace of your kitchen. From table orders to full inventory tracking — all in one place.',
    features: [
      'Cloud POS — access from anywhere',
      'Order management & kitchen display',
      'Real-time reporting & analytics',
      'Inventory tracking & alerts',
      'Third-party integrations (Zomato, Swiggy & more)',
    ],
    cta: 'Explore Naira Billing',
    ctaHref: '/billing',
  },
  {
    id: 'tap',
    icon: Smartphone,
    tag: 'Naira Tap',
    headline: 'NFC + QR Digital Menu',
    description:
      'Replace your paper menus with a beautiful digital experience. Guests tap their phone on the table coaster and your menu is right there — no app needed.',
    features: [
      'NFC-first, QR fallback for all devices',
      'Table ordering — guests order from their phone',
      'Instant menu updates — no reprinting',
      'Customisable menu design & branding',
      'Analytics — see what sells and when',
      'Hardware included (NFC coasters/stands)',
    ],
    cta: 'See Tap in Action',
    ctaHref: '/tap',
    featured: true,
  },
  {
    id: 'growth',
    icon: TrendingUp,
    tag: 'Naira Growth',
    headline: 'Online Optimisation Suite',
    description:
      'Be found, be chosen, be remembered. Naira Growth puts your restaurant in front of hungry customers exactly when they\'re searching.',
    features: [
      'Google Business Profile optimisation',
      'Automated review funnel',
      'SEO-optimised location pages',
      'Social bio link tools',
      'Growth dashboard with actionable insights',
      'Monthly reports + market trend updates',
    ],
    cta: 'Explore Growth Tools',
    ctaHref: '/growth',
  },
]

export default function Products() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="products" className="py-28 px-6 relative overflow-hidden" style={{ background: 'transparent' }}>
      <div aria-hidden className="absolute inset-0 constellation-bg pointer-events-none" />

      <div ref={ref} className="max-w-[1200px] mx-auto relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-3" style={{ color: PINK }}>
            Our Products
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-5 text-white">
            Everything your restaurant <span style={{ color: PINK }}>needs</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Three powerful tools. One cohesive platform. Built specifically for
            the modern Indian restaurant.
          </p>
        </motion.div>

        {/* Product cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, i) => {
            const Icon = product.icon
            const featured = !!product.featured
            return (
              <motion.div
                key={product.id}
                className="glass-dark relative overflow-hidden group"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{
                  borderRadius: 20,
                  border: featured ? `1px solid rgba(${PINK_RGB},0.35)` : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: featured ? `0 8px 24px rgba(${PINK_RGB},0.10), 0 16px 48px rgba(${PINK_RGB},0.06)` : 'none',
                }}
                whileHover={{
                  y: -4,
                  boxShadow: `0 8px 24px rgba(${PINK_RGB},0.12), 0 16px 48px rgba(${PINK_RGB},0.08)`,
                }}
              >
                {/* Featured badge */}
                {featured && (
                  <div
                    className="absolute top-4 right-4 font-mono px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] uppercase"
                    style={{ background: PINK, color: '#ffffff', borderRadius: 8 }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="p-7">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-5"
                    style={{
                      background: `rgba(${PINK_RGB},0.10)`,
                      border: `1px solid rgba(${PINK_RGB},0.22)`,
                      borderRadius: 12,
                    }}
                  >
                    <Icon size={22} style={{ color: PINK }} />
                  </div>

                  {/* Tag (mono eyebrow) */}
                  <div className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-2" style={{ color: PINK }}>
                    {product.tag}
                  </div>

                  {/* Headline */}
                  <h3 className="font-sans text-xl font-bold text-white mb-3 leading-snug tracking-[-0.01em]">
                    {product.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2.5 mb-8">
                    {product.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm text-white/70">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-[6px] flex-shrink-0"
                          style={{ background: PINK }}
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={product.ctaHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                    style={{ color: PINK }}
                  >
                    {product.cta}
                    <ArrowRight size={15} />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
