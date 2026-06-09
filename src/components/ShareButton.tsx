'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Link as LinkIcon, Check, Mail, Linkedin, MoreHorizontal } from 'lucide-react'

interface Props {
  title: string
  excerpt?: string
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export default function ShareButton({ title, excerpt }: Props) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
  }, [])

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const url = typeof window !== 'undefined' ? window.location.href : ''
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedText = encodeURIComponent(excerpt ? `${title} — ${excerpt}` : title)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard might be unavailable on non-secure contexts
    }
  }

  const nativeShare = async () => {
    try {
      await navigator.share({ title, text: excerpt, url })
      setOpen(false)
    } catch {
      // User cancelled or share failed — keep menu open
    }
  }

  const shareLinks = [
    {
      label: 'WhatsApp',
      icon: <WhatsAppIcon size={18} />,
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
    {
      label: 'X',
      icon: <XIcon size={16} />,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: 'Facebook',
      icon: <FacebookIcon size={18} />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: 'LinkedIn',
      icon: <Linkedin size={18} />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: 'Email',
      icon: <Mail size={18} />,
      href: `mailto:?subject=${encodedTitle}&body=${encodedText}%20${encodedUrl}`,
    },
  ]

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Share this post"
        className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-naira-border bg-naira-surface hover:border-naira-gold/40 text-naira-text-muted hover:text-naira-gold transition-colors"
      >
        <Share2 size={18} />
        <span className="text-sm font-medium hidden sm:inline">Share</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            role="menu"
            className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 z-30 w-56 rounded-2xl border border-naira-border bg-naira-card shadow-xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-naira-border">
              <p className="text-naira-text text-sm font-semibold">Share this post</p>
              <p className="text-naira-muted text-xs mt-0.5">Spread the word</p>
            </div>
            <ul className="p-1.5">
              {shareLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    role="menuitem"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-naira-text-muted hover:text-naira-gold hover:bg-naira-gold/5 transition-colors text-sm"
                  >
                    <span className="w-5 flex items-center justify-center">{s.icon}</span>
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}

              <li>
                <button
                  type="button"
                  onClick={copyLink}
                  role="menuitem"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-naira-text-muted hover:text-naira-gold hover:bg-naira-gold/5 transition-colors text-sm"
                >
                  <span className="w-5 flex items-center justify-center">
                    {copied ? <Check size={18} className="text-naira-gold" /> : <LinkIcon size={18} />}
                  </span>
                  <span>{copied ? 'Link copied' : 'Copy link'}</span>
                </button>
              </li>

              {canNativeShare && (
                <li>
                  <button
                    type="button"
                    onClick={nativeShare}
                    role="menuitem"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-naira-text-muted hover:text-naira-gold hover:bg-naira-gold/5 transition-colors text-sm"
                  >
                    <span className="w-5 flex items-center justify-center">
                      <MoreHorizontal size={18} />
                    </span>
                    <span>More options</span>
                  </button>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
