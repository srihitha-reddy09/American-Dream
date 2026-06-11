import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/Nav'
import VideoModal from './components/VideoModal'
import HeroSection from './sections/HeroSection'
import WhySection from './sections/WhySection'
import EntertainmentSection from './sections/EntertainmentSection'
import RetailSection from './sections/RetailSection'
import DiningSection from './sections/DiningSection'
import EventsSection from './sections/EventsSection'
import SponsorshipSection from './sections/SponsorshipSection'
import LeasingSection from './sections/LeasingSection'
import ContactSection from './sections/ContactSection'

const SECTIONS = [
  'hero','why','entertainment','retail',
  'dining','events','sponsorship','leasing','contact'
]

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollPct, setScrollPct] = useState(0)
  const [videoModal, setVideoModal] = useState(null)

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(docH > 0 ? (window.scrollY / docH) * 100 : 0)

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i])
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
          setActiveSection(SECTIONS[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const openVideo = useCallback((src, title) => setVideoModal({ src, title }), [])

  return (
    <>
      <div className="deck-progress">
        <div className="deck-progress-fill" style={{ width: `${scrollPct}%` }} />
      </div>

      <Nav activeSection={activeSection} goTo={goTo} sections={SECTIONS} />

      {/* Side section dots */}
      <div className="section-dots">
        {SECTIONS.map(s => (
          <button key={s} className={`section-dot ${activeSection === s ? 'active' : ''}`}
            onClick={() => goTo(s)} title={s} aria-label={s} />
        ))}
      </div>

      <main>
        <HeroSection goTo={goTo} openVideo={openVideo} />
        <WhySection goTo={goTo} />
        <EntertainmentSection goTo={goTo} openVideo={openVideo} />
        <RetailSection goTo={goTo} />
        <DiningSection goTo={goTo} />
        <EventsSection goTo={goTo} openVideo={openVideo} />
        <SponsorshipSection goTo={goTo} />
        <LeasingSection goTo={goTo} />
        <ContactSection />
      </main>

      <AnimatePresence>
        {videoModal && (
          <VideoModal src={videoModal.src} title={videoModal.title} onClose={() => setVideoModal(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
