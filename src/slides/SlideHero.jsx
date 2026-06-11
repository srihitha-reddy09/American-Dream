import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import VideoBg from '../components/VideoBg'

const stagger = (delay) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] },
})

export default function SlideHero({ isActive, goTo, openVideo }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setShow(true), 100)
      return () => clearTimeout(t)
    }
  }, [isActive])

  return (
    <div className="slide" style={{ background: '#030303' }}>
      {/* Background */}
      <VideoBg scene="hero" brightness={0.38} isActive={isActive} />

      {/* Overlays */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(135deg, rgba(3,3,3,0.65) 0%, rgba(3,3,3,0.3) 55%, rgba(3,3,3,0.6) 100%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', zIndex: 2,
        background: 'linear-gradient(to top, #030303, transparent)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '30%', zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(3,3,3,0.5), transparent)',
      }} />

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 3,
        height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '0 8vw 130px',
      }}>
        {show && (
          <>
            <motion.div {...stagger(0.1)} style={{ marginBottom: 16 }}>
              <span className="hero-label">
                East Rutherford, New Jersey · #2 Largest Mall in the United States
              </span>
            </motion.div>

            <motion.div {...stagger(0.3)}>
              <h1 className="hero-title">
                AMERICAN<br />
                <span className="accent">DREAM</span>
              </h1>
            </motion.div>

            <motion.p
              {...stagger(0.55)}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)',
                fontWeight: 300, fontStyle: 'italic',
                color: 'rgba(245,245,240,0.8)',
                maxWidth: 640, lineHeight: 1.5, marginTop: 24, marginBottom: 8,
              }}
            >
              Not a mall. A destination. A city unto itself.<br />
              3.5 million sq ft. 32 million visitors. One address.
            </motion.p>

            <motion.div {...stagger(0.75)} style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
              <button className="btn-gold" onClick={() => goTo(1)}>
                <span>Explore the Property</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button className="btn-ghost"
                onClick={() => openVideo('https://www.youtube.com/embed/dSvBNEyf53M?autoplay=1&rel=0', 'American Dream — Official Tour')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                Watch the Film
              </button>
            </motion.div>
          </>
        )}
      </div>

      {/* Bottom stat bar */}
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4,
            display: 'flex',
            borderTop: '1px solid rgba(201,168,76,0.15)',
            background: 'rgba(3,3,3,0.75)', backdropFilter: 'blur(12px)',
          }}
        >
          {[
            { v: '$5B', l: 'Development Investment' },
            { v: '3.5M', l: 'Square Feet' },
            { v: '32M+', l: 'Annual Visitors' },
            { v: '450+', l: 'Stores & Restaurants' },
            { v: '70%', l: 'Entertainment Mix' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: '16px 0', textAlign: 'center',
              borderRight: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }}>
              <div style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(1.3rem, 2.2vw, 2rem)',
                color: 'var(--gold)', letterSpacing: '0.05em', lineHeight: 1,
              }}>{s.v}</div>
              <div style={{
                fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(245,245,240,0.35)', marginTop: 4,
              }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Scroll hint */}
      {show && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="scroll-hint" style={{ bottom: 88, zIndex: 4 }}
          onClick={() => goTo(1)}
        >
          <span className="scroll-hint-text">scroll or press →</span>
          <div className="scroll-hint-line" />
        </motion.div>
      )}
    </div>
  )
}
