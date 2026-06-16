'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lock, Bell } from 'lucide-react'
import { useState } from 'react'
import posthog from 'posthog-js'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

const plans = [
  {
    name: 'Naira Tap',
    tagline: 'Digital menu for dine-in',
    description: 'NFC + QR menu, table ordering, analytics, and customisation — everything to replace paper menus.',
    features: [
      'Unlimited menu items',
      'NFC + QR menu access',
      'Table ordering',
      'Menu customisation',
      'Basic analytics',
      'NFC hardware included',
    ],
    order: 1,
  },
  {
    name: 'Naira Billing',
    tagline: 'Full-stack POS',
    description: 'Cloud POS, order management, inventory, reporting, and third-party integrations.',
    features: [
      'Cloud POS system',
      'Order & kitchen management',
      'Inventory tracking',
      'Detailed reporting',
      'Zomato / Swiggy integration',
      'Includes Naira Tap',
    ],
    featured: true,
    order: 2,
  },
  {
    name: 'Naira Growth',
    tagline: 'Online presence & growth',
    description: 'Google optimisation, review funnel, SEO pages, social tools, and monthly insights.',
    features: [
      'Google Business Profile optimisation',
      'Automated review funnel',
      'SEO location pages',
      'Social bio link tools',
      'Growth dashboard',
      'Monthly reports',
    ],
    order: 3,
  },
]

function NotifyForm({ planName }: { planName: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('submitting')
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan: planName }),
      })
      if (!res.ok) throw new Error()
      posthog.capture('pricing_notify_submitted', { plan: planName })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-3"
      >
        <div className="font-medium text-sm" style={{ color: PINK }}>You&apos;re on the list!</div>
        <div className="text-white/55 text-xs mt-1">We&apos;ll notify you the moment pricing goes live.</div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-3 py-3 text-white text-sm placeholder:text-white/45 focus:outline-none transition-colors"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = `rgba(${PINK_RGB},0.4)`)}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="px-4 py-3 text-sm font-semibold flex-shrink-0 disabled:opacity-60 transition-all"
        style={{
          background: PINK,
          color: '#ffffff',
          borderRadius: 12,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-dark)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = PINK)}
      >
        {status === 'submitting' ? '...' : 'Notify me'}
      </button>
      {status === 'error' && (
        <span className="text-red-400 text-xs self-center">Failed</span>
      )}
    </form>
  )
}

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="py-28 px-6 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${PINK_RGB},0.10) 0%, transparent 70%)` }}
      />
      <div aria-hidden className="absolute inset-0 constellation-bg pointer-events-none" />

      <div ref={ref} className="max-w-[1200px] mx-auto relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-3" style={{ color: PINK }}>
            Pricing
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-5 text-white">
            Pricing that works for your <span style={{ color: PINK }}>restaurant</span>
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            We&apos;re putting the finishing touches on our plans. Sign up below
            and be the first to know when we launch.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => {
            const featured = !!plan.featured
            return (
              <motion.div
                key={plan.name}
                className="glass-dark relative overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{
                  borderRadius: 20,
                  border: featured ? `1px solid rgba(${PINK_RGB},0.35)` : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: featured ? `0 8px 24px rgba(${PINK_RGB},0.10), 0 16px 48px rgba(${PINK_RGB},0.06)` : 'none',
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
                  {/* Plan name (mono eyebrow) */}
                  <div className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-1" style={{ color: PINK }}>
                    {plan.name}
                  </div>
                  <div className="text-white/70 text-sm mb-4">{plan.tagline}</div>

                  {/* Pricing locked state */}
                  <div
                    className="flex items-center gap-3 py-4 px-4 mb-5"
                    style={{
                      background: `rgba(${PINK_RGB},0.05)`,
                      border: `1px dashed rgba(${PINK_RGB},0.30)`,
                      borderRadius: 12,
                    }}
                  >
                    <Lock size={16} style={{ color: PINK }} className="flex-shrink-0" />
                    <div>
                      <div className="shimmer-badge inline-block font-mono px-2 py-0.5 text-[10px] font-medium tracking-[0.12em] uppercase mb-0.5" style={{ color: PINK, borderRadius: 8 }}>
                        Coming Soon
                      </div>
                      <div className="text-xs text-white/55">Pricing will be announced soon</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed mb-5">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-sm text-white/70">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: PINK }}
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* Notify CTA */}
                  <div className="flex items-center gap-2 text-xs text-white/55 mb-2">
                    <Bell size={12} />
                    <span>Get notified when pricing launches</span>
                  </div>
                  <NotifyForm planName={plan.name} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-white/55 text-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          All plans come with onboarding support and a dedicated account manager.
          No hidden fees, no per-transaction cuts.
        </motion.p>
      </div>
    </section>
  )
}
