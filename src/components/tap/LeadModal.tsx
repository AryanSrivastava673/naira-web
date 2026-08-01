'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

type Variant = 'design' | 'sales' | 'demo'

interface Props {
  isOpen: boolean
  onClose: () => void
  variant: Variant
}

const WA_BASE = 'https://wa.me/919021044469'

const COPY: Record<Variant, {
  h3: string
  sub: string
  button: string
  finePrint: string
  message: (n: string) => string
}> = {
  design: {
    h3: 'Get your free sample',
    sub: "We'll design 3 custom coasters, ship a sample, and send a private preview link.",
    button: 'WhatsApp me the details',
    finePrint: "We'll reply within a few hours. No spam.",
    message: n => `Hi, I'm ${n}. I'd like a free Naira Tap sample and coaster design.`,
  },
  sales: {
    h3: 'Talk to the team',
    sub: "We'll reach out on WhatsApp within a few hours.",
    button: 'WhatsApp us',
    finePrint: 'No sales pressure. Just a conversation.',
    message: n => `Hi, I'm ${n}. I'd like to learn more about Naira Tap for my restaurant.`,
  },
  demo: {
    h3: 'See it on your table',
    sub: "Send us a photo of your table and we'll show you exactly how Naira Tap would look.",
    button: 'WhatsApp me the demo',
    finePrint: "We'll send 3 rendered mockups. Free.",
    message: n => `Hi, I'm ${n}. I'd like to see how Naira Tap would look on my table.`,
  },
}

export default function LeadModal({ isOpen, onClose, variant }: Props) {
  const [name, setName]       = useState('')
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState(false)

  const copy = COPY[variant]

  // Reset state when modal closes
  useEffect(() => {
    if (isOpen) return
    const t = setTimeout(() => { setSuccess(false); setName(''); setError('') }, 300)
    return () => clearTimeout(t)
  }, [isOpen])

  // Auto-close 4 s after success
  useEffect(() => {
    if (!success) return
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [success, onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const n = name.trim()
    if (!n) { setError('Please enter your name.'); return }
    setError('')
    const url = `${WA_BASE}?text=${encodeURIComponent(copy.message(n))}`
    // TODO: wire to Sanity lead capture
    window.open(url, '_blank')
    setSuccess(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(12,17,24,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.22 }}
            className="w-full max-w-md rounded-2xl p-8 relative"
            style={{
              background: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,43,163,0.1)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-naira-muted hover:text-naira-text transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {success ? (
              <SuccessState />
            ) : (
              <>
                <h3 className="font-display text-xl font-medium tracking-tighter text-naira-text mb-1">{copy.h3}</h3>
                <p className="text-xs text-naira-muted mb-6">{copy.sub}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-medium tracking-widest uppercase text-naira-muted block mb-1.5">
                      Your name
                    </label>
                    <input
                      type="text"
                      placeholder="Riya Sharma"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm text-naira-text placeholder-naira-muted outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
                      onFocus={e => (e.currentTarget.style.border = '1px solid rgba(255,43,163,0.4)')}
                      onBlur={e => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.09)')}
                    />
                    {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(204,34,130,0.9) 0%, rgba(255,43,163,0.9) 60%, rgba(255,128,200,0.85) 100%)',
                      color: 'var(--text)',
                      boxShadow: '0 4px 20px rgba(255,43,163,0.3)',
                    }}
                  >
                    {copy.button}
                  </button>

                  <p className="text-[10px] text-naira-muted text-center">{copy.finePrint}</p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SuccessState() {
  return (
    <div className="text-center py-6">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="#25D366" className="mx-auto mb-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-3.5-3.5 1.41-1.41L11 13.67l5.09-5.08 1.41 1.41L11 16.5z" />
      </svg>
      <h3 className="font-display text-xl font-medium tracking-tighter text-naira-text mb-2">Opening WhatsApp...</h3>
      <p className="text-sm text-naira-muted">
        If it doesn&apos;t open automatically,{' '}
        <a
          href="https://wa.me/919021044469"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-naira-text transition-colors"
        >
          tap here
        </a>
        .
      </p>
    </div>
  )
}
