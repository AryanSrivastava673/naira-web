'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import LeadModal from './tap/LeadModal'

const PRODUCT_LINKS = [
  {
    label: 'Naira Tap',
    href: '/tap',
    desc: 'NFC + QR digital menu for dine-in',
    nfc: true,
  },
  {
    label: 'Naira Billing',
    href: '/#products',
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
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing',      href: '/#pricing' },
  { label: 'Blog',         href: '/blog' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [salesModalOpen, setSalesModalOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
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
    <>
    <LeadModal isOpen={salesModalOpen} onClose={() => setSalesModalOpen(false)} variant="sales" />
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
              className="flex items-center gap-1 text-sm text-naira-text-muted hover:text-naira-text transition-colors duration-200"
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
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-2xl border border-naira-border bg-naira-surface shadow-xl overflow-hidden"
                  style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}
                >
                  {/* Arrow notch */}
                  <div
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-naira-surface border-l border-t border-naira-border"
                  />
                  <div className="p-2 relative">
                    {PRODUCT_LINKS.map(p => (
                      <Link
                        key={p.href}
                        href={p.href}
                        onClick={() => setProductsOpen(false)}
                        className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-naira-card transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-semibold transition-colors ${
                                p.highlight
                                  ? 'text-naira-gold'
                                  : 'text-naira-text group-hover:text-naira-text'
                              }`}
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
                                  style={{ background: 'var(--accent-light)' }}
                                />
                              </span>
                            )}
                            {p.highlight && (
                              <span
                                className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full"
                                style={{
                                  background: 'rgba(255,43,163,0.12)',
                                  color: '#ff80c8',
                                  border: '1px solid rgba(255,43,163,0.2)',
                                }}
                              >
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-naira-muted mt-0.5 leading-snug">{p.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Regular links */}
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-naira-text-muted hover:text-naira-text transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── CTA ── */}
        <div className="hidden md:flex items-center">
          <ContactSalesButton onClick={() => setSalesModalOpen(true)} />
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
            <ul className="flex flex-col px-6 py-4 gap-1">

              {/* Products expandable */}
              <li>
                <button
                  onClick={() => setMobileProductsOpen(o => !o)}
                  className="w-full flex items-center justify-between py-3 text-naira-text-muted hover:text-naira-text transition-colors"
                >
                  <span className="text-sm">Products</span>
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
                      className="overflow-hidden pl-3 border-l border-naira-border ml-1 mb-1"
                    >
                      {PRODUCT_LINKS.map(p => (
                        <li key={p.href}>
                          <Link
                            href={p.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-2 py-2.5 text-sm transition-colors ${
                              p.highlight ? 'text-naira-gold' : 'text-naira-text-muted hover:text-naira-text'
                            }`}
                          >
                            {p.label}
                            {p.nfc && (
                              <span
                                className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase"
                                style={{ background: 'rgba(var(--accent-rgb),0.15)', color: 'var(--accent-light)' }}
                              >
                                NFC
                              </span>
                            )}
                            {p.highlight && (
                              <span
                                className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full"
                                style={{ background: 'rgba(255,43,163,0.12)', color: '#ff80c8' }}
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

              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 text-sm text-naira-text-muted hover:text-naira-text transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className="pt-2">
                <button
                  className="inline-block px-5 py-2 rounded-full text-sm font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-dark) 0%, var(--accent) 100%)',
                    color: 'var(--text)',
                  }}
                  onClick={() => { setMobileOpen(false); setSalesModalOpen(true) }}
                >
                  Contact Sales
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  )
}

// ── Contact Sales CTA button ─────────────────────────────────────────────────
function ContactSalesButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 rounded-full animate-glow-pulse pointer-events-none"
        style={{ boxShadow: '0 0 0 0 rgba(var(--accent-rgb),0)' }}
      />
      <button
        onClick={onClick}
        className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold group"
        style={{
          background: `linear-gradient(135deg, var(--accent-dark) 0%, var(--accent) 60%, var(--accent-light) 100%)`,
          color: 'var(--text)',
          boxShadow: '0 0 0 1px rgba(var(--accent-rgb),0.35), 0 4px 24px rgba(var(--accent-rgb),0.22)',
          transition: 'box-shadow 0.3s ease, transform 0.2s ease',
        }}
        onMouseEnter={e => {
          ;(e.currentTarget as HTMLElement).style.boxShadow =
            '0 0 0 1px rgba(var(--accent-rgb),0.55), 0 6px 32px rgba(var(--accent-rgb),0.38)'
          ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLElement).style.boxShadow =
            '0 0 0 1px rgba(var(--accent-rgb),0.35), 0 4px 24px rgba(var(--accent-rgb),0.22)'
          ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        }}
      >
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
          }}
        />
        <span className="relative">Contact Sales</span>
        <svg
          className="relative w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200"
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
      </button>
    </div>
  )
}
