/* ─── Contact.jsx ──────────────────────────────────────────────
   2-column: 5 link cards (left) + EmailJS form (right).
   NO pin. NO scrub. Entrance via ScrollTrigger toggleActions.
   Status: idle | sending | sent | error. Mailto fallback on error.
   ──────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import emailjs from 'emailjs-com'

/* ─── EMAILJS SETUP (5 min) ────────────────────────────────────
   1. Go to https://emailjs.com → sign up free
   2. Email Services → Add Gmail → copy SERVICE_ID
   3. Email Templates → create template with vars:
      {{from_name}}, {{from_email}}, {{message}}
      → copy TEMPLATE_ID
   4. Account → API Keys → copy PUBLIC_KEY
   5. Replace the 3 strings below
──────────────────────────────────────────────────────────────── */
const SERVICE_ID  = 'YOUR_SERVICE_ID'   // ← replace
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID' // ← replace
const PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'  // ← replace

const LINKS = [
  {
    color: 'var(--cyan)',
    label: 'EMAIL',
    value: 'k.anish9461@gmail.com',
    href: 'mailto:k.anish9461@gmail.com',
  },
  {
    color: 'var(--violet)',
    label: 'PHONE',
    value: '+91-9599643608',
    href: 'tel:+919599643608',
  },
  {
    color: 'var(--cyan)',
    label: 'LINKEDIN',
    value: '/in/anish-kumar295/',
    href: 'https://www.linkedin.com/in/anish-kumar295/',
  },
  {
    color: 'var(--violet)',
    label: 'GITHUB',
    value: 'github.com/anish295',
    href: 'https://github.com/anish295',
  },
  {
    color: 'var(--amber)',
    label: 'LEETCODE',
    value: 'leetcode.com/u/anish_295/',
    href: 'https://leetcode.com/u/anish_295/',
  },
]

const inputStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  color: 'var(--text)',
  background: 'var(--input-bg)',
  border: '1px solid var(--glass-border)',
  borderRadius: 12,
  padding: '14px 18px',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.3s, box-shadow 0.3s',
}

export default function Contact() {
  const sectionRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.contact-heading', {
        y: 60, opacity: 0, duration: 0.9, ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.contact-link-card', {
        x: -40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'expo.out',
        scrollTrigger: {
          trigger: '.contact-links',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.contact-form-card', {
        x: 40, opacity: 0, duration: 0.8, ease: 'expo.out',
        scrollTrigger: {
          trigger: '.contact-form-card',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  formData.name,
          from_email: formData.email,
          message:    formData.message,
          to_email:   'k.anish9461@gmail.com',
        },
        PUBLIC_KEY
      )
      setStatus('sent')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section
      ref={sectionRef}
      className="section"
      id="contact"
      style={{ minHeight: 'auto', padding: '100px 8%' }}
    >
      <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto' }}>
        <h2
          className="contact-heading section-heading"
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          Let's <span className="gradient-text">Connect</span>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 48,
            alignItems: 'start',
          }}
        >
          {/* ── Left: Link Cards ── */}
          <div className="contact-links" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="contact-link-card glass-card"
                data-cursor="pointer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '16px 22px', textDecoration: 'none',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(4px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
              >
                {/* Colored dot */}
                <div
                  style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: link.color, boxShadow: `0 0 12px ${link.color}`,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                      color: 'var(--text-muted)', letterSpacing: '0.1em',
                      textTransform: 'uppercase', marginBottom: 2,
                    }}
                  >
                    {link.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>
                    {link.value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* ── Right: Form ── */}
          <div className="contact-form-card glass-card" style={{ padding: 36 }}>
            {status === 'sent' ? (
              <div
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', minHeight: 300, gap: 16,
                }}
              >
                <div style={{ fontSize: '3rem', color: '#22c55e' }}>✓</div>
                <h3
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}
                  className="gradient-text"
                >
                  Message Sent!
                </h3>
                <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', textAlign: 'center' }}>
                  I'll reply within 24h.
                </p>
              </div>
            ) : status === 'error' ? (
              <div
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', minHeight: 300, gap: 16,
                }}
              >
                <div style={{ fontSize: '3rem', color: '#ef4444' }}>✗</div>
                <h3
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem' }}
                >
                  Something went wrong.
                </h3>
                <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', textAlign: 'center' }}>
                  Email me directly:{' '}
                  <a
                    href="mailto:k.anish9461@gmail.com"
                    style={{ color: 'var(--accent)', textDecoration: 'underline' }}
                  >
                    k.anish9461@gmail.com
                  </a>
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  data-cursor="pointer"
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
                    color: 'var(--accent)', padding: '10px 24px',
                    borderRadius: 8, border: '1px solid var(--accent)',
                    background: 'none', cursor: 'pointer',
                    marginTop: 8, transition: 'all 0.3s',
                  }}
                >
                  Try Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Name + Email row */}
                <div
                  className="form-field"
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}
                >
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--accent)'
                      e.target.style.boxShadow = '0 0 0 2px var(--glow-cyan)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--glass-border)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  <input
                    type="email"
                    name="email"
                    id="contact-email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--accent)'
                      e.target.style.boxShadow = '0 0 0 2px var(--glow-cyan)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--glass-border)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Message */}
                <div className="form-field" style={{ marginBottom: 24 }}>
                  <textarea
                    name="message"
                    id="contact-message"
                    placeholder="Your message..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--accent)'
                      e.target.style.boxShadow = '0 0 0 2px var(--glow-cyan)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--glass-border)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Submit */}
                <div className="form-field">
                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={status === 'sending'}
                    data-cursor="pointer"
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
                      fontWeight: 600, letterSpacing: '0.06em',
                      padding: '14px 40px', borderRadius: 12,
                      border: 'none', background: 'var(--gradient)',
                      color: 'var(--bg)', cursor: status === 'sending' ? 'wait' : 'pointer',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      width: '100%', opacity: status === 'sending' ? 0.7 : 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                    onMouseEnter={(e) => {
                      if (status !== 'sending') {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 8px 30px var(--glow-cyan)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {status === 'sending' ? (
                      <>
                        <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                        Sending...
                      </>
                    ) : (
                      'Send Message →'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          #contact > div > div:nth-child(2) { grid-template-columns: 1fr !important; }
          .form-field > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
