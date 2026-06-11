import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EVENTS = [
  {
    type: 'Concerts & Live',
    icon: '🎵',
    cap: 'Up to 5,000+',
    video: 'https://videos.pexels.com/video-files/2053100/2053100-hd_1920_1080_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80',
    desc: 'From intimate acoustic sets to full-scale arena concerts, American Dream transforms into a world-class live music venue. The Grand Concourse and Center Stage handle everything from chart-topping artists to exclusive label showcases.',
    highlight: '2026 FIFA World Cup Fan Fest — 39-day activation',
    venues: ['Center Stage', 'Atrium', 'Outdoor Plaza'],
  },
  {
    type: 'Brand Activations',
    icon: '🚀',
    cap: 'Custom Build-Outs',
    video: 'https://videos.pexels.com/video-files/1409899/1409899-hd_1920_1080_24fps.mp4',
    poster: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1400&q=80',
    desc: 'Immersive brand experiences embedded inside six world-class attractions and 3.5M sq ft of premium retail. DragonBall Official Pop-Up Tour 2026. Toys"R"Us global reopening. Your campaign here is a global media moment.',
    highlight: 'DragonBall Official Pop-Up Tour 2026 — live now',
    venues: ['Theme Park', 'Grand Concourse', 'Luxury Wing'],
  },
  {
    type: 'Corporate Events',
    icon: '💼',
    cap: '50–2,000 guests',
    video: 'https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400&q=80',
    desc: 'Private ski nights on a real-snow slope. Exclusive ice rink buyouts. Corporate dining in Michelin-caliber restaurants. Team building at DreamWorks Water Park. No other corporate venue in North America offers this range.',
    highlight: 'Full-property buyouts available — Fortune 500 ready',
    venues: ['Big SNOW', 'The Rink', 'Private Dining'],
  },
  {
    type: 'Product Launches',
    icon: '✨',
    cap: 'Customizable',
    video: 'https://videos.pexels.com/video-files/3135670/3135670-hd_1920_1080_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1400&q=80',
    desc: 'Launch in front of 32 million annual visitors. 4K+ digital OOH screens. Capture the world\'s most engaged mall audience at the most talked-about destination in the Northeast. Your launch here travels globally on social.',
    highlight: 'Premium digital OOH network — 4K+ screens throughout',
    venues: ['Pop-Up Pads', 'Digital Network', 'Atrium'],
  },
  {
    type: 'Expositions',
    icon: '🏛️',
    cap: 'Up to 10,000',
    video: 'https://videos.pexels.com/video-files/8964577/8964577-hd_1920_1080_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1400&q=80',
    desc: 'Convention-scale exposition halls with full support infrastructure. Hotels, dining, entertainment, and transit all on-site. Adjacent to MetLife Stadium. The most complete convention package in the New York metro area.',
    highlight: 'Adjacent to MetLife Stadium — 2026 FIFA World Cup host',
    venues: ['Expo Hall', 'Multi-Level Flex Space', 'Full Complex'],
  },
]

export default function SlideEvents({ isActive, goTo, openVideo }) {
  const [active, setActive] = useState(0)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return
    if (isActive) videoRef.current.play().catch(() => {})
    else videoRef.current.pause()
  }, [isActive, active])

  const ev = EVENTS[active]

  return (
    <div className="slide" style={{ background: '#030303' }}>
      {/* Full-bleed bg */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active} style={{ position: 'absolute', inset: 0 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <video
            ref={videoRef}
            autoPlay muted loop playsInline preload="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.28) saturate(0.7)' }}
            onError={e => e.target.style.display='none'}
          >
            <source src={ev.video} type="video/mp4" />
          </video>
          <img src={ev.poster} alt={ev.type} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.28) saturate(0.7)', zIndex: -1,
          }} loading="lazy" />
        </motion.div>
      </AnimatePresence>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(3,3,3,0.96) 0%, rgba(3,3,3,0.7) 50%, rgba(3,3,3,0.4) 100%)',
      }} />

      <div className="slide-content" style={{ zIndex: 2 }}>
        {/* Tab bar — sits just below the fixed nav */}
        <div style={{
          position: 'absolute', top: 72, left: '8vw', right: '8vw',
          display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.06)',
          overflowX: 'auto', zIndex: 5,
          background: 'rgba(3,3,3,0.6)', backdropFilter: 'blur(8px)',
        }}>
          {EVENTS.map((e, i) => (
            <button key={i} className={`attr-tab ${active === i ? 'active' : ''}`} onClick={() => setActive(i)}>
              {e.icon} {e.type}
            </button>
          ))}
        </div>

        {/* Main content — padded top to clear nav + tab bar (~76 + 50 = 126px) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100%', padding: '132px 8vw 0', alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="gold-bar" style={{ marginBottom: 16 }} />
              <span className="section-label" style={{ display: 'block', marginBottom: 12 }}>Events & Platform</span>
              <h2 className="display-title" style={{ marginBottom: 8 }}>
                {ev.type}<br />
                <span className="display-italic">at American Dream</span>
              </h2>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                marginBottom: 24, marginTop: 4,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
                <span style={{ fontSize: 12, color: 'var(--gold)', letterSpacing: '0.06em' }}>Capacity: {ev.cap}</span>
              </div>
              <p className="body-text" style={{ marginBottom: 20, maxWidth: 520 }}>{ev.desc}</p>
              <div style={{
                padding: '12px 16px',
                border: '1px solid rgba(201,168,76,0.25)',
                background: 'rgba(201,168,76,0.06)',
                marginBottom: 28, fontSize: 12, color: 'var(--gold)',
                fontStyle: 'italic',
              }}>★ {ev.highlight}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
                {ev.venues.map((v,i) => (
                  <span key={i} style={{ padding: '5px 12px', border: '1px solid rgba(255,255,255,0.12)', fontSize: 11, color: 'rgba(245,245,240,0.5)', letterSpacing: '0.06em' }}>{v}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="btn-gold" onClick={() => goTo(8)}>
                  <span>Book This Event</span>
                </button>
                <button
                  className="btn-ghost"
                  onClick={() => openVideo('https://www.youtube.com/embed/yPbmFSLCqnQ?autoplay=1&rel=0', `${ev.type} at American Dream`)}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Watch Film
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: event type quick stats */}
          <div style={{ paddingLeft: '6vw' }}>
            <motion.div
              initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              {[
                { icon: '📅', label: '39-day FIFA World Cup Fan Fest', val: '2026' },
                { icon: '🌍', label: 'International visitor share', val: '28%' },
                { icon: '👥', label: 'Max event capacity', val: '10K+' },
                { icon: '📸', label: 'Social media impressions per activation', val: '50M+' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }} animate={isActive ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '18px 24px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.3s',
                  }}
                >
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <span style={{ flex: 1, fontSize: 13, color: 'rgba(245,245,240,0.5)' }}>{s.label}</span>
                  <span style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 26, color: 'var(--gold)' }}>{s.val}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
