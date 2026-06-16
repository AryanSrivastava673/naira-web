'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

// ── PHONE MOCKUP ──────────────────────────────────────────────────────────────
function PhoneMockup({
  screenActive,
  controls,
}: {
  screenActive: boolean
  controls: ReturnType<typeof useAnimation>
}) {
  return (
    <motion.div
      animate={controls}
      style={{ willChange: 'transform' }}
    >
      <div
        className="relative mx-auto select-none"
        style={{
          width: 260,
          height: 520,
          background: '#0a0a0a',
          borderRadius: 42,
          border: '2px solid #2a2a2a',
          boxShadow: screenActive
            ? '0 0 55px rgba(var(--accent-rgb),0.28), 0 30px 80px rgba(0,0,0,0.8)'
            : '0 30px 80px rgba(0,0,0,0.8)',
          transition: 'box-shadow 0.6s ease',
        }}
      >
        {/* Side buttons */}
        <div className="absolute -right-[3px] top-24 w-[3px] h-10 bg-[#2a2a2a] rounded-r-sm" />
        <div className="absolute -left-[3px] top-20 w-[3px] h-7 bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -left-[3px] top-32 w-[3px] h-7 bg-[#2a2a2a] rounded-l-sm" />

        {/* Dynamic island */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 bg-black rounded-full z-10"
          style={{ width: 90, height: 26 }}
        />

        {/* Screen */}
        <div
          className="absolute overflow-hidden transition-colors duration-700"
          style={{
            inset: 6,
            borderRadius: 36,
            background: screenActive
              ? 'linear-gradient(180deg, #0a0a0a 0%, #0a0a0a 100%)'
              : '#0a0a0a',
          }}
        >
          {/* ── SCREEN CONTENT (visible when active) ── */}
          <motion.div
            className="w-full h-full flex flex-col"
            animate={{ opacity: screenActive ? 1 : 0 }}
            transition={{ duration: 0.7, delay: screenActive ? 0.35 : 0 }}
          >
            {/* Status bar placeholder */}
            <div className="flex justify-between items-center px-5 pt-10 pb-0 text-[8px] text-white/40">
              <span>9:41</span>
              <span>●●●</span>
            </div>

            {/* Restaurant header */}
            <div className="px-4 pt-2 pb-3 flex items-center justify-between">
              <div>
                <div className="text-[9px] text-[rgba(255,255,255,0.55)] tracking-widest uppercase">The Grand Spice</div>
                <div
                  className="font-semibold text-sm mt-0.5"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: '#ffffff' }}
                >
                  Digital Menu
                </div>
              </div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(var(--accent-rgb),0.15)' }}>
                <div className="w-5 h-5 rounded-full" style={{ background: 'rgba(var(--accent-rgb),0.55)' }} />
              </div>
            </div>

            {/* Category chips */}
            <div className="px-4 flex gap-1.5 mb-3">
              {['All', 'Starters', 'Mains', 'Desserts'].map((tab, i) => (
                <div
                  key={tab}
                  className="px-2 py-1 rounded-full text-[9px] font-medium"
                  style={{
                    background: i === 0 ? 'var(--accent)' : 'rgba(var(--accent-rgb),0.08)',
                    color: i === 0 ? '#ffffff' : 'rgba(255,255,255,0.55)',
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* Menu items */}
            <div className="flex-1 px-3 space-y-2 overflow-hidden">
              {[
                { name: 'Dal Makhani', desc: 'Slow-cooked black lentils', price: '₹380', tag: 'Popular' },
                { name: 'Paneer Tikka', desc: 'Chargrilled cottage cheese', price: '₹320', tag: '' },
                { name: 'Lamb Rogan Josh', desc: 'Kashmiri spiced lamb', price: '₹680', tag: "Chef's Pick" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 p-2 rounded-xl"
                  style={{ background: 'rgba(var(--accent-rgb),0.05)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex-shrink-0"
                    style={{ background: 'rgba(var(--accent-rgb),0.12)' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-medium truncate" style={{ color: '#ffffff' }}>{item.name}</div>
                    <div className="text-[8px] text-[rgba(255,255,255,0.55)] truncate">{item.desc}</div>
                    {item.tag && (
                      <span className="inline-block text-[7px] px-1.5 py-0.5 rounded-full mt-0.5" style={{ background: 'rgba(var(--accent-light-rgb),0.15)', color: 'var(--accent-light)' }}>
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-semibold flex-shrink-0" style={{ color: 'var(--accent-light)' }}>{item.price}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="px-4 pb-4 pt-2">
              <div
                className="w-full py-2.5 rounded-full text-center text-[10px] font-semibold"
                style={{ background: 'var(--accent)', color: '#ffffff' }}
              >
                View Full Menu
              </div>
            </div>
          </motion.div>

          {/* ── IDLE SCREEN (visible when inactive) ── */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: '#0a0a0a', pointerEvents: screenActive ? 'none' : 'auto' }}
            animate={{ opacity: screenActive ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-full border border-[#2a2a2a] mx-auto flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="#3a3a3a" strokeWidth="1.2" />
                  <circle cx="8" cy="8" r="3" stroke="#2a2a2a" strokeWidth="1.2" />
                  <circle cx="8" cy="8" r="1" fill="#2a2a2a" />
                </svg>
              </div>
              <p className="text-[9px] text-[#3a3a3a]">Tap NFC to activate</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// ── NFC TAG ───────────────────────────────────────────────────────────────────
function NFCTag({
  onTap,
  tapped,
  pulsing,
}: {
  onTap: () => void
  tapped: boolean
  pulsing: boolean
}) {
  return (
    <div className="relative flex flex-col items-center mt-10">
      {/* Expanding rings — only when phone is physically near */}
      {pulsing &&
        [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-naira-gold/60"
            style={{ width: 70, height: 70, top: 0, left: '50%', marginLeft: -35 }}
            initial={{ scale: 0.85, opacity: 0.9 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{
              delay: i * 0.28,
              duration: 1.2,
              ease: 'easeOut',
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
          />
        ))}

      {/* The coaster / NFC tag */}
      <button
        onClick={onTap}
        disabled={pulsing}
        aria-label="Tap the NFC coaster to load the demo menu"
        className="relative w-[70px] h-[70px] rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #0a0a0a 100%)',
          border: `2px solid ${tapped ? 'var(--accent)' : '#2a2a2a'}`,
          boxShadow: tapped
            ? '0 0 24px rgba(var(--accent-rgb),0.45)'
            : '0 4px 20px rgba(0,0,0,0.5)',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      >
        {/* NFC icon */}
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path
            d="M15 3C8.373 3 3 8.373 3 15s5.373 12 12 12 12-5.373 12-12S21.627 3 15 3z"
            stroke={tapped ? 'var(--accent)' : '#3a3a3a'}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M15 8c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z"
            stroke={tapped ? 'var(--accent-light)' : '#2a2a2a'}
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="15" cy="15" r="2.5" fill={tapped ? 'var(--accent)' : '#3a3a3a'} />
        </svg>
      </button>

      {/* Label */}
      <p className="mt-3 text-[11px] text-naira-muted whitespace-nowrap">
        {pulsing ? 'Connecting…' : tapped ? '✓ Menu loaded!' : 'Tap to try it'}
      </p>
    </div>
  )
}

// ── MAIN SECTION ──────────────────────────────────────────────────────────────
export default function PhoneNFCSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: false, margin: '-100px' })

  const [tapped, setTapped] = useState(false)
  const [pulsing, setPulsing] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [autoRan, setAutoRan] = useState(false)

  const phoneControls = useAnimation()

  // How far (px) the phone dips toward the NFC tag
  // Phone height is 520px, margin below is 40px (mt-10), NFC tag is 70px → center at 35px
  // We want phone bottom (~260px from center) to approach NFC center (~40+35 = 75px below phone)
  // So dip by ≈ 115px for a clear, visible motion
  const DIP_DISTANCE = 118

  async function runTapAnimation() {
    if (animating) return
    setAnimating(true)
    setPulsing(false)
    setTapped(false)

    // 1. Phone dips down toward NFC tag
    await phoneControls.start({
      y: DIP_DISTANCE,
      transition: { duration: 0.38, ease: [0.4, 0, 1, 1] },
    })

    // 2. NFC pulse rings start
    setPulsing(true)

    // 3. Brief haptic-like micro-bounce on the tag
    await phoneControls.start({
      y: DIP_DISTANCE - 6,
      transition: { duration: 0.09, ease: 'easeOut' },
    })
    await phoneControls.start({
      y: DIP_DISTANCE,
      transition: { duration: 0.07, ease: 'easeIn' },
    })

    // 4. Phone springs back up with overshoot
    await phoneControls.start({
      y: 0,
      transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
    })

    // 5. Screen activates
    setPulsing(false)
    setTapped(true)
    setAnimating(false)
  }

  // Auto-run once when section comes into view
  if (inView && !autoRan && !animating) {
    setAutoRan(true)
    setTimeout(() => runTapAnimation(), 700)
  }

  function handleTagClick() {
    if (animating) return
    // Toggle: if already tapped, reset; otherwise animate
    if (tapped) {
      setTapped(false)
      setPulsing(false)
      setTimeout(() => runTapAnimation(), 300)
    } else {
      runTapAnimation()
    }
  }

  return (
    <section
      ref={sectionRef}
      id="tap-demo"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Top accent border */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, var(--accent) 30%, var(--accent-light) 50%, var(--accent) 70%, transparent 100%)' }}
      />

      {/* Centered ambient glow — kept very subtle to match the rest of the dark sections */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT — copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono inline-block px-3 py-1 text-[12px] font-medium tracking-[0.12em] uppercase mb-6"
              style={{ background: 'rgba(255,43,163,0.12)', color: 'var(--accent)', borderRadius: 8 }}
            >
              Naira Tap
            </p>
            <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-tight mb-6 text-white">
              One tap.
              <br />
              <span style={{ color: 'var(--accent)' }}>Instant menu.</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Your guests bring their phone near the NFC coaster on the table —
              your full digital menu appears instantly. No app download,
              no QR scanning hassle, no waiting.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                'NFC-first with automatic QR fallback',
                'Real-time menu updates — change prices in seconds',
                'Table ordering built right in',
                'Beautiful, fully customisable menu design',
                'Analytics to see what your guests love',
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-white/70 text-sm">
                  <span
                    className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(255,43,163,0.15)' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
                  </span>
                  {feat}
                </li>
              ))}
            </ul>

            <a href="#contact" className="btn-primary">
              See Tap in Action
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          {/* RIGHT — phone + NFC demo */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Phone is wrapped in motion.div controlled by phoneControls */}
            <PhoneMockup screenActive={tapped} controls={phoneControls} />

            {/* NFC tag sits directly below phone */}
            <NFCTag onTap={handleTagClick} tapped={tapped} pulsing={pulsing} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
