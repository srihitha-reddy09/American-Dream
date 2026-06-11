import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import useInView from '../hooks/useInView'
const TENANTS = [
  {
    name: 'Saks Fifth Avenue', cat: 'Luxury Anchor', size: '200,000 sq ft',
    img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
  },
  {
    name: 'Hermès', cat: 'Luxury', size: 'Flagship',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
  },
  {
    name: 'Gucci', cat: 'Luxury', size: 'Flagship',
    img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
  },
  {
    name: 'Zara', cat: 'Fashion', size: '35,000 sq ft',
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
  },
  {
    name: 'Toys"R"Us', cat: 'Experiential', size: '20,000 sq ft',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    name: 'Timberland', cat: 'Lifestyle — New 2026', size: 'New Opening',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  },
]

const STATS = [
  { v: '~1.5M', l: 'Sq Ft GLA' },
  { v: '4.5h',  l: 'Avg Dwell' },
  { v: '$285',  l: 'Avg Spend' },
  { v: '400+',  l: 'Stores' },
]

// Parallax wrapper using scroll
function ParallaxCard({ children, delay = 0, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function RetailSection({ goTo }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const [hovered, setHovered] = useState(null)
  const sectionRef = useRef(null)

  // Parallax on the luxury strip bg
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section id="retail" ref={sectionRef} style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden' }}>
      <div className="section-inner" ref={ref}>

        {/* ── Animated header ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw', alignItems: 'end', marginBottom: 64 }} className="two-col">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="gold-bar" style={{ marginBottom: 18 }} />
            <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>Retail Environment</span>
            <h2 className="display-xl">
              Where the World's<br />Best Brands<br /><em>Come to Play</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="body-lg" style={{ marginBottom: 28 }}>
              400+ stores. A 70/30 entertainment-to-retail split that means every visitor arrives primed to discover.
              The highest-engagement retail floor in the Northeast.
            </p>
            {/* Animated stat pills */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  style={{
                    padding: '14px 10px', textAlign: 'center',
                    border: '1px solid rgba(201,168,76,0.18)',
                    background: 'rgba(201,168,76,0.04)',
                    transition: 'all 0.35s',
                    cursor: 'default',
                  }}
                  whileHover={{ borderColor: 'rgba(201,168,76,0.55)', background: 'rgba(201,168,76,0.1)', y: -4 }}
                >
                  <div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 'clamp(1.2rem,2vw,1.8rem)', color: 'var(--gold)', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.38)', marginTop: 4 }}>{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Staggered tenant grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3, marginBottom: 48 }} className="three-col">
          {TENANTS.map((t, i) => (
            <ParallaxCard key={i} delay={0.1 + i * 0.09} inView={inView}>
              <motion.div
                style={{ overflow: 'hidden', position: 'relative', cursor: 'default', border: '1px solid rgba(255,255,255,0.06)' }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
              >
                {/* Image with zoom on hover */}
                <div style={{ height: 190, overflow: 'hidden', position: 'relative' }}>
                  <motion.img
                    src={t.img} alt={t.name} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    animate={{ scale: hovered === i ? 1.09 : 1, filter: hovered === i ? 'brightness(0.85)' : 'brightness(0.6)' }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.92) 0%, transparent 55%)' }} />

                  {/* Category badge */}
                  <motion.div
                    style={{
                      position: 'absolute', top: 10, right: 10,
                      background: 'rgba(201,168,76,0.9)', color: '#030303',
                      fontSize: 8, fontWeight: 700, letterSpacing: '0.15em',
                      textTransform: 'uppercase', padding: '3px 8px',
                    }}
                    animate={{ opacity: hovered === i ? 1 : 0.75 }}
                  >{t.cat}</motion.div>
                </div>

                {/* Card content */}
                <motion.div
                  style={{ padding: '16px 20px', background: '#080808' }}
                  animate={{ background: hovered === i ? 'rgba(201,168,76,0.06)' : '#080808' }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 20, fontWeight: 400 }}>{t.name}</div>
                    {/* Animated arrow on hover */}
                    <motion.div
                      animate={{ x: hovered === i ? 0 : -6, opacity: hovered === i ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </motion.div>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.35)', marginTop: 3 }}>{t.size}</div>
                </motion.div>
              </motion.div>
            </ParallaxCard>
          ))}
        </div>

        {/* ── Luxury strip with parallax bg ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.25)' }}
        >
          {/* Parallax background — Real American Dream interior (Wikimedia CC-BY-SA 4.0) */}
          <motion.div style={{ y: bgY, position: 'absolute', inset: '-20%', zIndex: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=70"
              alt="American Dream Mall interior"
              style={{ width: '100%', height: '140%', objectFit: 'cover', filter: 'brightness(0.18) saturate(0.6)' }}
              loading="lazy"
            />
          </motion.div>

          <div style={{
            position: 'relative', zIndex: 1,
            padding: '36px 40px',
            background: 'linear-gradient(90deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.04) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20,
          }}>
            <div>
              {/* Scrolling luxury brand marquee */}
              <div style={{ overflow: 'hidden', marginBottom: 10 }}>
                <motion.div
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
                  style={{ display: 'flex', gap: 32, whiteSpace: 'nowrap' }}
                >
                  {['Saks Fifth Avenue', 'Hermès', 'Gucci', 'Balenciaga', 'Ferrari', 'Tiffany & Co.', 'Saint Laurent', 'Dolce & Gabbana',
                    'Saks Fifth Avenue', 'Hermès', 'Gucci', 'Balenciaga', 'Ferrari', 'Tiffany & Co.', 'Saint Laurent', 'Dolce & Gabbana'].map((b, i) => (
                    <span key={i} style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(0.9rem,1.6vw,1.4rem)', fontStyle: 'italic', color: i % 2 === 0 ? 'rgba(245,245,240,0.6)' : 'var(--gold)' }}>
                      {b} <span style={{ color: 'rgba(201,168,76,0.3)', margin: '0 8px' }}>·</span>
                    </span>
                  ))}
                </motion.div>
              </div>
              <p style={{ fontSize: 12, color: 'rgba(245,245,240,0.4)', letterSpacing: '0.06em' }}>
                The luxury wing — one of the most concentrated collections of flagship brands on the East Coast
              </p>
            </div>
            <button className="btn-gold" onClick={() => goTo('leasing')}><span>View Leasing Opportunities</span></button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
