import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function DeckNav({ slides, current, goTo }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => { setScrolled(current > 0) }, [current])

  return (
    <>
      <nav className={`deck-nav ${scrolled ? 'scrolled' : ''}`}>
        {/* Logo */}
        <button
          onClick={() => goTo(0)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
        >
          <div className="nav-logo-top">AMERICAN</div>
          <div className="nav-logo-bottom">DREAM</div>
        </button>

        {/* Desktop nav links */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desk-links">
          {slides.slice(1, -1).map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i + 1)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: (i + 1) === current ? 'var(--gold)' : 'rgba(245,245,240,0.45)',
                transition: 'color 0.3s',
                paddingBottom: '2px',
                borderBottom: (i + 1) === current ? '1px solid var(--gold)' : '1px solid transparent',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            className="btn-gold"
            style={{ padding: '11px 24px', fontSize: '10px' }}
            onClick={() => goTo(slides.length - 1)}
          >
            <span>Partner With Us</span>
          </button>
          {/* Hamburger */}
          <button
            className="ham-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none', border: '1px solid rgba(245,245,240,0.2)',
              cursor: 'pointer', padding: '8px', display: 'none', flexDirection: 'column', gap: '4px',
            }}
            aria-label="Menu"
          >
            {[0,1,2].map(i => (
              <span key={i} style={{ display: 'block', width: '18px', height: '1px', background: 'var(--white)' }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(3,3,3,0.97)',
              zIndex: 99, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '20px',
            }}
          >
            <button onClick={() => setMenuOpen(false)} style={{
              position: 'absolute', top: 24, right: 24,
              background: 'none', border: 'none', color: 'var(--white)',
              fontSize: '28px', cursor: 'pointer',
            }}>×</button>
            {slides.map((s, i) => (
              <button key={s.id} onClick={() => { goTo(i); setMenuOpen(false) }} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Cormorant Garamond, serif', fontSize: '2.4rem',
                fontWeight: 300, color: i === current ? 'var(--gold)' : 'var(--white)',
                letterSpacing: '0.04em',
              }}>{s.label}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desk-links { display: none !important; }
          .ham-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
