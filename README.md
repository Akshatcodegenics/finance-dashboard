# Aura Smart UI - Futuristic Finance Dashboard

A futuristic, AI-driven, high-performance finance dashboard building on advanced UI/UX principles, spatial computing aesthetics, and 3D interactions.

## 🚀 Features & Unique Additions
- **Smart Insights Engine:** A floating 3D orb representing an AI that analyzes transactions and formulates human-readable action points.
- **Glassmorphic 3D Cards:** Tilted, mouse-tracking hover physical cards built with Framer Motion.
- **Spending Heatmap:** A GitHub-style matrix visualization of spending intensity.
- **Goal Tracker:** Simulated progress bar for savings target.
- **Role-Based Views:** Instant viewer vs. admin switching to demonstrate feature flags (add/edit vs read-only).
- **Responsive Geometry:** Scales down gracefully while preserving visual spatial depth to mobile devices.

## 🛠 Tech Stack Architecture
- **React (Vite):** Chosen for unopinionated, blistering-fast HMR and minimal scaffolding.
- **Tailwind CSS v4:** Ultra-fast, zero-config styling with the deepest custom theme configuration.
- **Framer Motion:** Handling complex spring-based physics for 120fps smooth card 3D tilt without manual `requestAnimationFrame` hooks.
- **Zustand:** Ultra-minimalist global state manager without the boilerplate of Redux, seamlessly handling role switches and transaction arrays.
- **Recharts:** Clean, decoupled charting elements heavily restyled using SVG gradients.

## 📦 Setup & Development
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5173`

## ☁️ Deployment (Vercel / Netlify)
**Vercel / Netlify:**
1. Connect this repository to your platform.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Deploy!

### Design Decisions
- Focused heavily on cognitive load reduction.
- Switched default colors to a deep obsidian (`#0B0E14`) instead of purely black to add subtle spatial warmth.
- Ensured 8px grid alignment across all components heavily reducing random padding shifts.

### Future Improvements
- Connect to actual plaid/banking APIs.
- Enhance heatmaps with 3D canvas instead of simple DIVs when data scales >10k rows.
- Full offline support via PWA.
