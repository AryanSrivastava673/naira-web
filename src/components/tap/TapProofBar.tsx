'use client'

const RESTAURANTS =
  'The Spice House · Aish Kitchen · The Grain Table · Tandoor Street · Chai & Co · Masala Box · Biryani Base · Cafe Nord · The Spice House · Aish Kitchen · The Grain Table · Tandoor Street · Chai & Co · Masala Box · Biryani Base · Cafe Nord'

export default function TapProofBar() {
  return (
    <div
      className="py-6 overflow-hidden relative"
      style={{
        background: 'rgba(21,16,24,0.8)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <p className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-naira-muted text-center mb-3">
        Live on tables across India
      </p>

      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, #0a0a0a, transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(270deg, #0a0a0a, transparent)' }}
      />

      <div className="flex whitespace-nowrap" style={{ animation: 'marqueeScroll 28s linear infinite' }}>
        <span className="text-sm text-naira-muted opacity-50 px-8">{RESTAURANTS}</span>
        <span className="text-sm text-naira-muted opacity-50 px-8" aria-hidden>{RESTAURANTS}</span>
      </div>

      <style jsx>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
