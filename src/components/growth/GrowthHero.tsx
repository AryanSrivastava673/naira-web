'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { calculateScore, type QuizAnswers, type AuditResult } from '@/lib/auditScore'

const QUIZ_QUESTIONS = [
  {
    text: 'How many Google reviews does your restaurant have?',
    options: [
      { text: "We're not on Google yet", value: 'no_listing' },
      { text: '1–10 reviews', value: 'reviews_low' },
      { text: '11–50 reviews', value: 'reviews_mid' },
      { text: '51–200 reviews', value: 'reviews_good' },
      { text: '200+ reviews', value: 'reviews_strong' },
    ],
  },
  {
    text: 'Where can customers order from you?',
    options: [
      { text: 'Nowhere online yet', value: 'ordering_none' },
      { text: 'Only Zomato or only Swiggy', value: 'ordering_one' },
      { text: 'Both Zomato and Swiggy', value: 'ordering_both' },
      { text: 'We have our own ordering system', value: 'ordering_own' },
    ],
  },
  {
    text: 'How active are you on Instagram or social media?',
    options: [
      { text: 'No presence at all', value: 'social_none' },
      { text: 'Have a page but rarely post', value: 'social_inactive' },
      { text: 'Post occasionally (few times a month)', value: 'social_occasional' },
      { text: 'Post regularly (weekly or more)', value: 'social_active' },
    ],
  },
  {
    text: 'Do you have a website?',
    options: [
      { text: 'No website yet', value: 'website_none' },
      { text: 'Just a menu link or PDF', value: 'website_basic' },
      { text: 'Yes, a proper website', value: 'website_yes' },
    ],
  },
]

const SCORE_BANDS = [
  { max: 40, label: 'Critical', color: '#EF4444' },
  { max: 65, label: 'Needs Work', color: '#C8A54D' },
  { max: 100, label: 'Strong', color: '#ff2ba3' },
]

const LOADING_MESSAGES = [
  'Checking your website speed...',
  'Analysing mobile performance...',
  'Running Lighthouse audit...',
  'Almost there...',
  'Calculating your score...',
]

const QUIZ_LOADING_MESSAGES = [
  'Analysing your answers...',
  'Checking your online presence...',
  'Comparing to local benchmarks...',
  'Calculating your score...',
]

const QUIZ_KEYS = ['q1', 'q2', 'q3', 'q4'] as const

type Step = 'quiz' | 'url-input' | 'loading' | 'result'

const RADIUS = 44
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function ScoreCircle({ score, color }: { score: number; color: string }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150)
    return () => clearTimeout(t)
  }, [])

  const dashOffset = CIRCUMFERENCE * (1 - (animated ? score : 0) / 100)

  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28 shrink-0">
      <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#2a2a2a" strokeWidth="8" />
      <circle
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={dashOffset}
        transform="rotate(-90 50 50)"
        style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
      />
      <text x="50" y="46" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="700">
        {score}
      </text>
      <text x="50" y="60" textAnchor="middle" fill="#C4A0B5" fontSize="9">
        /100
      </text>
    </svg>
  )
}

function rowLabelColor(label: string): string {
  if (label === 'Critical') return '#EF4444'
  if (label === 'Needs Work') return '#C8A54D'
  if (label === 'Strong') return '#ff2ba3'
  return 'rgba(255,255,255,0.55)'
}

export default function GrowthHero() {
  const [step, setStep] = useState<Step>('quiz')
  const [quizStep, setQuizStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({})
  const [selectedValue, setSelectedValue] = useState<string | null>(null)

  const [url, setUrl] = useState('')
  const [urlError, setUrlError] = useState('')

  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0)
  const [activeMessages, setActiveMessages] = useState<string[]>(LOADING_MESSAGES)
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [form, setForm] = useState({ restaurantName: '', name: '', phone: '', email: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const band =
    auditResult
      ? (SCORE_BANDS.find(b => auditResult.total <= b.max) ?? SCORE_BANDS[2])
      : SCORE_BANDS[0]

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMessages(LOADING_MESSAGES)
    setStep('quiz')
    setQuizStep(0)
    setAnswers({})
    setSelectedValue(null)
    setUrl('')
    setUrlError('')
    setLoadingMsgIdx(0)
    setAuditResult(null)
    setForm({ restaurantName: '', name: '', phone: '', email: '' })
    setFormStatus('idle')
  }

  const showResults = (finalAnswers: QuizAnswers, psScore: number | null) => {
    const result = calculateScore(finalAnswers, psScore)
    setAuditResult(result)
    setStep('result')
  }

  const runLoadingThenShowResults = (finalAnswers: QuizAnswers, psScore: number | null) => {
    setActiveMessages(QUIZ_LOADING_MESSAGES)
    setStep('loading')
    setLoadingMsgIdx(0)
    intervalRef.current = setInterval(() => {
      setLoadingMsgIdx(i => (i + 1) % QUIZ_LOADING_MESSAGES.length)
    }, 700)
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      showResults(finalAnswers, psScore)
    }, 2400)
  }

  const runPageSpeedAndShowResults = async (finalAnswers: QuizAnswers, targetUrl: string) => {
    setActiveMessages(LOADING_MESSAGES)
    setStep('loading')
    setLoadingMsgIdx(0)

    intervalRef.current = setInterval(() => {
      setLoadingMsgIdx(i => (i + 1) % LOADING_MESSAGES.length)
    }, 2000)

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      })
      const data = await res.json()
      if (intervalRef.current) clearInterval(intervalRef.current)
      showResults(finalAnswers, data.pageSpeedScore ?? null)
    } catch {
      if (intervalRef.current) clearInterval(intervalRef.current)
      showResults(finalAnswers, null)
    }
  }

  const nextQuestion = () => {
    if (!selectedValue) return

    const qKey = QUIZ_KEYS[quizStep]
    const newAnswers = { ...answers, [qKey]: selectedValue } as QuizAnswers

    if (quizStep < 3) {
      setAnswers(newAnswers)
      setQuizStep(s => s + 1)
      setSelectedValue(null)
    } else {
      setAnswers(newAnswers)
      setSelectedValue(null)
      if (selectedValue === 'website_yes') {
        setStep('url-input')
      } else {
        runLoadingThenShowResults(newAnswers, null)
      }
    }
  }

  const prevQuestion = () => {
    if (quizStep === 0) return
    const keyToRemove = QUIZ_KEYS[quizStep - 1]
    setAnswers(prev => {
      const updated = { ...prev }
      delete updated[keyToRemove]
      return updated
    })
    setQuizStep(s => s - 1)
    setSelectedValue(null)
  }

  const submitUrl = () => {
    let trimmed = url.trim()
    if (!trimmed) {
      setUrlError('Please enter your website URL')
      return
    }
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      trimmed = 'https://' + trimmed
    }
    setUrlError('')
    runPageSpeedAndShowResults(answers as QuizAnswers, trimmed)
  }

  const skipUrl = () => {
    runLoadingThenShowResults(answers as QuizAnswers, null)
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    try {
      await fetch('/api/growth-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantName: form.restaurantName,
          name: form.name,
          phone: form.phone,
          email: form.email,
          auditScore: auditResult?.total,
          quizAnswers: answers,
          source: 'growth-page',
        }),
      })
    } finally {
      setFormStatus('success')
    }
  }

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [])

  const currentQuestion = QUIZ_QUESTIONS[quizStep]

  return (
    <section
      id="audit"
      className="relative min-h-screen flex items-center pt-20 pb-16 px-6 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <div aria-hidden className="absolute inset-0 constellation-bg pointer-events-none" />
      <div
        aria-hidden
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,43,163,0.10) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Eyebrow pill — mobile only (the big heading carries the brand on desktop) */}
          <span
            className="md:hidden inline-flex items-center px-3 py-1 rounded-full font-mono text-[11px] font-medium tracking-[0.12em] uppercase mb-5"
            style={{
              background: 'rgba(255,43,163,0.12)',
              color: '#ff80c8',
              border: '1px solid rgba(255,43,163,0.25)',
            }}
          >
            Naira Growth
          </span>

          <h1
            className="font-sans mb-6"
            style={{ fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.04em', marginTop: '-2px' }}
          >
            <span
              className="block"
              style={{ color: '#ff2ba3', fontSize: 'clamp(3.5rem, 7vw, 6.5rem)' }}
            >
              Naira
            </span>
            <span
              className="block"
              style={{ color: '#ffffff', fontSize: 'clamp(3.5rem, 7vw, 6.5rem)' }}
            >
              Growth<span style={{ color: '#ff2ba3' }}>.</span>
            </span>
          </h1>

          <h2
            className="font-sans mb-6"
            style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              lineHeight: 1.2,
            }}
          >
            Get your restaurant found on{' '}
            <span style={{ color: '#ff2ba3' }}>Google &amp; AI search.</span>
          </h2>

          <p className="text-naira-text-muted text-base md:text-lg leading-relaxed mb-8 max-w-md">
            Your food is brilliant. Your service is excellent. But 76% of diners
            Google a restaurant before visiting — and most never scroll past the
            first result. Managing your restaurant&apos;s online presence shouldn&apos;t
            require an SEO degree.
          </p>

          <div className="space-y-3">
            {[
              'Free 30-second restaurant audit',
              'No sales call, no credit card required',
              'One specific fix to start today',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-naira-text-muted">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold"
                  style={{ background: 'rgba(255,43,163,0.15)', color: '#ff2ba3' }}
                >
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Audit tool */}
        <motion.div
          className="rounded-2xl p-6 md:p-8"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow:
              '0 8px 24px rgba(255,43,163,0.10), 0 16px 48px rgba(255,43,163,0.06), 0 24px 64px rgba(0,0,0,0.6)',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>

            {/* QUIZ */}
            {step === 'quiz' && (
              <motion.div
                key={`quiz-${quizStep}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs text-naira-text-muted">
                    Question {quizStep + 1} of 4
                  </span>
                  <div className="flex gap-1">
                    {QUIZ_QUESTIONS.map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            i < quizStep
                              ? '#ff2ba3'
                              : i === quizStep
                              ? 'rgba(255,43,163,0.5)'
                              : '#2a2a2a',
                        }}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-naira-text text-sm font-semibold mb-4 leading-snug min-h-[40px]">
                  {currentQuestion.text}
                </p>

                <div className="space-y-2 mb-5">
                  {currentQuestion.options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedValue(opt.value)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-all duration-150 ${
                        selectedValue === opt.value
                          ? 'border-naira-gold bg-naira-gold/10 text-naira-text'
                          : 'border-naira-border bg-naira-black/40 text-naira-text-muted hover:border-naira-gold/40 hover:text-naira-text'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  {quizStep > 0 && (
                    <button
                      onClick={prevQuestion}
                      className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-naira-text-muted text-sm transition-all hover:text-naira-text"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
                      }}
                    >
                      <ChevronLeft size={15} /> Back
                    </button>
                  )}
                  <button
                    onClick={nextQuestion}
                    disabled={!selectedValue}
                    className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: '#ff2ba3',
                      color: '#ffffff',
                      border: '1px solid rgba(255,128,200,0.3)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.15), 0 6px 24px rgba(255,43,163,0.3)',
                    }}
                  >
                    {quizStep === 3 ? 'Get my score' : 'Next'}
                    <ChevronRight size={15} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* URL INPUT */}
            {step === 'url-input' && (
              <motion.div
                key="url-input"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-naira-text text-sm font-semibold mb-1">
                  Enter your website URL to check your page speed
                </p>
                <p className="text-naira-muted text-xs mb-4">
                  We&apos;ll run a real mobile performance scan on your site.
                </p>
                <input
                  type="url"
                  value={url}
                  onChange={e => {
                    setUrl(e.target.value)
                    setUrlError('')
                  }}
                  onKeyDown={e => e.key === 'Enter' && submitUrl()}
                  placeholder="https://yourrestaurant.com"
                  className="w-full px-4 py-3 rounded-xl text-sm text-naira-text placeholder:text-naira-muted bg-naira-black border border-naira-border focus:outline-none focus:border-naira-gold/50 transition-colors"
                />
                <div className="min-h-[20px] mb-2">
                  {urlError && (
                    <p className="text-xs mt-1" style={{ color: '#EF4444' }}>
                      {urlError}
                    </p>
                  )}
                </div>
                <button
                  onClick={submitUrl}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: '#ff2ba3',
                    color: '#ffffff',
                    border: '1px solid rgba(255,128,200,0.3)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.15), 0 6px 24px rgba(255,43,163,0.3)',
                  }}
                >
                  Check my score →
                </button>
                <button
                  onClick={skipUrl}
                  className="w-full text-center text-xs text-naira-muted hover:text-naira-text-muted transition-colors mt-3"
                >
                  Skip — calculate without website speed
                </button>
              </motion.div>
            )}

            {/* LOADING */}
            {step === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 flex flex-col items-center gap-5"
              >
                <div
                  className="w-11 h-11 rounded-full animate-spin"
                  style={{ border: '3px solid #2a2a2a', borderTopColor: '#ff2ba3' }}
                />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loadingMsgIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-naira-text-muted text-sm"
                  >
                    {activeMessages[loadingMsgIdx]}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            )}

            {/* RESULT */}
            {step === 'result' && auditResult && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Score + band */}
                <div className="flex items-center gap-5 mb-5">
                  <ScoreCircle score={auditResult.total} color={band.color} />
                  <div>
                    <div
                      className="text-xs font-bold uppercase tracking-widest mb-1"
                      style={{ color: band.color }}
                    >
                      {band.label}
                    </div>
                    <p className="text-naira-text-muted text-xs leading-relaxed">
                      Your restaurant scored {auditResult.total}/100 on online presence.
                    </p>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-2 mb-5">
                  {auditResult.breakdown.map(row => (
                    <div
                      key={row.dimension}
                      className="flex items-center justify-between px-3 py-2 rounded-lg border border-naira-border bg-naira-black/30"
                    >
                      <span className="text-xs text-naira-text-muted">{row.dimension}</span>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: rowLabelColor(row.label) }}
                      >
                        {row.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Fix recommendation */}
                <div
                  className="rounded-xl p-4 mb-5 border"
                  style={{
                    background: 'rgba(255,43,163,0.06)',
                    borderColor: 'rgba(255,43,163,0.18)',
                  }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-naira-gold mb-1.5">
                    Top fix to start today
                  </p>
                  <p className="text-sm text-naira-text-muted leading-relaxed">{auditResult.fix}</p>
                </div>

                {/* Lead capture */}
                {formStatus === 'success' ? (
                  <div className="text-center py-3">
                    <div className="text-naira-gold font-semibold text-sm mb-1">
                      We&apos;ll be in touch!
                    </div>
                    <div className="text-naira-muted text-xs">
                      Expect a call with your personalised growth plan.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={submitForm} className="space-y-2" autoComplete="on">
                    <p className="text-xs text-naira-text-muted mb-2">
                      Get your free growth plan — no commitment.
                    </p>
                    <input
                      name="organization"
                      autoComplete="organization"
                      value={form.restaurantName}
                      onChange={e => setForm(f => ({ ...f, restaurantName: e.target.value }))}
                      placeholder="Restaurant name"
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm bg-naira-black border border-naira-border text-naira-text placeholder:text-naira-muted focus:outline-none focus:border-naira-gold/50 transition-colors"
                    />
                    <input
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm bg-naira-black border border-naira-border text-naira-text placeholder:text-naira-muted focus:outline-none focus:border-naira-gold/50 transition-colors"
                    />
                    <input
                      name="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="Phone number"
                      type="tel"
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm bg-naira-black border border-naira-border text-naira-text placeholder:text-naira-muted focus:outline-none focus:border-naira-gold/50 transition-colors"
                    />
                    <input
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="Email address"
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm bg-naira-black border border-naira-border text-naira-text placeholder:text-naira-muted focus:outline-none focus:border-naira-gold/50 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-60 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: '#ff2ba3',
                        color: '#ffffff',
                        border: '1px solid rgba(255,128,200,0.3)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.15), 0 6px 24px rgba(255,43,163,0.3)',
                      }}
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Get My Free Growth Plan →'}
                    </button>
                  </form>
                )}

                <button
                  onClick={reset}
                  className="w-full text-center text-xs text-naira-muted hover:text-naira-text-muted transition-colors mt-3"
                >
                  ← Start over
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
