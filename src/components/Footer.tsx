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
    { label: 'Naira Billing', href: '#products' },
    { label: 'Naira Tap', href: '#products' },
    { label: 'Naira Growth', href: '#products' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Refund Policy', href: '#' },
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
      className="rounded-2xl border border-naira-gold/20 p-8 mb-16"
      style={{ background: 'linear-gradient(135deg, rgba(var(--accent-rgb),0.06) 0%, rgba(0,0,0,0) 100%)' }}
    >
      <div className="max-w-xl mx-auto text-center">
        <h3
          className="font-display text-3xl md:text-4xl font-bold mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Ready to modernise your restaurant?
        </h3>
        <p className="text-naira-text-muted text-base mb-6">
          Get early access to Naira Menus. We&apos;re onboarding a limited number
          of restaurants for our pilot — request a demo call.
        </p>

        {status === 'success' ? (
          <div className="py-4">
            <div className="text-naira-gold font-medium">Demo request submitted!</div>
            <div className="text-naira-muted text-sm mt-1">We&apos;ll call you shortly to schedule your demo.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-lg bg-naira-black border border-naira-border text-naira-text text-sm placeholder:text-naira-muted focus:outline-none focus:border-naira-gold/50 transition-colors"
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
              className="w-full px-4 py-3 rounded-lg bg-naira-black border border-naira-border text-naira-text text-sm placeholder:text-naira-muted focus:outline-none focus:border-naira-gold/50 transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full px-6 py-3 rounded-full bg-naira-gold text-naira-black text-sm font-semibold hover:bg-naira-gold-light transition-colors disabled:opacity-60"
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
    <footer className="bg-naira-black border-t border-naira-border px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <ContactSection />

        {/* Footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-naira-border">
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
            <p className="text-naira-text-muted text-sm leading-relaxed max-w-xs mb-4">
              The future of restaurant operations. NFC-powered menus, smart POS,
              and growth tools — all in one platform.
            </p>
            <p className="text-naira-gold text-xs font-semibold tracking-widest uppercase mb-2">Follow us</p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-naira-border bg-naira-card flex items-center justify-center text-naira-text-muted hover:text-naira-gold hover:border-naira-gold/50 hover:bg-naira-gold/10 transition-all duration-200"
                >
                  <social.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-naira-text text-sm font-semibold mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-naira-text-muted text-sm hover:text-naira-text transition-colors"
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-naira-muted text-xs">
          <p>© 2025 Naira Menus. All rights reserved.</p>
          <p className="text-center">
            Made with care for Indian restaurants 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  )
}
