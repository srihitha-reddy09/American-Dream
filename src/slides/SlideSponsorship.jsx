import { useRef } from 'react'
import { motion } from 'framer-motion'
import InnerScrollHint from '../components/InnerScrollHint'
import VideoBg from '../components/VideoBg'

const TIERS = [
  {
    name: 'Founding Partner', level: 'Platinum', price: 'Custom', color: '#C9A84C', featured: true, reach: '32M+ annual impressions',
    perks: ['Exclusive naming rights opportunity', 'Permanent branded experience zone', 'Priority placement — all digital OOH', 'Co-branding on all AD marketing', 'Annual flagship event partnership', 'Executive VIP suite access', 'Custom audience data sharing'],
  },
  {
    name: 'Premier Sponsor', level: 'Gold', price: 'From $2M/yr', color: '#E8C97A', featured: false, reach: '15M+ targeted impressions',
    perks: ['Category exclusivity on property', 'Seasonal activations (4× per year)', 'Prominent digital OOH placement', 'Social media co-creation program', 'Event sponsorship packages', 'Audience data access'],
  },
  {
    name: 'Activation Partner', level: 'Silver', price: 'From $250K', color: '#9CA3AF', featured: false, reach: '5M+ targeted impressions',
    perks: ['Pop-up activation (60–90 days)', 'High-traffic corridor placement', 'Digital screen package', 'Event co-sponsorship', 'Attraction zone integration'],
  },
]

const ZONES = [
  { name: 'Nickelodeon Universe', reach: '4M+ theme park guests', img: 'https://images.unsplash.com/photo-1567429168900-fd37ccae87fd?w=600&q=80' },
  { name: 'DreamWorks Water Park', reach: '2M+ water park visitors', img: 'https://images.unsplash.com/photo-1560851628-f10b4e7bf2cd?w=600&q=80' },
  { name: 'Grand Concourse', reach: '32M+ passers-by annually', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80' },
  { name: 'Luxury Wing', reach: '$150K+ HHI audience', img: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80' },
]

export default function SlideSponsorship({ isActive, goTo }) {
  const scrollRef = useRef(null)

  return (
    <div className="slide" style={{ background: '#050505' }}>
      <VideoBg scene="sponsorship" brightness={0.22} isActive={isActive} />
      <div style={{ position:'absolute', inset:0, zIndex:2, background:'linear-gradient(135deg, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.75) 100%)' }} />

      <div className="slide-content slide-inner-scroll" ref={scrollRef}>
        <div style={{ padding: '88px 8vw 60px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="gold-bar" style={{ margin: '0 auto 20px' }} />
            <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>Sponsorship & Partnerships</span>
            <h2 className="display-title">
              Your Brand Lives<br /><span className="display-italic">Inside the Experience</span>
            </h2>
            <p className="body-text" style={{ maxWidth: 520, margin: '16px auto 0' }}>
              Not a banner. Not a logo. An immersive presence inside six world-class attractions visited by 32 million people a year.
            </p>
          </motion.div>

          {/* Tiers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px', marginBottom: 48 }}>
            {TIERS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="deck-card"
                style={{ padding: '32px 28px', position: 'relative', borderColor: t.featured ? t.color : 'rgba(255,255,255,0.07)', background: t.featured ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.03)' }}>
                {t.featured && (
                  <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: t.color, color: '#030303', fontSize: 8, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 14px', whiteSpace: 'nowrap' }}>Most Impactful</div>
                )}
                <div style={{ marginTop: t.featured ? 10 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.color }}>{t.level}</span>
                    <span style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 18, color: t.color }}>{t.price}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.6rem', fontWeight: 300, marginBottom: 4 }}>{t.name}</h3>
                  <p style={{ fontSize: 10, color: 'rgba(245,245,240,0.35)', marginBottom: 16 }}>{t.reach}</p>
                  <div style={{ height: 1, background: `linear-gradient(90deg, ${t.color}50, transparent)`, marginBottom: 16 }} />
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 24 }}>
                    {t.perks.map((p, j) => (
                      <li key={j} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'rgba(245,245,240,0.6)', lineHeight: 1.4 }}>
                        <span style={{ color: t.color, flexShrink: 0 }}>✓</span>{p}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => goTo(8)} style={{
                    width: '100%', padding: '12px', background: t.featured ? t.color : 'transparent',
                    color: t.featured ? '#030303' : 'var(--white)', border: t.featured ? 'none' : `1px solid ${t.color}50`,
                    fontFamily: 'Inter,sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.15em',
                    textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s',
                  }}>Inquire About {t.level}</button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Activation zones */}
          <motion.div initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
            <div className="gold-bar" style={{ marginBottom: 14 }} />
            <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.3rem,2.2vw,1.8rem)', fontWeight: 300, marginBottom: 20 }}>
              Where Your Brand <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Activates</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2px' }}>
              {ZONES.map((z, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={isActive ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  style={{ position: 'relative', height: 160, overflow: 'hidden' }} className="deck-card">
                  <img src={z.img} alt={z.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)', position: 'absolute', inset: 0 }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,3,3,0.95) 0%, rgba(3,3,3,0.2) 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px' }}>
                    <div style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 3 }}>{z.reach}</div>
                    <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 15, fontWeight: 400 }}>{z.name}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <InnerScrollHint scrollRef={scrollRef} />
      </div>
    </div>
  )
}
