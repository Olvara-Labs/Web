# Olvara Labs — Landing Page

> Premium, platinum-standard web presence for the Olvara Labs cybersecurity startup.

Olvara Labs is building next-generation security tools for the modern enterprise. This project serves as the corporate landing page, designed with a focus on visual excellence, performance, and seamless interactive experiences.

---

## 💎 Design Philosophy

The project follows a "platinum-standard" aesthetic using:
- **Nature-Inspired Visuals**: The "nano banana" theme and parallax botanical elements.
- **Glassmorphism**: Custom Tailwind `@utility glass` for translucent, blurred backdrops.
- **Fluid Interactions**: Bespoke circular reveal transitions triggered by user interaction coordinates.
- **Premium Typography**: Using [Manrope](https://fonts.google.com/specimen/Manrope) for a clean, modern feel.
- **Micro-Animations**: Subtle framer-motion transitions that respond to scroll and hover.

## 🛠 Tech Stack

- **Core**: [React 19](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **3D Engine**: [Three.js](https://threejs.org/) via `@react-three/fiber` and `@react-three/drei`

## 🏗 Architecture & Optimizations

- **Hash-based Routing**: Smooth SPA navigation using `#home`, `#products`, and `#about`.
- **Code Splitting**: Heavy components (Three.js 3D logo) are lazily loaded using `React.lazy()` + `Suspense` to optimize initial TTI (Time to Interactive).
- **Conditional 3D**: 3D rendering is decoupled using `useInView` — it only executes when visible in the viewport to conserve system resources.
- **Shared Constants**: Global design tokens (colors, transition curves) are centralized in `App.tsx` for consistency.
- **Type Safety**: Fully typed components and context providers ensures maintainability.

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## 📄 License
© 2026 Olvara Labs. All rights reserved.
