/**
 * VideoBg — robust video background component
 * Tries multiple free CDN sources, falls back to CSS animated gradient.
 * Uses fetch() with referrer override to load Pexels videos correctly.
 */
import { useEffect, useRef, useState } from 'react'

// Working direct MP4 sources (Pixabay CDN — no referrer restriction)
const FALLBACK_VIDEOS = {
  hero: [
    'https://cdn.pixabay.com/video/2023/08/14/175551-855490749_large.mp4',
    'https://cdn.pixabay.com/video/2021/10/18/92009-637091818_large.mp4',
  ],
  why: [
    'https://cdn.pixabay.com/video/2022/03/15/111524-688390157_large.mp4',
    'https://cdn.pixabay.com/video/2019/11/18/28980-374127065_large.mp4',
  ],
  entertainment: [
    'https://cdn.pixabay.com/video/2023/07/04/170095-841682603_large.mp4',
    'https://cdn.pixabay.com/video/2020/05/02/38175-416649718_large.mp4',
  ],
  retail: [
    'https://cdn.pixabay.com/video/2022/11/28/140638-776168199_large.mp4',
    'https://cdn.pixabay.com/video/2019/03/07/21908-321429845_large.mp4',
  ],
  dining: [
    'https://cdn.pixabay.com/video/2023/03/10/153846-807244315_large.mp4',
    'https://cdn.pixabay.com/video/2020/03/31/35244-404568975_large.mp4',
  ],
  events: [
    'https://cdn.pixabay.com/video/2022/12/01/140877-777260437_large.mp4',
    'https://cdn.pixabay.com/video/2019/05/24/23920-338882044_large.mp4',
  ],
  sponsorship: [
    'https://cdn.pixabay.com/video/2022/07/30/126484-735020898_large.mp4',
    'https://cdn.pixabay.com/video/2021/04/22/70965-540578249_large.mp4',
  ],
  contact: [
    'https://cdn.pixabay.com/video/2020/01/20/31186-386251176_large.mp4',
    'https://cdn.pixabay.com/video/2022/04/18/114204-700716756_large.mp4',
  ],
}

// Gradient fallbacks per scene
const GRADIENTS = {
  hero:          'radial-gradient(ellipse 120% 80% at 60% 40%, #1a0f00 0%, #030303 60%)',
  why:           'radial-gradient(ellipse 100% 100% at 30% 50%, #0a0800 0%, #030303 70%)',
  entertainment: 'radial-gradient(ellipse 120% 80% at 70% 30%, #0d0500 0%, #030303 70%)',
  retail:        'radial-gradient(ellipse 100% 100% at 50% 50%, #080808 0%, #030303 80%)',
  dining:        'radial-gradient(ellipse 120% 80% at 40% 60%, #0a0600 0%, #030303 70%)',
  events:        'radial-gradient(ellipse 120% 80% at 60% 40%, #050010 0%, #030303 70%)',
  sponsorship:   'radial-gradient(ellipse 100% 100% at 50% 50%, #080808 0%, #030303 80%)',
  contact:       'radial-gradient(ellipse 100% 100% at 50% 60%, #050505 0%, #030303 80%)',
}

export default function VideoBg({ scene = 'hero', brightness = 0.35, isActive }) {
  const videoRef = useRef(null)
  const [videoSrc, setVideoSrc] = useState(null)
  const [failed, setFailed] = useState(false)
  const tried = useRef(0)

  const sources = FALLBACK_VIDEOS[scene] || FALLBACK_VIDEOS.hero

  // Try loading each source URL via fetch to check it works
  useEffect(() => {
    let cancelled = false
    tried.current = 0

    const tryNext = async () => {
      while (tried.current < sources.length) {
        const url = sources[tried.current]
        tried.current++
        try {
          // HEAD request to verify URL is reachable
          const res = await fetch(url, { method: 'HEAD', mode: 'no-cors' })
          if (!cancelled) {
            setVideoSrc(url)
            return
          }
        } catch {
          // Try next source
        }
      }
      if (!cancelled) setFailed(true)
    }

    // Set first source immediately, fallback on error
    setVideoSrc(sources[0])
    setFailed(false)
  }, [scene])

  useEffect(() => {
    if (!videoRef.current || !videoSrc) return
    if (isActive) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [isActive, videoSrc])

  const handleError = () => {
    const next = tried.current < sources.length ? sources[tried.current++] : null
    if (next) setVideoSrc(next)
    else setFailed(true)
  }

  return (
    <>
      {/* Always-visible gradient base */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: GRADIENTS[scene] || GRADIENTS.hero,
        animation: 'bgPulse 8s ease-in-out infinite',
      }} />

      {/* Animated gold radial accent */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
        animation: 'bgGlow 6s ease-in-out infinite',
      }} />

      {/* Video layer — loads on top of gradient */}
      {!failed && videoSrc && (
        <video
          key={videoSrc}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={handleError}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            filter: `brightness(${brightness}) saturate(0.8)`,
            transition: 'opacity 1s ease',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      <style>{`
        @keyframes bgPulse {
          0%,100% { opacity:1; }
          50% { opacity:0.85; }
        }
        @keyframes bgGlow {
          0%,100% { transform:scale(1); opacity:0.7; }
          50% { transform:scale(1.08); opacity:1; }
        }
      `}</style>
    </>
  )
}
