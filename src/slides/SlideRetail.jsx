import { useRef } from 'react'
import { motion } from 'framer-motion'
import InnerScrollHint from '../components/InnerScrollHint'
import VideoBg from '../components/VideoBg'

const TENANTS = [
  { name: 'Saks Fifth Avenue', cat: 'Luxury Anchor', size: '200,000 sq ft', img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80' },
  { name: 'Hermès', cat: 'Luxury', size: 'Flagship', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80' },
  { name: 'Gucci', cat: 'Luxury', size: 'Flagship', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80' },
  { name: 'Zara Flagship', cat: 'Fast Fashion', size: '35,000 sq ft', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80' },
  { name: 'Toys"R"Us', cat: 'Experiential Retail', size: '20,000 sq ft', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { name: 'Timberland', cat: 'Lifestyle', size: 'New Opening 2026', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' },
]

export default function SlideRetail({ isActive, goTo }) {
  const scrollRef = useRef(null)

  return (
    <div className="slide" style={{ background: '#050505' }}>
      <VideoBg scene="retail" brightness={0.28} isActive={isActive} />
      <div style={{ position:'absolute', inset:0, zIndex:2, background:'linear-gradient(to right, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.6) 60%, rgba(5,5,5,0.4) 100%)' }} />

      <div className="slide-content slide-inner-scroll" ref={scrollRef} style={{ position:'relative', zIndex:3 }}>
        <div style={{ padding: '88px 8vw 80px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw', marginBottom: 56 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
              <div className="gold-bar" style={{ marginBottom: 20 }} />
              <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>Retail Environment</span>
              <h2 className="display-title">
                Where the World's<br />Best Brands<br />
                <span className="display-italic">Come to Play</span>
              </h2>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <p className="body-text" style={{ marginBottom: 28 }}>
                400+ stores. 70/30 entertainment-to-retail split. Visitors arrive primed for discovery — not a quick errand. American Dream's retail floor is the highest-engagement shopping environment in the Northeast.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                {[
                  { v: '~1.5M sq ft', l: 'Gross Leasable Area' },
                  { v: '4.5 hrs', l: 'Average Dwell Time' },
                  { v: '$285', l: 'Avg Spend Per Visit' },
                  { v: '400+', l: 'Store Count' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: '14px 16px', border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.03)' }}>
                    <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: 'var(--gold)' }}>{s.v}</div>
                    <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.35)', marginTop: 3 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tenant grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px', marginBottom: 32 }}>
            {TENANTS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }} className="deck-card" style={{ overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                  <img src={t.img} alt={t.name} loading="lazy" style={{
                    width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65)',
                    transition: 'transform 0.5s ease', display: 'block',
                  }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(201,168,76,0.9)', color: '#030303', fontSize: 8, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 7px' }}>{t.cat}</div>
                </div>
                <div style={{ padding: '14px 18px' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 19, fontWeight: 400, marginBottom: 3 }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.35)' }}>{t.size}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Luxury callout strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.55 }}
            style={{ padding: '24px 28px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1rem,1.8vw,1.6rem)', fontWeight: 300 }}>
              Luxury tenants: <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Saks, Hermès, Gucci, Balenciaga, Ferrari, Tiffany & Co., Saint Laurent, Dolce & Gabbana</span>
            </div>
            <button className="btn-gold" onClick={() => goTo(7)}><span>View Leasing Opportunities</span></button>
          </motion.div>
        </div>
        <InnerScrollHint scrollRef={scrollRef} />
      </div>
    </div>
  )
}
