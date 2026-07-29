'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Check, Copy, CheckCheck, Lock, Bell } from 'lucide-react'
import posthog from 'posthog-js'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

const plans = [
  {
    id: 'tap',
    href: '/tap',
    name: 'Naira Tap',
    tagline: 'Digital menu for dine-in',
    description: 'NFC + QR menu, table ordering, analytics, and customisation — everything to replace paper menus.',
    price: '1,250',
    priceNote: 'Starting at',
    features: [
      'Unlimited menu items',
      'NFC + QR menu access',
      'Table ordering',
      'Menu customisation',
      'Basic analytics',
      'NFC hardware included',
    ],
  },
  {
    id: 'billing',
    href: '/billing',
    name: 'Naira Billing',
    tagline: 'Full-stack POS',
    description: 'Cloud POS, order management, inventory, reporting, and third-party integrations.',
    price: '850',
    priceNote: 'Starting at',
    features: [
      'Cloud POS system',
      'Order & kitchen management',
      'Inventory tracking',
      'Detailed reporting',
      'Zomato / Swiggy integration',
      'Includes Naira Tap',
    ],
    featured: true,
  },
  {
    id: 'growth',
    href: '/growth',
    name: 'Naira Growth',
    tagline: 'Online presence & growth',
    description: 'Google optimisation, review funnel, SEO pages, social tools, and monthly insights.',
    price: null,
    features: [
      'Google Business Profile optimisation',
      'Automated review funnel',
      'SEO location pages',
      'Social bio link tools',
      'Growth dashboard',
      'Monthly reports',
    ],
  },
]

const DISCOUNT_CODE = 'NM26WEB10'

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
    <div>
      <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
        <Bell size={12} />
        <span>Get notified when pricing launches</span>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-3 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none transition-colors"
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
          style={{ background: PINK, color: '#ffffff', borderRadius: 12 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-dark)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = PINK)}
        >
          {status === 'submitting' ? '...' : 'Notify me'}
        </button>
        {status === 'error' && (
          <span className="text-red-400 text-xs self-center">Failed</span>
        )}
      </form>
    </div>
  )
}

function DiscountClaim() {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(DISCOUNT_CODE).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className="mt-5">
      {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="w-full py-3 text-sm font-semibold transition-all"
            style={{
              background: `rgba(${PINK_RGB}, 0.10)`,
              border: `1px solid rgba(${PINK_RGB}, 0.28)`,
              borderRadius: 12,
              color: PINK,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `rgba(${PINK_RGB}, 0.16)`
              e.currentTarget.style.borderColor = `rgba(${PINK_RGB}, 0.45)`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `rgba(${PINK_RGB}, 0.10)`
              e.currentTarget.style.borderColor = `rgba(${PINK_RGB}, 0.28)`
            }}
          >
            Claim your discount →
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-between px-4 py-3 transition-all group"
              style={{
                background: `rgba(${PINK_RGB}, 0.07)`,
                border: `1px dashed rgba(${PINK_RGB}, 0.40)`,
                borderRadius: 12,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `rgba(${PINK_RGB}, 0.12)`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = `rgba(${PINK_RGB}, 0.07)`)}
            >
              <span
                className="font-mono text-base font-bold tracking-[0.12em]"
                style={{ color: PINK }}
              >
                {DISCOUNT_CODE}
              </span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: copied ? '#4ade80' : PINK }}>
                {copied ? (
                  <>
                    <CheckCheck size={14} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </span>
            </button>
            <p className="text-xs mt-2 text-center" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Provide it to our team while billing
            </p>
          </motion.div>
        )}
    </div>
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

        {/* ── Header ── */}
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
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Transparent, flat-rate plans. No per-transaction cuts, no hidden setup fees.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => {
            const featured = !!plan.featured
            return (
              <motion.div
                key={plan.id}
                className="glass-dark relative flex flex-col overflow-hidden cursor-pointer group/card"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{
                  borderRadius: 20,
                  border: featured
                    ? `1px solid rgba(${PINK_RGB},0.35)`
                    : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: featured
                    ? `0 8px 32px rgba(${PINK_RGB},0.12), 0 20px 60px rgba(${PINK_RGB},0.07)`
                    : 'none',
                }}
              >
                {/* Stretched link covers the whole card; buttons sit above via z-10 */}
                <Link href={plan.href} className="absolute inset-0 z-0" aria-label={`Learn more about ${plan.name}`} />

                {featured && (
                  <div
                    className="absolute top-4 right-4 font-mono px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] uppercase z-10"
                    style={{ background: PINK, color: '#ffffff', borderRadius: 8 }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="p-7 flex flex-col flex-1 relative z-10">

                  {/* ── Plan identity ── */}
                  <div className="mb-6">
                    <div
                      className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase mb-1"
                      style={{ color: PINK }}
                    >
                      {plan.name}
                    </div>
                    <div className="text-white/60 text-sm">{plan.tagline}</div>
                  </div>

                  {/* ── Price ── */}
                  {plan.price ? (
                    <div className="mb-6">
                      <div className="text-white/50 text-xs mb-1">{plan.priceNote}</div>
                      <div className="flex items-end gap-1">
                        <span className="text-white/70 text-xl font-medium">₹</span>
                        <span
                          className="text-white font-bold leading-none"
                          style={{ fontSize: '2.6rem', letterSpacing: '-0.03em' }}
                        >
                          {plan.price}
                        </span>
                        <span className="text-white/45 text-sm mb-1">/month</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-3 py-3.5 px-4 mb-6"
                      style={{
                        background: `rgba(${PINK_RGB},0.05)`,
                        border: `1px dashed rgba(${PINK_RGB},0.25)`,
                        borderRadius: 12,
                      }}
                    >
                      <Lock size={15} style={{ color: PINK }} className="flex-shrink-0" />
                      <div>
                        <div
                          className="shimmer-badge inline-block font-mono px-2 py-0.5 text-[10px] font-medium tracking-[0.12em] uppercase mb-0.5"
                          style={{ color: PINK, borderRadius: 8 }}
                        >
                          Coming Soon
                        </div>
                        <div className="text-xs text-white/45">Pricing will be announced soon</div>
                      </div>
                    </div>
                  )}

                  {/* ── Description ── */}
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* ── Features ── */}
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm text-white/65">
                        <Check
                          size={14}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: PINK }}
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* ── CTA ── */}
                  {plan.id === 'growth' ? (
                    <NotifyForm planName={plan.name} />
                  ) : (
                    <DiscountClaim />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Bottom note ── */}
        <motion.p
          className="text-center text-white/45 text-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          All plans come with onboarding support and a dedicated account manager.&nbsp;
          No hidden fees, no per-transaction cuts.
        </motion.p>
      </div>
    </section>
  )
}
