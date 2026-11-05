# Existing routes and their new equivalents

Source: Yoast `page-sitemap.xml`, `post-sitemap.xml`, taxonomy sitemaps and the site navigation, read 5 Nov 2026. The old site uses trailing slashes; the new site uses the same slugs without trailing slashes and `vercel.json` sets `"trailingSlash": false`, so `/profile/` resolves to `/profile`.

## Pages

| Old URL | Status | New route | Handling |
|---|---|---|---|
| `/` | keep | `/` | same |
| `/profile/` | keep | `/profile` | same slug |
| `/vision-mission/` | keep | `/vision-mission` | same slug |
| `/quality/` | keep | `/quality` | same slug |
| `/capabilities/` | keep | `/capabilities` | same slug |
| `/career/` | keep | `/career` | same slug |
| `/machineries/` | keep | `/machineries` | same slug |
| `/products/` | keep | `/products` | same slug, plus new `/products/:id` detail pages |
| `/awards-certifications/` | keep | `/awards-certifications` | same slug |
| `/blog/` | keep | `/blog` | same slug, plus `/blog/:slug` articles |
| `/contact-us/` | keep | `/contact-us` | same slug |
| `/schedule-an-appointment/` | retire | → `/contact-us` | 301 (page had no booking function) |
| `/thank-you/` | retire | → `/contact-us` | 301 (form success is now inline) |
| `/innovative-engineering-solutions/` | retire | → `/capabilities` | 301 (duplicate marketing copy) |
| `/capabilities-of-imate-engineering/` | retire | → `/capabilities` | 301 (duplicate of capabilities) |
| `/sitemap/` | retire | → `/sitemap.xml` | 301 |
| (new) | new | `/request-a-quote` | quote form with material, quantity, attachment |

## Blog posts (theme demo content, not migrated)

| Old URL | New |
|---|---|
| `/audio-proprietorship-also-known-as-trader-is-owned/`, `-2/`, `-3/` | → `/blog` (301) |
| `/a-sole-proprietorship-also-known-as-trader-is-owned/` | → `/blog` (301) |
| `/the-nonprofit-landscape-varie-also-known-as-trader/`, `-2/` | → `/blog` (301) |
| `/link-proprietorship-also-known-as-trader-is-owned/` | → `/blog` (301) |
| `/video-proprietorship-also-known-as-trader-is-owned/` | → `/blog` (301) |
| `/quote-proprietorship-also-known-as-trader-is-owned/` | → `/blog` (301) |

Six new articles replace them, written from verified award events: `/blog/industry-outlook-2024-recognition`, `/blog/thinkers-of-tomorrow-news18`, `/blog/eepc-top-exporter-silver-2018-19`, `/blog/top-100-sme-india-2022`, `/blog/fifth-komatsu-best-supplier-award`, `/blog/eepc-top-exporter-gold-2017-18`.

## Archives and taxonomies

| Old URL | New |
|---|---|
| `/category/business/`, `/category/media/`, `/category/news/`, `/category/video/` | → `/blog` (301) |
| `/dipi_media_category/off-road-vehicle-part/` | → `/products#off-road` (301) |
| `/dipi_media_category/compressor-parts/` | → `/products#compressor` (301) |
| `/dipi_media_category/machinery-parts/` | → `/products#machinery` (301) |
| `/dipi_media_category/cast-iron-stainless-steels-and-steel-valves/` | → `/products#valves` (301) |
| `/dipi_cpt_category/photography/`, `/dipi_cpt_category/php/` | → `/products` (301) |
| `/author/…` | not carried over (404) |
| `/wp-json/`, `/xmlrpc.php`, `/wp-admin/` | no longer exist (404) once WordPress is retired |

## Where the redirects live

- `vercel.json` → `redirects` (301, server side, for Vercel or any host that reads it).
- `src/App.tsx` → `redirects` map (client side `<Navigate>`), so the same paths also work on hosts that only serve `index.html` for unknown paths.
- For nginx/Apache hosting, see `DEPLOYMENT_GUIDE.md` for the equivalent rules.
