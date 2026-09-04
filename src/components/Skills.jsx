/* ─── Skills.jsx ───────────────────────────────────────────────
   4 cards stacked VERTICALLY — one per row, full width.
   Each card appears as user scrolls into view (NO pin, NO scrub).
   Logo grid with real devicon SVGs + fallback. Stagger on icons.
   ──────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/'

const SKILL_CARDS = [
  {
    id: 'card-languages',
    icon: '</>',
    title: 'Languages',
    skills: [
      { name: 'C',          logo: `${DEVICON}c/c-original.svg` },
      { name: 'C++',        logo: `${DEVICON}cplusplus/cplusplus-original.svg` },
      { name: 'Python',     logo: `${DEVICON}python/python-original.svg` },
      { name: 'Java',       logo: `${DEVICON}java/java-original.svg` },
      { name: 'JavaScript', logo: `${DEVICON}javascript/javascript-original.svg` },
      { name: 'HTML',       logo: `${DEVICON}html5/html5-original.svg` },
      { name: 'CSS',        logo: `${DEVICON}css3/css3-original.svg` },
    ],
  },
  {
    id: 'card-frameworks',
    icon: '⬡',
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'React',     logo: `${DEVICON}react/react-original.svg` },
      { name: 'Next.js',   logo: `${DEVICON}nextjs/nextjs-original.svg`, invert: true },
      { name: 'Node.js',   logo: `${DEVICON}nodejs/nodejs-original.svg` },
      { name: 'Express',   logo: `${DEVICON}express/express-original.svg`, invert: true },
      { name: 'Tailwind',  logo: `${DEVICON}tailwindcss/tailwindcss-original.svg` },
      { name: 'Socket.io', logo: `${DEVICON}socketio/socketio-original.svg`, invert: true },
      { name: 'Pandas',    logo: `${DEVICON}pandas/pandas-original.svg` },
      { name: 'NumPy',     logo: `${DEVICON}numpy/numpy-original.svg` },
      { name: 'Matplotlib',logo: `${DEVICON}matplotlib/matplotlib-original.svg` },
    ],
  },
  {
    id: 'card-tools',
    icon: '⚙',
    title: 'Developer Tools',
    skills: [
      { name: 'Git',      logo: `${DEVICON}git/git-original.svg` },
      { name: 'GitHub',   logo: `${DEVICON}github/github-original.svg`, invert: true },
      { name: 'VS Code',  logo: `${DEVICON}vscode/vscode-original.svg` },
      { name: 'MySQL',    logo: `${DEVICON}mysql/mysql-original.svg` },
      { name: 'MongoDB',  logo: `${DEVICON}mongodb/mongodb-original.svg` },
      { name: 'Vite',     logo: `${DEVICON}vitejs/vitejs-original.svg` },
      { name: 'Postman',  logo: `${DEVICON}postman/postman-original.svg` },
      { name: 'Anaconda', logo: `${DEVICON}anaconda/anaconda-original.svg` },
    ],
  },
  {
    id: 'card-ai',
    icon: '◈',
    title: 'AI & Prompt Engineering',
    skills: [
      {
        name: 'Claude',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg',
      },
      {
        name: 'ChatGPT',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
      },
      {
        name: 'Gemini',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/120px-Google_Gemini_logo.svg.png',
      },
      {
        name: 'Grok',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Grok_AI_icon.svg/240px-Grok_AI_icon.svg.png',
        invert: true,
      },
      {
        name: 'Groq',
        logo: 'https://avatars.githubusercontent.com/u/128487927',
      },
      {
        name: 'Copilot',
        logo: 'https://github.githubassets.com/images/modules/site/copilot/copilot.png',
      },
      {
        name: 'Google GenAI',
        logo: `${DEVICON}google/google-original.svg`,
      },
    ],
  },
]

function SkillLogo({ name, logo, invert }) {
  const { theme } = useTheme()
  const [imgError, setImgError] = useState(false)
  const shouldInvert = invert && theme === 'dark'

  return (
    <div
      className="logo-item"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-card)',
          borderRadius: 12,
          border: '1px solid var(--glass-border)',
          padding: 8,
          transition: 'all 0.25s ease',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0,245,255,0.4)'
          e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)'
          e.currentTarget.style.boxShadow = '0 8px 24px var(--glow)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--glass-border)'
          e.currentTarget.style.transform = 'none'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {logo && !imgError ? (
          <>
            <img
              src={logo}
              alt={name}
              width={36}
              height={36}
              style={{
                objectFit: 'contain',
                filter: shouldInvert
                  ? 'invert(1) brightness(2)'
                  : theme === 'light' && name === 'Grok'
                  ? 'none'
                  : 'brightness(0.95)',
              }}
              onError={() => setImgError(true)}
            />
          </>
        ) : (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: name.length > 3 ? '0.55rem' : '0.85rem',
              color: 'var(--accent)',
            }}
          >
            {name.slice(0, 3)}
          </span>
        )}
      </div>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
          maxWidth: 64,
          lineHeight: 1.2,
        }}
      >
        {name}
      </span>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      /* Heading */
      gsap.from('.skills-heading', {
        y: 60, opacity: 0, duration: 0.9, ease: 'expo.out',
        scrollTrigger: {
          trigger: '.skills-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      /* Each card — separate ScrollTrigger */
      SKILL_CARDS.forEach((card) => {
        const selector = `#${card.id}`

        gsap.from(selector, {
          y: 60, opacity: 0, duration: 0.8, ease: 'expo.out',
          scrollTrigger: {
            trigger: selector,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        })

        gsap.from(`${selector} .logo-item`, {
          scale: 0.5, opacity: 0, stagger: 0.05, duration: 0.5, ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: selector,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section"
      id="skills"
      style={{ minHeight: 'auto', padding: '100px 8%' }}
    >
      <div style={{ maxWidth: 900, width: '100%', margin: '0 auto' }}>
        {/* Heading */}
        <h2
          className="skills-heading section-heading"
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          Tech <span className="gradient-text">Stack</span>
        </h2>

        {/* Stacked cards — one per row */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {SKILL_CARDS.map((card) => (
            <div
              key={card.id}
              id={card.id}
              className="glass-card"
              style={{ padding: 36, width: '100%' }}
            >
              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.2rem',
                    color: 'var(--accent)',
                    width: 44,
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--glow-cyan)',
                    borderRadius: 12,
                    background: 'var(--glow-cyan)',
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                  }}
                >
                  {card.title}
                </h3>
              </div>

              {/* Logo grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
                  gap: 20,
                }}
              >
                {card.skills.map((skill) => (
                  <SkillLogo key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
