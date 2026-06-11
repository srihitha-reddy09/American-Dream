import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function VideoModal({ src, title, onClose }) {
  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(3,3,3,0.95)',
        backdropFilter: 'blur(14px)',
        zIndex: 5000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
      }}
    >
      {/* Full wrapper — stops click from closing */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '92vw',
          maxWidth: 1100,
          maxHeight: '95vh',
        }}
      >
        {/* ── TOP BAR with Back button — always visible ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          background: 'rgba(8,8,8,0.95)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderBottom: 'none',
          flexShrink: 0,
        }}>
          {/* Left: logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 17, letterSpacing: '0.15em', color: '#F5F5F0' }}>AMERICAN</span>
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 17, letterSpacing: '0.15em', color: '#C9A84C' }}>DREAM</span>
            {title && (
              <>
                <span style={{ width: 1, height: 14, background: 'rgba(245,245,240,0.2)', margin: '0 6px' }} />
                <span style={{ fontSize: 11, color: 'rgba(245,245,240,0.4)', letterSpacing: '0.06em', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
              </>
            )}
          </div>

          {/* Right: Back + Close buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={onClose}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: 'transparent',
                border: '1px solid rgba(245,245,240,0.25)',
                color: '#F5F5F0',
                cursor: 'pointer',
                padding: '7px 16px',
                fontFamily: 'Inter, sans-serif',
                fontSize: 11, fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#C9A84C'
                e.currentTarget.style.color = '#C9A84C'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(245,245,240,0.25)'
                e.currentTarget.style.color = '#F5F5F0'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back
            </button>

            <button
              onClick={onClose}
              aria-label="Close video"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 34, height: 34,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(245,245,240,0.15)',
                color: '#F5F5F0',
                cursor: 'pointer',
                fontSize: 20, lineHeight: 1,
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(201,168,76,0.2)'
                e.currentTarget.style.borderColor = '#C9A84C'
                e.currentTarget.style.color = '#C9A84C'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.borderColor = 'rgba(245,245,240,0.15)'
                e.currentTarget.style.color = '#F5F5F0'
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* ── VIDEO IFRAME ── */}
        <div style={{
          position: 'relative',
          paddingBottom: '56.25%',
          background: '#000',
          border: '1px solid rgba(201,168,76,0.2)',
          flexShrink: 0,
        }}>
          <iframe
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
            }}
          />
        </div>

        {/* ── BOTTOM HINT ── */}
        <div style={{
          padding: '10px 20px',
          background: 'rgba(8,8,8,0.9)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderTop: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 10, color: 'rgba(245,245,240,0.25)', letterSpacing: '0.08em' }}>
            Press <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 6px', fontSize: 9, fontFamily: 'monospace', border: '1px solid rgba(255,255,255,0.15)' }}>ESC</kbd> or click outside to close
          </span>
          <span style={{ fontSize: 10, color: 'rgba(245,245,240,0.2)', letterSpacing: '0.06em' }}>
            americandream.com
          </span>
        </div>
      </div>
    </motion.div>
  )
}
