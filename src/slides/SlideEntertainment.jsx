import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ATTRACTIONS = [
  {
    id: 'theme',
    name: 'Nickelodeon Universe',
    tag: 'Largest Indoor Theme Park in North America',
    stats: ['35+ rides & attractions', '8+ acres indoors', 'Year-round'],
    desc: 'The largest indoor theme park in North America. 35+ rides from the world-famous Shellraiser roller coaster to SpongeBob-themed experiences. The anchor draw that brings families, teens, and experience-seekers from across the tri-state area — and keeps them on property for hours.',
    color: '#FF6B35',
    video: 'https://videos.pexels.com/video-files/1409899/1409899-hd_1920_1080_24fps.mp4',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    cta: 'Book Group Events',
  },
  {
    id: 'water',
    name: 'DreamWorks Water Park',
    tag: 'Largest Indoor Water Park in North America',
    stats: ['40+ water attractions', '1.5-acre wave pool', '78°F year-round'],
    desc: 'The largest indoor water park in the country — heated to 78°F 365 days a year. A 1.5-acre wave pool, 40+ slides, a lazy river, and DreamWorks character experiences. A beach vacation inside a mall, an hour from Manhattan.',
    color: '#00B4D8',
    video: 'https://videos.pexels.com/video-files/8964577/8964577-hd_1920_1080_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1515404929826-76fff9fef6fe?w=1200&q=80',
    cta: 'Partner with Water Park',
  },
  {
    id: 'ski',
    name: 'Big SNOW',
    tag: 'Only Year-Round Real-Snow Ski Resort in North America',
    stats: ['Real snow, always', '365 days / year', 'Climate controlled'],
    desc: 'The only indoor, real-snow ski and snowboard resort in North America — open 365 days a year regardless of weather. A July ski session minutes from NYC. The most unique brand activation surface on the continent.',
    color: '#CAF0F8',
    video: 'https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1200&q=80',
    cta: 'Activate with Big SNOW',
  },
  {
    id: 'rink',
    name: 'The Rink',
    tag: 'NHL-Size Ice Rink & Event Venue',
    stats: ['NHL regulation', 'Public + private events', 'Corporate bookings'],
    desc: 'An NHL-regulation ice rink at the heart of the complex. Host to professional skating showcases, corporate buyouts, the USA National Curling Championships, and premium brand experiences. The only full-size rink inside a shopping complex in the US.',
    color: '#E0E7FF',
    video: 'https://videos.pexels.com/video-files/3623893/3623893-hd_1920_1080_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80',
    cta: 'Book the Ice',
  },
  {
    id: 'wheel',
    name: 'Observation Wheel',
    tag: 'Iconic Landmark — Visible from Manhattan',
    stats: ['300+ ft elevation', 'NYC skyline views', 'Naming rights available'],
    desc: 'A towering observation Ferris wheel at the entrance of American Dream — visible from the Manhattan skyline. One of the most photographed structures in New Jersey, and the most valuable naming rights opportunity in northeastern retail real estate.',
    color: '#C9A84C',
    video: 'https://videos.pexels.com/video-files/2053100/2053100-hd_1920_1080_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1558618047-f4e60c7f77bb?w=1200&q=80',
    cta: 'Sponsor the Wheel',
  },
]

export default function SlideEntertainment({ isActive, goTo, openVideo }) {
  const [active, setActive] = useState(0)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return
    if (isActive) videoRef.current.play().catch(() => {})
    else videoRef.current.pause()
  }, [isActive, active])

  const attr = ATTRACTIONS[active]

  return (
    <div className="slide" style={{ background: '#030303', display: 'grid', gridTemplateColumns: '340px 1fr' }}>
      {/* ── Left selector panel ── */}
      <div style={{
        background: '#080808',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', flexDirection: 'column',
        paddingTop: 100, overflow: 'hidden',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{ padding: '0 32px 24px' }}>
          <div className="gold-bar" style={{ marginBottom: 16 }} />
          <span className="section-label">Entertainment</span>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.4rem, 2vw, 2rem)', fontWeight: 300,
            marginTop: 12, lineHeight: 1.2, color: 'var(--white)',
          }}>
            Six world-class<br />
            <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>attractions. One roof.</span>
          </h2>
          <p style={{ fontSize: 12, color: 'rgba(245,245,240,0.35)', marginTop: 10, lineHeight: 1.7 }}>
            No other property on Earth offers this combination.
          </p>
        </div>

        <div style={{ flex: 1, overflow: 'auto' }}>
          {ATTRACTIONS.map((a, i) => (
            <button
              key={a.id}
              onClick={() => setActive(i)}
              style={{
                width: '100%', padding: '18px 32px',
                background: active === i ? `rgba(${hexToRgb(a.color)}, 0.07)` : 'transparent',
                borderLeft: active === i ? `3px solid ${a.color}` : '3px solid transparent',
                borderTop: 'none', borderRight: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)',
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.25s',
                display: 'flex', alignItems: 'flex-start', gap: 12,
              }}
            >
              <div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: active === i ? 600 : 400,
                  color: active === i ? 'var(--white)' : 'rgba(245,245,240,0.45)',
                  transition: 'color 0.25s', marginBottom: 3,
                }}>{a.name}</div>
                <div style={{
                  fontSize: 10, color: active === i ? a.color : 'rgba(245,245,240,0.2)',
                  transition: 'color 0.25s', letterSpacing: '0.06em',
                }}>{a.stats[0]}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ padding: 24, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button className="btn-gold" style={{ width: '100%', justifyContent: 'center' }} onClick={() => goTo(8)}>
            <span>Book an Experience</span>
          </button>
        </div>
      </div>

      {/* ── Right detail panel ── */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {/* BG Video */}
            <video
              ref={videoRef}
              autoPlay muted loop playsInline preload="none"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', objectFit: 'cover',
                filter: 'brightness(0.35) saturate(0.8)',
              }}
              onError={e => {
                // Hide video on error, show poster
                e.target.style.display = 'none'
              }}
            >
              <source src={attr.video} type="video/mp4" />
            </video>
            {/* Poster fallback */}
            <img
              src={attr.poster}
              alt={attr.name}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', objectFit: 'cover',
                filter: 'brightness(0.35) saturate(0.8)',
                zIndex: -1,
              }}
            />
            {/* Color accent overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse 60% 60% at 70% 50%, ${attr.color}18 0%, transparent 70%)`,
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(3,3,3,0.85) 0%, rgba(3,3,3,0.3) 60%, rgba(3,3,3,0.6) 100%)',
            }} />

            {/* Content */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: '48px 60px',
            }}>
              {/* Play button */}
              <div style={{ position: 'absolute', top: '50%', right: 60, transform: 'translateY(-50%)' }}>
                <button
                  className="play-btn"
                  onClick={() => openVideo(
                    'https://www.youtube.com/embed/yPbmFSLCqnQ?autoplay=1&rel=0&start=' + (active * 15),
                    attr.name
                  )}
                  aria-label={`Watch ${attr.name}`}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </button>
              </div>

              <div style={{ width: 40, height: 2, background: attr.color, marginBottom: 16 }} />
              <div style={{
                fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: attr.color, marginBottom: 12, fontWeight: 600,
              }}>{attr.tag}</div>
              <h2 style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                letterSpacing: '0.05em', color: 'var(--white)',
                lineHeight: 0.9, marginBottom: 16,
              }}>{attr.name.toUpperCase()}</h2>
              <p className="body-text" style={{ maxWidth: 560, marginBottom: 28 }}>{attr.desc}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
                {attr.stats.map((s, i) => (
                  <span key={i} style={{
                    padding: '5px 14px',
                    border: `1px solid ${attr.color}50`,
                    fontSize: 11, color: 'rgba(245,245,240,0.6)',
                    letterSpacing: '0.06em',
                  }}>{s}</span>
                ))}
              </div>
              <button
                className="btn-gold"
                style={{ alignSelf: 'flex-start', background: attr.color }}
                onClick={() => goTo(8)}
              >
                <span style={{ color: '#030303' }}>{attr.cta}</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)
  return `${r},${g},${b}`
}
