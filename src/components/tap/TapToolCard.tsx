'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import LeadModal from './LeadModal'

const FINISHES = [
  { id: 'metallic-black',  label: 'Metallic Black',   bg: 'radial-gradient(circle at 30% 30%, #333 0%, #0C0C0C 70%)' },
  { id: 'brushed-gold',    label: 'Brushed Gold',     bg: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0px, transparent 2px, transparent 4px), radial-gradient(circle at 30% 30%, #E8C27D 0%, #C8A54D 60%, #9A7B2A 100%)' },
  { id: 'walnut-wood',     label: 'Walnut Wood',      bg: 'repeating-radial-gradient(circle at 20% 30%, rgba(0,0,0,0.1) 0px, transparent 8px), radial-gradient(circle at 30% 30%, #8B5A2B 0%, #5C3A21 70%)' },
  { id: 'frosted-acrylic', label: 'Frosted Acrylic',  bg: 'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #E8E8EE 50%, #D0D0D8 100%)' },
  { id: 'rose-copper',     label: 'Rose Copper',      bg: 'radial-gradient(circle at 30% 30%, #D89660 0%, #B87333 60%, #8A5322 100%)' },
  { id: 'midnight-navy',   label: 'Midnight Navy',    bg: 'radial-gradient(circle at 30% 30%, #2A3A5C 0%, #0A1428 70%)' },
  { id: 'olive-green',     label: 'Olive Green',      bg: 'radial-gradient(circle at 30% 30%, #7A8C5A 0%, #3A4A28 70%)' },
  { id: 'burgundy-red',    label: 'Burgundy Red',     bg: 'radial-gradient(circle at 30% 30%, #9A3040 0%, #4A1018 70%)' },
  { id: 'slate-grey',      label: 'Slate Grey',       bg: 'radial-gradient(circle at 30% 30%, #8A8A96 0%, #4A4A54 70%)' },
  { id: 'champagne',       label: 'Champagne',        bg: 'radial-gradient(circle at 30% 30%, #F5E6C8 0%, #C4A870 70%)' },
  { id: 'pearl-white',     label: 'Pearl White',      bg: 'radial-gradient(circle at 30% 30%, #FAFAFA 0%, #E0DED8 70%)' },
  { id: 'terracotta',      label: 'Terracotta',       bg: 'radial-gradient(circle at 30% 30%, #CC7755 0%, #8B4422 70%)' },
]

const FORMS = [
  { id: 'round-coaster', label: 'Round',    icon: '⬤' },
  { id: 'square-tile',   label: 'Square',   icon: '■' },
  { id: 'elegant-stand', label: 'Stand',    icon: '▬' },
  { id: 'discrete-disc', label: 'Discrete', icon: '•' },
]

const FORM_STYLES: Record<string, { borderRadius: string; width: number; height: number }> = {
  'round-coaster': { borderRadius: '50%',  width: 128, height: 128 },
  'square-tile':   { borderRadius: '16px', width: 128, height: 128 },
  'elegant-stand': { borderRadius: '12px', width: 96,  height: 144 },
  'discrete-disc': { borderRadius: '50%',  width: 72,  height: 72  },
}

export default function TapToolCard() {
  const [finishIdx, setFinishIdx] = useState(0)
  const [formIdx, setFormIdx]     = useState(0)
  const [logoText, setLogoText]   = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const barRef   = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const getIdxFromX = useCallback((clientX: number) => {
    if (!barRef.current) return 0
    const rect  = barRef.current.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    return Math.round(ratio * (FINISHES.length - 1))
  }, [])

  const onBarMouseDown  = (e: React.MouseEvent) => { dragging.current = true; setFinishIdx(getIdxFromX(e.clientX)) }
  const onBarTouchStart = (e: React.TouchEvent) => { dragging.current = true; setFinishIdx(getIdxFromX(e.touches[0].clientX)) }

  useEffect(() => {
    const onMove      = (e: MouseEvent) => { if (dragging.current) setFinishIdx(getIdxFromX(e.clientX)) }
    const onTouchMove = (e: TouchEvent) => { if (dragging.current) setFinishIdx(getIdxFromX(e.touches[0].clientX)) }
    const onUp        = () => { dragging.current = false }
    window.addEventListener('mousemove',  onMove)
    window.addEventListener('mouseup',    onUp)
    window.addEventListener('touchmove',  onTouchMove, { passive: true })
    window.addEventListener('touchend',   onUp)
    return () => {
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseup',    onUp)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onUp)
    }
  }, [getIdxFromX])

  const finish    = FINISHES[finishIdx]
  const form      = FORMS[formIdx]
  const formStyle = FORM_STYLES[form.id]

  return (
    <>
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} variant="design" />

      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(21,16,24,0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        {/* Eyebrow */}
        <div className="px-5 pt-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="font-mono text-[12px] font-medium tracking-[0.12em] uppercase pb-3" style={{ color: '#ff2ba3' }}>
            Design my Tap
          </p>
        </div>

        <div className="p-5">
          <DesignPanel
            barRef={barRef}
            finishIdx={finishIdx}
            finish={finish}
            formIdx={formIdx}
            setFormIdx={setFormIdx}
            form={form}
            formStyle={formStyle}
            logoText={logoText}
            setLogoText={setLogoText}
            onBarMouseDown={onBarMouseDown}
            onBarTouchStart={onBarTouchStart}
            onCTA={() => setModalOpen(true)}
          />
        </div>
      </div>
    </>
  )
}

interface DesignPanelProps {
  barRef: React.RefObject<HTMLDivElement>
  finishIdx: number
  finish: typeof FINISHES[0]
  formIdx: number
  setFormIdx: (i: number) => void
  form: typeof FORMS[0]
  formStyle: { borderRadius: string; width: number; height: number }
  logoText: string
  setLogoText: (v: string) => void
  onBarMouseDown: (e: React.MouseEvent) => void
  onBarTouchStart: (e: React.TouchEvent) => void
  onCTA: () => void
}

function DesignPanel({
  barRef, finishIdx, finish, formIdx, setFormIdx, form, formStyle,
  logoText, setLogoText, onBarMouseDown, onBarTouchStart, onCTA,
}: DesignPanelProps) {
  const handlePercent = (finishIdx / (FINISHES.length - 1)) * 100
  const isLight       = ['frosted-acrylic', 'pearl-white', 'champagne'].includes(finish.id)
  const isDiscrete    = form.id === 'discrete-disc'
  const textColor     = isLight ? '#2A1A00' : 'rgba(255,255,255,0.9)'
  const subColor      = isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.45)'
  const nfcColor      = isLight ? '#000' : '#fff'

  return (
    <div className="space-y-4">

      {/* Finish spectrum */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-naira-muted">Finish</span>
          <span className="text-xs text-naira-gold font-semibold">{finish.label}</span>
        </div>
        <div
          ref={barRef}
          onMouseDown={onBarMouseDown}
          onTouchStart={onBarTouchStart}
          className="relative h-7 rounded-full cursor-grab active:cursor-grabbing select-none"
          style={{
            background:
              'linear-gradient(90deg, #111 0%, #C8A54D 9%, #5C3A21 18%, #D8D8E0 27%, #B87333 36%, #0A1428 45%, #3A4A28 54%, #4A1018 63%, #4A4A54 72%, #C4A870 81%, #E0DED8 90%, #8B4422 100%)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)',
          }}
        >
          <div
            className="absolute top-1/2 w-6 h-6 rounded-full"
            style={{
              left: `${handlePercent}%`,
              transform: 'translateX(-50%) translateY(-50%)',
              background: '#fff',
              border: '2px solid rgba(255,43,163,0.8)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          />
        </div>
        <div className="relative h-5 mt-1">
          {FINISHES.map((f, i) => (
            <span
              key={f.id}
              className="absolute top-0 text-[8px] text-naira-muted"
              style={{ left: `${(i / (FINISHES.length - 1)) * 100}%`, transform: 'translateX(-50%)' }}
            >
              |
            </span>
          ))}
        </div>
      </div>

      {/* Form factor */}
      <div>
        <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-naira-muted block mb-3">Form factor</span>
        <div className="grid grid-cols-2 gap-2">
          {FORMS.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setFormIdx(i)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all"
              style={{
                background: i === formIdx ? 'rgba(255,43,163,0.1)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${i === formIdx ? 'rgba(255,43,163,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: i === formIdx ? '#ff2ba3' : 'rgba(255,255,255,0.55)',
              }}
            >
              <span className="text-base">{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logo text */}
      <div>
        <label className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-naira-muted block mb-1.5">
          Restaurant name or logo text
        </label>
        <input
          type="text"
          placeholder="The Spice House"
          value={logoText}
          onChange={e => setLogoText(e.target.value)}
          className="w-full rounded-xl px-4 py-2.5 text-sm text-naira-text placeholder-naira-muted outline-none"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
          onFocus={e => (e.currentTarget.style.border = '1px solid rgba(255,43,163,0.4)')}
          onBlur={e => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.09)')}
        />
      </div>

      {/* Live preview */}
      <div
        className="rounded-2xl p-4 relative overflow-hidden"
        style={{ background: 'rgba(12,17,24,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <span
          className="absolute top-3 left-3 font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded-full"
          style={{ background: 'rgba(255,43,163,0.15)', color: '#ff80c8', border: '1px solid rgba(255,43,163,0.25)' }}
        >
          Live Preview
        </span>

        <div className="flex flex-col items-center justify-center pt-5 pb-1 relative">
          {/* Rings + coaster container */}
          <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
            {/* NFC pulse rings */}
            {[0, 0.6, 1.2].map(delay => (
              <div
                key={delay}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 128,
                  height: 128,
                  border: '1px solid rgba(255,43,163,0.35)',
                  animation: `nfcRing 2.2s ease-out ${delay}s infinite`,
                }}
              />
            ))}

            {/* Coaster */}
            <div
              data-form={form.id}
              className="relative z-10 flex flex-col items-center justify-center"
              style={{
                width: formStyle.width,
                height: formStyle.height,
                borderRadius: formStyle.borderRadius,
                background: finish.bg,
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
                textAlign: 'center',
              }}
            >
              <span
                className="font-sans font-bold tracking-[-0.02em] leading-tight"
                style={{
                  fontSize: '0.6rem',
                  color: textColor,
                  textShadow: isLight ? 'none' : '0 1px 2px rgba(0,0,0,0.5)',
                  maxWidth: '80%',
                  wordBreak: 'break-word',
                  display: 'block',
                  textAlign: 'center',
                }}
              >
                {logoText || 'THE SPICE HOUSE'}
              </span>
              <span
                style={{
                  fontSize: '0.42rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: subColor,
                  display: 'block',
                  textAlign: 'center',
                  marginTop: '3px',
                }}
              >
                TAP TO VIEW MENU
              </span>

              {/* NFC icon */}
              <svg
                width={isDiscrete ? 12 : 16}
                height={isDiscrete ? 12 : 16}
                viewBox="0 0 24 24"
                fill="none"
                stroke={nfcColor}
                strokeWidth="2.2"
                style={{
                  position: 'absolute',
                  bottom: isDiscrete ? 8 : 14,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  opacity: 0.45,
                }}
              >
                <circle cx="12" cy="12" r="2" />
                <path d="M8 12a4 4 0 0 1 8 0" />
                <path d="M5 12a7 7 0 0 1 14 0" />
              </svg>
            </div>

            {/* Phone SVG */}
            <div
              className="absolute -right-8 -top-4 z-20"
              style={{ animation: 'phoneTap 2.4s ease-in-out infinite' }}
            >
              <svg width="26" height="42" viewBox="0 0 32 52" fill="none">
                <rect x="1" y="1" width="30" height="50" rx="6" fill="#1E1520" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <rect x="4" y="6" width="24" height="38" rx="3" fill="#0a0a0a" />
                <rect x="12" y="46" width="8" height="2" rx="1" fill="rgba(255,255,255,0.2)" />
                <rect x="11" y="2.5" width="10" height="1.5" rx="0.75" fill="rgba(255,255,255,0.15)" />
              </svg>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes phoneTap {
            0%   { transform: translate(-14px, -8px) rotate(-18deg); }
            45%  { transform: translate(2px, 4px) rotate(-6deg); }
            55%  { transform: translate(2px, 4px) rotate(-6deg); }
            100% { transform: translate(-14px, -8px) rotate(-18deg); }
          }
        `}</style>
      </div>

      {/* CTA */}
      <button
        onClick={onCTA}
        className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background:
            'linear-gradient(135deg, rgba(204,34,130,0.9) 0%, rgba(255,43,163,0.9) 60%, rgba(255,128,200,0.85) 100%)',
          color: 'var(--text)',
          boxShadow: '0 4px 20px rgba(255,43,163,0.25)',
        }}
      >
        See how Naira Tap will look in my restaurant
      </button>
      <p className="text-[10px] text-naira-muted text-center -mt-3">
        Send us a photo of your table → we send back 3 rendered designs. Free.
      </p>
    </div>
  )
}
