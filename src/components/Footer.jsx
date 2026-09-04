/* ─── Footer.jsx ──────────────────────────────────────────────
   Info row + 2-row marquee ticker.
   Row 1: "ANISH KUMAR" solid, scrolls left (20s)
   Row 2: dev keywords outlined, scrolls right (24s)
   Duplicate content for seamless loop. Hover pauses.
   ──────────────────────────────────────────────────────────── */

export default function Footer() {
  /* Row 1 content — solid accent color */
  const row1 = 'ANISH KUMAR'
  const row1Content = Array(6).fill(null).map((_, i) => (
    <span key={i}>
      <span className="marquee-text marquee-text--solid">{row1}</span>
      <span className="marquee-dot">•</span>
    </span>
  ))

  /* Row 2 content — outlined */
  const row2Items = ['FULL STACK DEV', 'NSUT', 'REACT', 'NODE.JS', 'AI BUILDER']
  const row2Content = Array(4).fill(null).map((_, i) => (
    <span key={i}>
      {row2Items.map((item, j) => (
        <span key={`${i}-${j}`}>
          <span className="marquee-text marquee-text--outlined">{item}</span>
          <span className="marquee-dot">•</span>
        </span>
      ))}
    </span>
  ))

  return (
    <footer className="footer">
      {/* Info row */}
      <p className="footer-info">
        Designed &amp; built by Anish Kumar · React + Vite · 2026
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
