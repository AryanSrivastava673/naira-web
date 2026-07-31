'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Smartphone, ArrowLeft } from 'lucide-react'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'

type Brand = 'iphone' | 'samsung' | 'xiaomi' | 'oneplus' | 'vivo' | 'android'
type IphoneAge = 'new' | 'old' | 'unsure'
type ResultType = 'full' | 'qr-only' | 'both'

const BRANDS: { id: Brand; label: string }[] = [
  { id: 'iphone',   label: 'iPhone' },
  { id: 'samsung',  label: 'Samsung' },
  { id: 'xiaomi',   label: 'Xiaomi / Redmi' },
  { id: 'oneplus',  label: 'OnePlus' },
  { id: 'vivo',     label: 'Vivo / Oppo' },
  { id: 'android',  label: 'Other Android' },
]

const IPHONE_AGE_OPTS: { id: IphoneAge; label: string }[] = [
  { id: 'new',    label: 'Yes, 2018 or newer' },
  { id: 'old',    label: 'No, it\'s older' },
  { id: 'unsure', label: 'Not sure' },
]

function getResult(brand: Brand, age?: IphoneAge): { type: ResultType; headline: string; body: string } {
  if (brand === 'iphone') {
    if (age === 'new')    return { type: 'full',     headline: 'Yes, it just taps.',             body: 'iPhone XS and newer read NFC natively. Hold the phone near the coaster and the menu appears. Nothing to install.' }
    if (age === 'old')    return { type: 'qr-only',  headline: 'QR covers it.',                  body: 'Older iPhones don\'t read background NFC, but every Naira coaster has a printed QR code. One scan, same menu.' }
    if (age === 'unsure') return { type: 'both',     headline: 'Either way, covered.',            body: 'Try the tap first. If nothing happens, the QR on the coaster opens the same menu instantly. Zero dead ends.' }
  }
  return { type: 'full', headline: 'Yes, it just taps.', body: `${BRANDS.find(b => b.id === brand)?.label} phones have had NFC since 2011. Tap with the screen on and the menu link appears. If Google Pay works on it, Naira Tap works.` }
}

const resultColors: Record<ResultType, { bg: string; border: string; badge: string }> = {
  'full':     { bg: `rgba(${PINK_RGB},0.06)`,    border: `rgba(${PINK_RGB},0.30)`,    badge: PINK },
  'qr-only':  { bg: 'rgba(251,191,36,0.06)',     border: 'rgba(251,191,36,0.30)',     badge: '#fbbf24' },
  'both':     { bg: 'rgba(52,211,153,0.06)',     border: 'rgba(52,211,153,0.30)',     badge: '#34d399' },
}

export default function NfcChecker() {
  const ref = useRef<HTMLDivElement>(null)
  const [brand, setBrand] = useState<Brand | null>(null)
  const [age, setAge] = useState<IphoneAge | null>(null)

  const step = !brand ? 'brand' : (brand === 'iphone' && !age) ? 'iphone-age' : 'result'
  const result = brand ? getResult(brand, age ?? undefined) : null
  const rc = result ? resultColors[result.type] : null

  const reset = () => { setBrand(null); setAge(null) }

  return (
    <section id="checker" className="py-24 px-6" style={{ background: '#0a0a0a' }}>
      <div ref={ref} className="max-w-[760px] mx-auto">

        <div className="text-center mb-12">
          <p className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase mb-3" style={{ color: PINK }}>
            5-second check
          </p>
          <h2
            className="text-white font-bold mb-4"
            style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', letterSpacing: '-0.02em' }}
          >
            Will my guests&apos; phones work?
          </h2>
          <p className="text-white/55 text-base">
            Pick a brand and see for yourself. Spoiler: the answer is yes.
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <AnimatePresence mode="wait">

            {/* Step 1 — brand picker */}
            {step === 'brand' && (
              <motion.div
                key="brand"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="p-8"
              >
                <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/40 mb-1">Step 1 of 2</p>
                <p className="text-white font-semibold text-lg mb-6">Which phone do they carry?</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {BRANDS.map(b => (
                    <button
                      key={b.id}
                      onClick={() => setBrand(b.id)}
                      className="py-3 px-4 rounded-xl text-sm font-semibold text-left transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        color: 'rgba(255,255,255,0.75)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = `rgba(${PINK_RGB},0.10)`
                        e.currentTarget.style.borderColor = `rgba(${PINK_RGB},0.35)`
                        e.currentTarget.style.color = '#fff'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'
                        e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
                      }}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2 — iPhone age */}
            {step === 'iphone-age' && (
              <motion.div
                key="iphone-age"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="p-8"
              >
                <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/40 mb-1">Step 2 of 2</p>
                <p className="text-white font-semibold text-lg mb-2">Is it an iPhone XS / XR (2018) or newer?</p>
                <p className="text-white/45 text-sm mb-6">NFC menu reading works natively from 2018 onward.</p>
                <div className="flex flex-col gap-3 mb-6">
                  {IPHONE_AGE_OPTS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setAge(opt.id)}
                      className="py-3 px-4 rounded-xl text-sm font-semibold text-left transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        color: 'rgba(255,255,255,0.75)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = `rgba(${PINK_RGB},0.10)`
                        e.currentTarget.style.borderColor = `rgba(${PINK_RGB},0.35)`
                        e.currentTarget.style.color = '#fff'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'
                        e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <button onClick={reset} className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors">
                  <ArrowLeft size={13} />
                  Back
                </button>
              </motion.div>
            )}

            {/* Result */}
            {step === 'result' && result && rc && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="p-8"
              >
                <div
                  className="rounded-xl p-6 mb-6"
                  style={{ background: rc.bg, border: `1px solid ${rc.border}` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 size={20} style={{ color: rc.badge }} />
                    <span
                      className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase"
                      style={{ color: rc.badge }}
                    >
                      {result.type === 'full' ? 'Compatible' : result.type === 'qr-only' ? 'QR Supported' : 'Fully Covered'}
                    </span>
                  </div>
                  <h3
                    className="text-white font-bold mb-2"
                    style={{ fontSize: '1.5rem', letterSpacing: '-0.02em' }}
                  >
                    {result.headline}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">{result.body}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all"
                    style={{ background: PINK, color: '#fff' }}
                  >
                    Let&apos;s Talk
                  </a>
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.70)', border: '1px solid rgba(255,255,255,0.10)' }}
                  >
                    <Smartphone size={14} />
                    Check another phone
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
