import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Nav({ activeSection, goTo, sections }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const labels = {
    hero: 'Home', why: 'The Property', entertainment: 'Entertainment',
    retail: 'Retail', dining: 'Dining', events: 'Events',
    sponsorship: 'Sponsorship', leasing: 'Leasing', contact: 'Contact',
  }

  return (
    <>
      <nav className={`deck-nav ${scrolled ? 'scrolled' : ''}`}>
        <button onClick={() => goTo('hero')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <div className="nav-logo-top">AMERICAN</div>
          <div className="nav-logo-bottom">DREAM</div>
        </button>

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="desk-links">
          {['why','entertainment','retail','dining','events','sponsorship','leasing'].map(s => (
            <button key={s} onClick={() => goTo(s)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter,sans-serif', fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: activeSection === s ? 'var(--gold)' : 'rgba(245,245,240,0.45)',
              borderBottom: activeSection === s ? '1px solid var(--gold)' : '1px solid transparent',
              paddingBottom: 2, transition: 'all 0.3s',
            }}>{labels[s]}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="btn-gold" style={{ padding: '10px 22px', fontSize: '10px' }}
            onClick={() => goTo('contact')}>
            <span>Partner With Us</span>
          </button>
          <button className="ham-btn" onClick={() => setMenuOpen(true)}
            style={{ background: 'none', border: '1px solid rgba(245,245,240,0.2)', cursor: 'pointer', padding: 8, display: 'none', flexDirection: 'column', gap: 4 }}
            aria-label="Menu">
            {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: 18, height: 1, background: 'var(--white)' }} />)}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(3,3,3,0.97)', zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'var(--white)', fontSize: 30, cursor: 'pointer' }}>×</button>
            {sections.map(s => (
              <button key={s} onClick={() => { goTo(s); setMenuOpen(false) }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Cormorant Garamond,serif', fontSize: '2.2rem', fontWeight: 300, color: activeSection === s ? 'var(--gold)' : 'var(--white)', letterSpacing: '0.04em' }}>
                {labels[s]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
