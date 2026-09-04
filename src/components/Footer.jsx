/* ─── Footer.jsx ──────────────────────────────────────────────
   Info row + 2-row marquee ticker.
   Row 1: "ANISH KUMAR • FULL-STACK DEV •" solid, scrolls left (20s)
   Row 2: "BUILDING THE WEB ONE COMMIT AT A TIME •" outlined, scrolls right (28s)
   Duplicate content for seamless loop. Hover pauses.
   ──────────────────────────────────────────────────────────── */

export default function Footer() {
  /* Row 1 content — solid accent color */
  const row1Text = 'ANISH KUMAR • FULL-STACK DEV • '
  const row1Content = Array(8).fill(null).map((_, i) => (
    <span key={i} className="marquee-text marquee-text--solid">{row1Text}</span>
  ))

  /* Row 2 content — outlined */
  const row2Text = 'BUILDING THE WEB ONE COMMIT AT A TIME • '
  const row2Content = Array(8).fill(null).map((_, i) => (
    <span key={i} className="marquee-text marquee-text--outlined">{row2Text}</span>
  ))

  return (
    <footer className="footer">
      {/* Info row */}
      <p className="footer-info">
        Designed &amp; built by Anish Kumar · 2026
      </p>

      {/* Marquee Row 1 — left scroll */}
      <div className="marquee-container">
        <div className="marquee-track marquee-track--left">
          {row1Content}
          {/* Duplicate for seamless loop */}
          {row1Content}
        </div>
      </div>

      {/* Marquee Row 2 — right scroll */}
      <div className="marquee-container" style={{ marginTop: 8 }}>
        <div className="marquee-track marquee-track--right">
          {row2Content}
          {/* Duplicate for seamless loop */}
          {row2Content}
        </div>
      </div>
    </footer>
  )
}
