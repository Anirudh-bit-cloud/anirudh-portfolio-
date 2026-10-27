# Anirudh Saini — Personal Portfolio

An editorial, typographic-led personal portfolio for **Anirudh Saini** — Machine Learning Trainee at C-DAC MEPZ and Computer Science undergraduate at SRMIST.

Designed with an Awwwards-inspired art direction: intentional typography, asymmetric layout, velocity-reactive infinite marquees, physics-based magnetic interactions, Lenis smooth scrolling, and custom micro-interactions.

---

## ✦ Art Direction & Aesthetic

- **Design Philosophy:** Neo-editorial brutalism with high-contrast type and hairline rules.
- **Palette:** Near-black Obsidian (`#0b0c0e`) with Bone White text and an **Acid Lime** (`#d4ff3f`) accent. Full dark/light mode toggle with stored preference.
- **Typography:**
  - Display: `Syne` (Geometric & High-Impact)
  - Editorial Accent: `Instrument Serif` (Italic Serifs)
  - Body: `Inter`
  - Technical Data & Code: `JetBrains Mono`
- **Animation System:**
  - Lenis smooth scroll provider.
  - Interactive custom cursor with follower ring and dynamic label states (`VIEW`, `OPEN`).
  - Spring-physics magnetic buttons and link targets.
  - Masked line-by-line SplitText reveals with custom cubic-bezier easing (`[0.76, 0, 0.24, 1]`).
  - Session-guarded preloader counter (00–100%) with instant skip capability.
  - Velocity-reactive typographic marquee for toolchain items.
  - Strict compliance with `prefers-reduced-motion`.

---

## ✦ Technical Highlights & Architecture

- **Next.js 15 App Router** with TypeScript strict mode.
- **Tailwind CSS 3** with custom theme tokens and hairline utilities.
- **Framer Motion 12** for choreographed physics transitions.
- **Zero AI Tells:** No generic gradient text, no glow blobbing, no fake live telemetry logs, no emojis, no bento-grid filter pills, and no confetti.
- **Real Verified Content:**
  - SRMIST B.Tech CSE (8.70 / 10.00 CGPA).
  - C-DAC MEPZ 400-hour industry ML specialization.
  - Real projects: Adaptive Study Twin (FastAPI, Scikit-learn, 88% accuracy), Thinklytics (Optuna HPO, SHAP XAI), and Online Examination System (Spring Boot, MySQL, RBAC).
  - Real credentials: NPTEL Java, SRMIST Advanced Java & DSA in C, LeetCode (30+ solved).

---

## ✦ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

```bash
# Production build
npm run build
npm run start
```
