# Redesign plan

## Decision: replace the Divi front end with a static React site, keep the URLs

The WordPress theme files and database were never provided, and Divi layouts cannot be reused outside Divi. Rebuilding the front end as a static site removes the builder's script weight, keeps every public URL, and still allows the same nginx server to host it. WordPress is not modified; it is retired at go-live.

Stack chosen (already in the project folder): Vite 5, React 18, TypeScript, Tailwind CSS v4, Framer Motion, Lenis, Lucide. No backend; forms post to a form service or an endpoint the client provides.

## Phases and status

| Phase | Scope | Status |
|---|---|---|
| 1 Audit | Live site, routes, assets, forms, analytics, SEO | done (`WEBSITE_AUDIT.md`) |
| 2 Design system | Tokens, type scale, spacing, components | done (`DESIGN_SYSTEM.md`, `COMPONENT_GUIDELINES.md`) |
| 3 Homepage | 13 sections | done |
| 4 Internal pages | Profile, Vision & Mission, Capabilities, Machineries, Products (+ detail), Quality, Awards, Blog (+ article), Career, Contact, Request a Quote | done |
| 5 Motion | Preloader, smooth scroll, reveals, parallax, hover, counters, reduced motion | done |
| 6 Functional | Forms with validation, honeypot, timing check, attachment handling, maps, tel/mail links, GTM, redirects, sitemap | done; form endpoint needs client credentials |
| 7 SEO/a11y/perf | Titles, descriptions, OG, canonical, JSON-LD, breadcrumbs, alt text, focus states, lazy loading | done (`SEO_REPORT.md`, `PERFORMANCE_REPORT.md`) |
| 8 QA | 18 routes × 6 widths, keyboard, forms, links, console | done (`QA_REPORT.md`) |
| 9 Client review | 10 content items + judgement calls | open (`../CLIENT-REVIEW.md`) |
| 10 Go-live | Hosting choice, form endpoint, DNS, Search Console | open (`DEPLOYMENT_GUIDE.md`) |

## Information architecture

```
/                       Home (13 sections)
/profile                About Us: overview, history, vision teaser, management, philosophy
/vision-mission         Mission, vision, three commitments
/capabilities           6 capability sections + engineering office list
/machineries            7 machines with specs, filter by type
/products               5 categories, filter, 28 products
/products/:id           Product detail + quote CTA
/quality                Policy (draft), pillars, CMM, hydrotest, certificates
/awards-certifications  Komatsu timeline + export/industry/certification galleries
/blog, /blog/:slug      6 articles
/career                 Why work here, open roles (placeholder)
/contact-us             Details, map, contact form
/request-a-quote        Quote form (material, quantity, attachment)
```

## Rules followed

- No invented statistics, certifications, customers or specifications. Anything unverifiable carries a "To be confirmed" badge and is listed in `CLIENT-REVIEW.md`.
- No stock photography added; three stock files that were on the old site are not used.
- No fake form success states.
- Every CTA resolves to a real route or a mailto/tel link.
- Existing analytics container preserved.
