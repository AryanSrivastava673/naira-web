'use client'

import { useState } from 'react'
import posthog from 'posthog-js'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Linkedin } from 'lucide-react'

function XIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/naira.menus/', icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/naira-menus-8973633b7/', icon: Linkedin },
  { label: 'X', href: 'https://x.com/NairaMenus', icon: XIcon },
]

const footerLinks = {
  Products: [
    { label: 'Naira Tap', href: '/tap' },
    { label: 'Naira Billing', href: '/billing' },
    { label: 'Naira Growth', href: '/growth' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  Connect: [
    { label: "Let's Talk", href: '/contact' },
    { label: 'Instagram', href: 'https://www.instagram.com/naira.menus/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/naira-menus-8973633b7/' },
  ],
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

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
      posthog.capture('demo_request_submitted', { name: form.name })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      id="contact"
      className="glass-dark p-8 md:p-10 mb-16 relative overflow-hidden"
      style={{ borderRadius: 20, boxShadow: '0 8px 24px rgba(255,43,163,0.10), 0 16px 48px rgba(255,43,163,0.06)' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,43,163,0.10) 0%, transparent 60%)' }}
      />
      <div className="max-w-xl mx-auto text-center relative">
        <span className="font-mono inline-block px-3 py-1 text-[12px] font-medium tracking-[0.12em] uppercase mb-6"
          style={{ background: 'rgba(255,43,163,0.12)', color: 'var(--accent)', borderRadius: 8 }}
        >
          Let&apos;s Talk
        </span>
        <h3 className="font-sans text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-3 text-white">
          Ready to modernise your <span style={{ color: 'var(--accent)' }}>restaurant?</span>
        </h3>
        <p className="text-white/70 text-base mb-6">
          Get early access to Naira Menus. We&apos;re onboarding a limited number
          of restaurants for our pilot — request a demo call.
        </p>

        {status === 'success' ? (
          <div className="py-4">
            <div className="font-medium" style={{ color: 'var(--accent)' }}>Demo request submitted!</div>
            <div className="text-white/55 text-sm mt-1">We&apos;ll call you shortly to schedule your demo.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 text-white text-sm placeholder:text-white/45 focus:outline-none transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,43,163,0.4)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Contact Number"
              required
              type="tel"
              pattern="[0-9]{10}"
              title="Enter a 10-digit phone number"
              className="w-full px-4 py-3 text-white text-sm placeholder:text-white/45 focus:outline-none transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,43,163,0.4)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary w-full disabled:opacity-60"
            >
              {status === 'submitting' ? 'Submitting...' : 'Request a Demo Call'}
            </button>
            {status === 'error' && (
              <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="px-6 pt-16 pb-8 relative" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div aria-hidden className="absolute inset-0 constellation-bg pointer-events-none" />
      <div className="max-w-[1200px] mx-auto relative">
        <ContactSection />

        {/* Footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Image
                src="/brand_logo.png"
                alt="Naira Menus"
                width={160}
                height={40}
                className="h-14 w-auto"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs mb-4">
              The future of restaurant operations. NFC-powered menus, smart POS,
              and growth tools — all in one platform.
            </p>
            <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-2" style={{ color: 'var(--accent)' }}>Follow us</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Naira Menus on ${social.label}`}
                  className="w-11 h-11 flex items-center justify-center text-white/70 transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,43,163,0.10)'
                    e.currentTarget.style.borderColor = 'rgba(255,43,163,0.30)'
                    e.currentTarget.style.color = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                  }}
                >
                  <social.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase mb-4 text-white">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 font-mono text-white/55 text-[12px] tracking-[0.06em]">
          <p>Naira Menus. All rights reserved.</p>
          <p className="text-center">Made in India.</p>
        </div>
      </div>
    </footer>
  )
}
