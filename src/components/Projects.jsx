/* ─── Projects.jsx ─────────────────────────────────────────────
   2 tiles side by side. Screenshot images on tiles.
   Text on tiles ONLY on hover. Click → fullscreen detail overlay.
   NO pin. NO scrub. Entrance via ScrollTrigger toggleActions (reverse).
   ──────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const PROJECTS = [
  {
    name: 'CodeChemy',
    tagline: 'AI-powered interview prep platform',
    color: 'var(--cyan)',
    glow: 'var(--glow-cyan)',
    accentColor: 'var(--cyan)',
    tileBg: 'linear-gradient(135deg, #0d1526 0%, #0a2540 60%, #0a1628 100%)',
    image: '/assets/CodeChemy.png',
    live: 'https://codechemy.netlify.app/',
    github: 'https://github.com/anish295/CodeChemy',
    stack: 'React 19, Vite, Tailwind CSS, Node.js, Express.js, MongoDB, JWT, Groq SDK, Google GenAI SDK',
    pills: ['LeetCode GraphQL API', 'AI Code Review', 'JWT Auth', 'Activity Heatmaps'],
    description:
      'Full-stack interview prep platform with LeetCode GraphQL integration, AI-powered code review via Groq & Google GenAI, activity heatmaps, and JWT-secured sessions.',
    techs: ['React', 'Node.js', 'MongoDB', 'AI', 'JWT'],
  },
  {
    name: 'ShadowRoom',
    tagline: 'Zero-footprint encrypted collaboration',
    color: 'var(--violet)',
    glow: 'var(--glow-violet)',
    accentColor: 'var(--violet)',
    tileBg: 'linear-gradient(135deg, #1a0a2e 0%, #0d0a1e 60%, #0a0d26 100%)',
    image: '/assets/ShadowRoom.png',
    live: 'https://shadowroom-chat.netlify.app/',
    github: 'https://github.com/anish295/ShadowRoom',
    stack: 'React, Vite, Node.js, Express.js, Socket.io, WebRTC, AES-256, SHA-256',
    pills: ['E2E Encryption', 'P2P File Sharing', 'Zero Accounts', 'WebRTC'],
    description:
      'Privacy-first real-time collaboration. Zero persistent storage, zero accounts needed. AES-256 end-to-end encryption + SHA-256 room keys.',
    techs: ['React', 'Socket.io', 'WebRTC', 'AES-256', 'Node.js'],
  },
]

/* ── Project tile image with fallback ── */
function TileImage({ project }) {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <div
        style={{
          position: 'absolute', inset: 0,
          background: project.tileBg,
        }}
      />
    )
  }

  return (
    <img
      src={project.image}
      alt={project.name}
      onError={() => setImgError(true)}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'top',
        transition: 'transform 0.5s ease',
      }}
    />
  )
}

/* ── Full-screen detail overlay ── */
function ProjectDetailOverlay({ project, onClose }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!overlayRef.current) return
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'expo.out' }
    )
  }, [])

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, y: 40, scale: 0.96, duration: 0.35, ease: 'expo.in',
      onComplete: onClose,
    })
  }

  const overlayBg = project.name === 'CodeChemy'
    ? 'radial-gradient(ellipse 70% 50% at 20% 0%, rgba(0,100,160,0.5) 0%, transparent 60%), #05080f'
    : 'radial-gradient(ellipse 70% 50% at 80% 0%, rgba(120,0,200,0.5) 0%, transparent 60%), #05080f'

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: overlayBg,
        overflowY: 'auto',
        padding: '60px 8%',
      }}
    >
      {/* Watermark project name */}
      <div
        style={{
          position: 'fixed', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem,15vw,14rem)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: `1px ${project.accentColor}20`,
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.04em',
        }}
      >
        {project.name}
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <button
            onClick={handleClose}
            data-cursor="pointer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: '#8b9ab5',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'none',
              border: 'none',
              transition: 'color 0.3s',
              padding: '8px 0',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = project.color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8b9ab5')}
          >
            ← Back
          </button>
          <div style={{ display: 'flex', gap: 16 }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: '#8b9ab5',
                padding: '8px 20px',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = project.color
                e.currentTarget.style.color = project.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = '#8b9ab5'
              }}
            >
              GitHub ↗
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: 'var(--bg)',
                padding: '8px 20px',
                background: 'var(--gradient)',
                borderRadius: 8,
                transition: 'all 0.3s',
              }}
            >
              Live ↗
            </a>
          </div>
        </div>

        {/* Content card */}
        <div
          style={{
            padding: '48px 52px',
            position: 'relative',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 20,
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Top accent line */}
          <div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, ${project.color}, transparent)`,
            }}
          />

          {/* Glow */}
          <div
            style={{
              position: 'absolute', top: -80, right: -80,
              width: 250, height: 250, borderRadius: '50%',
              background: project.glow, filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />

          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: project.color,
            letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12,
          }}>
            Featured Project
          </p>

          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, marginBottom: 8,
            color: '#f0f4ff',
          }}>
            {project.name}
          </h3>

          <p style={{ fontSize: '1.1rem', color: project.color, marginBottom: 20 }}>
            {project.tagline}
          </p>

          <p style={{ color: '#8b9ab5', lineHeight: 1.8, maxWidth: 680, marginBottom: 24 }}>
            {project.description}
          </p>

          {/* Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {project.pills.map((pill) => (
              <span
                key={pill}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                  color: project.color, border: `1px solid ${project.color}33`,
                  background: project.glow, padding: '6px 16px',
                  borderRadius: 100, letterSpacing: '0.04em',
                }}
              >
                {pill}
              </span>
            ))}
          </div>

          {/* Tech stack */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
              color: '#4a5568', lineHeight: 2, letterSpacing: '0.04em',
            }}>
              {project.stack.split(', ').map((t) => (
                <span key={t} style={{ marginRight: 8 }}>
                  {t}
                  <span style={{ color: 'var(--glass-border)', margin: '0 4px' }}>·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.projects-label', {
        y: 40, opacity: 0, duration: 0.8, ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.project-tile', {
        y: 60, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'expo.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Detail overlay — portal-like fixed overlay */}
      {activeProject !== null && (
        <ProjectDetailOverlay
          project={PROJECTS[activeProject]}
          onClose={() => setActiveProject(null)}
        />
      )}

      <section
        ref={sectionRef}
        className="section"
        id="projects"
        style={{ minHeight: 'auto', padding: '100px 8%' }}
      >
        <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto' }}>
          <p className="projects-label section-label">{'// Projects'}</p>

          <h2
            className="section-heading"
            style={{ fontFamily: 'var(--font-display)', marginBottom: 48 }}
          >
            Featured <span className="gradient-text">Work</span>
          </h2>

          {/* Tile grid */}
          <div
            className="projects-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
            }}
          >
            {PROJECTS.map((project, i) => (
              <div
                key={project.name}
                className="project-tile"
                data-cursor="pointer"
                onClick={() => setActiveProject(i)}
                style={{
                  aspectRatio: '16 / 9',
                  borderRadius: 20,
                  overflow: 'hidden',
                  cursor: 'none',
                  position: 'relative',
                  border: '1px solid var(--glass-border)',
                  flexShrink: 0,
                }}
              >
                {/* Screenshot image with gradient fallback */}
                <TileImage project={project} />

                {/* Dark overlay gradient for readability */}
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.1) 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Glow orb */}
                <div
                  style={{
                    position: 'absolute', bottom: -40, right: -40,
                    width: 160, height: 160, borderRadius: '50%',
                    background: project.glow, filter: 'blur(50px)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Hover overlay — text only on hover */}
                <div
                  className="tile-overlay"
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 50%, transparent 100%)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    padding: 28,
                    opacity: 0,
                    transition: 'opacity 0.35s ease',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)', fontWeight: 800,
                      fontSize: '1.8rem', marginBottom: 6,
                      background: 'var(--gradient)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {project.name}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', marginBottom: 12 }}>
                    {project.tagline}
                  </p>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: project.color }}>
                    Click to explore →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .projects-grid { grid-template-columns: 1fr !important; }
          }
          .project-tile:hover img { transform: scale(1.05); }
          .project-tile:hover .tile-overlay { opacity: 1 !important; }
        `}</style>
      </section>
    </>
  )
}
