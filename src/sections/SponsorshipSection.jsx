import { useRef } from 'react'
import useInView from '../hooks/useInView'

const TIERS = [
  {
    name: 'Founding Partner', level: 'Platinum', price: 'Custom',
    color: '#C9A84C', featured: true, reach: '32M+ annual impressions',
    perks: [
      'Exclusive naming rights opportunity',
      'Permanent branded experience zone',
      'Priority placement — all digital OOH',
      'Co-branding on all AD marketing',
      'Annual flagship event partnership',
      'Executive VIP suite access',
      'Custom audience data sharing',
      'First right of renewal',
    ],
  },
  {
    name: 'Premier Sponsor', level: 'Gold', price: 'From $2M/yr',
    color: '#E8C97A', featured: false, reach: '15M+ targeted impressions',
    perks: [
      'Category exclusivity on property',
      'Seasonal activations (4× per year)',
      'Prominent digital OOH placement',
      'Social media co-creation program',
      'Event sponsorship packages',
      'Audience targeting & data access',
    ],
  },
  {
    name: 'Activation Partner', level: 'Silver', price: 'From $250K',
    color: '#9CA3AF', featured: false, reach: '5M+ targeted impressions',
    perks: [
      'Pop-up activation (60–90 days)',
      'High-traffic corridor placement',
      'Digital screen package',
      'Event co-sponsorship',
      'Attraction zone integration',
    ],
  },
]

export default function SponsorshipSection({ goTo }) {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <section id="sponsorship" style={{ background: '#030303', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="section-inner" ref={ref}>

        {/* Header */}
        <div className={`fade-up ${inView ? 'in' : ''}`} style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="gold-bar" style={{ margin: '0 auto 18px' }} />
          <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>Sponsorship & Partnerships</span>
          <h2 className="display-xl">Your Brand Lives<br /><em>Inside the Experience</em></h2>
          <p className="body-lg" style={{ maxWidth: 540, margin: '16px auto 0' }}>
            Not a banner. Not a logo. An immersive presence inside six world-class attractions
            visited by 32 million people a year.
          </p>
        </div>

        {/* Tier cards — bigger, more spacious */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3 }} className="three-col">
          {TIERS.map((t, i) => (
            <div
              key={i}
              className={`fade-up fade-up-d${i + 1} ${inView ? 'in' : ''}`}
              style={{
                position: 'relative',
                padding: t.featured ? '52px 40px 44px' : '44px 36px',
                border: `1px solid ${t.featured ? t.color : 'rgba(255,255,255,0.08)'}`,
                background: t.featured
                  ? `linear-gradient(160deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.04) 100%)`
                  : 'rgba(255,255,255,0.02)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 20px 60px ${t.color}20` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {/* "Most Impactful" badge */}
              {t.featured && (
                <div style={{
                  position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
                  background: t.color, color: '#030303',
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                  padding: '5px 20px', whiteSpace: 'nowrap',
                }}>Most Impactful</div>
              )}

              {/* Level badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  border: `1px solid ${t.color}`,
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: t.color,
                }}>
                  {t.level}
                </div>
                <div style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                  color: t.color, letterSpacing: '0.05em',
                }}>
                  {t.price}
                </div>
              </div>

              {/* Name */}
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                marginBottom: 8,
                color: '#F5F5F0',
              }}>
                {t.name}
              </h3>

              {/* Reach */}
              <p style={{
                fontSize: 12, color: 'rgba(245,245,240,0.4)',
                marginBottom: 24, letterSpacing: '0.06em',
              }}>
                {t.reach}
              </p>

              {/* Divider */}
              <div style={{
                height: 1,
                background: `linear-gradient(90deg, ${t.color}60, transparent)`,
                marginBottom: 24,
              }} />

              {/* Perks */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {t.perks.map((p, j) => (
                  <li key={j} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'rgba(245,245,240,0.65)', lineHeight: 1.5 }}>
                    <span style={{ color: t.color, flexShrink: 0, marginTop: 1 }}>✓</span>
                    {p}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => goTo('contact')}
                style={{
                  width: '100%',
                  padding: '15px',
                  background: t.featured ? t.color : 'transparent',
                  color: t.featured ? '#030303' : t.color,
                  border: `1px solid ${t.featured ? t.color : t.color + '60'}`,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = t.color
                  e.currentTarget.style.color = '#030303'
                  e.currentTarget.style.borderColor = t.color
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = t.featured ? t.color : 'transparent'
                  e.currentTarget.style.color = t.featured ? '#030303' : t.color
                  e.currentTarget.style.borderColor = t.featured ? t.color : t.color + '60'
                }}
              >
                Inquire About {t.level}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className={`fade-up fade-up-d3 ${inView ? 'in' : ''}`} style={{
          marginTop: 40,
          padding: '32px 40px',
          border: '1px solid rgba(201,168,76,0.2)',
          background: 'rgba(201,168,76,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 20,
        }}>
          <div>
            <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.1rem,1.8vw,1.6rem)', fontWeight: 300, marginBottom: 4 }}>
              Ready to activate your brand inside the most visited destination in the Northeast?
            </h3>
            <p style={{ fontSize: 12, color: 'rgba(245,245,240,0.4)' }}>
              Custom packages available for all budget levels — let's find what works for you.
            </p>
          </div>
          <button className="btn-gold" onClick={() => goTo('contact')}>
            <span>Start the Conversation</span>
          </button>
        </div>
      </div>
    </section>
  )
}
