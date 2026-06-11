import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

function useInView(r, threshold = 0.1) {
  const [v, s] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) s(true) }, { threshold })
    if (r.current) o.observe(r.current)
    return () => o.disconnect()
  }, [r, threshold])
  return v
}

const CONCEPTS = [
  {
    name: 'Fine Dining', tag: 'Premium',
    desc: "White-tablecloth experiences drawing the tri-state's most discerning diners.",
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    color: '#C9A84C',
    stat: '20 full-service restaurants',
  },
  {
    name: 'Food Hall', tag: 'Discovery',
    desc: '20+ artisan concepts — global street food, craft desserts, specialty coffee.',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    color: '#F97316',
    stat: '20+ artisan stands',
  },
  {
    name: 'Fast Casual', tag: 'Volume',
    desc: 'Recognizable brands alongside cult-favorite independents.',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    color: '#60A5FA',
    stat: '60+ quick-service options',
  },
  {
    name: 'Dessert & Social', tag: 'Viral',
    desc: 'Instagram-magnet concepts that drive social impressions and repeat visits.',
    img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
    color: '#F472B6',
    stat: '50M+ social impressions',
  },
]

export default function DiningSection({ goTo }) {
  const ref = useRef(null)
  const sectionRef = useRef(null)
  const inView = useInView(ref)
  const [activeCard, setActiveCard] = useState(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  return (
    <section id="dining" ref={sectionRef} style={{ background: '#030303', borderTop: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden' }}>
      <div className="section-inner" ref={ref}>

        {/* ── Cinematic split header ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6vw', alignItems: 'center', marginBottom: 72 }} className="two-col">

          {/* Left: parallax hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: 'relative', height: 'clamp(320px,45vw,520px)', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.15)' }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80"
              alt="American Dream Dining"
              style={{ width: '100%', height: '130%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
              style2={{ y: heroImgY }}
              loading="lazy"
            />
            <motion.img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80"
              alt="American Dream Dining"
              style={{ width: '100%', height: '130%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, filter: 'brightness(0.55)' }}
              loading="lazy"
            />
            {/* Overlay gradient */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(3,3,3,0.8) 100%)' }} />

            {/* Floating stat badges */}
            {[
              { v: '100+', l: 'Dining Outlets', pos: { top: 24, left: 24 }, delay: 0.6 },
              { v: '4.5h', l: 'Avg Dwell', pos: { bottom: 80, right: 24 }, delay: 0.75 },
              { v: '$285', l: 'Avg Spend', pos: { bottom: 24, left: 24 }, delay: 0.9 },
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 12 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: badge.delay }}
                style={{
                  position: 'absolute', ...badge.pos,
                  padding: '10px 16px',
                  background: 'rgba(3,3,3,0.82)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(201,168,76,0.35)',
                  zIndex: 2,
                }}
              >
                <div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 28, color: 'var(--gold)', lineHeight: 1 }}>{badge.v}</div>
                <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.45)', marginTop: 3 }}>{badge.l}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: text + CTA */}
          <motion.div style={{ y: textY }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="gold-bar" style={{ marginBottom: 18 }} />
              <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>Dining & Lifestyle</span>
              <h2 className="display-xl" style={{ marginBottom: 20 }}>
                Food as a<br /><em>Destination</em>
              </h2>
              <p className="body-lg" style={{ marginBottom: 28 }}>
                100+ dining outlets. 20 full-service restaurants. 4.5-hour average dwell time.
                Your F&B concept here is not just a restaurant — it is the mandatory stop inside
                a captive audience of 32 million annual visitors.
              </p>

              {/* Animated quote */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
                style={{
                  padding: '20px 24px', marginBottom: 28,
                  borderLeft: '3px solid var(--gold)',
                  background: 'rgba(201,168,76,0.04)',
                }}
              >
                <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1rem,1.8vw,1.4rem)', fontStyle: 'italic', color: 'rgba(245,245,240,0.75)', lineHeight: 1.7 }}>
                  "Visitors don't run to the food court. They stay for the experience — food extends every visit by 90 minutes."
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.65 }}
              >
                <button className="btn-gold" onClick={() => goTo('leasing')}><span>Inquire About F&amp;B Space</span></button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Interactive concept cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginBottom: 8 }}
        >
          <div className="gold-bar" style={{ marginBottom: 14 }} />
          <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.3rem,2vw,1.8rem)', fontWeight: 300, marginBottom: 24 }}>
            Every F&B Format, <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>All Under One Roof</span>
          </h3>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 3 }} className="four-col">
          {CONCEPTS.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.35 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ position: 'relative', height: 280, overflow: 'hidden', cursor: 'default', border: '1px solid rgba(255,255,255,0.06)' }}
              onHoverStart={() => setActiveCard(i)}
              onHoverEnd={() => setActiveCard(null)}
            >
              {/* BG image zoom on hover */}
              <motion.img
                src={c.img} alt={c.name} loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                animate={{ scale: activeCard === i ? 1.1 : 1, filter: activeCard === i ? 'brightness(0.7) saturate(1.1)' : 'brightness(0.45) saturate(0.85)' }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />

              {/* Colored overlay on hover */}
              <motion.div
                style={{ position: 'absolute', inset: 0 }}
                animate={{ background: activeCard === i ? `linear-gradient(180deg, ${c.color}22 0%, rgba(3,3,3,0.85) 100%)` : 'linear-gradient(180deg, transparent 30%, rgba(3,3,3,0.92) 100%)' }}
                transition={{ duration: 0.4 }}
              />

              {/* Tag */}
              <motion.div
                style={{
                  position: 'absolute', top: 12, left: 12,
                  fontSize: 8, fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', padding: '4px 10px',
                }}
                animate={{ background: activeCard === i ? c.color : 'rgba(201,168,76,0.85)', color: '#030303' }}
              >{c.tag}</motion.div>

              {/* Content — slides up on hover */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 18px 18px' }}>
                <motion.div
                  animate={{ y: activeCard === i ? 0 : 8, opacity: activeCard === i ? 1 : 0.7 }}
                  transition={{ duration: 0.35 }}
                >
                  <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 22, fontWeight: 400, marginBottom: 6, color: '#F5F5F0' }}>{c.name}</div>
                  <motion.div
                    animate={{ height: activeCard === i ? 'auto' : 0, opacity: activeCard === i ? 1 : 0 }}
                    transition={{ duration: 0.35 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ fontSize: 12, color: 'rgba(245,245,240,0.6)', lineHeight: 1.6, marginBottom: 8 }}>{c.desc}</p>
                    <span style={{ fontSize: 10, letterSpacing: '0.1em', color: c.color }}>{c.stat}</span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Bottom accent line on hover */}
              <motion.div
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3 }}
                animate={{ background: activeCard === i ? c.color : 'transparent' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Wide cinematic quote strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ position: 'relative', overflow: 'hidden', marginTop: 3, border: '1px solid rgba(201,168,76,0.15)' }}
        >
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=70"
            alt="Fine dining"
            style={{ width: '100%', height: 180, objectFit: 'cover', objectPosition: 'center 40%', filter: 'brightness(0.28) saturate(0.7)', display: 'block' }}
            loading="lazy"
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(3,3,3,0.95) 0%, rgba(3,3,3,0.5) 60%, rgba(3,3,3,0.8) 100%)',
            display: 'flex', alignItems: 'center',
            padding: '0 56px',
            gap: 80,
          }}>
            <div style={{ flex: '0 0 auto' }}>
              <div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 'clamp(2rem,4vw,3.5rem)', color: 'var(--gold)', lineHeight: 1 }}>4.5</div>
              <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.4)' }}>Hours avg dwell</div>
            </div>
            <div style={{ width: 1, height: 60, background: 'rgba(201,168,76,0.3)', flexShrink: 0 }} />
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.1rem,2vw,1.7rem)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(245,245,240,0.75)', lineHeight: 1.6 }}>
              "Every visitor commits their day here. F&B is the glue that turns entertainment into an all-day spend."
            </p>
            <button className="btn-ghost" onClick={() => goTo('leasing')} style={{ flexShrink: 0 }}>
              Inquire About F&amp;B
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
