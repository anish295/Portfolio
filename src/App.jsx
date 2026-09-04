/* ─── App.jsx ─────────────────────────────────────────────────
   Root layout — ThemeProvider, custom Cursor, ambient orbs,
   film grain, scroll progress bar, and all section components.
   ──────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ThemeProvider } from './context/ThemeContext'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'

function AppContent() {
  /* ── Refs ── */
  const progressRef = useRef(null)
  const orbVioletRef = useRef(null)
  const orbCyanRef = useRef(null)

  /* ── Portfolio mode: 'tech' | 'creative' ── */
  const [portfolioMode, setPortfolioMode] = useState('tech')

  /* ── Scroll Progress Bar ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  /* ── Ambient Orb Float ── */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.to(orbVioletRef.current, {
        y: 30,
        x: -15,
        duration: 10,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to(orbCyanRef.current, {
        y: -25,
        x: 20,
        duration: 14,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
    })
    return () => ctx.revert()
  }, [])

  /* ── Orb Parallax on Scroll ── */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      if (orbVioletRef.current) {
        gsap.to(orbVioletRef.current, {
          y: -80, ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        })
      }
      if (orbCyanRef.current) {
        gsap.to(orbCyanRef.current, {
          y: 60, ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── Custom Cursor ── */}
      <Cursor />

      {/* ── Scroll Progress ── */}
      <div ref={progressRef} className="scroll-progress" />

      {/* ── Ambient Background ── */}
      <div className="ambient-grid" />
      <div ref={orbVioletRef} className="ambient-orb ambient-orb--violet orb-1" />
      <div ref={orbCyanRef} className="ambient-orb ambient-orb--cyan orb-2" />

      {/* ── Film Grain ── */}
      <div className="film-grain" />

      {/* ── Navbar ── */}
      <Navbar portfolioMode={portfolioMode} setPortfolioMode={setPortfolioMode} />

      {/* ── Sections ── */}
      {portfolioMode === 'tech' ? (
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Blog />
          <Contact />
        </main>
      ) : (
        <main>
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem,5vw,3.5rem)',
                fontWeight: 800,
              }}
            >
              Creative Portfolio
            </h2>
            <p
              style={{
                color: 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.9rem',
              }}
            >
              Coming soon — work in progress
            </p>
          </div>
        </main>
      )}

      {/* ── Footer ── */}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
