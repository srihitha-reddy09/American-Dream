import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Official American Dream YouTube video
const YT_ID = 'nqL41g0k2Kw'

export default function HeroSection({ goTo, openVideo }) {
  const [ready, setReady] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => { setTimeout(() => setReady(true), 200) }, [])

  // Try native HTML5 video first (Pixabay — truly open, no referrer restriction)
  const handleVideoError = () => {
    if (videoRef.current) videoRef.current.style.display = 'none'
  }

  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* ── VIDEO BACKGROUND ── */}
      <div className="hero-video-wrap">
        {/* Native video — Pixabay CDN works without referrer */}
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          onError={handleVideoError}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.45) saturate(0.85)' }}
        >
          <source src="https://cdn.pixabay.com/video/2022/11/28/140638-776168199_large.mp4" type="video/mp4" />
          <source src="https://cdn.pixabay.com/video/2022/03/15/111524-688390157_large.mp4" type="video/mp4" />
        </video>

        {/* CSS animated gradient — always visible as base/fallback */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(125deg, #030303 0%, #100900 30%, #1a1000 55%, #050505 100%)',
          backgroundSize: '300% 300%',
          animation: 'gradShift 12s ease infinite',
          zIndex: -1,
        }} />
      </div>

      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(135deg, rgba(3,3,3,0.72) 0%, rgba(3,3,3,0.35) 55%, rgba(3,3,3,0.65) 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', zIndex: 1, background: 'linear-gradient(to top, #030303, transparent)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '25%', zIndex: 1, background: 'linear-gradient(to bottom, rgba(3,3,3,0.5), transparent)' }} />

      {/* ── CONTENT ── */}
      {/* 
        Layout: full-height flex column
        - Top spacer pushes content away from nav (70px nav + breathing room)
        - Content centered vertically in the remaining space
        - Bottom padding clears the stat bar (70px) + scroll hint
      */}
      <div style={{
        position: 'relative', zIndex: 2,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '70px 8vw 160px',   /* top=nav height, bottom=stat bar + hint */
      }}>
        {ready && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              style={{ marginBottom: 20 }}
            >
              <span className="hero-eyebrow">
                East Rutherford, New Jersey · #2 Largest Mall in the United States
              </span>
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
            >
              AMERICAN<br /><span className="accent">DREAM</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.9 }}
              style={{
                fontFamily: 'Cormorant Garamond,serif',
                fontSize: 'clamp(1.1rem,2vw,1.8rem)',
                fontWeight: 300, fontStyle: 'italic',
                color: 'rgba(245,245,240,0.82)',
                maxWidth: 620, lineHeight: 1.55,
                marginTop: 24, marginBottom: 0,
              }}
            >
              Not a mall. A destination. A city unto itself.<br />
              3.5 million sq ft. 32 million visitors. One address.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.8 }}
              style={{ display: 'flex', gap: 14, marginTop: 40, flexWrap: 'wrap' }}
            >
              <button className="btn-gold" onClick={() => goTo('why')}>
                <span>Explore the Property</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button className="btn-ghost"
                onClick={() => openVideo(`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0`, 'American Dream — Official Video')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                Watch the Film
              </button>
            </motion.div>
          </>
        )}
      </div>

      {/* ── STAT BAR — fixed to bottom, exact height 68px ── */}
      {ready && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
            display: 'flex',
            height: 68,
            borderTop: '1px solid rgba(201,168,76,0.15)',
            background: 'rgba(3,3,3,0.82)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {[
            { v: '$5B',  l: 'Development Investment' },
            { v: '3.5M', l: 'Square Feet' },
            { v: '32M+', l: 'Annual Visitors' },
            { v: '450+', l: 'Stores & Dining' },
            { v: '70%',  l: 'Entertainment Mix' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              borderRight: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }}>
              <div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 'clamp(1.1rem,1.8vw,1.7rem)', color: 'var(--gold)', letterSpacing: '0.05em', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.35)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Scroll hint — sits just above the stat bar */}
      {ready && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          style={{ position: 'absolute', bottom: 82, left: '50%', transform: 'translateX(-50%)', zIndex: 3, cursor: 'pointer' }}
          onClick={() => goTo('why')}
        >
          <div className="scroll-hint">
            <span className="scroll-hint-text">Scroll to explore</span>
            <div className="scroll-hint-line" />
          </div>
        </motion.div>
      )}

      <style>{`
        @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
      `}</style>
    </section>
  )
}
