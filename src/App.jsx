/* ─── App.jsx ─────────────────────────────────────────────────
   Root layout — ThemeProvider, custom Cursor, ambient orbs,
   film grain, scroll progress bar, and all section components.
   ──────────────────────────────────────────────────────────── */
import { useEffect, useRef } from 'react'
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

  return (
    <>
      {/* ── Custom Cursor ── */}
      <Cursor />

      {/* ── Scroll Progress ── */}
      <div ref={progressRef} className="scroll-progress" />

      {/* ── Ambient Background ── */}
      <div className="ambient-grid" />
      <div ref={orbVioletRef} className="ambient-orb ambient-orb--violet" />
      <div ref={orbCyanRef} className="ambient-orb ambient-orb--cyan" />

      {/* ── Film Grain ── */}
      <div className="film-grain" />

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Sections ── */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Blog />
        <Contact />
      </main>

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
