# iMate Engineering design system

An original system for a precision engineering manufacturer. Evostel was the reference for *quality of execution*: white canvas with one dark feature band, oversized headlines, eyebrow labels, generous section spacing, photography framed in rounded containers, a continuous logo strip, drag rails with a progress bar, a numbered preloader. None of its colours, type, copy or imagery are used.

All tokens are defined once in `src/index.css` under `@theme` and consumed as Tailwind utilities.

## Colour

| Token | Hex | Use |
|---|---|---|
| `navy` | #101D32 | hero, dark bands, headings, primary text on light |
| `navy-deep` | #0A1324 | footer, preloader, lightbox |
| `navy-soft` | #1A2B48 | secondary button hover |
| `orange` | #E87532 | primary buttons, eyebrows, timeline, focus ring, accents (never body text) |
| `orange-dark` | #CF6123 | button hover, badge text |
| `orange-tint` | #FDF0E6 | icon chips, active dropdown row |
| `white` | #FFFFFF | page canvas, cards |
| `grey` | #F3F5F7 | alternate section background, inputs area |
| `grey-deep` | #E9EDF1 | reserved |
| `charcoal` | #202936 | body text |
| `muted` | #5B6676 | secondary text, captions |
| `line` | #E1E6EC | borders, dividers |
| `line-dark` | rgba(255,255,255,.12) | borders on navy |

Contrast: charcoal on white 13.7:1, muted on white 5.9:1, white on navy 15.6:1, orange on navy 4.6:1 (used at ≥ 14 px semibold), orange on white 3.3:1 (used only for eyebrow labels ≥ 11 px bold uppercase and icons, never for paragraph text).

Section rhythm: white → grey → white → navy, never two navy bands adjacent.

## Typography

Fonts: **Manrope** 500/600/700/800 for headings and numerals, **Inter** 400/500/600 for body, loaded from Google Fonts with `display=swap`. Both already appear on the old site.

| Class | Size | Weight / tracking | Use |
|---|---|---|---|
| `display-xl` | clamp(2.6rem, 6.4vw, 5.4rem) | 800, −0.03em, lh 0.98 | page H1 |
| `display-lg` | clamp(2rem, 4vw, 3.4rem) | 700, −0.025em, lh 1.04 | section H2 |
| `display-md` | clamp(1.5rem, 2.6vw, 2.2rem) | 700, −0.02em | sub-sections |
| `display-sm` | clamp(1.15rem, 1.6vw, 1.4rem) | 700, −0.01em | card titles |
| `lead` | 16 → 18 px | 400, lh 1.625, muted | section intros |
| body | 16 px | 400, lh 1.6, charcoal | paragraphs |
| small | 14 px | | card copy, specs |
| `eyebrow` | 11 px | 600, +0.18em uppercase, orange, 32 px rule before | section labels |
| caption | 12 px | muted | dates, footnotes |

Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`. Inter OpenType features cv02/cv03/cv04/cv11 on.

## Spacing and layout

- Base unit 4 px (Tailwind scale).
- Container: max 1360 px, gutters 20 px (mobile) / 32 px (≥ 640) / 48 px (≥ 1024).
- Section padding `section-pad`: 80 / 96 / 128 px top and bottom at mobile / ≥ 640 / ≥ 1024. Compact sections 64 / 80 px.
- Section header block: 12-column grid, title spans 8, action aligned right in 4; 48 / 64 px below.
- Card grids: gap 20 px; galleries 12 to 16 px.
- Vertical rhythm inside cards: 24 to 28 px padding, 8 to 12 px between title and copy.

## Breakpoints

| Name | Min width | Notes |
|---|---|---|
| base | 0 | single column, 20 px gutters, 390 and 360 px verified |
| `sm` | 640 | two-column forms and lists |
| `md` | 768 | 2 to 3 column card grids, gallery 4 columns |
| `lg` | 1024 | split layouts, 12-col grids, 5-col product grid, timeline connectors |
| `xl` | 1280 | desktop navigation (below this the menu button is used) |
| `2xl` | 1536 | wider hero feature card |

## Grid patterns

- Split 6/6 (intro, capability sections, contact, product detail).
- 5/7 with 2-row feature (why iMate).
- 3/3/3 and 3/2/2/2 asymmetric (industries: two wide, three tall).
- 4-col masonry with one 2×2 tile (plant gallery).
- Horizontal rail with snap, drag, progress bar and arrows (products, awards).
- 5-col timeline with connector line and dots (supplier awards).

## Radii, shadows, borders

- Cards and image frames 16 px (`rounded-2xl`), chips and buttons full pill, small tiles 12 px.
- `shadow-card`: 1 px hairline + 32 px soft, for cards on white/grey.
- `shadow-float`: 60 px deep, for the hero card, dropdown, back-to-top.
- Borders 1 px `line`; dashed `orange/60` for "to be confirmed" placeholders.

## Image ratios

| Use | Ratio | Treatment |
|---|---|---|
| Page hero background | fills 52 to 66 vh, 100 svh on home | ken-burns 22 s, navy gradient top-to-bottom and left-to-right |
| Hero feature card | 5:6 | floating, parallax, caption gradient |
| Intro / profile image | 4:5 (mobile 5:4) | clip-wipe reveal + settle |
| Capability / industry cards | 4:3 (industries tall 4:5) | zoom 1.06 on hover, navy overlay with text |
| Product tiles | 1:1 | white background, object-cover |
| Machines | 4:3 | contain inside card |
| Awards | 4:3, object-contain, 20 px padding, white | never cropped |
| Plant gallery | square tiles, 2×2 feature | hover caption |
| Customer logos | native 197×100, max-height 48 px | grayscale 70 %, colour on hover |

## Motion

| Token | Value |
|---|---|
| Ease | cubic-bezier(0.16, 1, 0.3, 1) |
| Reveal | 28 px rise, 0.8 s, once, triggered 10 % before entering |
| Stagger | 60 to 100 ms between siblings |
| Image reveal | clip-path wipe 1.1 s + scale 1.18 → 1 over 1.4 s, then ±6 to 10 % parallax |
| Hover | image scale 1.06 over 1.2 s; card lift 4 px; button lift 2 px, arrow +4 px |
| Counters | 1.6 s, verified figures only |
| Smooth scroll | Lenis lerp 0.09 |
| Preloader | 1.3 s count, 0.9 s curtain lift, once per session |
| Reduced motion | all of the above disabled via `prefers-reduced-motion` |

## Voice

Short declarative headlines with a full stop ("Precision Engineering. Built on Experience."). Plain statements of fact, no superlatives that are not backed by an award on file. Numbers only when verified.
