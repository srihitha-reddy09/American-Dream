import { useEffect, useState } from 'react'

/**
 * Fires once when the element enters the viewport.
 * @param {React.RefObject} ref
 * @param {number} threshold  0–1, default 0.1
 */
export default function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}
