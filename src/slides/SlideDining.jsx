import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const CONCEPTS = [
  { name: 'Fine Dining', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', desc: "White-tablecloth restaurants drawing the tri-state's most discerning diners.", tag: 'Premium' },
  { name: 'Food Hall', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', desc: '20+ artisan concepts — global street food, craft desserts, specialty coffee.', tag: 'Discovery' },
  { name: 'Fast Casual', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', desc: 'High-volume recognizable brands alongside cult-favorite independents.', tag: 'Volume' },
  { name: 'Dessert & Social', img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80', desc: 'Instagram-magnet concepts that drive social impressions and return visits.', tag: 'Viral' },
]

export default function SlideDining({ isActive, goTo }) {
  const videoRef = useRef(null)
  useEffect(() => {
    if (isActive && videoRef.current) videoRef.current.play().catch(() => {})
    else if (!isActive && videoRef.current) videoRef.current.pause()
  }, [isActive])

  return (
    <div className="slide" style={{ background: '#030303' }}>
      <video
        ref={videoRef}
        className="slide-video"
        autoPlay muted loop playsInline preload="none"
        style={{ filter: 'brightness(0.3) saturate(0.8)' }}
      >
        <source src="https://videos.pexels.com/video-files/3135670/3135670-hd_1920_1080_30fps.mp4" type="video/mp4" />
        <source src="https://videos.pexels.com/video-files/2053100/2053100-hd_1920_1080_30fps.mp4" type="video/mp4" />
      </video>
      <div className="slide-overlay" style={{ background: 'linear-gradient(to right, rgba(3,3,3,0.95) 30%, rgba(3,3,3,0.5) 100%)' }} />

      <div className="slide-content" style={{ flexDirection: 'row' }}>
        {/* Left */}
        <div style={{ width: '42%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 0 0 8vw', flexShrink: 0 }}>
          {isActive && (
            <>
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
                <div className="gold-bar" style={{ marginBottom: 20 }} />
                <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>Dining & Lifestyle</span>
                <h2 className="display-title" style={{ marginBottom: 20 }}>
                  Food as a<br />
                  <span className="display-italic">Destination</span>
                </h2>
              </motion.div>
              <motion.p
                className="body-text"
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
                style={{ marginBottom: 32 }}
              >
                100+ dining outlets. 20 full-service restaurants. 4.5-hour average dwell time. 
                Your F&B concept here isn't just a restaurant — it's the mandatory stop inside 
                a captive audience of 32 million annual visitors.
              </motion.p>

              {/* Key metrics */}
              <motion.div
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.45 }}
                style={{ display: 'flex', gap: 24, marginBottom: 40 }}
              >
                {[
                  { v: '100+', l: 'Dining Outlets' },
                  { v: '4.5h', l: 'Avg Dwell Time' },
                  { v: '$285', l: 'Avg Spend/Visit' },
                ].map((s,i) => (
                  <div key={i}>
                    <div style={{ fontFamily:'Bebas Neue,sans-serif', fontSize:34, color:'var(--gold)', lineHeight:1 }}>{s.v}</div>
                    <div style={{ fontSize:9, letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(245,245,240,0.35)', marginTop:4 }}>{s.l}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
                style={{
                  padding: '20px 24px',
                  border: '1px solid rgba(201,168,76,0.2)',
                  background: 'rgba(201,168,76,0.04)',
                  marginBottom: 32,
                }}
              >
                <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:17, fontStyle:'italic', color:'rgba(245,245,240,0.7)', lineHeight:1.7 }}>
                  "Visitors don't run to the food court. They stay for the experience — and 
                  food is what extends every visit by 90 minutes."
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.75 }}
                style={{ display:'flex', gap:12, flexWrap:'wrap' }}
              >
                <button className="btn-gold" onClick={() => goTo(7)}>
                  <span>Inquire About F&amp;B Space</span>
                </button>
              </motion.div>
            </>
          )}
        </div>

        {/* Right: 2x2 dining card grid */}
        <div style={{ flex:1, padding:'88px 6vw 60px 4vw', display:'flex', alignItems:'center' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px', width:'100%', maxWidth:560 }}>
            {CONCEPTS.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity:0, scale:0.96 }} animate={isActive ? { opacity:1, scale:1 } : {}}
                transition={{ duration:0.6, delay:0.3 + i*0.1 }}
                className="deck-card"
                style={{ position:'relative', overflow:'hidden', height:220 }}
              >
                <img
                  src={c.img} alt={c.name}
                  style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.5)', transition:'transform 0.5s' }}
                  onMouseEnter={e => e.target.style.transform='scale(1.06)'}
                  onMouseLeave={e => e.target.style.transform='scale(1)'}
                  loading="lazy"
                />
                <div style={{
                  position:'absolute', inset:0,
                  background:'linear-gradient(to top, rgba(3,3,3,0.95) 0%, transparent 55%)',
                }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'16px 18px' }}>
                  <div style={{
                    display:'inline-block', fontSize:8, fontWeight:700, letterSpacing:'0.2em',
                    textTransform:'uppercase', padding:'3px 8px',
                    background:'rgba(201,168,76,0.85)', color:'#030303', marginBottom:6,
                  }}>{c.tag}</div>
                  <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:18, fontWeight:400, marginBottom:4 }}>{c.name}</div>
                  <div style={{ fontSize:11, color:'rgba(245,245,240,0.5)', lineHeight:1.5 }}>{c.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
