'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'

const STRIP_COUNT = 28

// Deterministic pseudo-random — avoids SSR/client hydration mismatch
function pr(i: number, salt: number) {
  return ((i * 1.6180339887 * (salt + 1) + salt * 0.7071067811) % 1 + 1) % 1
}

const STRIP_CFGS = Array.from({ length: STRIP_COUNT }, (_, i) => ({
  rotation: (pr(i, 1) - 0.5) * 52,
  fallDelay: pr(i, 2) * 0.45,
  fallDuration: 0.65 + pr(i, 3) * 0.55,
  tx: (pr(i, 4) - 0.5) * 90,
}))

// ── LAYOUT CALCULATOR ─────────────────────────────────────────────────────────
// All geometry is derived from viewport height so the animation looks correct
// on every screen — mobile, laptop, ultrawide.
//
// Layout:
//   Menu card top  : 7vh from sticky-container top
//   Menu card height: min(385, 43vh)          [scales on short screens]
//   Shredder sits at: bottom 6vh of sticky container
//   Shredder height : ~120px (teeth 30 + body 68 + legs 22)
//   Shredder teeth y: vh*0.94 - 120
//
// MAX_TRAVEL = gap_between_menu_bottom_and_teeth + card_height + 15px
// This ensures at p=1 the card has fully entered the shredder (100% clipped).
//
function getLayout(vh: number) {
  const MENU_TOP = vh * 0.07
  const MENU_H = Math.min(385, Math.max(260, vh * 0.43))
  const MENU_W = Math.min(270, Math.max(200, MENU_H * 0.7))
  const MENU_BOTTOM0 = MENU_TOP + MENU_H          // starting bottom edge y
  const TEETH_TOP = vh * 0.94 - 120               // y of shredder teeth tips
  const GAP = Math.max(0, TEETH_TOP - MENU_BOTTOM0)
  const MAX_TRAVEL = GAP + MENU_H + 15            // px the card must travel

  return { MENU_TOP, MENU_H, MENU_W, MENU_BOTTOM0, TEETH_TOP, GAP, MAX_TRAVEL }
}

// Normalised progress of menu entering shredder (0 = just touching, 1 = fully inside)
function getEntryProgress(scrollProgress: number, vh: number) {
  const layout = getLayout(vh)
  const p = Math.max(0, Math.min(1, (scrollProgress - 0.30) / 0.40))
  const menuBottom = layout.MENU_BOTTOM0 + p * layout.MAX_TRAVEL
  const entered = menuBottom - layout.TEETH_TOP      // px inside shredder
  return { p, entered, layout }
}

// ── PAPER STRIP ──────────────────────────────────────────────────────────────
function PaperStrip({ index, isShredding }: { index: number; isShredding: boolean }) {
  const c = STRIP_CFGS[index]
  return (
    <motion.div
      className="absolute top-0 h-full"
      style={{
        left: `${(index / STRIP_COUNT) * 100}%`,
        width: `${100 / STRIP_COUNT}%`,
        background: 'linear-gradient(to bottom, #FFF8F0 0%, #FFEACC 60%, #FFE0AA 100%)',
        backgroundImage:
          'repeating-linear-gradient(transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 11px)',
        transformOrigin: 'top center',
      }}
      animate={
        isShredding
          ? { y: ['0px', '28px', '260px'], rotate: [0, c.rotation * 0.4, c.rotation], x: [0, c.tx * 0.3, c.tx], opacity: [1, 1, 0] }
          : { y: 0, rotate: 0, x: 0, opacity: 1 }
      }
      transition={
        isShredding
          ? { delay: c.fallDelay, duration: c.fallDuration, ease: [0.5, 0, 1, 0.4] }
          : { duration: 0.08 }
      }
    />
  )
}

// ── HERO SHREDDER ─────────────────────────────────────────────────────────────
function HeroShredderFull() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isShredding, setIsShredding] = useState(false)
  const [shredderVibrate, setShredderVibrate] = useState(false)

  // Menu card size — reactive to window height (avoids SSR mismatch via state)
  const [menuSize, setMenuSize] = useState({ w: 270, h: 385 })
  useEffect(() => {
    const update = () => {
      const l = getLayout(window.innerHeight)
      setMenuSize({ w: l.MENU_W, h: l.MENU_H })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // ── TEXT TRANSITIONS ────────────────────────────────────────────────────────
  // Hero text fades in early, holds, then fades OUT before the menu appears
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.22, 0.30], [1, 1, 0])
  const heroTextY = useTransform(scrollYProgress, [0, 0.07], [0, 0])

  // Menu card fades in after hero text is gone
  const menuOpacity = useTransform(scrollYProgress, [0.26, 0.36], [0, 1])
  const menuRotateX = useTransform(scrollYProgress, [0.30, 0.50], [5, 0])
  const menuRotateY = useTransform(scrollYProgress, [0.30, 0.50], [-7, 0])

  // ── VIEWPORT-RELATIVE TRANSFORMS ────────────────────────────────────────────
  // Each callback reads window.innerHeight so the geometry is correct
  // regardless of screen size.

  const menuY = useTransform(scrollYProgress, (sp) => {
    if (typeof window === 'undefined') return '0px'
    const { p, layout } = getEntryProgress(sp, window.innerHeight)
    return `${p * layout.MAX_TRAVEL}px`
  })

  const menuScale = useTransform(scrollYProgress, (sp) => {
    const { p } = getEntryProgress(sp, typeof window !== 'undefined' ? window.innerHeight : 900)
    return 1 - p * 0.12
  })

  // Clip menu from the bottom as it enters the shredder teeth
  const menuClipBottom = useTransform(scrollYProgress, (sp) => {
    if (typeof window === 'undefined') return '0%'
    const { entered, layout } = getEntryProgress(sp, window.innerHeight)
    const pct = Math.max(0, Math.min(100, (entered / layout.MENU_H) * 100))
    return `${pct}%`
  }) as MotionValue<string>

  // Strips appear the moment the menu touches the teeth
  const stripsOpacity = useTransform(scrollYProgress, (sp) => {
    if (typeof window === 'undefined') return 0
    const { entered } = getEntryProgress(sp, window.innerHeight)
    return Math.max(0, Math.min(1, entered / 18))
  })

  // Reveal text fades in after 70% of the card is shredded
  const revealOpacity = useTransform(scrollYProgress, (sp) => {
    if (typeof window === 'undefined') return 0
    const { entered, layout } = getEntryProgress(sp, window.innerHeight)
    const clipPct = Math.max(0, Math.min(100, (entered / layout.MENU_H) * 100))
    return Math.max(0, Math.min(1, (clipPct - 70) / 30))
  })
  const revealY = useTransform(scrollYProgress, (sp) => {
    if (typeof window === 'undefined') return 30
    const { entered, layout } = getEntryProgress(sp, window.innerHeight)
    const clipPct = Math.max(0, Math.min(100, (entered / layout.MENU_H) * 100))
    return Math.max(0, 30 - (clipPct / 100) * 30)
  })

  // ── SHREDDER VIBRATE TRIGGER ─────────────────────────────────────────────────
  useMotionValueEvent(scrollYProgress, 'change', (sp) => {
    if (typeof window === 'undefined') return
    const { entered } = getEntryProgress(sp, window.innerHeight)

    if (entered > 12 && !isShredding) {
      setIsShredding(true)
      setShredderVibrate(true)
      setTimeout(() => setShredderVibrate(false), 800)
    }
    if (entered <= 0 && isShredding) {
      setIsShredding(false)
    }
  })

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* ── STICKY VIEWPORT ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-naira-black">

        {/* Ambient glow */}
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />

        {/* Subtle grid */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.028]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(var(--accent-rgb),0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--accent-rgb),0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* ── HERO TEXT (always above everything) ──────────────────────────── */}
        <motion.div
          aria-label="Naira Menus hero headline"
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
          style={{ opacity: heroTextOpacity, y: heroTextY, zIndex: 30 }}
        >
          <motion.span
            className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Introducing Naira Menus
          </motion.span>

          <h1
            className="text-5xl md:text-7xl font-semibold tracking-tighter leading-tight mb-5"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Say goodbye to
            <br />
            <span className="text-gold-gradient">paper menus.</span>
          </h1>

          <p className="text-naira-text-muted text-lg md:text-xl max-w-xl leading-relaxed">
            Scroll down to witness the future.
          </p>

          <div className="mt-10 flex flex-col items-center gap-2 text-naira-muted text-sm">
            <motion.div
              className="w-px bg-gradient-to-b from-naira-gold/60 to-transparent"
              animate={{ height: [24, 48, 24] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-xs tracking-widest uppercase">Scroll</span>
          </div>
        </motion.div>

        {/* ── MENU CARD (fades in after text, then descends into shredder) ──── */}
        <motion.div
          className="absolute left-1/2 pointer-events-none"
          style={{
            top: '7%',
            x: '-50%',
            y: menuY,
            scale: menuScale,
            rotateX: menuRotateX,
            rotateY: menuRotateY,
            opacity: menuOpacity,
            zIndex: 10,
            perspective: 1200,
          }}
        >
          <ClippedMenuCard
            clipBottom={menuClipBottom}
            width={menuSize.w}
            height={menuSize.h}
          />
        </motion.div>

        {/* ── PAPER STRIPS (below shredder output slot) ────────────────────── */}
        <motion.div
          className="absolute overflow-visible"
          style={{
            bottom: '6%',
            left: '50%',
            x: '-50%',
            width: menuSize.w,
            height: 110,
            marginBottom: '-2px',
            opacity: stripsOpacity,
            zIndex: 8,
          }}
        >
          {Array.from({ length: STRIP_COUNT }, (_, i) => (
            <PaperStrip key={i} index={i} isShredding={isShredding} />
          ))}
        </motion.div>

        {/* ── SHREDDER MACHINE ─────────────────────────────────────────────── */}
        <motion.div
          className="absolute left-1/2"
          style={{ bottom: '6%', x: '-50%', zIndex: 20 }}
          animate={
            shredderVibrate
              ? {
                  x: ['-50%', 'calc(-50% - 3px)', 'calc(-50% + 3px)', 'calc(-50% - 2px)', 'calc(-50% + 2px)', '-50%'],
                }
              : {}
          }
          transition={{ duration: 0.35 }}
        >
          <ShredderMachine isActive={isShredding} />
        </motion.div>

        {/* ── REVEAL TEXT (after full shredding) ───────────────────────────── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
          style={{ opacity: revealOpacity, y: revealY, zIndex: 30 }}
        >
          <p className="text-naira-muted text-sm tracking-[0.3em] uppercase mb-4">
            And say hello to
          </p>
          <h2
            className="text-5xl md:text-7xl font-medium text-gold-gradient tracking-tighter"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Naira Tap.
          </h2>
          <p className="mt-5 text-naira-text-muted text-lg max-w-md leading-relaxed">
            Your menu — one tap away, zero paper needed.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

// ── MOBILE HERO ───────────────────────────────────────────────────────────────
function MobileHero() {
  return (
    <section className="min-h-screen flex flex-col bg-naira-black relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.028]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(var(--accent-rgb),0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--accent-rgb),0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main copy — centred in the upper portion */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10">
        <span className="inline-block px-3 py-1 rounded-full border border-naira-gold/30 text-naira-gold text-xs font-medium tracking-widest uppercase mb-6">
          Introducing Naira Menus
        </span>

        <h1
          className="text-5xl font-bold tracking-tighter leading-[1.05] mb-5"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          Say goodbye to
          <br />
          <span className="text-gold-gradient">paper menus.</span>
        </h1>

        <p className="text-naira-text-muted text-lg leading-relaxed max-w-xs">
          Scroll down to witness the future.
        </p>

        <div className="mt-10 flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-gradient-to-b from-naira-gold/60 to-transparent" />
          <span className="text-[10px] tracking-widest uppercase text-naira-muted">Scroll</span>
        </div>
      </div>

      {/* Shredder machine pinned to the bottom */}
      <div className="relative z-10 flex justify-center pb-0">
        <ShredderMachine isActive={false} />
      </div>
    </section>
  )
}

// ── HERO WRAPPER — CSS controls which version renders ─────────────────────────
export default function HeroShredder() {
  return (
    <>
      <div className="md:hidden">
        <MobileHero />
      </div>
      <div className="hidden md:block">
        <HeroShredderFull />
      </div>
    </>
  )
}

// ── CLIPPED MENU CARD ─────────────────────────────────────────────────────────
function ClippedMenuCard({
  clipBottom,
  width,
  height,
}: {
  clipBottom: MotionValue<string>
  width: number
  height: number
}) {
  const [clip, setClip] = useState('0%')
  useMotionValueEvent(clipBottom, 'change', (v) => setClip(v as string))

  return (
    <div
      style={{
        width,
        height,
        clipPath: `inset(0 0 ${clip} 0)`,
        filter: 'drop-shadow(0 24px 64px rgba(0,0,0,0.85))',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <div
        className="w-full h-full flex flex-col relative"
        style={{
          background: 'linear-gradient(160deg, #FFF8F0 0%, #FFF0DC 100%)',
          border: '3px solid #D4AF37',
          fontFamily: 'var(--font-playfair), Georgia, serif',
          color: '#2A1A00',
        }}
      >
        {/* Inner border */}
        <div className="absolute inset-[8px] border border-[rgba(212,175,55,0.35)] pointer-events-none" />

        {/* Corner ornaments */}
        {[
          'top-3 left-3 border-t-2 border-l-2',
          'top-3 right-3 border-t-2 border-r-2',
          'bottom-3 left-3 border-b-2 border-l-2',
          'bottom-3 right-3 border-b-2 border-r-2',
        ].map((cls) => (
          <div key={cls} className={`absolute w-4 h-4 border-[#D4AF37] ${cls}`} />
        ))}

        {/* Header */}
        <div className="text-center pt-5 pb-2 px-5">
          <div className="text-[9px] tracking-[0.35em] uppercase text-[#8B6914] mb-1">Est. 2019</div>
          <div className="text-xl font-bold leading-tight">The Grand Spice</div>
          <div className="text-[8px] tracking-[0.25em] text-[#8B6914] mt-1">FINE DINING</div>
          <div className="w-20 mx-auto mt-2 border-b border-[#D4AF37]" />
        </div>

        <MenuSection title="Starters" items={[['Soup of the Day', '₹180'], ['Paneer Tikka', '₹320'], ['Mezze Platter', '₹450']]} />
        <MenuSection title="Mains" items={[['Dal Makhani', '₹380'], ['Lamb Rogan Josh', '₹680'], ['Grilled Fish', '₹720'], ['Veg Biryani', '₹420']]} />
        <MenuSection title="Desserts" items={[['Gulab Jamun', '₹180'], ['Kulfi Falooda', '₹220']]} />

        <div className="mt-auto text-center text-[7px] text-[#8B6914] tracking-[0.22em] uppercase pb-3 pt-2 border-t border-[rgba(212,175,55,0.3)]">
          All prices inclusive of taxes
        </div>
      </div>
    </div>
  )
}

function MenuSection({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div className="px-4 mb-2">
      <div className="text-[8px] tracking-[0.28em] uppercase text-[#8B6914] mb-1.5 text-center">{title}</div>
      {items.map(([name, price]) => (
        <div key={name} className="flex justify-between items-baseline text-[10px] mb-1">
          <span>{name}</span>
          <span className="text-[#8B6914] ml-2 flex-shrink-0">{price}</span>
        </div>
      ))}
    </div>
  )
}

// ── SHREDDER MACHINE ──────────────────────────────────────────────────────────
function ShredderMachine({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative select-none" style={{ width: 300 }}>
      {/* Serrated teeth — input slot */}
      <svg
        width="300"
        height="30"
        viewBox="0 0 300 30"
        style={{
          display: 'block',
          filter: isActive
            ? 'drop-shadow(0 -5px 14px rgba(var(--accent-rgb),0.6))'
            : 'drop-shadow(0 -2px 8px rgba(var(--accent-rgb),0.22))',
          transition: 'filter 0.3s ease',
        }}
      >
        <path
          d={Array.from({ length: 24 }, (_, i) => {
            const x = i * 12.5
            return `M${x},30 L${x + 6.25},5 L${x + 12.5},30`
          }).join(' ')}
          fill="#120E14"
          stroke={isActive ? 'var(--accent)' : '#2E1E2A'}
          strokeWidth={isActive ? '0.9' : '0.4'}
        />
        <line x1="0" y1="5" x2="300" y2="5" stroke="var(--accent)" strokeWidth="0.7" strokeOpacity={isActive ? 0.8 : 0.3} />
      </svg>

      {/* Body */}
      <div
        style={{
          height: 68,
          background: 'linear-gradient(180deg, #120E14 0%, #090F18 100%)',
          borderLeft: '1px solid #2E1E2A',
          borderRight: '1px solid #2E1E2A',
          borderBottom: '1px solid #2E1E2A',
          borderRadius: '0 0 10px 10px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Brushed-metal texture */}
        <div
          className="absolute inset-0 rounded-b-[10px] opacity-[0.06]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.08) 3px, rgba(255,255,255,0.08) 4px)' }}
        />

        {/* Brand */}
        <span
          className="relative text-[11px] tracking-[0.4em] font-semibold uppercase transition-colors duration-300"
          style={{ color: isActive ? 'rgba(var(--accent-light-rgb),0.9)' : 'rgba(var(--accent-rgb),0.38)' }}
        >
          Naira Tap
        </span>

        {/* LED */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2">
          <div
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: isActive ? 'var(--accent)' : '#2E1E2A',
              boxShadow: isActive ? '0 0 8px rgba(var(--accent-rgb),0.8)' : 'none',
            }}
          />
        </div>

        {/* Output slot */}
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-sm"
          style={{ width: 210, height: 5, background: 'rgba(0,0,0,0.75)', boxShadow: 'inset 0 1px 4px rgba(0,0,0,1)' }}
        />
      </div>

      {/* Legs */}
      <div className="flex justify-between px-8">
        {[0, 1].map((k) => (
          <div
            key={k}
            className="w-4 h-[22px] rounded-b-sm"
            style={{ background: '#0D0810', border: '1px solid #2E1E2A', borderTop: 'none' }}
          />
        ))}
      </div>
    </div>
  )
}
