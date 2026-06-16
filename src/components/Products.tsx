'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Monitor, Smartphone, TrendingUp, ArrowRight } from 'lucide-react'

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
    accent: '#10B981',                        // green — matches Pricing
    borderColor: 'rgba(16,185,129,0.35)',
    glowColor: 'rgba(16,185,129,0.07)',
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
    ctaHref: '#tap-demo',
    accent: 'var(--accent)',                  // pink — matches Pricing
    borderColor: 'rgba(255,43,163,0.45)',
    glowColor: 'rgba(255,43,163,0.08)',
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
    ctaHref: '#contact',
    accent: '#8B5CF6',                        // purple — matches Pricing
    borderColor: 'rgba(139,92,246,0.35)',
    glowColor: 'rgba(139,92,246,0.07)',
  },
]

export default function Products() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="products" className="py-28 px-6 bg-naira-black relative">
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(var(--accent-rgb),0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--accent-rgb),0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-5">
            Our Products
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-medium tracking-tighter mb-5"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Everything your restaurant needs
          </h2>
          <p className="text-naira-text-muted text-lg max-w-2xl mx-auto">
            Three powerful tools. One cohesive platform. Built specifically for
            the modern Indian restaurant.
          </p>
        </motion.div>

        {/* Product cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, i) => {
            const Icon = product.icon
            return (
              <motion.div
                key={product.id}
                className="relative rounded-2xl overflow-hidden group bg-naira-surface"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{
                  border: `1px solid ${product.borderColor}`,
                  boxShadow: `0 0 40px ${product.glowColor}`,
                }}
              >
                {/* Top accent gradient line */}
                <div
                  className="h-0.5 w-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${product.accent}, transparent)` }}
                />

                {/* Featured badge */}
                {product.featured && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-naira-gold text-naira-black text-[10px] font-bold tracking-wider uppercase">
                    Most Popular
                  </div>
                )}

                <div className="p-7">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${product.accent}18` }}
                  >
                    <Icon size={22} style={{ color: product.accent }} />
                  </div>

                  {/* Tag */}
                  <div
                    className="text-xs font-semibold tracking-widest uppercase mb-2"
                    style={{ color: product.accent }}
                  >
                    {product.tag}
                  </div>

                  {/* Headline */}
                  <h3
                    className="text-xl font-bold text-naira-text mb-3 leading-snug"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {product.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-naira-text-muted text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2.5 mb-8">
                    {product.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm text-naira-text-muted">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-[6px] flex-shrink-0"
                          style={{ background: product.accent }}
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={product.ctaHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                    style={{ color: product.accent }}
                  >
                    {product.cta}
                    <ArrowRight size={15} />
                  </a>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    boxShadow: `inset 0 0 40px ${product.accent}0A`,
                  }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
