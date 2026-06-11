import { useRef, useState } from 'react'
import useInView from '../hooks/useInView'

const TYPES = [
  { id: 'leasing',  label: 'Retail Leasing', icon: '🏪' },
  { id: 'sponsor',  label: 'Sponsorship',    icon: '🤝' },
  { id: 'events',   label: 'Event Booking',  icon: '🎤' },
  { id: 'popup',    label: 'Pop-Up Space',   icon: '✨' },
]

const DETAILS = [
  { l: 'Address',       v: '1 American Dream Way, East Rutherford, NJ 07073' },
  { l: 'Transit',       v: 'NJ Transit from Penn Station (direct) · I-95 Interchange' },
  { l: 'Hours',         v: 'Mon–Sat 10am–10pm · Sun 11am–8pm' },
  { l: 'Commercial',    v: 'Leasing@AmericanDream.com' },
  { l: 'Response Time', v: 'Within 24 hours guaranteed' },
]

const ACTIONS = [
  {
    label: 'Schedule Tour',
    icon: '🏛️',
    desc: 'Private walkthrough',
    // action assigned inside component (uses scheduleTour)
    key: 'tour',
  },
  {
    label: 'Download Media Kit',
    icon: '📁',
    desc: 'Press kit & floor plans',
    key: 'kit',
  },
  {
    label: 'View Floor Plan',
    icon: '📐',
    desc: 'Interactive property map',
    key: 'map',
  },
  {
    label: 'Call Us Now',
    icon: '📞',
    desc: '+1 (833) 263-7326',
    key: 'call',
  },
]

function validate(form) {
  const errors = {}
  if (!form.name.trim())
    errors.name = 'Please enter your name'
  if (!form.email.trim())
    errors.email = 'Please enter your email'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = 'Please enter a valid email address'
  return errors
}

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref)
  const [selected, setSelected]   = useState(null)
  const [form, setForm]           = useState({ name: '', company: '', email: '', message: '' })
  const [errors, setErrors]       = useState({})
  const [touched, setTouched]     = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)

  // Schedule Tour: pre-select leasing type and focus form
  const scheduleTour = () => {
    setSelected('leasing')
    setForm(p => ({ ...p, message: p.message || 'I would like to schedule a private property tour.' }))
    setTimeout(() => {
      document.querySelector('#contact input')?.focus()
    }, 100)
  }

  const handleBlur = (field) => {
    setTouched(p => ({ ...p, [field]: true }))
    setErrors(validate({ ...form }))
  }

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value }
    setForm(updated)
    if (touched[field]) setErrors(validate(updated))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitAttempted(true)
    setTouched({ name: true, email: true })
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length === 0) setSubmitted(true)
  }

  const showError = (field) => (errors[field] && (touched[field] || submitAttempted))
  const showSuccess = (field) => (!errors[field] && touched[field] && form[field])

  const inputBorderColor = (field) => {
    if (showError(field))   return 'rgba(239,68,68,0.6)'
    if (showSuccess(field)) return 'rgba(52,211,153,0.5)'
    return 'rgba(255,255,255,0.1)'
  }

  return (
    <section id="contact" style={{ background: '#030303', borderTop: '1px solid rgba(201,168,76,0.2)' }}>
      <div className="section-inner" ref={ref}>

        {/* ── Header ── */}
        <div className={`fade-up ${inView ? 'in' : ''}`} style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ width: 1, height: 64, background: 'linear-gradient(to bottom, transparent, var(--gold))', margin: '0 auto 28px' }} />
          <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>Let's Build Something</span>
          <h2 className="display-xl">
            Your Place at<br /><em>American Dream</em><br />Starts Here
          </h2>
          <p className="body-lg" style={{ maxWidth: 480, margin: '20px auto 0', fontSize: 16 }}>
            Retail tenant. Brand sponsor. Event partner.<br />
            Our commercial team responds within 24 hours.
          </p>
        </div>

        {/* ── Two-col ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, marginBottom: 56 }} className="two-col">

          {/* ── LEFT: Form ── */}
          <div className={`fade-up fade-up-d1 ${inView ? 'in' : ''}`}
            style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.08)', padding: '52px 48px' }}>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>✓</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '2.4rem', fontWeight: 300, color: 'var(--gold)', marginBottom: 14 }}>
                  {"We'll Be in Touch"}
                </h3>
                <p style={{ fontSize: 15, color: 'rgba(245,245,240,0.6)', lineHeight: 1.8 }}>
                  Your inquiry has been received.<br />
                  Our commercial team responds within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.8rem,2.5vw,2.6rem)', fontWeight: 300, marginBottom: 6 }}>
                  Start a Conversation
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(245,245,240,0.4)', marginBottom: 32, lineHeight: 1.6 }}>
                  Tell us what you are looking for and we will tailor a proposal.
                </p>

                {/* Inquiry type selector */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 32 }}>
                  {TYPES.map(t => (
                    <button key={t.id} onClick={() => setSelected(t.id)} style={{
                      padding: '14px 16px', cursor: 'pointer', textAlign: 'left',
                      background: selected === t.id ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.02)',
                      border: selected === t.id ? '1px solid rgba(201,168,76,0.55)' : '1px solid rgba(255,255,255,0.08)',
                      transition: 'all 0.25s', display: 'flex', alignItems: 'center', gap: 10,
                      fontFamily: 'Inter,sans-serif',
                    }}>
                      <span style={{ fontSize: 18 }}>{t.icon}</span>
                      <span style={{ fontSize: 12, fontWeight: selected === t.id ? 600 : 400, color: selected === t.id ? 'var(--gold)' : 'rgba(245,245,240,0.55)', letterSpacing: '0.04em', transition: 'color 0.25s' }}>
                        {t.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Form — noValidate removes all browser popups */}
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                  {[
                    { id: 'name',    label: 'Your Name',       type: 'text',  placeholder: 'Jane Smith',        required: true },
                    { id: 'company', label: 'Company / Brand', type: 'text',  placeholder: 'Acme Brands Inc.',  required: false },
                    { id: 'email',   label: 'Email Address',   type: 'email', placeholder: 'jane@company.com',  required: true },
                  ].map(f => (
                    <div key={f.id}>
                      {/* Label row — error or success inline */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                        <label style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.4)', fontFamily: 'Inter,sans-serif' }}>
                          {f.label}
                          {f.required && <span style={{ color: 'var(--gold)', marginLeft: 3 }}>*</span>}
                        </label>
                        {/* Error message */}
                        {showError(f.id) && (
                          <span style={{ fontSize: 11, color: '#F87171', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                            </svg>
                            {errors[f.id]}
                          </span>
                        )}
                        {/* Success message */}
                        {showSuccess(f.id) && (
                          <span style={{ fontSize: 11, color: '#34D399', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                            </svg>
                            Looks good
                          </span>
                        )}
                      </div>

                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.id]}
                        onChange={e => handleChange(f.id, e.target.value)}
                        onBlur={() => handleBlur(f.id)}
                        style={{
                          fontSize: 15,
                          padding: '14px 16px',
                          borderColor: inputBorderColor(f.id),
                          transition: 'border-color 0.3s',
                        }}
                      />
                    </div>
                  ))}

                  {/* Message field */}
                  <div>
                    <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.4)', marginBottom: 7, fontFamily: 'Inter,sans-serif' }}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your vision, timeline, and goals..."
                      value={form.message}
                      onChange={e => handleChange('message', e.target.value)}
                      style={{ resize: 'vertical', fontSize: 15, padding: '14px 16px' }}
                    />
                  </div>

                  {/* Submit */}
                  <button type="submit" className="btn-gold"
                    style={{ marginTop: 4, width: '100%', justifyContent: 'center', padding: '18px 40px', fontSize: 12 }}>
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              </>
            )}
          </div>

          {/* ── RIGHT: Property details + actions ── */}
          <div className={`fade-up fade-up-d2 ${inView ? 'in' : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.08)', padding: '44px 44px', flex: 1 }}>
              <div className="gold-bar" style={{ marginBottom: 18 }} />
              <h4 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.6rem,2.2vw,2rem)', fontWeight: 300, marginBottom: 28, color: '#F5F5F0' }}>
                Property Details
              </h4>
              {DETAILS.map(({ l, v }, i) => (
                <div key={i} style={{ paddingBottom: 18, marginBottom: 18, borderBottom: i < DETAILS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 5, fontWeight: 600 }}>{l}</div>
                  <div style={{ fontSize: 14, color: 'rgba(245,245,240,0.68)', lineHeight: 1.6 }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
              {ACTIONS.map(({ label, icon, desc, key }, i) => {
                const actionFn = {
                  tour: scheduleTour,
                  kit:  () => window.open('https://www.americandream.com/press', '_blank', 'noopener,noreferrer'),
                  map:  () => window.open('https://directory.americandream.com/en/home', '_blank', 'noopener,noreferrer'),
                  call: () => { window.location.href = 'tel:+18332637326' },
                }[key]

                return (
                  <button
                    key={i}
                    onClick={actionFn}
                    style={{
                      padding: '22px 24px',
                      background: '#080808',
                      border: '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 5,
                      textAlign: 'left',
                      fontFamily: 'Inter, sans-serif',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
                      e.currentTarget.style.background = 'rgba(201,168,76,0.06)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.background = '#080808'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 22 }}>{icon}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#F5F5F0' }}>{label}</span>
                    <span style={{ fontSize: 11, color: 'rgba(245,245,240,0.4)' }}>{desc}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className={`fade-up fade-up-d3 ${inView ? 'in' : ''}`}
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 20, letterSpacing: '0.15em', color: 'var(--white)', marginRight: 8 }}>AMERICAN</span>
            <span style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 20, letterSpacing: '0.15em', color: 'var(--gold)' }}>DREAM</span>
            <div style={{ fontSize: 10, color: 'rgba(245,245,240,0.25)', marginTop: 3, letterSpacing: '0.06em' }}>East Rutherford, NJ · A Triple Five Property</div>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.2)', textAlign: 'right', lineHeight: 1.8 }}>
            © 2026 American Dream. Commercial Use Only.<br />
            Authorized distribution to prospective partners only.
          </div>
        </div>
      </div>
    </section>
  )
}
