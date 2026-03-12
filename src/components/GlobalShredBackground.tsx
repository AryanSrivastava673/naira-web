'use client'

import { useEffect, useState } from 'react'

// Deterministic pseudo-random — avoids hydration mismatch
const STRIPS = Array.from({ length: 30 }, (_, i) => {
  const g = (n: number) => ((i * 1.6180339887 * (n + 1)) % 1 + 1) % 1
  return {
    id: i,
    left:     `${g(1) * 100}%`,
    width:    `${2 + g(2) * 3}px`,        // 2–5 px  (was 5–12 px — much thinner)
    height:   `${22 + g(3) * 45}px`,      // 22–67 px (was 55–145 px — much shorter)
    duration: `${6 + g(4) * 8}s`,         // slower fall = more graceful
    delay:    `-${g(5) * 12}s`,           // negative = already mid-fall on mount
    rotation: `${(g(6) - 0.5) * 28}deg`, // gentler tilt
    opacity:  0.012 + g(7) * 0.022,       // 1.2–3.4 %  (was 3–8 % — much lighter)
  }
})

export default function GlobalShredBackground() {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const threshold = window.innerHeight * 2.8
    const handleScroll = () => {
      const past = window.scrollY > threshold
      // Smooth fade-in: ramp from 0 → 1 over 300 px of scroll past the threshold
      const ramp = Math.min(1, Math.max(0, (window.scrollY - threshold) / 300))
      setOpacity(past ? ramp : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Keep mounted (opacity:0) so the CSS animation is already running when fade-in starts
  return (
    <>
      <style>{`
        @keyframes globalStripFall {
          0%   { transform: translateY(-120px) rotate(var(--sr)); }
          100% { transform: translateY(108vh)  rotate(var(--sr)); }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          overflow: 'hidden',
          opacity,
          transition: 'opacity 1.8s ease',   // graceful fade-in, not a sudden pop
        }}
      >
        {STRIPS.map((s) => (
          <div
            key={s.id}
            style={
              {
                position: 'absolute',
                top: 0,
                left: s.left,
                width: s.width,
                height: s.height,
                background: 'linear-gradient(to bottom, #F5EFE6, #E8DFCA 55%, rgba(232,223,202,0))',
                opacity: s.opacity,
                '--sr': s.rotation,
                animation: `globalStripFall ${s.duration} linear ${s.delay} infinite`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  )
}
