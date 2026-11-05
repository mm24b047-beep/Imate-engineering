# Content inventory

Everything the new site shows comes from the existing website unless marked otherwise. Copy lives in `src/data/site.ts` and `src/data/blog.ts`; images live in `public/images/` using the same `YYYY/MM/filename` layout as the WordPress uploads folder.

## Company facts (verified on the old site)

| Fact | Value | Source page |
|---|---|---|
| Legal name | iMate Engineering Private Limited | all |
| Tagline on logo | Intelligent Manufacturing | logo |
| Founded | 2011 | home, profile |
| Site | 30,000 sq. ft total, 5,000 sq. ft factory, 1,000 sq. ft storage | profile |
| Certification | ISO 9001:2015 (old site text says "ISO 9000:2015"; certificate scan says 9001) | home, awards |
| Casting range | Grey and ductile iron, 80 g to 400 kg | home |
| Services | CNC machining, iron casting, pattern and die manufacturing, CAD/CAM, hydrotesting, heat treatment, surface coating, 3D scanning, welding, sub-assembly | home, capabilities |
| Markets | USA, Europe, India | home |
| Managing Director | Mr. S. Kamaraj | earlier project notes; no bio on site |
| Factory address | S.F. No. 69, Veerappagoundanur Road, Vadapudur Village, Kinathukadavu, Coimbatore 642109 | contact |
| Registered office | 3A, Emerald Green Paradise, 164, Rajiv Gandhi Nagar, Sowripalayam, Coimbatore 641028 | contact |
| Phones | +91 73733 11677, +91 95781 11166, +91 98433 18099 | footer |
| Emails | kamraj@imateengineering.in, imateengineering@gmail.com | footer |
| GSTIN / PAN | 33AACCI3620F1Z5 / AACCI3620F | earlier project notes |
| LinkedIn | linkedin.com/company/imate-engineering-private-ltd | footer |

## Images (86 files in `public/images`)

| Group | Count | Files | Size | Used where |
|---|---|---|---|---|
| Logos | 2 | `2025/05/iMate.png` (223×80), `iMate-Footer-Logo.png` (259×95) | | header, footer, preloader |
| Customer logos | 6 | ORB-Inox, Flowserve, Komatsu, IR-Ingersoll-Rand, Hub-Bell, Hirotec-India (197×100 each) | | logo marquee, supplier awards |
| Compressor parts | 10 + 2 thumbs | `Compressor-Parts-1…10.jpg` (500×500) | | products |
| Machinery parts | 9 + 2 thumbs | `Machinery-Parts-1…9.jpg` (500×500) | | products |
| Off-road parts | 3 + 2 thumbs | `Off-Road-Vehicle-Part-1…3.jpg` (500×500) | | products |
| Valves | 5 + 1 thumb | `2025/06/Cast-iron-…-Valves-1…5-Gallery.jpg` | | products, capabilities |
| Heat exchanger | 1 | `Heat-exchanger-part-img.jpg` (309×303) | | products |
| Machines | 7 | KAFO, Doosan, Hartford, Mazak, BFW, CNC turning, CMM (400×300, manufacturer catalogue images) | | machineries, plant gallery |
| Photography | 3 | `Building-quality-through-industrial-innovation.jpg` (CNC turning, 500×610), `Preparation-of-2D-drawings…jpg` (CNC milling, 500×400), `Quality.png` (instruments, 1019×636) | | hero card, intro, capabilities, quality |
| Backgrounds | 2 | `Ready-to-work-with-us-BG.jpg` (steel, 1600×573), `Our-services-includes-…-BG.jpg` (plant, 1600×901) | | page heroes, CTA |
| Awards and certificates | 26 | `2025/07/*.png` (certificates, plaques, trophies, ceremony photos; 309×206 to ~800 px) | | awards, quality, blog |
| Not used | 3 | `Explore-Our-Flooring-Solutions…jpg` (office interior, stock), `Profile.jpg` (hand with star, stock), `Global-Reach-Local-Expertise.jpg` (refinery, stock), `iMate-Engineering_-Pioneering…jpg` (generic) | kept on disk, not referenced |

Not copied: 13 SVG icons and decorations from the old theme (lucide icons replace them), the favicon PNG, four cropped `-480-xxx` duplicates, and four 2025/05 duplicates of the Komatsu plaques (the 2025/07 versions are used).

## Awards and certificates (17, all with image on file)

Certifications: ISO 9001:2015, ZED Silver, Dun & Bradstreet.
Supplier: Komatsu Best Supplier Award 2012-13, 2013-14, 2014-15, 2016-17, 2021-22.
Export (EEPC India): Silver 2014-15, Silver 2016-17 (two presentations), Gold 2017-18, Silver 2018-19, Star Performer (year to confirm).
Industry: Top 100 SME India 2022, Thinkers of Tomorrow (News18) 2023, Industry Outlook 2024.

## Machines (7, specifications as listed on the old machineries page)

KAFO VMC16100 · Doosan HM 6300 · Hartford VMC 1270 AP · Mazak HCN 4000-III · BFW Xtron 955 with rotary table · Askar Spinner 10 turning centre · Mitutoyo Crysta Plus 7106 CMM. Full spec tables in `site.ts → machines`, `cmm`.

## Testimonial (1, verbatim)

Pradeep Dhareshwar, Corporate Quality, Compression Technologies & Services, Ingersoll Rand (India) Limited.

## Copy written for the redesign (not on the old site)

- Section headlines and short descriptions on every page.
- Capability long-form paragraphs (built only from facts above).
- Quality policy draft (marked "to be confirmed").
- Six blog articles from verified award events.
- Product detail page text (general process description, no part-specific specs).

## Fonts

Manrope (headings) and Inter (body), both already used on the old site. Open Sans dropped.
