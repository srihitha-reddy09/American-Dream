import { useRef, useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function useInView(ref) {
  const [v, setV] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: 0.1 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [ref])
  return v
}

const ATTRS = [
  {
    id: 'nick', name: 'Nickelodeon Universe', tag: 'Largest Indoor Theme Park in North America',
    color: '#FF6B35', stats: ['35+ rides', '8+ acres indoors', 'Year-round operation'],
    desc: 'The largest indoor theme park in North America. 35+ rides including the Shellraiser roller coaster. The anchor draw that keeps families on-property for hours — and brings them back.',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    cta: 'Book Group Events',
  },
  {
    id: 'water', name: 'DreamWorks Water Park', tag: 'Largest Indoor Water Park in North America',
    color: '#00B4D8', stats: ['40+ attractions', '1.5-acre wave pool', '78°F year-round'],
    desc: 'The largest indoor water park in the country — open 365 days a year at 78°F. A beach vacation 15 miles from Manhattan. Rain-or-shine foot traffic guaranteed.',
    img: 'https://images.unsplash.com/photo-1560851628-f10b4e7bf2cd?w=1200&q=80',
    cta: 'Partner with Water Park',
  },
  {
    id: 'snow', name: 'Big SNOW', tag: 'Only Year-Round Real-Snow Ski Resort in North America',
    color: '#CAF0F8', stats: ['Real snow, always', '365 days/year', 'Climate controlled'],
    desc: 'The only indoor real-snow ski resort in North America. Open every day of the year. Ski in July. A brand activation surface unlike anything else on Earth.',
    img: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1200&q=80',
    cta: 'Activate at Big SNOW',
  },
  {
    id: 'rink', name: 'The Rink', tag: 'NHL-Size Ice Rink & Event Venue',
    color: '#E0E7FF', stats: ['NHL regulation', 'Year-round events', 'Corporate buyouts'],
    desc: 'An NHL-regulation ice rink at the heart of the complex. Host to the USA National Curling Championships, corporate buyouts, holiday activations, and premium brand experiences.',
    img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80',
    cta: 'Book the Ice',
  },
  {
    id: 'wheel', name: 'Observation Wheel', tag: 'Visible from Manhattan · Naming Rights Available',
    color: '#C9A84C', stats: ['300+ ft elevation', 'NYC skyline views', 'Naming rights available'],
    desc: 'A towering observation wheel visible from the Manhattan skyline — the most photographed icon at American Dream. The most visible naming rights opportunity in northeastern retail.',
    img: 'https://images.unsplash.com/photo-1558618047-f4e60c7f77bb?w=1200&q=80',
    cta: 'Sponsor the Wheel',
  },
]

const INTERVAL = 4500 // ms per slide

export default function EntertainmentSection({ goTo, openVideo }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref)
  const timerRef = useRef(null)
  const progressRef = useRef(null)
  const startTimeRef = useRef(null)

  const goNext = useCallback(() => {
    setActive(prev => (prev + 1) % ATTRS.length)
    setProgress(0)
    startTimeRef.current = Date.now()
  }, [])

  const selectTab = useCallback((i) => {
    setActive(i)
    setProgress(0)
    startTimeRef.current = Date.now()
    setPaused(false)
  }, [])

  // Auto-advance timer
  useEffect(() => {
    if (!inView || paused) {
      clearInterval(timerRef.current)
      return
    }
    startTimeRef.current = Date.now()
    timerRef.current = setInterval(goNext, INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [inView, paused, active, goNext])

  // Smooth progress bar via rAF
  useEffect(() => {
    if (!inView || paused) {
      cancelAnimationFrame(progressRef.current)
      return
    }
    startTimeRef.current = startTimeRef.current || Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current
      const pct = Math.min((elapsed / INTERVAL) * 100, 100)
      setProgress(pct)
      if (pct < 100) progressRef.current = requestAnimationFrame(tick)
    }
    progressRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(progressRef.current)
  }, [inView, paused, active])

  const attr = ATTRS[active]

  return (
    <section id="entertainment" style={{ background: '#030303', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      {/* Header */}
      <div className="section-inner" style={{ paddingBottom: 0 }} ref={ref}>
        <div className={`fade-up ${inView ? 'in' : ''}`} style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="gold-bar" style={{ margin: '0 auto 18px' }} />
          <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>Attractions & Entertainment</span>
          <h2 className="display-xl">Six World-Class Attractions.<br /><em>One Roof.</em></h2>
          <p className="body-lg" style={{ maxWidth: 560, margin: '16px auto 0' }}>
            No other property on Earth offers this combination. This is what separates American Dream from every commercial real estate option in the market.
          </p>
        </div>
      </div>

      {/* Tab explorer */}
      <div
        style={{ maxWidth: 1400, margin: '0 auto', padding: '0 8vw 80px' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Tabs with progress bars */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 2, overflowX: 'auto' }}>
          {ATTRS.map((a, i) => (
            <button
              key={a.id}
              onClick={() => selectTab(i)}
              style={{
                flex: 1,
                position: 'relative',
                padding: '13px 16px',
                background: active === i ? 'rgba(255,255,255,0.04)' : 'transparent',
                border: 'none',
                borderBottom: '2px solid transparent',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: 11, fontWeight: active === i ? 600 : 400,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: active === i ? '#F5F5F0' : 'rgba(245,245,240,0.35)',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {a.name}

              {/* Progress bar at bottom of each active tab */}
              {active === i && (
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0,
                  height: 2,
                  width: `${progress}%`,
                  background: a.color,
                  transition: 'none',
                }} />
              )}

              {/* Inactive tab bottom indicator (thin gold line) */}
              {active !== i && (
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0,
                  height: 2, width: '100%',
                  background: 'transparent',
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              minHeight: 480, border: '1px solid rgba(255,255,255,0.07)',
            }}
            className="two-col"
          >
            {/* Left: text */}
            <div style={{ padding: '48px 48px', background: '#080808', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ width: 40, height: 2, background: attr.color, marginBottom: 16 }} />
              <div style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: attr.color, marginBottom: 10, fontWeight: 700 }}>{attr.tag}</div>
              <h3 style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 'clamp(2.2rem,4.5vw,4rem)', letterSpacing: '0.05em', color: '#F5F5F0', lineHeight: 0.9, marginBottom: 18 }}>
                {attr.name.toUpperCase()}
              </h3>
              <p className="body-lg" style={{ marginBottom: 24, maxWidth: 480 }}>{attr.desc}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
                {attr.stats.map((s, j) => (
                  <span key={j} style={{ padding: '5px 14px', border: `1px solid ${attr.color}50`, fontSize: 11, color: 'rgba(245,245,240,0.6)', letterSpacing: '0.06em' }}>{s}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <button className="btn-gold" style={{ background: attr.color }} onClick={() => goTo('contact')}>
                  <span style={{ color: '#030303' }}>{attr.cta}</span>
                </button>
                <button className="btn-ghost"
                  onClick={() => openVideo('https://www.youtube.com/embed/nqL41g0k2Kw?autoplay=1&rel=0', 'American Dream — Attractions')}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  Watch Film
                </button>

                {/* Prev / Next controls */}
                <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
                  <button
                    onClick={() => selectTab((active - 1 + ATTRS.length) % ATTRS.length)}
                    style={{ width: 34, height: 34, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'rgba(245,245,240,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = attr.color; e.currentTarget.style.color = attr.color }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(245,245,240,0.5)' }}
                    aria-label="Previous attraction"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                  <button
                    onClick={() => selectTab((active + 1) % ATTRS.length)}
                    style={{ width: 34, height: 34, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'rgba(245,245,240,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = attr.color; e.currentTarget.style.color = attr.color }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(245,245,240,0.5)' }}
                    aria-label="Next attraction"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </div>
              </div>

              {/* Auto-play indicator */}
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={() => setPaused(p => !p)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(245,245,240,0.3)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter,sans-serif', transition: 'color 0.25s' }}
                  onMouseEnter={e => e.currentTarget.style.color = attr.color}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,240,0.3)'}
                >
                  {paused ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  ) : (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                  )}
                  {paused ? 'Resume' : 'Auto-playing'} · {active + 1} / {ATTRS.length}
                </button>

                {/* Dot indicators */}
                <div style={{ display: 'flex', gap: 5, marginLeft: 'auto' }}>
                  {ATTRS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => selectTab(i)}
                      style={{
                        width: active === i ? 18 : 6,
                        height: 4, borderRadius: 2,
                        background: active === i ? attr.color : 'rgba(245,245,240,0.2)',
                        border: 'none', cursor: 'pointer', padding: 0,
                        transition: 'all 0.35s ease',
                      }}
                      aria-label={`Go to ${ATTRS[i].name}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: image */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: 380 }}>
              <motion.img
                key={attr.img}
                src={attr.img}
                alt={attr.name}
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, filter: 'brightness(0.55)' }}
                loading="lazy"
              />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${attr.color}18 0%, transparent 70%)` }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg, transparent 50%, #080808 100%)' }} />

              {/* Attraction name watermark on image */}
              <div style={{
                position: 'absolute', bottom: 24, right: 24,
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
                letterSpacing: '0.1em',
                color: `${attr.color}80`,
                textAlign: 'right',
                lineHeight: 1.1,
                pointerEvents: 'none',
              }}>
                {attr.name.split(' ').map((word, i) => <div key={i}>{word}</div>)}
              </div>

              {/* Play button */}
              <button
                className="play-btn"
                style={{ position: 'absolute', top: '50%', left: '58%', transform: 'translate(-50%, -50%)' }}
                onClick={() => openVideo('https://www.youtube.com/embed/nqL41g0k2Kw?autoplay=1&rel=0', 'American Dream — Attractions')}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom callout */}
        <div style={{ marginTop: 40, padding: '28px 32px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.1rem,1.8vw,1.6rem)', fontWeight: 300 }}>
            70% of American Dream is entertainment —{' '}
            <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>your brand lives inside the experience, not beside it.</span>
          </p>
          <button className="btn-gold" onClick={() => goTo('sponsorship')}><span>Explore Brand Activations</span></button>
        </div>
      </div>
    </section>
  )
}
