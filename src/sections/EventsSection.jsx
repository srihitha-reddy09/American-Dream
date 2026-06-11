import { useRef, useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function useInView(r) {
  const [v, s] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) s(true) }, { threshold: 0.1 })
    if (r.current) o.observe(r.current)
    return () => o.disconnect()
  }, [r])
  return v
}

const EVENTS = [
  {
    type: 'Concerts & Live', icon: '🎵', cap: 'Up to 5,000+',
    highlight: '2026 FIFA World Cup Fan Fest — 39-day activation',
    venues: ['Center Stage', 'Atrium', 'Outdoor Plaza'],
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    color: '#C9A84C',
    desc: 'From intimate acoustic sessions to full-scale concerts, American Dream transforms into a world-class live music venue for any scale of production.',
  },
  {
    type: 'Brand Activations', icon: '🚀', cap: 'Custom Build-Outs',
    highlight: 'DragonBall Official Pop-Up Tour 2026 — live now',
    venues: ['Theme Park', 'Grand Concourse', 'Luxury Wing'],
    img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80',
    color: '#FF6B35',
    desc: 'Immersive brand experiences embedded inside six world-class attractions. Every activation here becomes a global media moment.',
  },
  {
    type: 'Corporate Events', icon: '💼', cap: '50–2,000 guests',
    highlight: 'Full-property buyouts available — Fortune 500 ready',
    venues: ['Big SNOW', 'The Rink', 'Private Dining'],
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
    color: '#60A5FA',
    desc: 'Private ski nights, exclusive ice rink buyouts, and corporate dining in Michelin-caliber restaurants. No venue in North America offers this range.',
  },
  {
    type: 'Product Launches', icon: '✨', cap: 'Customizable',
    highlight: 'Premium 4K+ digital OOH network throughout',
    venues: ['Pop-Up Pads', 'Digital Network', 'Atrium'],
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80',
    color: '#A78BFA',
    desc: "Launch in front of 32 million annual visitors. Every launch here travels globally on social — your audience is already here.",
  },
  {
    type: 'Expositions', icon: '🏛️', cap: 'Up to 10,000',
    highlight: 'Adjacent to MetLife Stadium — 2026 FIFA World Cup host',
    venues: ['Expo Hall', 'Multi-Level Flex', 'Full Complex'],
    img: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&q=80',
    color: '#34D399',
    desc: 'Convention-scale exposition halls with hotels, dining, entertainment, and unmatched transit all on-site. The most complete convention package in the NY metro.',
  },
]

const INTERVAL = 4500

export default function EventsSection({ goTo, openVideo }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref)
  const timerRef = useRef(null)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  const goNext = useCallback(() => {
    setActive(prev => (prev + 1) % EVENTS.length)
    setProgress(0)
    startRef.current = Date.now()
  }, [])

  const selectTab = useCallback((i) => {
    setActive(i)
    setProgress(0)
    startRef.current = Date.now()
    setPaused(false)
  }, [])

  // Auto-advance
  useEffect(() => {
    if (!inView || paused) { clearInterval(timerRef.current); return }
    startRef.current = Date.now()
    timerRef.current = setInterval(goNext, INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [inView, paused, active, goNext])

  // Smooth progress bar
  useEffect(() => {
    if (!inView || paused) { cancelAnimationFrame(rafRef.current); return }
    startRef.current = startRef.current || Date.now()
    const tick = () => {
      const pct = Math.min(((Date.now() - startRef.current) / INTERVAL) * 100, 100)
      setProgress(pct)
      if (pct < 100) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, paused, active])

  const ev = EVENTS[active]

  return (
    <section id="events" style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="section-inner" ref={ref}>

        {/* Header */}
        <div className={`fade-up ${inView ? 'in' : ''}`} style={{ marginBottom: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw', alignItems: 'end' }} className="two-col">
            <div>
              <div className="gold-bar" style={{ marginBottom: 18 }} />
              <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>Events & Platform</span>
              <h2 className="display-xl">Not Just a Venue.<br /><em>A Global Stage.</em></h2>
            </div>
            <p className="body-lg">
              American Dream is the official off-pitch destination for the 2026 FIFA World Cup — 39 days, millions of global visitors.
              From 50-person retreats to 10,000-person activations, no venue in the Northeast offers this scale.
            </p>
          </div>
        </div>

        {/* Tabs + panel */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Tab bar with progress indicators */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 2, overflowX: 'auto' }}>
            {EVENTS.map((e, i) => (
              <button
                key={i}
                onClick={() => selectTab(i)}
                style={{
                  flex: 1,
                  position: 'relative',
                  padding: '13px 14px',
                  background: active === i ? 'rgba(255,255,255,0.04)' : 'transparent',
                  border: 'none',
                  borderBottom: '2px solid transparent',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11,
                  fontWeight: active === i ? 600 : 400,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: active === i ? '#F5F5F0' : 'rgba(245,245,240,0.35)',
                  transition: 'all 0.3s',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                <span style={{ marginRight: 6 }}>{e.icon}</span>
                {e.type}
                {/* Live progress bar */}
                {active === i && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0,
                    height: 2, width: `${progress}%`,
                    background: e.color,
                    transition: 'none',
                  }} />
                )}
              </button>
            ))}
          </div>

          {/* Main panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid rgba(255,255,255,0.07)', marginBottom: 24, minHeight: 420 }}
              className="two-col"
            >
              {/* Left */}
              <div style={{ padding: '44px 44px', background: '#080808', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ width: 36, height: 2, background: ev.color, marginBottom: 14 }} />
                <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.6rem,2.8vw,2.6rem)', fontWeight: 300, marginBottom: 12, lineHeight: 1.2 }}>
                  {ev.type}<br />
                  <span style={{ color: ev.color, fontStyle: 'italic' }}>at American Dream</span>
                </h3>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: ev.color }} />
                  <span style={{ fontSize: 12, color: ev.color, letterSpacing: '0.06em' }}>Capacity: {ev.cap}</span>
                </div>
                <p className="body-lg" style={{ marginBottom: 16, maxWidth: 480 }}>{ev.desc}</p>
                <div style={{ padding: '11px 15px', border: `1px solid ${ev.color}40`, background: `${ev.color}0a`, marginBottom: 20, fontSize: 12, color: ev.color, fontStyle: 'italic' }}>
                  ★ {ev.highlight}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                  {ev.venues.map((v, i) => (
                    <span key={i} style={{ padding: '5px 12px', border: '1px solid rgba(255,255,255,0.12)', fontSize: 11, color: 'rgba(245,245,240,0.5)' }}>{v}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <button className="btn-gold" onClick={() => goTo('contact')}>
                    <span>Book This Event</span>
                  </button>
                  <button className="btn-ghost"
                    onClick={() => openVideo('https://www.youtube.com/embed/nqL41g0k2Kw?autoplay=1&rel=0', 'American Dream Events')}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    Watch Film
                  </button>

                  {/* Prev / Next */}
                  <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
                    {[
                      { dir: -1, pts: '15 18 9 12 15 6' },
                      { dir: 1,  pts: '9 18 15 12 9 6' },
                    ].map(({ dir, pts }) => (
                      <button
                        key={dir}
                        onClick={() => selectTab((active + dir + EVENTS.length) % EVENTS.length)}
                        style={{ width: 34, height: 34, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'rgba(245,245,240,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = ev.color; e.currentTarget.style.color = ev.color }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(245,245,240,0.5)' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points={pts} /></svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auto-play status + dots */}
                <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    onClick={() => setPaused(p => !p)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(245,245,240,0.3)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter,sans-serif', transition: 'color 0.25s' }}
                    onMouseEnter={e => e.currentTarget.style.color = ev.color}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,240,0.3)'}
                  >
                    {paused
                      ? <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                      : <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                    }
                    {paused ? 'Resume' : 'Auto-playing'} · {active + 1} / {EVENTS.length}
                  </button>

                  {/* Dot indicators */}
                  <div style={{ display: 'flex', gap: 5, marginLeft: 'auto' }}>
                    {EVENTS.map((e, i) => (
                      <button
                        key={i}
                        onClick={() => selectTab(i)}
                        style={{
                          width: active === i ? 18 : 6, height: 4, borderRadius: 2,
                          background: active === i ? ev.color : 'rgba(245,245,240,0.2)',
                          border: 'none', cursor: 'pointer', padding: 0,
                          transition: 'all 0.35s ease',
                        }}
                        aria-label={`Event type ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: image */}
              <div style={{ position: 'relative', overflow: 'hidden', minHeight: 360 }}>
                <motion.img
                  key={ev.img}
                  src={ev.img}
                  alt={ev.type}
                  initial={{ scale: 1.08, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, filter: 'brightness(0.45)' }}
                  loading="lazy"
                />
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${ev.color}18 0%, transparent 70%)` }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg, transparent 50%, #080808 100%)' }} />
                {/* Event name watermark */}
                <div style={{ position: 'absolute', bottom: 24, right: 24, fontFamily: 'Bebas Neue,sans-serif', fontSize: 'clamp(1rem,2.5vw,1.8rem)', letterSpacing: '0.1em', color: `${ev.color}70`, textAlign: 'right', lineHeight: 1.1, pointerEvents: 'none' }}>
                  {ev.type.split(' ').map((w, i) => <div key={i}>{w}</div>)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }} className="four-col">
          {[
            { icon: '📅', l: 'FIFA World Cup Fan Fest', v: '39 Days' },
            { icon: '🌍', l: 'International Visitor Share', v: '28%' },
            { icon: '👥', l: 'Max Event Capacity', v: '10K+' },
            { icon: '📸', l: 'Social Impressions / Activation', v: '50M+' },
          ].map((s, i) => (
            <div key={i} className={`fade-up fade-up-d${i + 1} ${inView ? 'in' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 22px', background: '#080808', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(245,245,240,0.35)', marginBottom: 3 }}>{s.l}</div>
                <div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 24, color: 'var(--gold)' }}>{s.v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
