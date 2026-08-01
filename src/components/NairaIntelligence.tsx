'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PINK = '#ff2ba3'
const PINK_RGB = '255,43,163'
const TAU = Math.PI * 2

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

function WaveTerrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let rows = 0
    let cols = 0
    let virtualWidth = 0
    let rafId = 0
    let t = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // The terrain is always laid out on a wide virtual stage and centred on the
      // canvas. On a narrow phone we therefore show the middle slice of a broad
      // landscape instead of squeezing the whole thing into 375px, which is what
      // made it look pinched.
      virtualWidth = Math.max(width, 900)

      // Density scales with size so phones stay smooth and desktops stay fine-grained.
      // Spacing is ~8% wider on each axis, i.e. roughly 15% fewer particles overall.
      cols = Math.round(clamp(virtualWidth / 7.6, 82, 165))
      rows = Math.round(clamp(height / 9.8, 24, 44))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      const horizon = height * 0.05
      const centreX = width / 2
      const breathe = 1 + Math.sin(t * 0.5) * 0.08

      // Rows drift toward the viewer and recycle at the horizon, so the terrain
      // reads as travelling along the z axis rather than rippling in place.
      const zScroll = (t * 0.1) % 1

      for (let r = 0; r < rows; r++) {
        // rt is where the row sits on screen (0 = horizon, 1 = nearest); zWorld is
        // its continuous position in the terrain, so hills keep their shape as they
        // approach instead of the rows sliding through a screen-fixed pattern.
        const rt = (r / rows + zScroll) % 1
        const zWorld = r / rows - zScroll
        const depth = Math.pow(rt, 2.1) // compress distant rows toward the horizon

        // Overshooting the bottom edge means a row recycles off-screen instead of
        // visibly popping from foreground back to horizon.
        const baseY = horizon + depth * (height - horizon) * 1.3
        if (baseY > height + 90) continue

        const spread = (0.5 + depth * 1.75) * virtualWidth // near rows bleed off-screen
        const left = centreX - spread / 2

        const amp = (3 + depth * 64) * breathe
        const radius = 0.5 + depth * 1.0
        const alpha = 0.1 + depth * 0.5

        // Distant dots read deeper pink, near dots lift toward a lighter tone
        const g = Math.round(43 + depth * 62)
        const b = Math.round(163 + depth * 34)

        ctx.fillStyle = `rgba(255,${g},${b},${alpha})`
        ctx.beginPath()

        for (let c = 0; c < cols; c++) {
          const ct = c / (cols - 1)
          const x = left + ct * spread
          if (x < -24 || x > width + 24) continue // skip off-canvas work

          // Purely additive sines produce straight, parallel ridges. The leading
          // multiplicative term makes the x and depth waves interfere in 2D, which
          // is what breaks the terrain into hills and basins instead of bands.
          // Incommensurate frequencies keep the loop from visibly repeating.
          const h =
            Math.sin(ct * 5.2 + t * 0.85) * Math.cos(zWorld * 3.3 - t * 0.42) * 1.15 +
            Math.sin(ct * 8.7 - zWorld * 4.6 + t * 0.63) * 0.5 +
            Math.sin(ct * 2.4 + zWorld * 6.1 - t * 0.77) * 0.7 +
            Math.sin(ct * 13.1 + zWorld * 2.7 + t * 1.06) * 0.22

          const y = baseY - h * amp * 0.35

          ctx.moveTo(x + radius, y) // avoids a stray line joining the sub-paths
          ctx.arc(x, y, radius, 0, TAU)
        }

        ctx.fill()
      }

      // Soften the edges and the horizon by multiplying the alpha channel
      ctx.globalCompositeOperation = 'destination-in'

      const edge = ctx.createLinearGradient(0, 0, width, 0)
      edge.addColorStop(0, 'rgba(0,0,0,0)')
      edge.addColorStop(0.13, 'rgba(0,0,0,1)')
      edge.addColorStop(0.87, 'rgba(0,0,0,1)')
      edge.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = edge
      ctx.fillRect(0, 0, width, height)

      const fade = ctx.createLinearGradient(0, 0, 0, height)
      fade.addColorStop(0, 'rgba(0,0,0,0)')
      fade.addColorStop(0.3, 'rgba(0,0,0,1)')
      fade.addColorStop(1, 'rgba(0,0,0,1)')
      ctx.fillStyle = fade
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'source-over'

      if (!reduceMotion) t += 0.005
      rafId = requestAnimationFrame(draw)
    }

    resize()
    rafId = requestAnimationFrame(draw)

    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="block w-full h-full" />
}

export default function NairaIntelligence() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center min-h-[680px] sm:min-h-[780px] lg:min-h-[880px]"
      style={{ background: 'transparent' }}
    >
      {/* Ambient glow behind the copy */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(900px,130vw)] h-[420px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, rgba(${PINK_RGB},0.11) 0%, transparent 70%)` }}
      />

      {/* Wave — full-bleed so it never gets pinched by the content padding */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[280px] sm:h-[360px] lg:h-[440px] pointer-events-none"
      >
        <WaveTerrain />
      </div>

      {/* Copy — vertically centred in the section, terrain fading in behind it */}
      <div
        ref={ref}
        className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-flex items-center gap-2 font-mono px-5 py-2.5 rounded-full text-[14px] sm:text-[15px] font-medium tracking-[0.14em] uppercase mb-9"
            style={{
              background: `rgba(${PINK_RGB},0.08)`,
              border: `1px solid rgba(${PINK_RGB},0.25)`,
              color: PINK,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: PINK }} />
            Naira Intelligence
          </span>
        </motion.div>

        <motion.h2
          className="font-sans font-black tracking-[-0.02em] leading-[1.08] mb-6"
          style={{ fontSize: 'clamp(2.6rem,6.5vw,4.55rem)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="block text-white">Know your restaurant,</span>
          <span className="block" style={{ color: PINK }}>
            before the rush hits.
          </span>
        </motion.h2>

        <motion.p
          className="text-white/60 text-[1.3rem] sm:text-[1.45rem] leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Live signals from every table, bill, and search, read in real time, so you move from
          reacting to steering.
        </motion.p>
      </div>
    </section>
  )
}
