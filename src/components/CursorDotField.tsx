'use client'

import { useEffect, useRef } from 'react'

const DOT_RGB = '255,43,163' // brand pink
const SPACING = 46          // px between dots
const BASE_RADIUS = 1.1
const MAX_RADIUS = 2.4
const INFLUENCE_RADIUS = 150 // px — how far the cursor's effect reaches
const BASE_OPACITY = 0.08
const MAX_OPACITY = 0.5

export default function CursorDotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let mouseX = -9999
    let mouseY = -9999
    let rafId: number | null = null

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const cols = Math.ceil(width / SPACING) + 1
      const rows = Math.ceil(height / SPACING) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * SPACING
          const y = row * SPACING
          const dist = Math.hypot(x - mouseX, y - mouseY)

          let t = 0
          if (dist < INFLUENCE_RADIUS) {
            t = 1 - dist / INFLUENCE_RADIUS
            t *= t // ease-out falloff, keeps the glow tight around the cursor
          }

          const radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * t
          const opacity = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * t

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${DOT_RGB}, ${opacity})`
          ctx.fill()
        }
      }
      rafId = null
    }

    const scheduleDraw = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(draw)
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      scheduleDraw()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      scheduleDraw()
    }

    const handleMouseLeave = () => {
      mouseX = -9999
      mouseY = -9999
      scheduleDraw()
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
