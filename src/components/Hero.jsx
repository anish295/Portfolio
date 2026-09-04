/* ─── Hero.jsx ────────────────────────────────────────────────
   Full-viewport hero — CENTERED layout. Canvas particles.
   Clip-path wipe, TypeAnimation, GSAP entrance. NOT pinned.
   Circular "Scroll to explore" text bottom-right, spins via GSAP.
   Canvas hidden on mobile via CSS.
   REMOVED: GitHub/LinkedIn/LeetCode links, "Get in touch" button.
   ──────────────────────────────────────────────────────────── */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TypeAnimation } from 'react-type-animation'

export default function Hero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const circularTextRef = useRef(null)

  /* ── Canvas Particle System ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const ctx2d = canvas.getContext('2d')
    let animId
    const PARTICLE_COUNT = 60
    const CONNECTION_DIST = 120

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    /* Init particles */
    const particles = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      })
    }

    const draw = () => {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height)

      /* Pick colors based on theme */
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
      const particleColor = isDark ? '0, 245, 255' : '192, 57, 43'
      const lineColor = isDark ? '0, 245, 255' : '139, 69, 19'

      /* Connection lines */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15
            ctx2d.strokeStyle = `rgba(${lineColor}, ${alpha})`
            ctx2d.lineWidth = 0.6
            ctx2d.beginPath()
            ctx2d.moveTo(particles[i].x, particles[i].y)
            ctx2d.lineTo(particles[j].x, particles[j].y)
            ctx2d.stroke()
          }
        }
      }

      /* Dots */
      particles.forEach((p) => {
        ctx2d.fillStyle = `rgba(${particleColor}, 0.6)`
        ctx2d.beginPath()
        ctx2d.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx2d.fill()

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  /* ── GSAP Entrance (plays on load, NOT scroll driven) ── */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      tl.from('.hero-label', {
        y: 25, opacity: 0, duration: 0.8, ease: 'expo.out',
      })
      .from('.hero-name-1', {
        y: 60, opacity: 0, duration: 1, ease: 'expo.out',
      }, '-=0.4')
      .from('.hero-name-2', {
        clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'power4.inOut',
      }, '-=0.7')
      .from('.hero-sub', {
        y: 25, opacity: 0, duration: 0.7,
      }, '-=0.3')
      .from('.hero-bio', {
        y: 20, opacity: 0, duration: 0.6,
      }, '-=0.4')
      .from('.hero-cta', {
        y: 15, opacity: 0, duration: 0.6,
      }, '-=0.3')

      /* Circular text spin */
      if (circularTextRef.current) {
        gsap.to(circularTextRef.current.querySelector('svg'), {
          rotation: 360,
          duration: 12,
          ease: 'none',
          repeat: -1,
          transformOrigin: '50% 50%',
        })

        /* Hover scale effect */
        const el = circularTextRef.current
        el.addEventListener('mouseenter', () => {
          gsap.to(el, { scale: 1.15, duration: 0.3, ease: 'back.out(1.5)' })
        })
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { scale: 1, duration: 0.3, ease: 'expo.out' })
        })

        /* Fade out on scroll > 150px */
        gsap.to(circularTextRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=200',
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section" id="hero" style={{ padding: 0 }}>
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="hero-canvas" />

      <div
        className="hero-content"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: '100vh',
          padding: '0 8%',
        }}
      >
        {/* Label */}
        <p
          className="hero-label"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            color: 'var(--accent)',
            marginBottom: 16,
            letterSpacing: '0.08em',
          }}
        >
          {'// Hello, world. I\'m'}
        </p>

        {/* Name line 1 */}
        <h1
          className="hero-name-1"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(5rem, 12vw, 9rem)',
            lineHeight: 1,
            color: 'var(--text)',
            margin: 0,
          }}
        >
          Anish
        </h1>

        {/* Name line 2 — gradient, clip-path wipe */}
        <h1
          className="hero-name-2 gradient-text"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(5rem, 12vw, 9rem)',
            lineHeight: 1,
            margin: 0,
            clipPath: 'inset(0 0% 0 0)',
          }}
        >
          Kumar
        </h1>

        {/* TypeAnimation subtitle */}
        <div
          className="hero-sub"
          style={{
            marginTop: 24,
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
            color: 'var(--text-sub)',
            minHeight: '1.6em',
          }}
        >
          <TypeAnimation
            sequence={[
              'Full-Stack Developer', 2000,
              'React & Node.js Engineer', 2000,
              'AI-Powered Builder', 2000,
              "B.Tech IT @ NSUT '27", 2000,
            ]}
            repeat={Infinity}
            speed={45}
            cursor
          />
        </div>

        {/* Bio */}
        <p
          className="hero-bio"
          style={{
            marginTop: 16,
            fontSize: '1.05rem',
            color: 'var(--text-sub)',
            maxWidth: 600,
            lineHeight: 1.7,
          }}
        >
          Crafting full-stack products with React, Node.js, and AI — from
          real-time encrypted chat to LeetCode-integrated prep platforms.
        </p>

        {/* Single CTA */}
        <div className="hero-cta" style={{ marginTop: 36 }}>
          <a href="#projects" className="btn-primary" data-cursor="pointer">
            View Projects <span>→</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator — center bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
            animation: 'scrollBounce 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          scroll
        </span>
        <style>{`
          @keyframes scrollBounce {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(12px); opacity: 0.4; }
          }
        `}</style>
      </div>

      {/* Circular "Scroll to explore" — bottom right */}
      <button
        ref={circularTextRef}
        className="circular-scroll-text"
        data-cursor="pointer"
        onClick={() => {
          const aboutEl = document.getElementById('about')
          if (aboutEl) aboutEl.scrollIntoView({ behavior: 'smooth' })
        }}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'none',
        }}
      >
        <svg viewBox="0 0 100 100">
          <defs>
            <path
              id="scrollCircle"
              d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            />
          </defs>
          <text>
            <textPath href="#scrollCircle" startOffset="0%">{"SCROLL TO EXPLORE \u2022 SCROLL TO EXPLORE \u2022 "}</textPath>
          </text>
        </svg>
      </button>
    </section>
  )
}
