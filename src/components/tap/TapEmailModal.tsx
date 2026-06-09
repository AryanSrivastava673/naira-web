'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  ctaSource?: string
}

export default function TapEmailModal({ open, onClose, ctaSource = 'tap-page' }: Props) {
  const [form, setForm] = useState({ name: '', email: '', restaurant: '', phone: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email.'
    if (!form.restaurant.trim()) return 'Please enter your restaurant name.'
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    setLoading(true)
    // TODO: wire to /api/growth-lead when developer approves
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSuccess(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => { setSuccess(false); setForm({ name: '', email: '', restaurant: '', phone: '' }) }, 300)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(12,17,24,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.22 }}
            className="w-full max-w-md rounded-2xl p-8 relative"
            style={{
              background: '#151018',
              border: '1px solid rgba(255,128,200,0.2)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,43,163,0.1)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-naira-muted hover:text-naira-text transition-colors"
            >
              <X size={18} />
            </button>

            {success ? (
              <div className="text-center py-6">
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'rgba(255,43,163,0.12)', border: '1px solid rgba(255,43,163,0.3)' }}
                >
                  <Check size={24} color="#ff2ba3" />
                </div>
                <h3 className="font-display text-xl font-bold text-naira-text mb-2">Report on the way</h3>
                <p className="text-sm text-naira-text-muted">Check your inbox in the next two minutes.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl font-bold text-naira-text mb-1">Get your free sample</h3>
                <p className="text-xs text-naira-muted mb-6">
                  {ctaSource === 'health-score'
                    ? 'Your personalised menu audit + 3 custom coaster renders. Free.'
                    : 'We\'ll design 3 custom coasters, ship a sample, and send a private preview link.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold tracking-widest uppercase text-naira-muted block mb-1.5">
                      Your name
                    </label>
                    <input
                      type="text"
                      placeholder="Riya Sharma"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 text-sm text-naira-text placeholder-naira-muted outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.09)',
                      }}
                      onFocus={e => (e.currentTarget.style.border = '1px solid rgba(255,43,163,0.4)')}
                      onBlur={e => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.09)')}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold tracking-widest uppercase text-naira-muted block mb-1.5">
                      Work email
                    </label>
                    <input
                      type="email"
                      placeholder="riya@thespicehouse.in"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 text-sm text-naira-text placeholder-naira-muted outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.09)',
                      }}
                      onFocus={e => (e.currentTarget.style.border = '1px solid rgba(255,43,163,0.4)')}
                      onBlur={e => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.09)')}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold tracking-widest uppercase text-naira-muted block mb-1.5">
                      Restaurant name
                    </label>
                    <input
                      type="text"
                      placeholder="The Spice House"
                      value={form.restaurant}
                      onChange={e => setForm(f => ({ ...f, restaurant: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 text-sm text-naira-text placeholder-naira-muted outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.09)',
                      }}
                      onFocus={e => (e.currentTarget.style.border = '1px solid rgba(255,43,163,0.4)')}
                      onBlur={e => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.09)')}
                    />
                  </div>

                  {error && <p className="text-xs text-red-400">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(204,34,130,0.9) 0%, rgba(255,43,163,0.9) 60%, rgba(255,128,200,0.85) 100%)',
                      color: 'var(--text)',
                      boxShadow: '0 4px 20px rgba(255,43,163,0.3)',
                    }}
                  >
                    {loading ? 'Sending…' : 'Email my report'}
                  </button>

                  <p className="text-[10px] text-naira-muted text-center">
                    We&apos;ll only email you the report and a follow-up offer. No spam, ever.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
