/* ─── ThemeToggle.jsx ──────────────────────────────────────────
   Moon/Sun pill toggle. Dark = moon highlighted (left).
   Light = sun highlighted (right). Sliding circle indicator.
   ──────────────────────────────────────────────────────────── */
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: 72,
        height: 36,
        borderRadius: 100,
        background: isDark ? '#1a1a2e' : '#e8e0d4',
        border: isDark
          ? '1px solid rgba(255,255,255,0.1)'
          : '1px solid rgba(139,69,19,0.2)',
        cursor: 'pointer',
        padding: '4px',
        transition: 'background 0.4s ease',
        flexShrink: 0,
        outline: 'none',
      }}
    >
      {/* Sliding highlight circle */}
      <span
        style={{
          position: 'absolute',
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: isDark ? '#2d2d4a' : '#fff',
          boxShadow: isDark
            ? '0 0 12px rgba(0,245,255,0.3)'
            : '0 2px 8px rgba(0,0,0,0.15)',
          left: isDark ? 4 : 40,
          transition: 'left 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          pointerEvents: 'none',
        }}
      />

      {/* Moon icon */}
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          width: 28,
          height: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          opacity: isDark ? 1 : 0.4,
          transition: 'opacity 0.3s',
        }}
      >
        🌙
      </span>

      {/* Sun icon */}
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          width: 28,
          height: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          opacity: isDark ? 0.4 : 1,
          transition: 'opacity 0.3s',
        }}
      >
        ☀️
      </span>
    </button>
  )
}
