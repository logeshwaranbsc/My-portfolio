# MASTER PROMPT — Logeshwaran Selvam Portfolio (Interactive / Animation-Rich)

Paste this whole thing into Claude Code, v0, Cursor, or Claude chat to generate the site.

---

## 1. ROLE & GOAL

Build a modern, animation-rich personal portfolio website for a Full-Stack
Developer. Match the **layout structure and section flow** of the reference
template (Hero → About → Skills → Services → Portfolio → Contact, dark theme,
single accent color, sticky nav) but with fully original visual design,
my real content, and significantly more sophisticated motion design than the
reference (which only has static progress bars and a plain grid).

## 2. TECH STACK (required)

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — layout animations, `layoutId` shared-element modals, scroll-linked transforms
- **GSAP** (+ ScrollTrigger) — timeline scrubbing, SVG path drawing, pinned sections
- **React Three Fiber** + drei — one subtle 3D element (hero background or an interactive card), not overused
- Fonts via `next/font` (pick a distinctive display font for headings + clean sans for body — avoid default Inter-only look)
- Icons: `lucide-react`

## 3. DESIGN DIRECTION

- Dark theme base (`#0a0a0f`–`#12141c` range), one confident accent color
  (pick something more distinctive than generic cyan — e.g. an electric
  lime, warm amber, or violet — to differentiate from the reference template)
- Generous whitespace, large confident type scale for name/headline
- Avoid "AI-generated template" look: asymmetric layouts, layered depth,
  subtle grain/noise texture or gradient mesh backgrounds, not flat cards
  with drop shadows
- Reference template's structure to keep: fixed top nav (Home/About/Skills/
  Experience/Portfolio/Contact), hero split (text left, visual right),
  About section with tabbed content, Skills as a visual section, card-based
  Services/Experience, portfolio grid, contact form + footer with socials

## 4. REQUIRED SECTIONS & CONTENT

### 4.1 Nav
Home · About · Skills · Experience · Projects · Contact — sticky, blurred
background on scroll, active-section highlight.

### 4.2 Hero
- "Hi, I'm **Logeshwaran Selvam**"
- "Full-Stack Software Engineer"
- Subtext: Full-Stack Developer building scalable web apps, enterprise
  software, and healthcare solutions using Angular, Vue.js, NestJS,
  ASP.NET, and TypeScript.
- Stats: 2 Years Experience · Chennai, Tamil Nadu
- CTAs: Download CV · View Portfolio
- Socials: Email, LinkedIn (https://linkedin.com/in/logeshwaran-selvam)
- 3D/animated visual on the right (R3F: floating geometric shape, or an
  interactive avatar frame with tilt-on-mouse-move)

### 4.3 About
Bio: passionate Full-Stack Software Engineer designing and developing
modern web applications across healthcare and enterprise domains. Built
responsive frontends, scalable backend APIs, and data-driven dashboards
with Angular, Vue.js, NestJS, ASP.NET, PostgreSQL, MySQL. Enjoys solving
real-world problems, optimizing performance, improving security, and
writing clean maintainable code. Thrives in Agile teams.

Tabs (like reference "Education / Short Course / Experience / Details"):
- **Education**: Bachelor of Computer Science with Cognitive Systems —
  Sri Ramakrishna College of Arts and Science, Coimbatore, Tamil Nadu
  (2021–2024)
- **Experience**: Full-Stack Software Engineer — Finstein Advisory LLP
  (July 2024 – June 2026)
- **Details**: contact/location summary

### 4.4 What I Do (4 categories, icon cards)
- **Frontend Development** — Angular, Vue.js, Nuxt.js, Ionic Angular,
  TypeScript, PrimeNG, Tailwind CSS, Bootstrap
- **Backend Development** — NestJS, Node.js, ASP.NET, REST APIs, Prisma
  ORM, TypeORM
- **Database Design** — PostgreSQL, MySQL
- **Cloud & DevOps** — AWS S3, Azure Blob Storage, Docker, Git, GitLab

### 4.5 Skills
Group by category (Frontend / Backend / Programming / Databases / Cloud /
Tools) — render as animated tag chips or radial/bar meters that fill in on
scroll-into-view, not static bars like the reference.

### 4.6 Experience
**Full-Stack Software Engineer** — Finstein Advisory LLP — July 2024–June 2026
Bullets:
- Developed enterprise web apps using Angular and Vue.js
- Built reusable frontend components for large-scale applications
- Developed REST APIs using NestJS and Node.js
- Created responsive dashboards with Chart.js and D3.js
- Integrated SAP-based enterprise workflows
- Built AI-powered clinical data management features
- Developed medical image upload and annotation modules
- Optimized PostgreSQL and MySQL databases
- Integrated AWS S3 and Azure Blob Storage
- Fixed VAPT security vulnerabilities
- Collaborated with QA, AI, Backend, and Product teams

Render as a **vertical timeline with an SVG line that draws itself as you
scroll** (GSAP ScrollTrigger scrubbing the stroke-dashoffset).

### 4.7 Featured Projects (3 cards → shared-layout modal on click)
1. **Doctor Payroll Management System** — Angular, PrimeNG, TypeScript,
   REST APIs. Payroll system for hospitals automating salary calculation,
   incentives, deductions, doctor payouts. Features: Salary Calculation,
   Incentive Management, Payroll Dashboard, Reports, REST API Integration.
2. **AI Clinical Data Management Platform** — Vue.js, Nuxt.js, Node.js,
   Prisma ORM, PostgreSQL. AI-powered healthcare platform for clinical
   datasets, medical image annotation, QC, clinical evaluation. Features:
   DICOM Image Upload, Medical Image Annotation, Quality Control Workflow,
   Clinical Evaluation, AI Dataset Management.
3. **Enterprise Dashboard** — Vue.js, Nuxt.js, D3.js, Chart.js. Interactive
   dashboards with real-time business insights. Features: Analytics
   Dashboard, Interactive Charts, Performance Reports, Business Insights.

Each card: 3D tilt on hover (rotateX/rotateY tied to cursor position) +
spotlight gradient following the cursor. Click → Framer Motion `layoutId`
expands the card into a full detail modal (same element morphs, doesn't
just fade in a new one).

### 4.8 Contact
Form: First Name, Last Name, Phone, Subject, Email, Message, Submit.
Animated validation states (border color/shake on error, checkmark morph
on valid field, submit button loading → success morph). Contact info:
- Email: logeshwarans159@gmail.com
- Phone: +91 9342787758
- Location: Chennai, Tamil Nadu
- LinkedIn: https://linkedin.com/in/logeshwaran-selvam

### 4.9 Footer
Tagline: "Building Modern Web Applications with Passion." Socials, back-to-top button.

## 5. ANIMATION SPEC (this is the core differentiator — implement all of these)

1. **Magnetic buttons** — CTA buttons and nav items pull slightly toward
   the cursor within a radius, spring back on leave (Framer Motion
   `useSpring` + mousemove offset).
2. **Cursor spotlight** — radial gradient mask that follows the cursor
   across dark sections, revealing a lighter glow.
3. **3D card tilt** — project cards and skill cards tilt in 3D
   (perspective + rotateX/rotateY) based on pointer position, with a
   glare/spotlight highlight layer.
4. **Scroll-progress SVG timeline** — experience timeline's connecting
   line draws itself via `stroke-dashoffset` scrubbed to scroll position.
5. **Parallax layers** — hero background elements and section imagery
   move at different scroll speeds (Framer Motion `useScroll` +
   `useTransform`).
6. **Shared layout modals** — project card → detail view morphs using
   `layoutId`, not a separate mount/unmount.
7. **Animated form validation** — real-time field state transitions
   (idle → focus → error/success) with micro-animations, not just color swaps.
8. **Page/section entrance choreography** — staggered fade/slide-up on
   scroll-into-view for headings, cards, and list items (Framer Motion
   `whileInView` + stagger children).
9. Respect `prefers-reduced-motion` — provide a reduced-motion fallback
   for every animation above.

## 6. PERFORMANCE / QUALITY BAR

- Fully responsive (mobile-first), test at 375px / 768px / 1440px
- Lighthouse performance-conscious: lazy-load below-fold sections/images,
  keep R3F scene lightweight
- Semantic HTML, accessible labels on the form, keyboard-navigable nav
  and modal (focus trap + Esc to close)
- Clean component structure: `components/sections/*`, `components/ui/*`,
  reusable animation primitives (`MagneticButton`, `TiltCard`,
  `SpotlightCursor`, `RevealOnScroll`)

## 7. DELIVERABLE

Generate the full Next.js project structure with all components, content
wired in from the data above (no lorem ipsum), and the animation
primitives implemented and actually used in the sections — not just
imported and unused.
