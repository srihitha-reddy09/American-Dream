import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const YT_ID = 'nqL41g0k2Kw'

const FALLBACK_IMG =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/American_Dream_Meadowlands_shopping_mall_from_first_floor.jpeg/1280px-American_Dream_Meadowlands_shopping_mall_from_first_floor.jpeg'

export default function HeroSection({ goTo, openVideo }) {
  const [ready, setReady] = useState(false)
  useEffect(() => { setTimeout(() => setReady(true), 200) }, [])

  return (
    <section
      id="hero"
      style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* ── BACKGROUND LAYERS (back → front) ── */}

      {/* Layer 1: animated gradient — zero network, always visible */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(125deg, #030303 0%, #100900 35%, #1a1000 60%, #050505 100%)',
        backgroundSize: '300% 300%',
        animation: 'gradShift 12s ease infinite',
      }} />

      {/* Layer 2: fallback photo */}
      <img
        src={FALLBACK_IMG}
        alt="American Dream Mall interior"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          width: '100%', height: '100%', objectFit: 'cover',
          filter: 'brightness(0.40) saturate(0.80)',
        }}
      />

      {/* Layer 3: muted autoplay YouTube video */}
      <div className="hero-video-wrap" style={{ zIndex: 2 }}>
        <iframe
          src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1`}
          title="American Dream Mall — Official Video"
          allow="autoplay; encrypted-media"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '177.78vh', minWidth: '100%',
            height: '100%', minHeight: '56.25vw',
            border: 'none', pointerEvents: 'none',
            filter: 'brightness(0.42) saturate(0.85)',
          }}
        />
      </div>

      {/* Layer 4: directional dark overlays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'linear-gradient(135deg, rgba(3,3,3,0.65) 0%, rgba(3,3,3,0.28) 55%, rgba(3,3,3,0.60) 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', zIndex: 3, background: 'linear-gradient(to top, #030303, transparent)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '25%', zIndex: 3, background: 'linear-gradient(to bottom, rgba(3,3,3,0.5), transparent)' }} />

      {/* ── MAIN CONTENT ── */}
      <div style={{
        position: 'relative', zIndex: 4,
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'calc(var(--nav-h) + 20px) clamp(170px,15vw,195px) 80px 8vw',
      }}>
        {ready && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ marginBottom: 16 }}
            >
              <span className="hero-eyebrow">
                East Rutherford, New Jersey · #2 Largest Mall in the United States
              </span>
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              AMERICAN<br /><span className="accent">DREAM</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.9 }}
              style={{
                fontFamily: 'Cormorant Garamond,serif',
                fontSize: 'clamp(1.1rem,2vw,1.8rem)',
                fontWeight: 300, fontStyle: 'italic',
                color: 'rgba(245,245,240,0.82)',
                maxWidth: 620, lineHeight: 1.55,
                marginTop: 24,
              }}
            >
              Not a mall. A destination. A city unto itself.<br />
              3.5 million sq ft. 32 million visitors. One address.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.8 }}
              style={{ display: 'flex', gap: 14, marginTop: 40, flexWrap: 'wrap' }}
            >
              <button className="btn-gold" onClick={() => goTo('why')}>
                <span>Explore the Property</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button className="btn-ghost"
                onClick={() => openVideo(`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0`, 'American Dream — Official Film')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                Watch the Film
              </button>
            </motion.div>
          </>
        )}
      </div>

      {/* ── SCROLL HINT ── */}
      {ready && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          style={{ position: 'absolute', bottom: 36, left: '8vw', zIndex: 4, cursor: 'pointer' }}
          onClick={() => goTo('why')}
        >
          <div className="scroll-hint">
            <span className="scroll-hint-text">Scroll to explore</span>
            <div className="scroll-hint-line" />
          </div>
        </motion.div>
      )}
    </section>
  )
}
