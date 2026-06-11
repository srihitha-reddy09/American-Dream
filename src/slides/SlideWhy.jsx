import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import InnerScrollHint from '../components/InnerScrollHint'
import VideoBg from '../components/VideoBg'

function Counter({ to, suffix = '', isActive }) {
  const [val, setVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!isActive || started.current) return
    started.current = true
    const num = parseFloat(String(to).replace(/[^0-9.]/g, ''))
    const dur = 1800, steps = 60, inc = num / steps
    let cur = 0, t = setInterval(() => {
      cur = Math.min(cur + inc, num)
      setVal(cur)
      if (cur >= num) clearInterval(t)
    }, dur / steps)
    return () => clearInterval(t)
  }, [isActive, to])

  const fmt = () => {
    const num = parseFloat(String(to).replace(/[^0-9.]/g, ''))
    const raw = String(to)
    if (val >= num) return to
    if (raw.includes('.')) return val.toFixed(1) + suffix
    return Math.floor(val).toLocaleString() + suffix
  }

  return <>{fmt()}</>
}

const STATS = [
  { v: '3.5M', l: 'Square Feet', sub: '2nd largest mall in the United States' },
  { v: '32M+', l: 'Annual Visitors', sub: 'More than any NJ attraction' },
  { v: '$5B',  l: 'Built Cost', sub: 'Most expensive mall ever built' },
  { v: '450+', l: 'Outlets', sub: '400 stores + 100 dining concepts' },
  { v: '22K',  l: 'Parking Spaces', sub: 'Free — zero visitor friction' },
  { v: '15mi', l: 'From Manhattan', sub: 'Direct NJ Transit from Penn Station' },
]

const DEMO = [
  { icon: '💰', label: 'Median HH Income', val: '$92K' },
  { icon: '📱', label: 'Millennial + Gen Z', val: '61%' },
  { icon: '✈️', label: 'International Visitors', val: '28%' },
  { icon: '🔄', label: 'Avg Repeat Visits / Year', val: '4.2×' },
]

export default function SlideWhy({ isActive, goTo }) {
  const scrollRef = useRef(null)

  return (
    <div className="slide" style={{ background: '#050505' }}>
      <VideoBg scene="why" brightness={0.25} isActive={isActive} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to right, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.7) 50%, rgba(5,5,5,0.5) 100%)',
      }} />

      <div className="slide-content slide-inner-scroll" ref={scrollRef} style={{ position: 'relative', zIndex: 3 }}>
        <div style={{ padding: '88px 8vw 80px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: 64 }}
          >
            <div className="gold-bar" style={{ marginBottom: 20 }} />
            <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>The Opportunity</span>
            <h2 className="display-title">
              Why American Dream<br />
              <span className="display-italic">Changes Everything</span>
            </h2>
          </motion.div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(201,168,76,0.08)', marginBottom: 64 }}>
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="deck-card"
                style={{ padding: '32px 28px', background: '#050505' }}
              >
                <div className="stat-num">
                  {isActive ? <Counter to={s.v} isActive={isActive} /> : '—'}
                </div>
                <div className="stat-label" style={{ marginTop: 8 }}>{s.l}</div>
                <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.3)', marginTop: 6 }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* 2-col: Location + Demographics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} animate={isActive ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="gold-bar" style={{ marginBottom: 20 }} />
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', fontWeight: 300,
                marginBottom: 16, lineHeight: 1.2,
              }}>
                At the Crossroads of<br />
                <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>America's Largest Market</span>
              </h3>
              <p className="body-text" style={{ marginBottom: 24 }}>
                Inside the Meadowlands Sports Complex — home to MetLife Stadium, host of 
                Super Bowls and the 2026 FIFA World Cup — American Dream commands the 
                geographic and commercial center of the New York metro area.
              </p>
              <p className="body-text" style={{ marginBottom: 32 }}>
                20 million people live within a 30-minute drive. Direct NJ Transit rail from 
                Penn Station. For the 2026 World Cup, American Dream is the <em style={{ color: 'var(--gold)' }}>official 
                off-pitch fan destination</em> for all MetLife matches.
              </p>
              <div style={{
                padding: '20px 24px',
                border: '1px solid rgba(201,168,76,0.2)',
                background: 'rgba(201,168,76,0.04)',
                display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px',
              }}>
                {[
                  { d: '15 mi', p: 'Manhattan' },
                  { d: '3 mi',  p: 'MetLife Stadium' },
                  { d: '10 mi', p: 'Newark Airport' },
                  { d: '25 mi', p: 'JFK Airport' },
                ].map((r, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: 'var(--gold)' }}>{r.d}</div>
                    <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.4)' }}>{r.p}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Demographics */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} animate={isActive ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="gold-bar" style={{ marginBottom: 20 }} />
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', fontWeight: 300,
                marginBottom: 28, lineHeight: 1.2,
              }}>
                An Audience That <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Converts</span>
              </h3>
              {DEMO.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }} animate={isActive ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '16px 20px', marginBottom: 8,
                    border: '1px solid rgba(255,255,255,0.05)',
                    background: 'rgba(255,255,255,0.02)',
                    transition: 'border-color 0.3s',
                  }}
                >
                  <span style={{ fontSize: 22 }}>{d.icon}</span>
                  <span style={{ flex: 1, fontSize: 13, color: 'rgba(245,245,240,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{d.label}</span>
                  <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: 'var(--gold)' }}>{d.val}</span>
                </motion.div>
              ))}
              <div style={{
                marginTop: 24, padding: '20px 24px',
                background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}>
                <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>2026 World Cup Impact</div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontStyle: 'italic', color: 'rgba(245,245,240,0.7)', lineHeight: 1.7 }}>
                  "American Dream is the official off-pitch destination for the FIFA World Cup 2026 — 
                  39 consecutive days of global visitors, brand activations, and sold-out fan events."
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            style={{ marginTop: 56, display: 'flex', gap: 16, flexWrap: 'wrap' }}
          >
            <button className="btn-gold" onClick={() => goTo(2)}>
              <span>See the Attractions</span>
            </button>
            <button className="btn-ghost" onClick={() => goTo(8)}>
              Start a Conversation
            </button>
          </motion.div>
        </div>
        <InnerScrollHint scrollRef={scrollRef} />
      </div>
    </div>
  )
}
