import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Drives an auto-advancing tab carousel with a smooth progress bar.
 *
 * @param {number} count     Number of items to cycle through
 * @param {number} interval  Ms per slide (default 4500)
 * @param {boolean} enabled  Only auto-plays when true (tie to inView)
 * @returns {{ active, paused, progress, selectTab, setPaused }}
 */
export default function useAutoplay(count, interval = 4500, enabled = true) {
  const [active, setActive]   = useState(0)
  const [paused, setPaused]   = useState(false)
  const [progress, setProgress] = useState(0)

  const timerRef    = useRef(null)
  const rafRef      = useRef(null)
  const startRef    = useRef(null)

  const goNext = useCallback(() => {
    setActive(prev => (prev + 1) % count)
    setProgress(0)
    startRef.current = Date.now()
  }, [count])

  const selectTab = useCallback((i) => {
    setActive(i)
    setProgress(0)
    startRef.current = Date.now()
    setPaused(false)
  }, [])

  // Auto-advance timer
  useEffect(() => {
    if (!enabled || paused) {
      clearInterval(timerRef.current)
      return
    }
    startRef.current = Date.now()
    timerRef.current = setInterval(goNext, interval)
    return () => clearInterval(timerRef.current)
  }, [enabled, paused, active, goNext, interval])

  // Smooth rAF progress bar
  useEffect(() => {
    if (!enabled || paused) {
      cancelAnimationFrame(rafRef.current)
      return
    }
    startRef.current = startRef.current || Date.now()
    const tick = () => {
      const pct = Math.min(((Date.now() - startRef.current) / interval) * 100, 100)
      setProgress(pct)
      if (pct < 100) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [enabled, paused, active, interval])

  return { active, paused, progress, selectTab, setPaused }
}
