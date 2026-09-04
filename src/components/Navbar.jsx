/* ─── Navbar.jsx ──────────────────────────────────────────────
   Fixed, scroll-aware navigation with glassmorphism blur.
   Layout: [AK.dev] ─── [links center] ─── [PortfolioToggle | ThemeToggle]
   NO résumé button. Uses react-scroll for smooth nav.
   ──────────────────────────────────────────────────────────── */
import { useState, useEffect } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import ThemeToggle from './ThemeToggle'
import PortfolioToggle from './PortfolioToggle'

const NAV_ITEMS = [
  { label: 'about', to: 'about' },
  { label: 'skills', to: 'skills' },
  { label: 'projects', to: 'projects' },
  { label: 'experience', to: 'experience' },
  { label: 'blog', to: 'blog' },
  { label: 'contact', to: 'contact' },
]

export default function Navbar({ portfolioMode, setPortfolioMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        {/* Logo */}
        <div
          className="nav-logo"
          data-cursor="pointer"
          style={{ cursor: 'none' }}
        >
          <span className="logo-cyan">AK</span>
          <span className="logo-muted">.dev</span>
        </div>

        {/* Desktop links (center) */}
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <ScrollLink
                className="nav-link"
                to={item.to}
                smooth
                duration={800}
                offset={-72}
                spy
                data-cursor="pointer"
                style={{ cursor: 'none' }}
              >
                {item.label}
              </ScrollLink>
            </li>
          ))}
        </ul>

        {/* Right side controls — both toggles vertically centered */}
        <div className="nav-right">
          <div className="nav-controls">
            <PortfolioToggle mode={portfolioMode} setMode={setPortfolioMode} />
            <div className="nav-divider" />
            <ThemeToggle />
          </div>

          {/* Hamburger (mobile) */}
          <div
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            role="button"
            aria-label="Toggle menu"
            tabIndex={0}
            data-cursor="pointer"
            style={{ cursor: 'none' }}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <ScrollLink
            key={item.to}
            className="nav-link"
            to={item.to}
            smooth
            duration={800}
            offset={-72}
            onClick={closeMenu}
          >
            {item.label}
          </ScrollLink>
        ))}
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <PortfolioToggle mode={portfolioMode} setMode={setPortfolioMode} />
          <ThemeToggle />
        </div>
      </div>

      <style>{`
        .nav-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-divider {
          width: 1px;
          height: 22px;
          background: var(--glass-border);
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .nav-controls { display: none; }
        }
      `}</style>
    </>
  )
}
