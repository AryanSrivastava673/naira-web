'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle, Instagram, Linkedin } from 'lucide-react'
import posthog from 'posthog-js'

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const INTEREST_OPTIONS = [
  'Naira Billing (Cloud POS)',
  'Naira Tap (NFC Digital Menu)',
  'Naira Growth (Online Presence)',
  'Full Platform',
  'General Inquiry',
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/naira.menus/', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/naira-menus-8973633b7/', Icon: Linkedin },
  { label: 'X', href: 'https://x.com/NairaMenus', Icon: XIcon },
]

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-naira-black border border-naira-border text-naira-text text-sm placeholder:text-naira-muted focus:outline-none focus:border-naira-gold/40 transition-colors'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    restaurantName: '',
    interest: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      posthog.capture('contact_sales_submitted', {
        restaurantName: form.restaurantName,
        interest: form.interest,
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent-light) 0%, transparent 70%)' }}
      />
      {/* Grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(var(--accent-rgb),0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--accent-rgb),0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-36 pb-24 relative">

        {/* ── Hero ── */}
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono inline-block px-3 py-1 rounded-[8px] bg-[rgba(255,43,163,0.12)] text-[#ff2ba3] text-[12px] font-medium tracking-[0.12em] uppercase mb-6">
            Contact Sales
          </span>
          <h1
            className="font-sans text-5xl md:text-6xl font-bold tracking-[-0.03em] leading-tight text-naira-text mb-5"
          >
            Let&apos;s find the right fit{' '}
            <span style={{ color: '#ff2ba3' }}>for your restaurant.</span>
          </h1>
          <p className="text-naira-text-muted text-lg leading-relaxed">
            Whether you&apos;re curious about our products, ready to get started, or just want to talk
            through your options — we&apos;re all ears.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-start">

          {/* Left — contact info */}
          <motion.div
            className="md:col-span-2 space-y-5"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            {/* Phone card */}
            <div
              className="rounded-2xl p-6 bg-naira-surface"
              style={{ border: '1px solid rgba(var(--accent-rgb),0.15)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(var(--accent-rgb),0.1)' }}
              >
                <Phone size={18} style={{ color: 'var(--accent-light)' }} />
              </div>
              <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-naira-gold mb-1">
                Talk to us
              </div>
              <div className="text-xl font-semibold text-naira-text mb-1">+91 90210 44469</div>
              <div className="text-xs text-naira-text-muted mb-5">Mon–Sat, 10am – 7pm IST</div>
              <div className="flex gap-2">
                <a
                  href="tel:+919021044699"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: '#ff2ba3',
                    color: '#ffffff',
                    boxShadow: '0 0 0 1px rgba(var(--accent-rgb),0.3)',
                  }}
                >
                  <Phone size={11} /> Call
                </a>
                <a
                  href="https://wa.me/919021044699"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-naira-border text-xs font-semibold text-naira-text-muted hover:text-naira-text hover:border-naira-gold/30 transition-colors"
                >
                  <MessageCircle size={11} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Email card */}
            <div
              className="rounded-2xl p-6 bg-naira-surface"
              style={{ border: '1px solid rgba(var(--accent-rgb),0.15)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(var(--accent-rgb),0.1)' }}
              >
                <Mail size={18} style={{ color: 'var(--accent-light)' }} />
              </div>
              <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-naira-gold mb-1">
                Email
              </div>
              <a
                href="mailto:contact@naira.menus.in"
                className="text-base font-medium text-naira-text hover:text-naira-gold transition-colors"
              >
                contact@naira.menus.in
              </a>
              <p className="text-xs text-naira-text-muted mt-1">
                For proposals, partnerships, or detailed queries
              </p>
            </div>

            {/* Social links */}
            <div className="px-1">
              <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-naira-text-muted mb-3">
                Follow along
              </div>
              <div className="flex gap-2.5">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Naira Menus on ${label}`}
                    className="w-10 h-10 rounded-xl border border-naira-border bg-naira-surface flex items-center justify-center text-naira-text-muted hover:text-naira-gold hover:border-naira-gold/40 hover:bg-naira-card transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <div
              className="rounded-2xl p-7 bg-naira-surface"
              style={{ border: '1px solid rgba(var(--accent-rgb),0.15)' }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.5), transparent)',
                }}
              />

              <h2
                className="font-sans text-2xl font-bold tracking-[-0.02em] text-naira-text mb-1"
                
              >
                Drop us a message
              </h2>
              <p className="text-naira-text-muted text-sm mb-7">
                Tell us about your restaurant — we&apos;ll get back to you within 24 hours.
              </p>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-xl"
                    style={{
                      background: 'rgba(var(--accent-rgb),0.12)',
                      color: 'var(--accent-light)',
                      border: '1px solid rgba(var(--accent-rgb),0.25)',
                    }}
                  >
                    ✓
                  </div>
                  <div className="text-naira-text font-semibold mb-2 text-lg">Message sent!</div>
                  <div className="text-naira-text-muted text-sm">
                    We&apos;ll reach out shortly to schedule your demo.
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className={inputClass}
                    />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      title="Enter a 10-digit phone number"
                      className={inputClass}
                    />
                  </div>

                  <input
                    name="restaurantName"
                    value={form.restaurantName}
                    onChange={handleChange}
                    placeholder="Restaurant name"
                    className={inputClass}
                  />

                  <select
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none cursor-pointer`}
                    style={{ color: form.interest ? 'var(--text)' : 'var(--text-muted)' }}
                  >
                    <option value="" disabled style={{ background: '#141414', color: '#D4AECA' }}>
                      How can we help?
                    </option>
                    {INTEREST_OPTIONS.map((o) => (
                      <option key={o} value={o} style={{ background: '#141414', color: '#FAF6F0' }}>
                        {o}
                      </option>
                    ))}
                  </select>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Anything else you'd like us to know"
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full px-6 py-3.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-60"
                    style={{
                      background:
                        '#ff2ba3',
                      color: '#ffffff',
                      boxShadow:
                        '0 0 0 1px rgba(var(--accent-rgb),0.3), 0 4px 20px rgba(var(--accent-rgb),0.2)',
                    }}
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send message'}
                  </button>

                  {status === 'error' && (
                    <p className="text-red-400 text-sm text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
