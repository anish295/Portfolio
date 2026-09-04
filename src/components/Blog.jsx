/* ─── Blog.jsx ─────────────────────────────────────────────────
   3 blog cards side by side. Click to expand/collapse via GSAP.
   NO pin. NO scrub. Entrance via ScrollTrigger toggleActions.
   Real ~200-word content per post.
   ──────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const POSTS = [
  {
    color: 'var(--cyan)',
    tag: 'AI & Dev',
    readTime: '6 min read',
    date: 'Aug 2026',
    title: 'How I use Claude & Copilot to 10x my coding speed',
    excerpt:
      'A deep dive into my AI-assisted development workflow — prompt patterns, code review strategies, and how I leverage multiple LLMs in tandem.',
    fullContent: `When I first started using AI coding assistants, I treated them like fancy autocomplete. That changed when I discovered the power of structured prompting and multi-model workflows.

My daily stack now includes Claude for architecture decisions and complex refactoring, GitHub Copilot for inline completions and boilerplate, and Gemini for research-heavy tasks. The key insight? Each model has different strengths.

For code review, I pipe my PRs through Claude with a custom prompt that checks for security vulnerabilities, performance anti-patterns, and style consistency. This catches about 80% of issues before human review even starts.

The biggest productivity gain came from building custom prompt templates. Instead of writing ad-hoc prompts, I maintain a library of tested patterns: "Refactor this function to use the Strategy pattern", "Write unit tests covering edge cases for...", "Explain this algorithm's time complexity."

One workflow I'm particularly proud of: I use Copilot to generate initial implementations, then pass them to Claude for review and optimization. The back-and-forth between models produces code that's cleaner than what either would generate alone.

The result? My PR merge time dropped by 60%, and I'm shipping features roughly 3x faster than before. AI doesn't replace thinking — it amplifies it.`,
  },
  {
    color: 'var(--violet)',
    tag: 'Security',
    readTime: '8 min read',
    date: 'Jul 2026',
    title: 'Building ShadowRoom: Zero-Footprint Encryption in the Browser',
    excerpt:
      'How I architected end-to-end encryption with AES-256 and SHA-256 room keys — no accounts, no persistent data, no traces.',
    fullContent: `ShadowRoom started from a simple question: what if a chat application left absolutely zero traces? No accounts, no stored messages, no metadata — just ephemeral, encrypted communication.

The architecture revolves around three pillars: AES-256-GCM for message encryption, SHA-256 for room key derivation, and WebRTC for peer-to-peer file sharing that bypasses the server entirely.

When a user creates a room, the client generates a random room name and derives an encryption key using SHA-256. This key never leaves the browser — the server only sees encrypted blobs. Even if someone compromises the server, they get nothing but ciphertext.

The trickiest part was implementing proper key exchange without a traditional handshake. I solved this by encoding the room key in the shareable link itself (as a URL fragment, which browsers never send to servers). When a peer joins via the link, they derive the same key locally.

For file sharing, I implemented WebRTC data channels with chunked transfer. Files are encrypted client-side before transmission, and the receiving peer decrypts them locally. The server acts only as a signaling relay — it never touches the actual data.

The result is a collaboration tool where privacy isn't a feature — it's the architecture itself.`,
  },
  {
    color: 'var(--amber)',
    tag: 'React',
    readTime: '7 min read',
    date: 'Jun 2026',
    title: 'Decoupled Game Engines in React: Lessons from TeachBetter AI',
    excerpt:
      'Lessons from building a gamified assessment framework — separating Assessment Engine, Game Engine, and Template Loader in React.',
    fullContent: `During my internship at TeachBetter AI, I was tasked with building gamified assessments — Froggy Jump, Treasure Hunt, and Space Runner, each one testing actual curriculum knowledge. The challenge: build three visually distinct games that share the same assessment logic.

The naive approach would be to build three separate components. Instead, I designed a three-layer architecture that decouples concerns completely.

Layer 1: The Assessment Engine handles question sequencing, scoring, time limits, and anti-cheat mechanisms. It exposes a simple API — getNextQuestion(), submitAnswer(), getProgress() — and knows nothing about rendering.

Layer 2: The Game Engine manages game-specific logic — physics for Froggy Jump, pathfinding for Treasure Hunt, collision detection for Space Runner. Each game engine implements a standard interface: onCorrectAnswer(), onWrongAnswer(), onTimeUp().

Layer 3: The Template Loader dynamically imports the right game engine and assessment configuration based on the teacher's setup. Adding a new game type requires zero changes to the assessment logic.

The anti-cheat system was particularly interesting. Tab-visibility detection, copy-paste blocking, and time-anomaly detection all live in the Assessment Engine, so every game gets it for free.

This architecture reduced per-game development time from 3 weeks to 4 days.`,
  },
]

export default function Blog() {
  const sectionRef = useRef(null)
  const [expandedIndex, setExpandedIndex] = useState(null)
  const contentRefs = useRef([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.blog-heading', {
        y: 60, opacity: 0, duration: 0.9, ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.blog-card', {
        y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'expo.out',
        scrollTrigger: {
          trigger: '.blog-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleExpand = (index) => {
    const contentEl = contentRefs.current[index]
    if (!contentEl) return

    if (expandedIndex === index) {
      /* Collapse */
      gsap.to(contentEl, {
        height: 0, opacity: 0, duration: 0.4, ease: 'expo.in',
        onComplete: () => setExpandedIndex(null),
      })
    } else {
      /* Collapse previous */
      if (expandedIndex !== null && contentRefs.current[expandedIndex]) {
        gsap.to(contentRefs.current[expandedIndex], {
          height: 0, opacity: 0, duration: 0.3, ease: 'expo.in',
        })
      }

      /* Expand new */
      setExpandedIndex(index)
      gsap.set(contentEl, { height: 'auto', opacity: 1 })
      const autoHeight = contentEl.offsetHeight
      gsap.fromTo(
        contentEl,
        { height: 0, opacity: 0 },
        { height: autoHeight, opacity: 1, duration: 0.5, ease: 'expo.out' }
      )
    }
  }

  return (
    <section
      ref={sectionRef}
      className="section"
      id="blog"
      style={{ minHeight: 'auto', padding: '100px 8%' }}
    >
      <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto' }}>
        <h2
          className="blog-heading section-heading"
          style={{ textAlign: 'center', marginBottom: 12 }}
        >
          From the <span className="gradient-text">Blog</span>
        </h2>
        <p
          style={{
            textAlign: 'center', color: 'var(--text-sub)',
            maxWidth: 560, margin: '0 auto 48px', lineHeight: 1.7,
          }}
        >
          Thoughts on building, AI-assisted dev, and lessons from real projects.
        </p>

        {/* Cards */}
        <div
          className="blog-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {POSTS.map((post, index) => (
            <div
              key={post.title}
              className="blog-card glass-card"
              data-cursor="pointer"
              onClick={() => toggleExpand(index)}
              style={{
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Top gradient bar */}
              <div style={{ height: 2, background: `linear-gradient(90deg, ${post.color}, transparent)` }} />

              <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Tag + read time */}
                <div
                  style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                      color: post.color, border: `1px solid ${post.color}33`,
                      padding: '3px 10px', borderRadius: 100, letterSpacing: '0.06em',
                    }}
                  >
                    {post.tag}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h4
                  style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: '1.05rem', lineHeight: 1.4, marginBottom: 12,
                  }}
                >
                  {post.title}
                </h4>

                {/* Excerpt */}
                <p style={{ color: 'var(--text-sub)', fontSize: '0.88rem', lineHeight: 1.7, flex: 1 }}>
                  {post.excerpt}
                </p>

                {/* Expanded content */}
                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  style={{ height: 0, opacity: 0, overflow: 'hidden' }}
                >
                  <div
                    style={{
                      paddingTop: 16, borderTop: '1px solid var(--glass-border)',
                      marginTop: 16, color: 'var(--text-sub)',
                      fontSize: '0.85rem', lineHeight: 1.85, whiteSpace: 'pre-line',
                    }}
                  >
                    {post.fullContent}
                  </div>
                </div>

                {/* Footer: date + toggle */}
                <div
                  style={{
                    borderTop: '1px solid var(--glass-border)', marginTop: 20, paddingTop: 16,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {post.date}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: post.color }}>
                    {expandedIndex === index ? 'Close ×' : 'Read →'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #blog .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
