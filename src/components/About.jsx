/* ─── About.jsx ────────────────────────────────────────────
   2-column section: bio + tags left, education cards right.
   NO pin. NO scrub. Entrance via ScrollTrigger toggleActions (reverse).
   ──────────────────────────────────────────────────────────── */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const TAGS = ['React', 'Node.js', 'AI Integration', 'System Design']

const EDU = [
  {
    label: 'B.Tech Information Technology',
    sub: 'NSUT, New Delhi · 2023–2027',
    highlight: 'CGPA: 7.29',
  },
  {
    label: 'Class XII (CBSE)',
    sub: 'Kendriya Vidyalaya, Sec-5, Dwarka, New Delhi · 2022–23',
    highlight: '85%',
  },
  {
    label: 'Class X (CBSE)',
    sub: 'Kendriya Vidyalaya, Sec-5, Dwarka, New Delhi · 2020–21',
    highlight: '96% — School Topper',
  },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      /* Heading entrance */
      gsap.from('.about-heading', {
        y: 60, opacity: 0, duration: 0.9, ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      /* Text + tags */
      gsap.from('.about-text p, .about-tag', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'expo.out',
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      /* Education cards */
      gsap.from('.edu-card', {
        y: 40, opacity: 0, stagger: 0.12, duration: 0.7,
        scrollTrigger: {
          trigger: '.edu-card',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section"
      id="about"
      style={{ minHeight: 'auto', padding: '100px 8%' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '55% 45%',
          gap: 60,
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* ── Left Column ── */}
        <div>
          <p className="section-label">{'// About'}</p>

          <h2
            className="about-heading section-heading"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Building at the<br />
            <span className="gradient-text">edge of web</span>
          </h2>

          <div className="about-text" style={{ maxWidth: 520 }}>
            <p style={{ color: 'var(--text-sub)', marginBottom: 16, lineHeight: 1.8 }}>
              I'm a third-year B.Tech IT student at NSUT, Delhi — deeply focused
              on building full-stack products that combine clean interfaces with
              powerful backend systems. At TeachBetter AI, I designed gamified
              assessment frameworks from scratch in React.
            </p>
            <p style={{ color: 'var(--text-sub)', lineHeight: 1.8 }}>
              I spend my hours integrating AI into developer tooling — from code
              review engines to real-time encrypted collaboration platforms. ChatGPT,
              Claude, and Gemini are central to my daily workflow and problem-solving process.
            </p>
          </div>

          {/* Tag pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="about-tag"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  border: '1px solid var(--glow-cyan)',
                  background: 'var(--glow-cyan)',
                  padding: '6px 16px',
                  borderRadius: 100,
                  letterSpacing: '0.06em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right Column ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Education Cards — all 3 */}
          {EDU.map((edu) => (
            <div
              key={edu.label}
              className="edu-card glass-card"
              style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Education
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                }}
              >
                {edu.label}
              </div>
              <div style={{ color: 'var(--text-sub)', fontSize: '0.85rem' }}>
                {edu.sub}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--accent)',
                  marginTop: 2,
                }}
              >
                {edu.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
