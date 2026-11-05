# Website audit: imateengineering.in (existing site)

Audited 5 Nov 2026 against the live site. No access to the WordPress admin, hosting panel or server filesystem was available; everything below was read from the public HTML, HTTP headers, robots.txt and sitemaps. Where something could not be determined, it says so.

## 1. Technology stack

| Item | Finding | Evidence |
|---|---|---|
| Platform | **WordPress 7.0.8** | `<meta name="generator" content="WordPress 7.0.8">` |
| Theme | **Divi** with a `divi-child` child theme | `wp-content/themes/Divi/…`, `wp-content/themes/divi-child/…` |
| Page builder | Divi Builder (`et_pb_*` modules) | Divi scripts: `scripts.min.js`, `motion-effects.js`, `sticky-elements.js`, `salvattore.js` |
| Plugins seen | Divi Pixel, Smart Slider 3 Pro (hero slider), WP Rocket 3.19.2.1 (cache/minify/lazyload), Gravity Forms (contact form), Yoast SEO (robots/sitemaps/canonical) | plugin paths in page source |
| Front-end libs | jQuery, Magnific Popup, EasyPieChart, Modernizr, FitVids, exit-intent popup | loaded by Divi/Divi Pixel |
| Fonts | Google Fonts: Open Sans, **Manrope**, **Inter** | `fonts.googleapis.com/css?family=Open Sans…|Manrope…|Inter…` |
| Icons | Font Awesome (use.fontawesome.com) | external stylesheet |
| Language | PHP (WordPress). Not Laravel, not React, not Next.js | |
| Database | MySQL/MariaDB (standard WordPress). Not directly inspectable. | WP REST API (`/wp-json/`) and `xmlrpc.php` are both exposed |

The project folder handed over for the redesign (`/Users/sapavathsanthosh/Desktop/IMATE`) is **not** the WordPress install. It is the new Vite + React + TypeScript rebuild started on 5 Nov 2026. The WordPress theme files, PHP and database were never provided; the redesign is a front-end replacement that keeps the same URLs.

## 2. Hosting and deployment (as far as it can be determined)

| Item | Finding |
|---|---|
| Web server | `server: nginx/1.25.5` |
| Cache | WP Rocket page cache (`x-server-cache: false` header, `wp-content/cache/min/…` minified bundles) |
| CDN | None detected (no CDN headers, assets served from the origin) |
| TLS | HTTPS on the apex domain, canonical `https://imateengineering.in/` |
| Hosting provider | **Cannot be determined** from headers alone (no provider header). The DNS/registrar details must come from the client. |
| Deployment | Classic WordPress: files edited through wp-admin/Divi, no build step, no version control visible |

See `DEPLOYMENT_GUIDE.md` for how the redesign can be served from the same domain.

## 3. CMS and database integrations

- Content lives in WordPress posts/pages and Divi layouts. Products are a Divi Pixel custom post type (`dipi_media_category/*` archives), awards are images inside Divi modules.
- Gravity Forms stores submissions in the WordPress database and emails them (recipient not visible from the front end; the `/thank-you/` page confirms success).
- No external CMS, headless API or e-commerce integration found.

## 4. Routes and pages

Documented in full in `EXISTING_ROUTES.md`. Summary: 12 real pages, 1 appointment page, 9 demo blog posts with lorem text, 4 category archives, 4 product archives, 1 thank-you page, 1 HTML sitemap page, and two near-duplicate landing pages (`/innovative-engineering-solutions/`, `/capabilities-of-imate-engineering/`).

## 5. Forms, email and third-party integrations

| Integration | Detail |
|---|---|
| Contact form | Gravity Forms, form id 2, on `/contact-us/`. Fields: Name*, Email*, Phone*, Message*, plus a hidden honeypot-style "URL" field. **No file upload.** AJAX submit to the same page, success redirects to `/thank-you/`. |
| Email delivery | Handled by WordPress/Gravity Forms server-side (wp_mail or an SMTP plugin; not visible). The published contact emails are kamraj@imateengineering.in and imateengineering@gmail.com. |
| Maps | Google Maps iframe embed on the contact page (place "i MATE ENGINEERING PVT LTD", lat 10.822658, lng 77.004267). No API key. |
| Analytics | **Google Tag Manager `GTM-T25MB59X`** (script + noscript iframe) and **GA4 `G-QP63VS4VTC`** via gtag. `googleads.g.doubleclick.net` is referenced, so a Google Ads tag is also configured in the container. |
| Appointment | `/schedule-an-appointment/` page exists; its content is the company blurb only (no booking widget found). |
| Social | Facebook/Instagram/LinkedIn icons in the footer; only LinkedIn resolves to a real profile (`linkedin.com/company/imate-engineering-private-ltd`). |

## 6. Assets

Documented in `CONTENT_INVENTORY.md`. 99 upload files found across the site (80 photos/certificates, 6 customer logos, 13 SVG icons/decorations). All originals are small: part photos 500 × 500, machine photos 400 × 300, award photos 309 × 206, two backgrounds 1600 px wide.

## 7. SEO

| Item | Finding |
|---|---|
| Titles | Homepage title "iMate Engineering Private Ltd"; inner pages "Page name - iMate Engineering" (Yoast defaults). Short, no keywords. |
| Meta description | **None on the homepage.** |
| Open Graph | **None on the homepage.** |
| Canonical | Present (Yoast). |
| Structured data | One JSON-LD block (Yoast Organization/WebSite graph). |
| H1 | One H1 on the homepage: "iMate Engineering – Your Trusted Partner For Precision Engineering Solutions". |
| Sitemap | Yoast `sitemap_index.xml` with post, page, category, tag, two custom-taxonomy and author sitemaps. It advertises the 9 lorem blog posts and the author archive. |
| robots.txt | Yoast default: allow all, sitemap reference. |
| URLs | Clean slugs with trailing slashes: `/profile/`, `/vision-mission/`, `/quality/`, `/capabilities/`, `/career/`, `/machineries/`, `/products/`, `/awards-certifications/`, `/blog/`, `/contact-us/`. |

## 8. Analytics and tracking

GTM `GTM-T25MB59X` with GA4 `G-QP63VS4VTC` and a Google Ads tag inside. Carried over unchanged into the redesign (`index.html`), so measurement continues without re-tagging.

## 9. Security observations

- WordPress core version is printed in the page source (generator tag).
- `xmlrpc.php` and `/wp-json/` are reachable; both are common brute-force and enumeration targets. The author sitemap exposes the admin username's author archive.
- Plugin versions are exposed through asset query strings (WP Rocket 3.19.2.1 shown in generator).
- Gravity Forms has no visible CAPTCHA; the honeypot field is the only spam control.
- No security headers observed (no `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Content-Security-Policy`).
- Nine theme demo posts with placeholder text are indexable, which is a content-quality rather than a security issue.

## 10. Performance observations

- Homepage HTML is 214 KB before gzip. Divi plus Divi Pixel plus Smart Slider load jQuery, Magnific Popup, EasyPieChart, Modernizr, FitVids, motion effects, sticky elements and an exit-intent script on every page.
- Three Google Font families with 20+ weights requested (Open Sans is loaded but the design uses Manrope/Inter).
- Font Awesome loaded from a third-party host for a handful of icons.
- WP Rocket mitigates some of this (minification, lazyload), but the dependency weight is inherent to the builder.
- Images are small, so image weight is not the problem; script weight and render-blocking CSS are.

## 11. Content quality issues found

- "ISO 9000:2015" on the homepage; the certificate scan says ISO 9001:2015.
- Blog contains only theme demo posts.
- Two image files are unrelated stock photos mislabelled by filename ("Explore-Our-Flooring-Solutions…" is an office interior, "Profile.jpg" is a hand holding a star).
- The "Schedule a Meeting" page has no booking function.
- Facebook/Instagram links are placeholders.

## 12. How the current website works (plain summary)

It is a Divi-built WordPress site. Every page is a Divi layout stored in the MySQL database and rendered by PHP on each request (then cached by WP Rocket). The hero is a Smart Slider 3 slider, products are a Divi Pixel gallery post type, the contact form is Gravity Forms posting back to WordPress, and analytics run through Google Tag Manager. The files that control the front end are the Divi theme, the divi-child theme and the Divi layouts in the database, none of which were provided for this project.
