# Performance report

Measured from the production build output (`npm run build`, 5 Nov 2026) and the QA sweep. No Lighthouse run was possible in this session (the test browser serves a single-file bundle over localhost, which does not reflect production caching or network), so Core Web Vitals are reasoned from the build, not measured in the field.

## Bundle

| Asset | Raw | Gzip |
|---|---|---|
| `index-*.js` (app shell, router, header/footer, framer-motion core, lenis) | 210.9 kB | 69.7 kB |
| `vendor-*.js` (react, react-dom, react-router-dom) | 164.2 kB | 53.6 kB |
| `index-*.css` (Tailwind v4, purged) | 60.9 kB | 10.3 kB |
| Home page chunk | 24.5 kB | 7.6 kB |
| Counter / animate chunk (shared) | 19.7 kB | 7.7 kB |
| Contact + form chunk | 15.8 kB | 5.2 kB |
| Other page chunks | 0.3 to 9.2 kB | 0.2 to 4.1 kB |
| **First load, homepage (JS + CSS)** | ~456 kB | **~141 kB** |

For comparison the old homepage shipped 214 kB of HTML plus Divi, Divi Pixel, Smart Slider, jQuery, Magnific Popup, EasyPieChart, Modernizr, FitVids, motion-effects, sticky-elements, exit-intent and Font Awesome.

## Images

- 86 files, 6.5 MB total on disk, served from `/images/` with 30-day cache headers.
- Homepage requests about 30 images; the largest are the two 1600 px backgrounds (92 kB and 222 kB) and `Quality.png` (538 kB, only in the plant gallery, lazy).
- Every image below the fold has `loading="lazy"`; the hero background and hero card use `fetchPriority="high"`.
- Width/height attributes are set on all content images, so there is no layout shift when they load.
- Originals are small (400 to 500 px) so no resizing pipeline was needed; if larger photography arrives, add responsive `srcset` at that point.

## Rendering and motion

- Route-level code splitting: each page is a lazy chunk; vendor is a separate long-cached chunk.
- Animations use transform/opacity/clip-path only (compositor-friendly); no layout-affecting properties are animated.
- Lenis runs one `requestAnimationFrame` loop; it is not started under `prefers-reduced-motion`.
- The logo marquee is a CSS animation with `will-change` on transform; paused on hover.
- Preloader locks scroll for 1.3 s on first visit per session only. If LCP on first visit matters more than the brand moment, remove it from `App.tsx` (one line).

## Core Web Vitals expectations

| Metric | Expectation | Reasoning |
|---|---|---|
| LCP | hero background `Ready-to-work-with-us-BG.jpg` (92 kB) with `fetchPriority="high"`; expected under 2.5 s on 4G once hosted with HTTP/2 and gzip/brotli | small asset, early in document |
| CLS | near 0 | all images sized, fonts `display=swap` with similar metrics, fixed header has no reflow, 0 px overflow measured |
| INP | low | no heavy handlers; filters and menus update local state only |
| TBT | moderate on first load (~141 kB gzipped JS) | React + router + motion; acceptable for a marketing site, improvable with pre-rendering |

## Headers (from `vercel.json`, mirrored in the nginx snippet)

- `/assets/*`: `Cache-Control: public, max-age=31536000, immutable` (hashed filenames).
- `/images/*`: `max-age=2592000`.
- All: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`.

## Dependencies

Runtime: react, react-dom, react-router-dom, framer-motion, lenis, lucide-react (tree-shaken, only used icons bundled). Dev: vite, typescript, tailwindcss, @tailwindcss/vite, vite-plugin-singlefile (preview builds only). No unused dependencies in `package.json`.

## Recommended follow-ups

1. Run Lighthouse on the deployed URL and record the numbers here.
2. Pre-render routes at build time if SEO crawl speed becomes a concern (also improves LCP/TBT).
3. Convert images to WebP/AVIF with `srcset` when higher-resolution photography is supplied.
4. Consider self-hosting Manrope/Inter to remove the Google Fonts round trip.
