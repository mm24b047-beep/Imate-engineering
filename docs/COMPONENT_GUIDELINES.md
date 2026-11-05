# Component guidelines

All components live in `src/components/`. Pages compose them; data comes from `src/data/`.

## Layout

| Component | Props | Rules |
|---|---|---|
| `Section` | `eyebrow, title, lead, action, tone (white/grey/navy), align, compact, id` | One per topic. Title is an H2. `action` is a Button or filter group, right-aligned on desktop. Navy tone switches text to white. |
| `PageHero` (in Section.tsx) | `eyebrow, title, lead, image, short, children` | Inner-page hero: background image + gradient, breadcrumbs, H1, optional chips/buttons as children. `short` = 52 vh. |
| `Header` | none | Fixed. Transparent over heroes, glass-solid after 40 px scroll or on non-hero routes. Desktop nav ≥ 1280 px with hover/focus dropdown (120 ms close delay). Mobile full-screen menu with staggered items; body scroll locked while open. "Request a Quote" button always visible ≥ 768 px. |
| `Footer` | none | Four columns: brand + LinkedIn, Company links (from `nav`), Capabilities (anchors), Products (anchors) + quote link, Contact (address, tel, mail). Column headings are H2 at 12 px uppercase. |
| `Breadcrumbs` | `last, dark` | Auto-built from the route; `last` names a dynamic page. Emits BreadcrumbList JSON-LD. |
| `Cta` | `title, body, image` | Closing band on every inner page. Primary "Discuss Your Requirements" → `/request-a-quote`, secondary "Contact Our Team". |

## Interaction

| Component | Rules |
|---|---|
| `Button` | Variants `primary` (orange), `secondary` (navy), `ghost`, `white`, `outline-white`. Sizes `md` 44 px, `lg` 52 px. Renders `<Link>`, `<a>` or `<button>` depending on `to`/`href`. `arrow` adds a sliding ArrowRight. Never two primaries side by side. |
| `Rail` | Horizontal snap scroller with pointer drag, progress bar and prev/next. Children set their own width (`w-[82vw] sm:w-[360px]`). |
| `Lightbox` | Full-screen viewer with caption, Esc/←/→, focus-safe close button. Pass `src: null` to hide. |
| `LogoMarquee` | Duplicated logo list, 42 s loop, pauses on hover, edge fades, duplicates are `aria-hidden`. |
| `Counter` | Animates to a number on view. Use only for figures in `stats` or verified data. |
| `BackToTop` | Appears after 900 px, scrolls through Lenis. |
| `Preloader` | Shown once per session (sessionStorage), skipped under reduced motion. |

## Motion wrappers

| Component | Rules |
|---|---|
| `Reveal` | Wrap a block to fade/rise once on entering view. `delay` for sequencing a sibling. |
| `Stagger` + `Item` | Parent/children for lists and grids; `gap` sets the stagger in seconds. `as` picks the element (`ul`/`li` for lists). |
| `ImageReveal` | Feature images only (one or two per page). Clip-wipe, settle and parallax. Pass `children` for overlays. Do not use on grids of thumbnails. |

## Content blocks

| Component | Rules |
|---|---|
| `SupplierAwards` | Komatsu timeline: logo, "5×", five year cards. Reads `awards` where `group === "Supplier"`. |
| `SpecTable` | Two-column definition list for machine and product specs. Keys left, values right, hairline rows. |
| `MapEmbed` | The old site's Google Maps embed URL; no API key. |
| `Tbc` | Orange dashed badge for content awaiting the client. Every use must have a line in `CLIENT-REVIEW.md`. |

## Forms

`EnquiryForm` is the only form. `quote` adds material, quantity and attachment fields.

- Labels always visible (no placeholder-only fields); required fields marked `*` and `required`.
- Errors render inline with `role="alert"`, the field gets `aria-invalid` and `aria-describedby`; focus moves to the first error.
- Honeypot (`website`) and a 2.5 s minimum fill time.
- Attachment: allowed `.pdf .step .stp .iges .igs .dwg .dxf .zip .png .jpg .jpeg`, ≤ 10 MB, validated before send. Sent as multipart when an endpoint exists.
- Status messages appear only after the real response (`sent`, `error`), or `mailto` when no endpoint is configured, with honest copy.
- Submit button shows a spinner and is disabled while sending.

## Cards

- Capability card: navy, image 4:3 with gradient, number, title (H3), one-line copy, "Explore more" link. Whole card is the link.
- Industry card: image with bottom gradient, title, hover reveals copy. Two wide + three tall.
- Product tile: white card, square image, name + arrow. Links to detail page.
- Award card: white card, image contained with padding, group/year eyebrow, title, detail.
- Machine card: image left, specs right on ≥ 640 px; image opens lightbox.
- Blog card: image 4:3, category + read time, title, excerpt, date pinned to bottom.

## Accessibility defaults

- One H1 per page, H2 for sections, H3 inside cards; no skipped levels.
- Every image has `alt`; decorative backgrounds use `alt=""`.
- Focus ring: 2 px orange, 3 px offset (`:focus-visible`), plus a 4 px ring on buttons.
- Skip link to `#main`.
- Icon-only buttons carry `aria-label`.
- Filters are buttons with `aria-pressed`.
- Dropdown uses `aria-haspopup`, `aria-expanded`, `role="menu"`.
- Reduced motion respected by every animated component.

## Adding content

- New product: append to `products` in `site.ts`, drop the image in `public/images/…`, add the URL to `public/sitemap.xml`.
- New award: append to `awards`; if `group: "Supplier"` it joins the timeline automatically.
- New article: append to `posts` in `blog.ts`; the listing, article page, related list and sitemap entry follow (sitemap is manual).
- New machine: append to `machines`; the type filter picks up new `type` values.
