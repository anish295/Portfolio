/* ─── ThemeToggle.jsx ──────────────────────────────────────────
   Clean pill toggle — no emoji. A smooth sliding knob with a
   subtle icon drawn in CSS/SVG. Dark = moon (left), Light = sun (right).
   ──────────────────────────────────────────────────────────── */
import { useTheme } from '../context/ThemeContext'

/* Minimal SVG moon */
const Moon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

/* Minimal SVG sun */
const Sun = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      data-cursor="pointer"
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        width: 64,
        height: 34,
        borderRadius: 100,
        padding: 3,
        border: '1px solid var(--glass-border)',
        background: isDark
          ? 'rgba(255,255,255,0.06)'
          : 'rgba(0,0,0,0.07)',
        cursor: 'none',
        outline: 'none',
        flexShrink: 0,
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Sliding knob */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 3,
          left: isDark ? 3 : 'calc(100% - 31px)',
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: isDark
            ? 'linear-gradient(135deg, #2a2a4a, #1a1a3a)'
            : 'linear-gradient(135deg, #fff8e7, #fff)',
          boxShadow: isDark
            ? '0 0 0 1px rgba(255,255,255,0.12), 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 0 0 1px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.15)',
          transition: 'left 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isDark ? '#a0c0ff' : '#f59e0b',
          pointerEvents: 'none',
        }}
      >
        {isDark ? <Moon /> : <Sun />}
      </span>

      {/* Track icons — faint, behind knob */}
      <span
        aria-hidden="true"
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          padding: '0 7px',
          pointerEvents: 'none',
          position: 'relative',
          zIndex: 0,
        }}
      >
        <span style={{ color: isDark ? 'var(--accent)' : 'var(--text-muted)', opacity: 0.4, display: 'flex', alignItems: 'center' }}>
          <Moon />
        </span>
        <span style={{ color: isDark ? 'var(--text-muted)' : '#f59e0b', opacity: 0.4, display: 'flex', alignItems: 'center' }}>
          <Sun />
        </span>
      </span>
    </button>
  )
}
