# IMATE — iMate Engineering website

Vite + React 18 + TypeScript + Tailwind v4 + Framer Motion + Lenis + Lucide.

Brand: navy `#101D32`, orange `#E87532`, light grey `#F3F5F7`, charcoal `#202936`. Headings Manrope, body Inter. Tokens live in `src/index.css` (`@theme`).

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run preview
```

## Structure

```
src/
  data/site.ts      all copy, contacts, capabilities, machines, products, awards, clients
  data/blog.ts      blog posts (add new posts here)
  components/       Header, Footer, Button, Section/PageHero, Reveal (scroll animations),
                    EnquiryForm, MapEmbed, Rail, Lightbox, LogoMarquee, Counter, Cta
  pages/            one file per route
  hooks/useSeo.ts   per-page title, description, canonical, Open Graph
```

## Routes

Match the old WordPress URLs so search rankings carry over:

`/`, `/profile`, `/vision-mission`, `/capabilities`, `/machineries`, `/products`, `/products/:id`, `/quality`, `/awards-certifications`, `/blog`, `/blog/:slug`, `/career`, `/contact-us`, plus new `/request-a-quote`. Full redirect map in `docs/EXISTING_ROUTES.md`.

301 redirects (in `vercel.json` and in `App.tsx`): `/about`, `/about-us` → `/profile`; `/awards` → `/awards-certifications`; `/contact`, `/schedule-an-appointment` → `/contact-us`.

## Images

All 80 originals from the old site live in `public/images/YYYY/MM/…` (same layout as the WordPress uploads folder) and are served locally. `src/lib/img.ts` builds the paths; set `VITE_IMG_BASE` only if you move them to a CDN. `npm run images` re-downloads them from the old site if ever needed.

## Enquiry form

Real submission, no fake success state. Set `VITE_FORM_ENDPOINT` (and `VITE_FORM_ACCESS_KEY` for Web3Forms) in `.env`; see `.env.example`. With no endpoint configured the form opens the visitor's mail client with the enquiry pre-filled and tells them so.

## Animations

- Preloader with 0 to 100 counter on first load of a session (`Preloader.tsx`, skipped for reduced motion)
- Lenis inertia smooth scrolling (`hooks/useLenis.ts`)
- Hero: word-by-word headline, parallax background, floating CNC card, animated verified stats
- `Reveal` / `Stagger` scroll-in on every section, `ImageReveal` clip-wipe + settle + parallax on feature images
- Hover: image zoom in cards, card lift, button arrow slide, logo marquee

## Hero video

`src/data/site.ts` → `heroVideo`. Set it to `/video/hero.mp4` once real shop-floor footage is in `public/video/`. The hero uses iMate's own photograph until then.

## Documentation

`docs/` holds the audit of the old WordPress site (`WEBSITE_AUDIT.md`, `EXISTING_ROUTES.md`, `CONTENT_INVENTORY.md`), the design system (`DESIGN_SYSTEM.md`, `COMPONENT_GUIDELINES.md`, `PAGE_DESIGN_PLAN.md`), the plan (`REDESIGN_PLAN.md`), hosting instructions (`DEPLOYMENT_GUIDE.md`) and the QA, SEO and performance reports.

## Content awaiting the client

See `CLIENT-REVIEW.md`. Anything marked with an orange dashed "To be confirmed" badge on the site is listed there.

## Deploy

`vercel.json` is included (SPA rewrite, 301s, cache and security headers). Import the repo on Vercel or run `npx vercel`.
