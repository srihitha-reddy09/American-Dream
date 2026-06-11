import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import InnerScrollHint from '../components/InnerScrollHint'

const TYPES = [
  { id: 'leasing', label: 'Retail Leasing', icon: '🏪' },
  { id: 'sponsorship', label: 'Sponsorship', icon: '🤝' },
  { id: 'events', label: 'Event Booking', icon: '🎤' },
  { id: 'popup', label: 'Pop-Up Space', icon: '✨' },
]

export default function SlideContact({ isActive }) {
  const videoRef = useRef(null)
  const scrollRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (isActive && videoRef.current) videoRef.current.play().catch(() => {})
    else if (!isActive && videoRef.current) videoRef.current.pause()
  }, [isActive])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.name && form.email) setSubmitted(true)
  }

  return (
    <div className="slide" style={{ background: '#030303' }}>
      <video ref={videoRef} className="slide-video" autoPlay muted loop playsInline preload="none"
        style={{ filter: 'brightness(0.2) saturate(0.6)' }}>
        <source src="https://videos.pexels.com/video-files/7578545/7578545-hd_1920_1080_30fps.mp4" type="video/mp4" />
        <source src="https://videos.pexels.com/video-files/3752716/3752716-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>
      <div className="slide-overlay" style={{ background: 'linear-gradient(135deg, rgba(3,3,3,0.97) 0%, rgba(3,3,3,0.8) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />

      <div className="slide-content slide-inner-scroll" ref={scrollRef} style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ padding: '88px 8vw 60px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ width: 1, height: 50, background: 'linear-gradient(to bottom, transparent, var(--gold))', margin: '0 auto 24px' }} />
            <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>Let's Build Something</span>
            <h2 className="display-title">
              Your Place at<br /><span className="display-italic">American Dream</span><br />Starts Here
            </h2>
            <p className="body-text" style={{ maxWidth: 440, margin: '16px auto 0' }}>
              Retail tenant. Brand sponsor. Event partner. Our commercial team responds within 24 hours.
            </p>
          </motion.div>

          {/* Two-col */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: 40 }}>
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
              style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.06)', padding: '40px 36px' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <div style={{ fontSize: 44, marginBottom: 18 }}>✓</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.8rem', fontWeight: 300, color: 'var(--gold)', marginBottom: 10 }}>{"We'll Be in Touch"}</h3>
                  <p className="body-text">Your inquiry has been received. Our commercial team will respond within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.6rem', fontWeight: 300, marginBottom: 4 }}>Start a Conversation</h3>
                  <p style={{ fontSize: 11, color: 'rgba(245,245,240,0.35)', marginBottom: 24 }}>Tell us what you are looking for.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 6, marginBottom: 24 }}>
                    {TYPES.map(t => (
                      <button key={t.id} onClick={() => setSelected(t.id)} style={{
                        padding: '10px 12px', cursor: 'pointer', textAlign: 'left',
                        background: selected === t.id ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.02)',
                        border: selected === t.id ? '1px solid rgba(201,168,76,0.5)' : '1px solid rgba(255,255,255,0.07)',
                        transition: 'all 0.25s', display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'Inter,sans-serif',
                      }}>
                        <span style={{ fontSize: 14 }}>{t.icon}</span>
                        <span style={{ fontSize: 11, fontWeight: selected === t.id ? 600 : 400, color: selected === t.id ? 'var(--gold)' : 'rgba(245,245,240,0.5)', transition: 'color 0.25s' }}>{t.label}</span>
                      </button>
                    ))}
                  </div>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { id: 'name', label: 'Your Name *', type: 'text', req: true },
                      { id: 'company', label: 'Company / Brand', type: 'text', req: false },
                      { id: 'email', label: 'Email Address *', type: 'email', req: true },
                    ].map(f => (
                      <div key={f.id}>
                        <label style={{ display: 'block', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.35)', marginBottom: 5, fontFamily: 'Inter,sans-serif' }}>{f.label}</label>
                        <input type={f.type} required={f.req} value={form[f.id]} onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))} />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: 'block', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.35)', marginBottom: 5, fontFamily: 'Inter,sans-serif' }}>Message</label>
                      <textarea rows={3} placeholder="Tell us about your vision..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} style={{ resize: 'vertical' }} />
                    </div>
                    <button type="submit" className="btn-gold" style={{ marginTop: 4, width: '100%', justifyContent: 'center' }}><span>Submit Inquiry</span></button>
                  </form>
                </>
              )}
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.06)', padding: '32px', flex: 1 }}>
                <div className="gold-bar" style={{ marginBottom: 14 }} />
                <h4 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.3rem', fontWeight: 300, marginBottom: 18 }}>Property Details</h4>
                {[
                  { l: 'Address', v: '1 American Dream Way, East Rutherford, NJ 07073' },
                  { l: 'Transit', v: 'NJ Transit from Penn Station (direct) · I-95' },
                  { l: 'Hours', v: 'Mon–Sat 10am–10pm · Sun 11am–8pm' },
                  { l: 'Commercial Office', v: 'Leasing@AmericanDream.com' },
                  { l: 'Response Time', v: 'Within 24 hours guaranteed' },
                ].map((item, i) => (
                  <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 3 }}>{item.l}</div>
                    <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.6)', lineHeight: 1.5 }}>{item.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
                {[
                  { label: 'Schedule Tour', icon: '🏛️', desc: 'Private walkthrough' },
                  { label: 'Download Kit', icon: '📁', desc: 'Media kit & floor plans' },
                  { label: 'View Availabilities', icon: '📐', desc: 'Current floor plan' },
                  { label: 'Call Us', icon: '📞', desc: '+1 (201) 555-0100' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '16px 18px', background: '#080808', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', transition: 'all 0.25s', display: 'flex', flexDirection: 'column', gap: 3 }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.background = 'rgba(201,168,76,0.04)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = '#080808' }}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 600 }}>{item.label}</span>
                    <span style={{ fontSize: 10, color: 'rgba(245,245,240,0.3)' }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
            <div>
              <span style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 16, letterSpacing: '0.15em', color: 'var(--white)', marginRight: 6 }}>AMERICAN</span>
              <span style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 16, letterSpacing: '0.15em', color: 'var(--gold)' }}>DREAM</span>
              <div style={{ fontSize: 9, color: 'rgba(245,245,240,0.2)', letterSpacing: '0.06em', marginTop: 2 }}>East Rutherford, NJ · A Triple Five Property</div>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(245,245,240,0.18)', textAlign: 'right', lineHeight: 1.7 }}>
              © 2026 American Dream. Commercial Use Only.
            </div>
          </motion.div>
        </div>
        <InnerScrollHint scrollRef={scrollRef} />
      </div>
    </div>
  )
}
