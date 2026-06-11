import { useRef, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function useInView(r){ const[v,s]=useState(false); useEffect(()=>{ const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)s(true)},{threshold:0.08}); if(r.current)o.observe(r.current); return()=>o.disconnect() },[r]); return v }

const PATHS = [
  { id:'luxury', label:'Luxury Flagship', icon:'◆', color:'#C9A84C', tagline:'The pinnacle of northeastern retail', sizes:'5,000–200,000 sq ft', demo:'HHI $150K+, Ages 30–55', img:'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&q=80',
    pitch:'The luxury wing at American Dream is the only place in the New York market where affluent shoppers combine world-class retail with world-class entertainment in a single destination visit. Anchored by Saks Fifth Avenue.', bullets:['Category exclusivity available','Adjacent to Saks Fifth Avenue','Dedicated concierge service','Private after-hours events','Co-branding with AD luxury marketing'] },
  { id:'mid', label:'Mid-Tier Retail', icon:'■', color:'#60A5FA', tagline:'Volume, visibility, velocity', sizes:'1,500–20,000 sq ft', demo:'Ages 18–45, all income bands', img:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80',
    pitch:'70/30 entertainment-to-retail means every visitor arrives in a discovery mindset. High-traffic corridors with direct entertainment adjacencies drive impulse and conversion.', bullets:['Main corridor access','Entertainment adjacencies','Flexible lease structures','Co-marketing opportunities','Pop-up to permanent path'] },
  { id:'fnb', label:'F&B / Dining', icon:'●', color:'#F97316', tagline:'Feed 32 million hungry visitors', sizes:'800–15,000 sq ft', demo:'Families, couples, groups — 4.5h dwell', img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
    pitch:"Your F&B concept isn't competing with other restaurants — it's the only option in a captive 3.5M sq ft universe of visitors who've already committed their day.", bullets:['Captive 32M annual audience','Theme park & water park adjacency','Repeat meal occasions per visit','Catering & event contracts','Food hall incubator available'] },
  { id:'popup', label:'Pop-Up', icon:'★', color:'#A78BFA', tagline:'Test. Activate. Convert.', sizes:'200–5,000 sq ft', demo:'Trend-forward 18–35, high social', img:'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=900&q=80',
    pitch:'American Dream is the ultimate pop-up platform. 32M visitors. One of the highest social engagement rates of any US mall. Every activation echoes globally.', bullets:['From 30-day terms','Guaranteed high-foot-traffic spots','Built-in social media reach','Product launch infrastructure','Conversion path to permanent'] },
]

export default function LeasingSection({ goTo }) {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref)
  const p = PATHS[active]

  return (
    <section id="leasing" style={{ background:'#050505', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
      <div className="section-inner" ref={ref}>

        {/* Header */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8vw', alignItems:'end', marginBottom:48 }} className="two-col">
          <div className={`fade-up ${inView?'in':''}`}>
            <div className="gold-bar" style={{ marginBottom:18 }} />
            <span className="section-label" style={{ display:'block', marginBottom:14 }}>Leasing Opportunities</span>
            <h2 className="display-xl">Find Your<br /><em>Perfect Space</em></h2>
          </div>
          <p className={`body-lg fade-up fade-up-d2 ${inView?'in':''}`}>
            Every brand has a home at American Dream — from 200 sq ft pop-ups to 200,000 sq ft luxury flagships. Select your category below.
          </p>
        </div>

        {/* Path tabs */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2, marginBottom:2 }}>
          {PATHS.map((path,i)=>(
            <button key={path.id} onClick={()=>setActive(i)} style={{
              padding:'14px 10px', textAlign:'center', background: active===i ? 'rgba(255,255,255,0.05)' : '#080808',
              border:'none', borderTop: active===i ? `2px solid ${path.color}` : '2px solid transparent',
              cursor:'pointer', transition:'all 0.25s', fontFamily:'Inter,sans-serif',
            }}>
              <div style={{ fontSize:16, color: active===i ? path.color : 'rgba(245,245,240,0.2)', marginBottom:4, transition:'color 0.25s' }}>{path.icon}</div>
              <div style={{ fontSize:10, fontWeight: active===i ? 600 : 400, color: active===i ? 'var(--white)' : 'rgba(245,245,240,0.35)', letterSpacing:'0.06em' }}>{path.label}</div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.3}}
            style={{ display:'grid', gridTemplateColumns:'1fr 1fr', border:'1px solid rgba(255,255,255,0.07)', marginBottom:48, minHeight:340 }} className="two-col">
            <div style={{ position:'relative', overflow:'hidden' }}>
              <img src={p.img} alt={p.label} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0, filter:'brightness(0.38)' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg, transparent 40%, #080808 100%)' }} />
              <div style={{ position:'absolute', bottom:24, left:24, fontFamily:'Bebas Neue,sans-serif', fontSize:'clamp(2.5rem,5vw,4.5rem)', color:p.color, lineHeight:1 }}>{p.icon}</div>
            </div>
            <div style={{ padding:'36px 36px', background:'#080808', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <div style={{ fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:p.color, marginBottom:6, fontWeight:700 }}>{p.tagline}</div>
              <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(1.4rem,2.2vw,2.2rem)', fontWeight:300, marginBottom:12, lineHeight:1.2 }}>{p.label}</h3>
              <p className="body-lg" style={{ marginBottom:16, fontSize:13 }}>{p.pitch}</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
                {[['Size Range',p.sizes],['Target Audience',p.demo]].map(([l,v],i)=>(
                  <div key={i} style={{ padding:'9px 12px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize:8, textTransform:'uppercase', letterSpacing:'0.15em', color:'rgba(245,245,240,0.3)', marginBottom:3 }}>{l}</div>
                    <div style={{ fontSize:12, color:'rgba(245,245,240,0.7)' }}>{v}</div>
                  </div>
                ))}
              </div>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:5, marginBottom:24 }}>
                {p.bullets.map((b,i)=>(
                  <li key={i} style={{ display:'flex', gap:8, fontSize:12, color:'rgba(245,245,240,0.6)' }}>
                    <span style={{ color:p.color }}>→</span>{b}
                  </li>
                ))}
              </ul>
              <button className="btn-gold" style={{ alignSelf:'flex-start' }} onClick={()=>goTo('contact')}><span>Inquire About Space</span></button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Process steps */}
        <div className={`fade-up fade-up-d2 ${inView?'in':''}`}>
          <div className="gold-bar" style={{ marginBottom:14 }} />
          <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(1.1rem,1.8vw,1.5rem)', fontWeight:300, marginBottom:22 }}>
            The <span style={{ color:'var(--gold)', fontStyle:'italic' }}>Leasing Process</span>
          </h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', position:'relative' }}>
            <div style={{ position:'absolute', top:20, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), rgba(201,168,76,0.3), transparent)', zIndex:0 }} />
            {[['01','Inquiry','Submit category, size, timeline.'],['02','Tour','Private walkthrough.'],['03','Proposal','Tailored location + LOI.'],['04','Lease','Finalize terms, begin fit-out.'],['05','Open','Grand opening + co-marketing.']].map(([n,t,d],i)=>(
              <div key={i} style={{ textAlign:'center', padding:'0 6px', position:'relative', zIndex:1 }}>
                <div style={{ width:40, height:40, borderRadius:'50%', border:'1px solid rgba(201,168,76,0.4)', background:'#050505', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 10px', fontFamily:'Bebas Neue,sans-serif', fontSize:14, color:'var(--gold)' }}>{n}</div>
                <div style={{ fontSize:10, fontWeight:600, color:'var(--white)', marginBottom:3 }}>{t}</div>
                <div style={{ fontSize:10, color:'rgba(245,245,240,0.35)', lineHeight:1.5 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
