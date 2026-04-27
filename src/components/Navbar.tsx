'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Products',     href: '/#products' },
  { label: 'Naira Tap',    href: '/tap',           nfc: true },   // ← NFC highlight
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing',      href: '/#pricing' },
  { label: 'Blog',         href: '/#blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-naira-black/95 backdrop-blur-md border-b border-naira-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/brand_logo.png"
            alt="Naira Menus"
            width={160}
            height={40}
            className="h-14 w-auto"
            priority
          />
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href} className="relative flex items-center gap-1.5">
              <Link
                href={link.href}
                className="text-sm text-naira-text-muted hover:text-naira-text transition-colors duration-200"
              >
                {link.label}
              </Link>

              {/* NFC pulse indicator — draws the eye to the key feature */}
              {link.nfc && (
                <span className="relative flex h-2 w-2">
                  {/* Ping ring */}
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                    style={{ background: 'var(--accent)' }}
                  />
                  {/* Solid dot */}
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: 'var(--accent-light)' }}
                  />
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* ── CTA ── */}
        <div className="hidden md:flex items-center">
          <EarlyAccessButton />
        </div>

        {/* ── Mobile toggle ── */}
        <button
          className="md:hidden text-naira-text-muted hover:text-naira-text"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-naira-surface border-b border-naira-border overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.href} className="flex items-center gap-2">
                  <Link
                    href={link.href}
                    className="text-naira-text-muted hover:text-naira-text transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.nfc && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase"
                      style={{ background: 'rgba(var(--accent-rgb),0.15)', color: 'var(--accent-light)' }}>
                      NFC
                    </span>
                  )}
                </li>
              ))}
              <li>
                <a
                  href="/#contact"
                  className="inline-block px-5 py-2 rounded-full text-sm font-semibold"
                  style={{ background: 'linear-gradient(135deg, var(--accent-dark) 0%, var(--accent) 100%)', color: 'var(--text)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Get Early Access
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ── Standalone CTA button with shimmer + glow ────────────────────────────────
function EarlyAccessButton() {
  return (
    <div className="relative">
      {/* Outer soft glow ring — always pulsing, subtly */}
      <div
        className="absolute inset-0 rounded-full animate-glow-pulse pointer-events-none"
        style={{ boxShadow: '0 0 0 0 rgba(var(--accent-rgb),0)' }}
      />

      <a
        href="/#contact"
        className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold group"
        style={{
          background: `linear-gradient(135deg, var(--accent-dark) 0%, var(--accent) 60%, var(--accent-light) 100%)`,
          color: 'var(--text)',
          boxShadow: '0 0 0 1px rgba(var(--accent-rgb),0.35), 0 4px 24px rgba(var(--accent-rgb),0.22)',
          transition: 'box-shadow 0.3s ease, transform 0.2s ease',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLElement).style.boxShadow =
            '0 0 0 1px rgba(var(--accent-rgb),0.55), 0 6px 32px rgba(var(--accent-rgb),0.38)'
          ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.boxShadow =
            '0 0 0 1px rgba(var(--accent-rgb),0.35), 0 4px 24px rgba(var(--accent-rgb),0.22)'
          ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        }}
      >
        {/* Shimmer sweep — plays once on hover */}
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
          }}
        />

        <span className="relative">Get Early Access</span>

        {/* Arrow */}
        <svg
          className="relative w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200"
          viewBox="0 0 14 14" fill="none"
        >
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  )
}
