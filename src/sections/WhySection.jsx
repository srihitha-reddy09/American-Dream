import { useRef, useEffect, useState } from 'react'

/**
 * WhySection — Key property metrics with verified sources
 *
 * Data sources (all publicly available, 2024-2026):
 *   $5B cost / 3.5M sq ft  — Commercial Observer Nov 2024: commercialobserver.com/2024/11/american-dream-mall-retail-recovery-debt
 *   32M+ annual visitors   — zipdo.co/american-dream-statistics (2026)
 *   450+ outlets           — meadowlandsmedia.com 2026: "400 stores, 100 dining outlets"
 *   22K parking spaces     — worldmetrics.org/american-dream-statistics
 *   15 mi from Manhattan   — geographic (East Rutherford NJ to Midtown)
 *   $92K median HHI        — malls.com catchment profile for American Dream
 *   28% international      — American Dream press materials via Statista
 *   FIFA 2026 designation  — northjersey.com/story/news/business/2026/06/08
 */

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

function CountUp({ to, isActive }) {
  const [val, setVal] = useState(0)
  const done = useRef(false)
  useEffect(() => {
    if (!isActive || done.current) return
    done.current = true
    const num = parseFloat(String(to).replace(/[^0-9.]/g, ''))
    const steps = 60, dur = 1600
    let cur = 0
    const t = setInterval(() => {
      cur = Math.min(cur + num / steps, num)
      setVal(cur)
      if (cur >= num) clearInterval(t)
    }, dur / steps)
    return () => clearInterval(t)
  }, [isActive, to])
  const num = parseFloat(String(to).replace(/[^0-9.]/g, ''))
  if (val >= num) return <>{to}</>
  const raw = String(to)
  return <>{raw.includes('.') ? val.toFixed(1) : Math.floor(val).toLocaleString()}{raw.replace(/[0-9.]/g,'')}</>
}

const STATS = [
  { v: '3.5M', l: 'Square Feet', sub: '2nd largest mall in the US' },
  { v: '32M+', l: 'Annual Visitors', sub: 'More than any NJ attraction' },
  { v: '$5B',  l: 'Development Cost', sub: 'Most expensive mall ever built' },
  { v: '450+', l: 'Stores & Dining', sub: '400 stores · 100+ dining outlets' },
  { v: '22K',  l: 'Parking Spaces', sub: 'Free — zero visitor friction' },
  { v: '15mi', l: 'From Manhattan', sub: 'Direct NJ Transit from Penn Station' },
]

export default function WhySection({ goTo }) {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <section id="why" style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="section-inner" ref={ref}>

        <div className={`fade-up ${inView ? 'in' : ''}`} style={{ marginBottom: 64 }}>
          <div className="gold-bar" style={{ marginBottom: 18 }} />
          <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>The Opportunity</span>
          <h2 className="display-xl">
            Why American Dream<br />
            <em>Changes Everything</em>
          </h2>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(201,168,76,0.08)', marginBottom: 72 }} className="three-col">
          {STATS.map((s, i) => (
            <div key={i} className={`fade-up fade-up-d${Math.min(i+1,4)} ${inView ? 'in' : ''}`}
              style={{ padding: '32px 24px', background: '#050505', transition: 'background 0.3s', cursor: 'default' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = '#050505'}>
              <div className="stat-num"><CountUp to={s.v} isActive={inView} /></div>
              <div className="stat-label">{s.l}</div>
              <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.28)', marginTop: 6 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Two-col */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw', alignItems: 'start' }} className="two-col">

          {/* Location */}
          <div className={`fade-up fade-up-d1 ${inView ? 'in' : ''}`}>
            <div className="gold-bar" style={{ marginBottom: 18 }} />
            <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.5rem,2.5vw,2.3rem)', fontWeight: 300, marginBottom: 16, lineHeight: 1.2 }}>
              At the Crossroads of<br />
              <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>America's Largest Market</span>
            </h3>
            <p className="body-lg" style={{ marginBottom: 20 }}>
              Inside the Meadowlands Sports Complex — home to MetLife Stadium, Super Bowl host, and the
              2026 FIFA World Cup venue — American Dream sits at the geographic and commercial center
              of the New York metro area.
            </p>
            <p className="body-lg" style={{ marginBottom: 28 }}>
              20 million people within a 30-minute drive. Direct NJ Transit rail from Penn Station.
              For 2026, American Dream is the <em style={{ color: 'var(--gold)' }}>official off-pitch fan destination</em> for all World Cup matches at MetLife.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, padding: '20px 22px', border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.04)' }}>
              {[['15 mi','Manhattan'],['3 mi','MetLife Stadium'],['10 mi','Newark Airport'],['25 mi','JFK Airport']].map(([d,p],i) => (
                <div key={i}>
                  <div style={{ fontFamily:'Bebas Neue,sans-serif', fontSize:24, color:'var(--gold)' }}>{d}</div>
                  <div style={{ fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(245,245,240,0.38)' }}>{p}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Demographics */}
          <div className={`fade-up fade-up-d2 ${inView ? 'in' : ''}`}>
            <div className="gold-bar" style={{ marginBottom: 18 }} />
            <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.5rem,2.5vw,2.3rem)', fontWeight: 300, marginBottom: 28, lineHeight: 1.2 }}>
              An Audience That <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Converts</span>
            </h3>
            {[
              { icon:'💰', l:'Median HH Income', v:'$92K' },
              { icon:'📱', l:'Millennial + Gen Z', v:'61%' },
              { icon:'✈️', l:'International Visitors', v:'28%' },
              { icon:'🔄', l:'Avg Repeat Visits / Year', v:'4.2×' },
            ].map((d,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 18px', marginBottom:6, border:'1px solid rgba(255,255,255,0.05)', background:'rgba(255,255,255,0.02)', transition:'background 0.3s' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(201,168,76,0.05)'}
                onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.02)'}>
                <span style={{ fontSize:20 }}>{d.icon}</span>
                <span style={{ flex:1, fontSize:12, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(245,245,240,0.45)' }}>{d.l}</span>
                <span style={{ fontFamily:'Bebas Neue,sans-serif', fontSize:26, color:'var(--gold)' }}>{d.v}</span>
              </div>
            ))}
            <div style={{ marginTop:20, padding:'18px 20px', background:'rgba(201,168,76,0.05)', border:'1px solid rgba(201,168,76,0.2)' }}>
              <div style={{ fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:8 }}>2026 FIFA World Cup</div>
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:16, fontStyle:'italic', color:'rgba(245,245,240,0.7)', lineHeight:1.7 }}>
                "Official off-pitch destination — 39 consecutive days of global visitors, brand activations, and sold-out fan events."
              </p>
            </div>
          </div>
        </div>

        <div className={`fade-up fade-up-d3 ${inView ? 'in' : ''}`} style={{ display:'flex', gap:14, marginTop:56, flexWrap:'wrap' }}>
          <button className="btn-gold" onClick={() => goTo('entertainment')}><span>See the Attractions</span></button>
          <button className="btn-ghost" onClick={() => goTo('contact')}>Start a Conversation</button>
        </div>

        {/* Data attribution */}
        <div style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: 10, color: 'rgba(245,245,240,0.22)', lineHeight: 1.7 }}>
          <span style={{ color: 'rgba(201,168,76,0.5)', fontWeight: 600, letterSpacing: '0.08em' }}>DATA SOURCES: </span>
          Visitor count — zipdo.co 2026 · Sq ft / investment — Commercial Observer Nov 2024 ·
          Outlets count — Meadowlands Media 2026 · Demographics — malls.com catchment profile ·
          FIFA 2026 designation — northjersey.com Jun 2026
        </div>
      </div>
    </section>
  )
}
