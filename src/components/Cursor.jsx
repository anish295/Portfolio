/* ─── Cursor.jsx ───────────────────────────────────────────────
   SVG arrow cursor — colored var(--accent), follows mouse.
   On hover over [data-cursor="pointer"]: slight tilt + ring.
   Mobile: returns null (body cursor:auto).
   ──────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from 'react'

const ArrowSVG = ({ tilt = false }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    style={{
      transform: tilt ? 'rotate(45deg)' : 'none',
      transition: 'transform 0.2s ease',
    }}
  >
    <path
      d="M4 2L4 18L8.5 13.5L11.5 20L13.5 19L10.5 12.5L17 12.5L4 2Z"
      fill="var(--accent)"
      stroke="var(--bg)"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Cursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    if (mq.matches) {
      setIsMobile(true)
      return
    }

    setIsVisible(true)

    let mouseX = -100
    let mouseY = -100

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseX}px`
        cursorRef.current.style.top = `${mouseY}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${mouseX}px`
        ringRef.current.style.top = `${mouseY}px`
      }

      /* Check hover target */
      const el = e.target
      const cursorType =
        el.closest('[data-cursor="pointer"]') ||
        el.closest('a') ||
        el.closest('button')
          ? 'pointer'
          : 'default'

      setIsPointer(cursorType === 'pointer')
    }

    const onEnter = () => setIsVisible(true)
    const onLeave = () => setIsVisible(false)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  if (isMobile) return null

  return (
    <>
      {/* Arrow cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-2px, -2px)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'left, top',
        }}
      >
        <ArrowSVG tilt={isPointer} />
      </div>

      {/* Hover ring (only when over pointer elements) */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(0,245,255,0.4)',
          transform: 'translate(-50%, -50%)',
          opacity: isPointer ? 0.7 : 0,
          scale: isPointer ? '1' : '0.5',
          transition: 'opacity 0.25s ease, scale 0.25s ease',
          willChange: 'left, top',
        }}
      />
    </>
  )
}
