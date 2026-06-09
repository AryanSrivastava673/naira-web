'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Send } from 'lucide-react'

interface Comment {
  _id: string
  name: string
  message: string
  createdAt: string
}

interface Props {
  slug: string
}

const VISITOR_KEY = 'naira-visitor-id'

function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return ''
  let id = window.localStorage.getItem(VISITOR_KEY)
  if (!id) {
    id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
    window.localStorage.setItem(VISITOR_KEY, id)
  }
  return id
}

function formatRelative(dateStr: string): string {
  const date = new Date(dateStr)
  const diffMs = Date.now() - date.getTime()
  const sec = Math.floor(diffMs / 1000)
  if (sec < 60) return 'just now'
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}m ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h ago`
  const day = Math.floor(hr / 24)
  if (day < 7) return `${day}d ago`
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function BlogInteractions({ slug }: Props) {
  const [visitorId, setVisitorId] = useState('')
  const [likeCount, setLikeCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [likeBusy, setLikeBusy] = useState(false)
  const [likeBurst, setLikeBurst] = useState(0)

  const [comments, setComments] = useState<Comment[]>([])
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const id = getOrCreateVisitorId()
    setVisitorId(id)

    fetch(`/api/blog/like?slug=${encodeURIComponent(slug)}&visitorId=${encodeURIComponent(id)}`)
      .then((r) => r.json())
      .then((data) => {
        if (typeof data?.count === 'number') setLikeCount(data.count)
        if (typeof data?.liked === 'boolean') setLiked(data.liked)
      })
      .catch(() => {})

    fetch(`/api/blog/comments?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.comments)) setComments(data.comments)
      })
      .catch(() => {})
      .finally(() => setCommentsLoading(false))
  }, [slug])

  const toggleLike = async () => {
    if (likeBusy || !visitorId) return
    setLikeBusy(true)
    const prevLiked = liked
    const prevCount = likeCount
    setLiked(!prevLiked)
    setLikeCount(prevLiked ? prevCount - 1 : prevCount + 1)
    if (!prevLiked) setLikeBurst((n) => n + 1)

    try {
      const res = await fetch('/api/blog/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, visitorId }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      if (typeof data?.count === 'number') setLikeCount(data.count)
      if (typeof data?.liked === 'boolean') setLiked(data.liked)
    } catch {
      setLiked(prevLiked)
      setLikeCount(prevCount)
    } finally {
      setLikeBusy(false)
    }
  }

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim() || status === 'submitting') return
    setStatus('submitting')
    try {
      const res = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name: name.trim(), message: message.trim() }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      if (data?.comment) {
        setComments((prev) => [data.comment, ...prev])
      }
      setMessage('')
      setStatus('success')
      setTimeout(() => setStatus('idle'), 2500)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section className="mt-14" id="comments">
      {/* Like bar */}
      <div className="flex items-center justify-between gap-4 py-5 border-y border-naira-border mb-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLike}
            disabled={likeBusy}
            aria-pressed={liked}
            aria-label={liked ? 'Unlike this post' : 'Like this post'}
            className="relative group flex items-center gap-2.5 px-4 py-2 rounded-full border border-naira-border bg-naira-surface hover:border-naira-gold/40 transition-colors disabled:opacity-60"
          >
            <motion.span
              initial={false}
              animate={liked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.35 }}
              className="flex items-center"
            >
              <Heart
                size={18}
                className={liked ? 'text-naira-gold' : 'text-naira-muted group-hover:text-naira-gold transition-colors'}
                fill={liked ? 'currentColor' : 'none'}
              />
            </motion.span>
            <span
              className={`text-sm font-medium tabular-nums ${
                liked ? 'text-naira-gold' : 'text-naira-text-muted'
              }`}
            >
              {likeCount}
            </span>

            {/* Burst particles on like */}
            <AnimatePresence>
              {likeBurst > 0 && (
                <motion.span
                  key={likeBurst}
                  className="pointer-events-none absolute inset-0 flex items-center justify-start pl-4"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  onAnimationComplete={() => setLikeBurst(0)}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-naira-gold"
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{
                        x: Math.cos((i / 6) * Math.PI * 2) * 20,
                        y: Math.sin((i / 6) * Math.PI * 2) * 20,
                        opacity: 0,
                      }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  ))}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={() => formRef.current?.querySelector('textarea')?.focus()}
            aria-label={`Jump to comments (${comments.length})`}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-naira-border bg-naira-surface hover:border-naira-gold/40 text-naira-text-muted hover:text-naira-gold transition-colors"
          >
            <MessageCircle size={18} />
            <span className="text-sm font-medium tabular-nums">{comments.length}</span>
          </button>
        </div>

        <span className="text-xs text-naira-muted hidden sm:inline">
          {liked ? 'Thanks for the love' : 'Enjoyed this? Let us know.'}
        </span>
      </div>

      {/* Comments */}
      <div>
        <h2
          className="text-2xl font-bold text-naira-text mb-6"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          Comments
          <span className="text-naira-muted text-base font-normal ml-2">({comments.length})</span>
        </h2>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={submitComment}
          className="rounded-2xl border border-naira-border bg-naira-surface p-5 mb-8"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={80}
            required
            className="w-full px-3 py-2 mb-3 rounded-lg bg-naira-black border border-naira-border text-naira-text text-sm placeholder:text-naira-muted focus:outline-none focus:border-naira-gold/50 transition-colors"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            maxLength={1000}
            required
            className="w-full px-3 py-2 rounded-lg bg-naira-black border border-naira-border text-naira-text text-sm placeholder:text-naira-muted focus:outline-none focus:border-naira-gold/50 transition-colors resize-y min-h-[96px]"
          />
          <div className="flex items-center justify-between gap-3 mt-3">
            <span className="text-xs text-naira-muted">
              {status === 'success' && (
                <span className="text-naira-gold">Comment posted — thanks!</span>
              )}
              {status === 'error' && (
                <span className="text-red-400">Something went wrong. Try again.</span>
              )}
              {status === 'idle' && `${message.length}/1000`}
              {status === 'submitting' && 'Posting…'}
            </span>
            <button
              type="submit"
              disabled={status === 'submitting' || !name.trim() || !message.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-naira-gold text-naira-black text-sm font-semibold hover:bg-naira-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send size={14} />
              {status === 'submitting' ? 'Posting…' : 'Post comment'}
            </button>
          </div>
        </form>

        {/* List */}
        {commentsLoading ? (
          <div className="text-naira-muted text-sm text-center py-8">Loading comments…</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-10 rounded-2xl border border-dashed border-naira-border">
            <MessageCircle size={22} className="text-naira-muted mx-auto mb-2" />
            <p className="text-naira-text-muted text-sm">Be the first to comment.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            <AnimatePresence initial={false}>
              {comments.map((c) => (
                <motion.li
                  key={c._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl border border-naira-border bg-naira-surface p-5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-naira-gold/15 border border-naira-gold/30 flex items-center justify-center shrink-0">
                      <span className="text-[11px] text-naira-gold font-bold uppercase">
                        {c.name?.[0] ?? '?'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-naira-text text-sm font-medium leading-tight">
                        {c.name}
                      </span>
                      <span className="text-naira-muted text-xs">{formatRelative(c.createdAt)}</span>
                    </div>
                  </div>
                  <p className="text-naira-text-muted text-sm leading-relaxed whitespace-pre-wrap">
                    {c.message}
                  </p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </section>
  )
}
