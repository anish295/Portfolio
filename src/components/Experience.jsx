/* ─── Experience.jsx ────────────────────────────────────────────
   Vertical timeline with scaleY line animation, staggered entries,
   and achievement cards. NO pin. NO scrub. Entrance via ScrollTrigger.
   ──────────────────────────────────────────────────────────── */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const TIMELINE_ENTRIES = [
  {
    color: 'var(--cyan)',
    title: 'Software Engineer Intern',
    org: 'TeachBetter AI',
    date: 'June – July 2026',
    bullets: [
      'Designed gamified assessment framework in React (Froggy Jump, Treasure Hunt, Space Runner)',
      'Architected scalable frontend: decoupled Assessment Engine, Game Engine, Template Loader',
      'Built Student Assessment Portal: quiz flow, progress tracking, anti-cheat mechanisms',
    ],
  },
  {
    color: 'var(--violet)',
    title: 'Member, Executive Committee',
    org: 'Rotaract Club, NSUT',
    date: 'Aug 2023 – May 2025',
    bullets: [
      'Friendship Fiesta 2.0 and Zorb Football logistics, teams and vendor management',
    ],
  },
  {
    color: 'var(--violet)',
    title: 'Active Volunteer',
    org: 'NSS, NSUT',
    date: 'Aug 2023 – July 2024',
    bullets: [
      "Live-streamed PM's interaction with first-time voters on National Voters' Day — full technical setup",
    ],
  },
  {
    color: 'var(--amber)',
    title: 'B.Tech Information Technology',
    org: 'NSUT',
    date: '2023 – 2027',
    bullets: [
      '7.29 CGPA · DSA, OS, DBMS, ML, AI, Cryptography, Software Engineering',
    ],
  },
]

const ACHIEVEMENTS = [
  { emoji: '🏆', title: 'Solved 350+ LeetCode problems', sub: 'DSA specialist' },
  { emoji: '🥇', title: 'School Topper KV Dwarka, Sec-5', sub: '96% in Class X (CBSE)' },
  { emoji: '🎉', title: "Logistics at MOKSHA '24", sub: "NSUT's annual cultural fest" },
]

export default function Experience() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      /* Heading */
      gsap.from('.exp-heading', {
        y: 60, opacity: 0, duration: 0.9, ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      /* Timeline line grows down */
      gsap.from('.timeline-line', {
        scaleY: 0, duration: 1.5, ease: 'power3.inOut',
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      /* Timeline entries stagger in from left */
      gsap.from('.timeline-entry', {
        x: -50, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'expo.out',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      /* Achievement cards */
      gsap.from('.achievement-card', {
        y: 40, opacity: 0, scale: 0.85, stagger: 0.12, duration: 0.8,
        scrollTrigger: {
          trigger: '.achievement-card',
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
      id="experience"
      style={{ minHeight: 'auto', padding: '100px 8%' }}
    >
      <div style={{ maxWidth: 900, width: '100%', margin: '0 auto' }}>
        {/* Heading */}
        <h2
          className="exp-heading section-heading"
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          My <span className="gradient-text">Journey</span>
        </h2>

        {/* Timeline */}
        <div className="timeline" style={{ position: 'relative', paddingLeft: 40 }}>
          {/* Vertical line */}
          <div
            className="timeline-line"
            style={{
              position: 'absolute', left: 8, top: 0, bottom: 0, width: 2,
              background: 'linear-gradient(to bottom, var(--accent), var(--accent2), transparent)',
            }}
          />

          {TIMELINE_ENTRIES.map((entry, i) => (
            <div
              key={i}
              className="timeline-entry"
              style={{ position: 'relative', marginBottom: 40, paddingLeft: 28 }}
            >
              {/* Glowing dot */}
              <div
                style={{
                  position: 'absolute', left: -36, top: 6,
                  width: 16, height: 16, borderRadius: '50%',
                  background: entry.color,
                  boxShadow: `0 0 20px ${entry.color}`,
                  border: '3px solid var(--bg)',
                }}
              />

              {/* Card */}
              <div className="glass-card" style={{ padding: '24px 28px' }}>
                <div
                  style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 12,
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem',
                      }}
                    >
                      {entry.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                        color: entry.color, marginTop: 2,
                      }}
                    >
                      {entry.org}
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                      color: 'var(--text-muted)', whiteSpace: 'nowrap',
                    }}
                  >
                    {entry.date}
                  </span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {entry.bullets.map((b, j) => (
                    <li
                      key={j}
                      style={{
                        color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: 1.7,
                        paddingLeft: 16, position: 'relative',
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, color: entry.color }}>▹</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement strip */}
        <div
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20, marginTop: 48,
          }}
        >
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.title}
              className="achievement-card glass-card"
              style={{ padding: 24, textAlign: 'center' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>{a.emoji}</div>
              <h5
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: '0.95rem', marginBottom: 6,
                }}
              >
                {a.title}
              </h5>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {a.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
