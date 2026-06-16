'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const PRODUCT_LINKS = [
  {
    label: 'Naira Tap',
    href: '/tap',
    desc: 'NFC + QR digital menu for dine-in',
    nfc: true,
  },
  {
    label: 'Naira Billing',
    href: '/billing',
    desc: 'Cloud POS & order management',
  },
  {
    label: 'Naira Growth',
    href: '/growth',
    desc: 'SEO, reviews & online visibility',
    highlight: true,
  },
]

const NAV_LINKS = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing',      href: '/#pricing' },
  { label: 'Blog',         href: '/blog' },
]

export default function Navbar() {
  const [scrolled,             setScrolled]             = useState(false)
  const [mobileOpen,           setMobileOpen]           = useState(false)
  const [productsOpen,         setProductsOpen]         = useState(false)
  const [mobileProductsOpen,   setMobileProductsOpen]   = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.72)' : 'rgba(10,10,10,0.35)',
        backdropFilter: 'blur(20px) saturate(120%)',
        WebkitBackdropFilter: 'blur(20px) saturate(120%)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/brand_logo.png"
            alt="Naira Menus"
            width={160}
            height={40}
            className="h-14 w-auto"
            priority
            sizes="160px"
          />
        </Link>

        {/* ── Desktop nav ── */}
        <ul className="hidden md:flex items-center gap-7">

          {/* Products dropdown */}
          <li
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-[15px] text-white/75 hover:text-white transition-colors duration-200"
              aria-expanded={productsOpen}
              aria-haspopup="true"
            >
              Products
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 overflow-hidden"
                  style={{
                    borderRadius: 20,
                    // Solid raised surface so text always reads, regardless of what's behind the nav
                    background: '#141414',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 8px 24px rgba(255,43,163,0.12), 0 0 0 1px rgba(255,43,163,0.06)',
                  }}
                >
                  <div className="p-2 relative">
                    {PRODUCT_LINKS.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        onClick={() => setProductsOpen(false)}
                        className="flex items-start gap-3 px-3 py-3 transition-colors group"
                        style={{ borderRadius: 12 }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,43,163,0.06)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-sm font-semibold text-white"
                              style={p.highlight ? { color: 'var(--accent)' } : {}}
                            >
                              {p.label}
                            </span>
                            {p.nfc && (
                              <span className="relative flex h-1.5 w-1.5">
                                <span
                                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                                  style={{ background: 'var(--accent)' }}
                                />
                                <span
                                  className="relative inline-flex rounded-full h-1.5 w-1.5"
                                  style={{ background: 'var(--accent)' }}
                                />
                              </span>
                            )}
                            {p.highlight && (
                              <span
                                className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] px-1.5 py-0.5"
                                style={{
                                  background: 'rgba(255,43,163,0.12)',
                                  color: 'var(--accent)',
                                  borderRadius: 8,
                                }}
                              >
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-white/55 mt-0.5 leading-snug">{p.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Regular links */}
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[15px] text-white/75 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── CTA ── */}
        <div className="hidden md:flex items-center">
          <LetsTalkButton />
        </div>

        {/* ── Mobile toggle ── */}
        <button
          className="md:hidden text-white/75 hover:text-white"
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
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(10,10,10,0.92)',
              backdropFilter: 'blur(20px) saturate(120%)',
              WebkitBackdropFilter: 'blur(20px) saturate(120%)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <ul className="flex flex-col px-6 py-4 gap-1">

              {/* Products expandable */}
              <li>
                <button
                  onClick={() => setMobileProductsOpen((o) => !o)}
                  className="w-full flex items-center justify-between py-3 text-white/75 hover:text-white transition-colors"
                >
                  <span className="text-[15px]">Products</span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {mobileProductsOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-3 ml-1 mb-1"
                      style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {PRODUCT_LINKS.map((p) => (
                        <li key={p.href}>
                          <Link
                            href={p.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 py-2.5 text-[15px] transition-colors text-white/75 hover:text-white"
                            style={p.highlight ? { color: 'var(--accent)' } : {}}
                          >
                            {p.label}
                            {p.nfc && (
                              <span
                                className="font-mono px-1.5 py-0.5 text-[10px] font-medium tracking-[0.08em] uppercase"
                                style={{ background: 'rgba(255,43,163,0.12)', color: 'var(--accent)', borderRadius: 8 }}
                              >
                                NFC
                              </span>
                            )}
                            {p.highlight && (
                              <span
                                className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] px-1.5 py-0.5"
                                style={{ background: 'rgba(255,43,163,0.12)', color: 'var(--accent)', borderRadius: 8 }}
                              >
                                New
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 text-[15px] text-white/75 hover:text-white transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className="pt-2">
                <a
                  href="/contact"
                  className="btn-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  Let&apos;s Talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ── Primary nav CTA ──────────────────────────────────────────────────────────
function LetsTalkButton() {
  return (
    <a
      href="/contact"
      className="relative inline-flex items-center gap-2 text-sm font-semibold transition-all"
      style={{
        background: 'var(--accent)',
        color: '#ffffff',
        padding: '10px 18px',
        borderRadius: 12,
        boxShadow: '0 0 24px rgba(255,43,163,0.20)',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.background = 'var(--accent-dark)'
        ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.background = 'var(--accent)'
        ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
      }}
    >
      <span>Let&apos;s Talk</span>
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M2 7h10M8 3l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}
