# SEO report

## Before (old site, measured 5 Nov 2026)

- Homepage title "iMate Engineering Private Ltd"; inner titles "Page - iMate Engineering".
- No meta description and no Open Graph tags on the homepage.
- One H1 per page (good). Heavy builder markup (214 KB HTML).
- Yoast sitemap index advertising 9 lorem demo posts, 4 blog categories, 6 custom taxonomy archives and an author archive.
- Clean slugs with trailing slashes.

## After (new build)

| Item | Implementation | Verified by |
|---|---|---|
| Unique titles | `useSeo()` per route; pattern "Topic \| iMate Engineering"; product and article pages use their own name | QA sweep: 16 unique titles across 16 real routes |
| Meta descriptions | per route, 38 to 220 characters, written from verified facts | QA sweep: present on 108/108 loads |
| Open Graph | `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` (local image URL), `twitter:card` | QA sweep |
| Canonical | `<link rel="canonical">` set to `https://imateengineering.in` + pathname on every route change | code; the hash-router test build always reports `/`, production uses path routing |
| Structured data | Organization JSON-LD in `index.html` (name, logo, address, phone, email, sameAs LinkedIn); BreadcrumbList JSON-LD on every inner page | code review |
| Heading hierarchy | one H1, H2 sections, H3 cards; 0 skips | QA sweep |
| Image alt | every `<img>` has alt; decorative heroes use `alt=""` | QA sweep: 0 missing |
| XML sitemap | `public/sitemap.xml`, 46 URLs: 12 pages, 6 articles, 28 products | file |
| robots.txt | allow all, sitemap reference | file |
| URL structure | old slugs preserved without trailing slash; `trailingSlash: false` normalises | `EXISTING_ROUTES.md` |
| Redirects | 301s for 5 retired pages, 9 demo posts, 4 categories, 6 taxonomy archives, 3 earlier-build paths | `vercel.json` + nginx snippet in `DEPLOYMENT_GUIDE.md`; executed client-side in QA, server-side pending deployment |
| Analytics | GTM `GTM-T25MB59X` carried over | `index.html` |
| Fonts | Manrope + Inter only (Open Sans dropped), `display=swap`, preconnect | `index.html` |
| Language | `<html lang="en">` | `index.html` |

## Keyword coverage (natural, no stuffing)

Homepage title and description carry: precision machining, CNC machining, iron casting, Coimbatore, ISO 9001:2015, pattern and die, CAD/CAM. Capability, product and machinery pages carry the machine makes (Mazak, Doosan, KAFO, Hartford, BFW, Mitutoyo) and product families (compressor parts, off-road parts, valves, heat exchanger components).

## Known limitations

- **Client-side rendering.** Titles, descriptions and canonical are set by JavaScript after load. Googlebot renders JavaScript and indexes SPAs, but it is slower than server-rendered HTML and some other crawlers do not render. If this becomes a concern, pre-rendering `dist/` with `vite-plugin-prerender` or moving to Next.js static export is a contained change: all content is already in data files. Not done here because the brief asked not to change the framework.
- **Sitemap is static.** Add new products/articles to `public/sitemap.xml` by hand (one line each).
- **Social preview images** are the small originals (500 px); Open Graph prefers 1200 × 630. A new hero photograph would fix this.
- **Search Console** re-verification and sitemap resubmission are go-live tasks.
