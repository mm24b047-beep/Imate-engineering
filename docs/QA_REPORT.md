# QA report

Date: 5 Nov 2026. Build: `npm run build` (tsc -b + vite build) on the project folder, exit 0, no TypeScript errors, no warnings.

## How the tests were run

- **Automated sweep** (`scratch qa.mjs`, Playwright + bundled Chromium): the production single-file build served locally with the real `public/images`, 18 routes × 6 viewport widths = 108 page loads. Per load it recorded horizontal overflow, H1 count, heading-level skips, images without `alt`, icon buttons without `aria-label`, title, description, Open Graph presence, canonical, every `href`, console errors, page errors and 404 image requests. Screenshots were saved for 1440 px and 390 px and reviewed visually for the home, products, product detail, awards, contact and quote pages.
- **Motion check**: a second run without reduced motion confirmed the preloader counter, hero word reveal, Lenis instance, and scroll reveals.
- **Keyboard**: tabbed through the header on the homepage and recorded the focused element and its outline style.
- **Form**: submitted the quote form empty and recorded the inline errors.
- Routes: `/`, `/profile`, `/vision-mission`, `/capabilities`, `/machineries`, `/products`, `/products/compressor-1`, `/products/heat-exchanger-1`, `/quality`, `/awards-certifications`, `/blog`, `/blog/fifth-komatsu-best-supplier-award`, `/career`, `/contact-us`, `/request-a-quote`, `/about` (redirect), `/thank-you` (redirect), `/nope` (404).
- Widths: 1440, 1280, 1024, 768, 390, 360.

## Results

| Check | Result |
|---|---|
| Horizontal overflow | 0 px on all 108 loads |
| Exactly one H1 | 108 / 108 |
| Heading level skips | 0 (one skip on the 404 page was found and fixed: footer column headings changed from H3 to H2) |
| Images without alt | 0 |
| Icon buttons without aria-label | 0 |
| Console / page errors | 0 (GTM and Google Fonts requests were blocked by the test harness and excluded) |
| Missing images (404) | 0 of 86 referenced files |
| Unique titles | 16 unique across 18 routes; the two duplicates are `/about` and `/thank-you`, which 301 to `/profile` and `/contact-us` and correctly show the target's title |
| Meta description | present on all routes (38 to 220 chars) |
| Open Graph title/description/image | present on all routes |
| Keyboard order | Skip link → logo → Home → About Us → dropdown items → Capabilities …; every focused element shows the orange outline |
| Form validation (empty submit) | "Please enter your name." / "Enter a valid email address." / "Tell us what the part is." / "Tell us a little more (at least 20 characters)." rendered with `role="alert"`; focus moved to the first invalid field |
| Internal links | 67 distinct internal hrefs collected across all pages; every one resolves to a defined route, an in-page anchor that exists, or `/sitemap.xml` |
| External links | LinkedIn company page, Google Maps place link, `tel:` × 3, `mailto:` × 2 (checked by inspection; not fetched) |
| Dropdown menu | opens on hover and on keyboard focus, closes 120 ms after leaving, items reachable by Tab |
| Mobile menu | opens/closes, locks body scroll, closes on route change (verified at 390 and 360) |
| Product filters | chips filter categories; `#hash` links from footer and home pre-select the category |
| Machine filter | filters by type |
| Customer logos | all 6 render in the marquee, native proportions |
| Lightbox | opens from awards, machines, plant gallery, product detail; Esc and arrows work |
| Redirect routes | `/about`, `/about-us`, `/awards`, `/contact`, `/schedule-an-appointment`, `/thank-you`, `/innovative-engineering-solutions`, `/capabilities-of-imate-engineering`, `/sitemap` render the target page client-side; the server-side 301s in `vercel.json` were not executed (no deployment in this session) |

## Not tested (and why)

- **Live form delivery.** No `VITE_FORM_ENDPOINT` is configured yet (the client must create a Web3Forms/Formspree account or provide an API). The mailto fallback path was exercised in code review only, because the headless browser has no mail client. This is the one end-to-end test outstanding.
- **Attachment upload to a server.** Same reason. Client-side validation (type list, 10 MB) was exercised.
- **Real devices.** Only Chromium viewports; no Safari/iOS or Firefox run in this session.
- **Server-side 301s and cache headers.** Require a deployment.
- **Core Web Vitals field data.** Requires traffic on the live site; see `PERFORMANCE_REPORT.md` for build-size measurements.
- **Download links.** There are none: no brochure PDF exists on the old site, so none was added (no dead "Download brochure" button).

## Issues found and fixed during QA

1. Base `h1–h4` colour rule was unlayered CSS and overrode `text-white` utilities (hero headline invisible). Moved to `@layer base`.
2. Plant gallery spans left a lone tile on row 4. Re-spanned to a 3-row grid.
3. `@apply display-sm` inside another component class failed the Tailwind v4 build. Inlined.
4. Six customer logos were missing from the image copy (slider markup). Fetched and added.
5. Lucide no longer ships the LinkedIn brand icon. Replaced with an inline SVG component.
6. Supplier award cards had uneven tops (timeline dot in flow). Dot positioned absolutely, cards made flex columns.
7. 404 page heading skip H1 → H3. Footer headings changed to H2.

## Open items for the client

See `../CLIENT-REVIEW.md` (10 content items) and the go-live checklist in `DEPLOYMENT_GUIDE.md`.
