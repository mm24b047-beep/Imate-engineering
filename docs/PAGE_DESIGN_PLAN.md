# Page design plan

Section order, layout and the source of every piece of content on each page. "Verified" means it is on the old site or in its images; "written" means copy produced for the redesign from verified facts only; "tbc" means a visible badge and an entry in `CLIENT-REVIEW.md`.

## Home `/`

| # | Section | Layout | Content |
|---|---|---|---|
| 1 | Navigation | transparent → glass on scroll; 9 items + dropdown + quote button | verified nav |
| 2 | Hero | full-viewport steel background (1600 px), word-by-word H1, lead, two buttons, floating CNC card (desktop), four counters | headline/lead from brief; counters 2011, 30,000 sq ft, 80 g to 400 kg, 5 Komatsu awards (verified) |
| 3 | Introduction | 6/6 split, image reveal left, copy + 7 highlights + "15+ years" chip right | verified facts, written copy |
| 4 | Capabilities | 3×2 navy image cards | 6 capabilities, verified; images are iMate's own parts/process photos |
| 5 | Industries | 2 wide + 3 tall cards | 5 industries derived from verified product lines and customers; energy card tbc |
| 6 | Products | rail of 5 category cards | verified categories, heat exchanger has 1 photo |
| 7 | Why iMate | navy, 5/7 grid, feature photo + 6 icon cards | 7 verified strengths |
| 8 | Plant | 4-col gallery with 2×2 feature, lightbox | manufacturer machine photos + CNC photo + instruments; honest caption |
| 9 | Awards | Komatsu timeline + rail of 6 other awards | verified |
| 10 | Customers | centred heading + logo marquee | 6 verified logos |
| 11 | Testimonial | 2 cards: quote + "more to come" | verified IR quote |
| 12 | CTA | plant photo, navy gradient, "Ready to Build Something Precise?" + "Discuss Your Requirements" | from brief |
| 13 | Footer | 4 columns + legal line | verified contacts |

## Profile `/profile`

Hero (plant photo) → Overview (5/7 with 3 counters) → History timeline (image + 5 dated milestones from awards) → Vision & mission teaser (2 cards) → Management (navy; MD name, bio tbc) → Manufacturing philosophy (4 process steps + casting photo) → CTA.

## Vision & Mission `/vision-mission`

Hero → Mission (navy card) and Vision (grey card) side by side, verbatim from the old page → Three commitments with icons → CTA.

## Capabilities `/capabilities`

Hero with anchor chips → six alternating 6/6 sections (image reveal, eyebrow "Capability 0n", H2, paragraphs, checklist, quote button) → Engineering office list (navy, 6 numbered points verbatim) → CTA.

## Machineries `/machineries`

Hero → CNC machining centres: type filter (All / vertical / horizontal / 4-axis / turning), 2-col cards with image, type, make, model, spec table; image opens lightbox → CMM section, full-width card → CTA ("Need a part machined on this equipment?").

## Products `/products` and `/products/:id`

Hero with category filter chips (also driven by `#hash`) → one section per category: eyebrow, H2, blurb, "Request a quote" (prefilled), 5-col tile grid → CTA. Detail page: navy breadcrumb band → 6/6 image + title, blurb, general process table, quote and email buttons → "More in category" strip → prev/next → CTA. No per-part specifications are shown or implied.

## Quality `/quality`

Hero (instruments photo) → Quality policy (draft, tbc badge) → 4 assurance pillars → CMM card with specs → Hydrostatic testing (navy, image reveal) → 3 certification cards → CTA.

## Awards `/awards-certifications`

Hero with group filter → Certifications grid → Supplier: Komatsu timeline (logo, 5×, five year cards with plaque wording) → Export grid → Industry grid; every card opens the lightbox → CTA.

## Blog `/blog` and `/blog/:slug`

Hero with category filter → featured article (7/5 card) → 3-col card grid → CTA. Article: image header with breadcrumbs, category, date, read time, H1 → 7-col prose + 3-col related list → quote / next article buttons → CTA.

## Career `/career`

Hero with "Email your CV" → 3 reasons (icons) → Open positions placeholder (tbc) with the application email.

## Contact `/contact-us` and Request a quote `/request-a-quote`

Hero → 5/7: details (phones, emails, two addresses with map link, hours, LinkedIn) + form card → Map section (old site's embed). Quote variant adds product category, material, quantity and attachment fields and changes the hero and button copy.

## 404

Navy, "That page has moved or never existed.", home and contact buttons.
