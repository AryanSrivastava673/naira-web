'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Palette, UtensilsCrossed, MapPin,
  ClipboardList, Users, TrendingUp,
  Search, Star, BarChart3,
} from 'lucide-react'
import Link from 'next/link'

const PRODUCTS = [
  {
    id: 'tap',
    name: 'Naira Tap',
    tag: 'NFC Digital Menu',
    tagline: 'Replace paper menus with a premium tap-to-view experience.',
    color: '#ff2ba3',
    colorLight: '#ff80c8',
    rgb: '255,43,163',
    href: '/tap',
    steps: [
      {
        icon: Palette,
        title: 'Design your coasters',
        desc: 'Choose your finish and form factor, upload your logo. We send you a render for approval before anything is manufactured.',
        detail: 'Five finishes. Four form factors. Your brand, perfectly.',
      },
      {
        icon: UtensilsCrossed,
        title: 'We build your menu',
        desc: 'Share your existing menu or start fresh. We configure categories, set up upsells, and push it live on your behalf.',
        detail: 'Fully done for you. Zero tech knowledge needed.',
      },
      {
        icon: MapPin,
        title: 'Place & go live',
        desc: 'Coasters arrive within 7 days. Place them on tables. Your first guest taps — menu appears in under a second.',
        detail: 'From sign-up to live in under a week.',
      },
    ],
  },
  {
    id: 'billing',
    name: 'Naira Billing',
    tag: 'Cloud POS',
    tagline: 'A smart POS that keeps up with the pace of your kitchen.',
    color: '#ff2ba3',
    colorLight: '#ff80c8',
    rgb: '255,43,163',
    href: '/billing',
    steps: [
      {
        icon: ClipboardList,
        title: 'We set up your dashboard',
        desc: 'Share your menu, outlet details, and GST info. We configure your KOT flow, Zomato/Swiggy integration, and floor plan.',
        detail: 'You do nothing but send us a WhatsApp.',
      },
      {
        icon: Users,
        title: 'Staff training in one session',
        desc: 'A 30-minute walkthrough covering order entry, bill printing, and KOT management. Most teams are confident by the end.',
        detail: 'Large touch targets, clear labels — minimal learning curve.',
      },
      {
        icon: TrendingUp,
        title: 'Go live & get your first report',
        desc: 'Start billing from day one. Your first monthly growth report lands in 30 days with specific, actionable insights.',
        detail: 'Real-time data, not yesterday\'s guesswork.',
      },
    ],
  },
  {
    id: 'growth',
    name: 'Naira Growth',
    tag: 'Online Presence',
    tagline: 'Be found, be chosen, be remembered by hungry customers.',
    color: '#ff2ba3',
    colorLight: '#ff80c8',
    rgb: '255,43,163',
    href: '/#products',
    steps: [
      {
        icon: Search,
        title: 'We audit your online presence',
        desc: 'We review your Google Business Profile, existing reviews, local SEO standing, and visibility gaps against competitors in your area.',
        detail: 'Honest assessment — no fluff.',
      },
      {
        icon: Star,
        title: 'We optimise everything',
        desc: 'GBP updates, automated review funnel, SEO-optimised location pages, and social bio link tools — all set up and managed for you.',
        detail: 'Most restaurants see improvement within 30 days.',
      },
      {
        icon: BarChart3,
        title: 'Track & grow month by month',
        desc: 'Monthly reports showing search ranking changes, new reviews, and actionable suggestions for the next month.',
        detail: 'Growth you can actually measure.',
      },
    ],
  },
]

function ProductSection({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="py-20">
      {/* Product header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div>
          {/* Color bar */}
          <div
            className="w-10 h-1 rounded-full mb-4"
            style={{ background: product.color }}
          />
          <div
            className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase mb-2"
            style={{ color: product.colorLight }}
          >
            {product.tag}
          </div>
          <h2
            className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] text-naira-text"
          >
            {product.name}
          </h2>
          <p className="text-naira-text-muted mt-2 max-w-md">{product.tagline}</p>
        </div>

        <Link
          href={product.href}
          className="flex-shrink-0 flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
          style={{ color: product.colorLight }}
        >
          Learn more →
        </Link>
      </motion.div>

      {/* Steps grid */}
      <div className="relative">
        {/* Connecting line */}
        <div
          className="hidden md:block absolute top-[52px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${product.rgb},0.3), transparent)`,
          }}
        />

        <div className="grid md:grid-cols-3 gap-8">
          {product.steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.15 }}
              >
                {/* Icon block */}
                <div className="relative inline-flex mb-6">
                  <div
                    className="w-[100px] h-[100px] rounded-2xl flex items-center justify-center"
                    style={{
                      background: `rgba(${product.rgb},0.08)`,
                      border: `1px solid rgba(${product.rgb},0.22)`,
                    }}
                  >
                    <Icon size={34} style={{ color: product.color }} />
                  </div>
                  <div
                    className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 border-naira-black"
                    style={{ background: product.color, color: '#ffffff' }}
                  >
                    {i + 1}
                  </div>
                </div>

                <h3
                  className="text-lg font-semibold text-naira-text mb-2"
                >
                  {step.title}
                </h3>
                <p className="text-naira-text-muted text-sm leading-relaxed mb-3">{step.desc}</p>
                <p
                  className="text-xs italic pl-3 border-l-2"
                  style={{ color: 'var(--text-muted)', borderColor: `rgba(${product.rgb},0.3)` }}
                >
                  {step.detail}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function HIWProducts() {
  return (
    <section className="px-6" style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto">

        <div className="pt-16 pb-4 text-center">
          <span className="font-mono inline-block px-3 py-1 rounded-[8px] bg-[rgba(255,43,163,0.12)] text-[#ff2ba3] text-[12px] font-medium tracking-[0.12em] uppercase">
            The Products
          </span>
        </div>

        {PRODUCTS.map((product, i) => (
          <div key={product.id}>
            <ProductSection product={product} index={i} />
            {i < PRODUCTS.length - 1 && (
              <div
                className="h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.15), transparent)',
                }}
              />
            )}
          </div>
        ))}

      </div>
    </section>
  )
}
