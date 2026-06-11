import { useEffect, useRef, useState } from 'react'

export default function InnerScrollHint({ scrollRef }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const el = scrollRef?.current
    if (!el) return
    const check = () => {
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8
      setShow(!atBottom && el.scrollHeight > el.clientHeight + 40)
    }
    check()
    el.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      el.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [scrollRef])

  if (!show) return null

  return (
    <div className="inner-scroll-hint">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.7)" strokeWidth="1.5">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  )
}
