# Anish Kumar — Personal Portfolio

A modern, highly interactive personal portfolio built with **React 19** and **Vite**. The design focuses on fluid typography, advanced animations, and a premium "glassmorphic" aesthetic. 

The site includes advanced features like a globally synced Light/Dark theme, a custom interaction cursor, and heavily optimized GSAP-powered scroll animations.

---

## ✨ Features

- **Advanced Animations:** Scroll-triggered reveals, continuous marquees, and cinematic project overlays built with `GSAP` and `ScrollTrigger`.
- **Canvas Particle Engine:** Interactive, connected node particles rendered via HTML5 Canvas on the Hero section (disabled on mobile for performance).
- **Dual Toggles:**
  - **Theme Toggle:** Fully custom SVG spring-animated toggle for switching between Light and Dark mode.
  - **Portfolio Mode:** "Tech" vs "Creative" toggle system built right into the navigation bar.
- **Custom Cursor:** A dynamic, physics-based custom cursor that scales and interacts with `data-cursor="pointer"` elements.
- **Form Integration:** Fully functional, client-side email delivery using `@emailjs/browser`.
- **Cinematic Overlays:** Fully custom project detail modals using theme-agnostic dark mode colors, backdrop filters, and radial gradient glows.
- **Responsive:** Mobile-first navigation, fluid typography (`clamp()`), and adaptive grid layouts.

## 🛠️ Tech Stack

- **Core:** React 19, Vite 8
- **Animations:** GSAP 3 (Core + ScrollTrigger), Framer Motion
- **Styling:** Vanilla CSS (`global.css`) with CSS Variables for theming. No utility classes.
- **Utilities:** `react-scroll` (smooth navigation), `react-type-animation` (typing effects)
- **Forms:** EmailJS

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anish295/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure EmailJS:**
   In `src/components/Contact.jsx`, replace the placeholder keys with your actual EmailJS credentials if you want the contact form to work:
   ```javascript
   const SERVICE_ID  = 'your_service_id'
   const TEMPLATE_ID = 'your_template_id'
   const PUBLIC_KEY  = 'your_public_key'
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

## 📦 Build for Production

To create an optimized production build:
```bash
npm run build
```
This will generate a `dist` folder ready to be deployed to Vercel, Netlify, GitHub Pages, or any static hosting service. You can test the build locally using:
```bash
npm run preview
```

## 🎨 Architecture & CSS Strategy

This project intentionally avoids Tailwind or UI libraries to maintain complete control over the intricate glassmorphic aesthetic and complex animation timings.

- **`global.css`**: Contains all design tokens (CSS variables), typography rules, and component styles (like `.glass-card`, `.btn-primary`).
- **`ThemeContext.jsx`**: A React Context provider that manages the `dark`/`light` mode state and injects the corresponding CSS variable overrides onto the `document.documentElement`.
- **Inline Styles**: Used specifically for GSAP animation targets or highly dynamic logic (like the custom ThemeToggle sliding physics).

---

Designed and developed by **Anish Kumar**. 
