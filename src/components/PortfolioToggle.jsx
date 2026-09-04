/* ─── PortfolioToggle.jsx ───────────────────────────────────────
   Pill toggle: Tech / Creative. Sits left of ThemeToggle in navbar.
   ──────────────────────────────────────────────────────────── */
import { useTheme } from '../context/ThemeContext'

export default function PortfolioToggle({ mode, setMode }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
        border: '1px solid var(--glass-border)',
        borderRadius: 100,
        padding: '4px',
        gap: 2,
        height: 36,
        flexShrink: 0,
        cursor: 'none',
      }}
    >
      {['tech', 'creative'].map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          data-cursor="pointer"
          style={{
            padding: '0 14px',
            height: 28,
            borderRadius: 100,
            border: 'none',
            cursor: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            transition: 'all 0.25s ease',
            background: mode === m
              ? 'var(--accent)'
              : 'transparent',
            color: mode === m
              ? (isDark ? '#000' : '#fff')
              : 'var(--text-muted)',
            whiteSpace: 'nowrap',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {m === 'tech' ? 'Tech' : 'Creative'}
        </button>
      ))}
    </div>
  )
}
