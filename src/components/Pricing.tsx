'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lock, Bell } from 'lucide-react'
import { useState } from 'react'
import posthog from 'posthog-js'

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
    accent: '#10B981',
    borderColor: 'rgba(16,185,129,0.35)',
    glowColor: 'rgba(16,185,129,0.07)',
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
    accent: 'var(--accent)',
    borderColor: 'rgba(255,43,163,0.45)',
    glowColor: 'rgba(255,43,163,0.08)',
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
    accent: '#8B5CF6',
    borderColor: 'rgba(139,92,246,0.35)',
    glowColor: 'rgba(139,92,246,0.07)',
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
        <div className="text-naira-gold font-medium text-sm">You&apos;re on the list!</div>
        <div className="text-naira-muted text-xs mt-1">We&apos;ll notify you the moment pricing goes live.</div>
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
        className="flex-1 px-3 py-3 rounded-lg bg-naira-black border border-naira-border text-naira-text text-sm placeholder:text-naira-muted focus:outline-none focus:border-naira-gold/50 transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="px-4 py-3 rounded-lg bg-naira-gold text-naira-black text-sm font-semibold hover:bg-naira-gold-light transition-colors flex-shrink-0 disabled:opacity-60"
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
    <section id="pricing" className="py-28 px-6 bg-naira-black relative overflow-hidden">
      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-5">
            Pricing
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-medium tracking-tighter mb-5"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Pricing that works
            <br />
            <span className="text-gold-gradient">for your restaurant</span>
          </h2>
          <p className="text-naira-text-muted text-lg max-w-xl mx-auto">
            We&apos;re putting the finishing touches on our plans. Sign up below
            and be the first to know when we launch.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className="relative rounded-2xl overflow-hidden bg-naira-surface"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                border: `1px solid ${plan.borderColor}`,
                boxShadow: `0 0 40px ${plan.glowColor}`,
              }}
            >
              {/* Top accent gradient line */}
              <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${plan.accent}, transparent)` }} />

              <div className="p-7">
                {/* Plan name */}
                <div
                  className="text-xs font-semibold tracking-widest uppercase mb-1"
                  style={{ color: plan.accent }}
                >
                  {plan.name}
                </div>
                <div className="text-naira-text-muted text-sm mb-4">{plan.tagline}</div>

                {/* Pricing locked state */}
                <div
                  className="flex items-center gap-3 py-4 px-4 rounded-xl mb-5"
                  style={{ background: `${plan.accent}0D`, border: `1px dashed ${plan.accent}40` }}
                >
                  <Lock size={16} style={{ color: plan.accent }} className="flex-shrink-0" />
                  <div>
                    <div className="shimmer-badge inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: plan.accent }}>
                      Coming Soon
                    </div>
                    <div className="text-xs text-naira-muted">Pricing will be announced soon</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-naira-text-muted text-sm leading-relaxed mb-5">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm text-naira-text-muted">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: plan.accent }}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* Notify CTA */}
                <div className="flex items-center gap-2 text-xs text-naira-muted mb-2">
                  <Bell size={12} />
                  <span>Get notified when pricing launches</span>
                </div>
                <NotifyForm planName={plan.name} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-naira-muted text-sm"
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
