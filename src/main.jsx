/* ─── main.jsx ────────────────────────────────────────────────
   Entry point — register GSAP plugins, render React root.
   NO normalizeScroll. NO pin config. Normal scroll only.
   ──────────────────────────────────────────────────────────── */
import React from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App'
import './styles/global.css'

/* Register GSAP plugins globally */
gsap.registerPlugin(ScrollTrigger)

/* Suppress null target warnings */
gsap.config({ nullTargetWarn: false })

/* Defaults */
gsap.defaults({
  ease: 'power3.out',
  duration: 1,
})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
