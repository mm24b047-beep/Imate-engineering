# Items for iMate Engineering to confirm

Nothing on the site is invented. Where the brief asked for content that the current website does not contain, a clearly marked placeholder (orange dashed "To be confirmed" badge) is shown instead. This list is everything behind those badges, plus a few judgement calls.

## Needs content from iMate

| # | Where | What is needed |
|---|-------|----------------|
| 1 | Quality page, "Quality policy" | The current site has no written quality policy. A draft is shown (`src/data/site.ts` → `quality.policy`). Approve, edit or replace. |
| 2 | Products, "Heat Exchanger Components" | Only one product photograph exists on the current site (tube sheet/bushes). Send more photographs and short descriptions. |
| 3 | Industries, "Energy & Industrial Infrastructure" | Included because heat exchanger parts are listed, but not yet backed by product photos. Confirm or remove. |
| 4 | Profile page, "Management" | Only the Managing Director's name is on record. Send bios, photos and any leadership message. |
| 5 | Awards, "Star Performer Export Award, EEPC" | The year is not on the current site. Send the certificate to add the date. |
| 6 | Career page | No vacancies are published. Send open roles or confirm "send your CV" is fine. |
| 7 | Home hero video | The hero currently uses iMate's own photograph. Real shop-floor footage (10 to 20 s, no audio) would make it stronger. |
| 8 | Testimonials | One verified testimonial (Ingersoll Rand). Send more as they are approved by customers. |
| 9 | Home "Our plant" gallery and machine pages | The machine photographs on the current site are manufacturer catalogue images, not shop-floor photography. Real photos of the machines, foundry, inspection room and engineering office would replace them in the same slots. There is no foundry photograph at all today; a cast valve body is shown instead. |
| 10 | Social links | Only LinkedIn is linked. The Facebook and Instagram icons on the old site pointed nowhere. Send real URLs to add them. |

## Judgement calls made

- **ISO number.** The old homepage says "ISO 9000:2015"; the certificate image is titled ISO 9001:2015. The site now says ISO 9001:2015 throughout (ISO 9000 is a guidance standard and is not certifiable). Confirm.
- **Blog.** The old blog held only WordPress theme demo posts (lorem text about "sole proprietorship"). They were not migrated. Six articles were written from verified award events already on the site. Add or edit in `src/data/blog.ts`.
- **Facility size.** The profile page says 30,000 sq. ft total with a 5,000 sq. ft factory and 1,000 sq. ft storage. All three figures are shown as on the old site.
- **Statistics.** Only verified figures are animated: 2011, 30,000 sq. ft, 80 g to 400 kg, 5 Komatsu awards, "15+ years" (calculated from 2011).
- **Images.** All 80 images from the current site were copied at original resolution into `public/images` (nothing larger exists on the server; most are 400 to 500 px, the two wide backgrounds are 1600 px). Two images on the old site were unrelated stock photos (an empty office interior named "Explore-Our-Flooring-Solutions", and a hand holding a star named "Profile.jpg"); they are not used. The two 1600 px industrial-plant backgrounds from the old site are used for page heroes and the CTA because they are the only images wide enough. Where a capability has no dedicated photo, a real iMate part photograph is used (e.g. a cast valve body for Iron Casting). Swap in `src/data/site.ts`.
- **Form backend.** Needs a Web3Forms key (free) or a Formspree ID to send email directly. Until then the form opens the visitor's mail client and says so. See `.env.example`.
- **"Schedule a Meeting."** The old site's appointment link now redirects to Contact Us.
