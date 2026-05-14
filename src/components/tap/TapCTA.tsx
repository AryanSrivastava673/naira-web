'use client'

export default function TapCTA() {
  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,43,163,0.1) 0%, transparent 65%), #151018',
      }}
    >
      <div className="max-w-3xl mx-auto relative z-10">
        <div
          className="rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background: 'rgba(255,43,163,0.07)',
            border: '1px solid rgba(255,128,200,0.2)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 48px rgba(255,43,163,0.12)',
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,43,163,0.15) 0%, transparent 70%)',
            }}
          />

          <h2 className="font-display text-3xl md:text-4xl font-bold text-naira-text mb-4 relative">
            Stop making guests scan.{' '}
            <span className="text-gold-gradient">Start making them tap.</span>
          </h2>

          <p className="text-naira-text-muted text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto relative">
            We&apos;ll design your custom coaster, ship a physical sample, and put your
            contactless dining solution on a private preview link. Free. No card,
            no commitment.
          </p>

          <div className="flex flex-wrap justify-center gap-4 relative">
            <a
              href="mailto:hello@nairamenus.in"
              className="relative overflow-hidden flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold group"
              style={{
                background:
                  'linear-gradient(135deg, rgba(204,34,130,0.9) 0%, rgba(255,43,163,0.9) 60%, rgba(255,128,200,0.85) 100%)',
                color: '#F0E9DE',
                border: '1px solid rgba(255,128,200,0.35)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 32px rgba(255,43,163,0.35)',
              }}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
                }}
              />
              <span className="relative">Claim my free sample</span>
              <svg className="relative w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a
              href="#hero"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-naira-text transition-all duration-200 hover:text-naira-gold"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Design mine first
            </a>
          </div>

          <p className="text-naira-muted text-xs mt-6 relative">
            No pressure. No sales call until you say so.
          </p>
        </div>
      </div>
    </section>
  )
}
