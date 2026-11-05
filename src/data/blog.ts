import { img } from "../lib/img";

/* ──────────────────────────────────────────────────────────────────────
   Blog / news. The old WordPress blog only held theme demo posts, so the
   articles below are written from verified award and company events.
   Add new posts by appending to this array; the Blog and article pages
   render from it automatically.
   ────────────────────────────────────────────────────────────────────── */

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  category: "Awards" | "Company" | "Exports" | "Manufacturing";
  excerpt: string;
  image: string;
  body: string[]; // paragraphs
  readMins: number;
};

export const posts: Post[] = [
  {
    slug: "industry-outlook-2024-recognition",
    title: "iMate Engineering featured in Industry Outlook 2024",
    date: "2024-06-01",
    category: "Company",
    excerpt: "Industry Outlook recognised iMate Engineering for precision machining and casting from Coimbatore.",
    image: img("2025/07/Industry-Outlook-2024.png"),
    readMins: 2,
    body: [
      "iMate Engineering Private Limited was recognised by Industry Outlook in 2024 for its work in precision machining and iron casting.",
      "The recognition follows a run of export and supplier awards that started with Komatsu's Best Supplier Award in 2012-13 and includes five EEPC India Top Exporter trophies.",
      "iMate supplies build-to-print cast and machined components to compressor, off-road equipment, valve and machinery manufacturers in the USA, Europe and India from its 30,000 sq. ft facility in Kinathukadavu, Coimbatore.",
    ],
  },
  {
    slug: "thinkers-of-tomorrow-news18",
    title: "Thinkers of Tomorrow award from the News18 network",
    date: "2023-03-24",
    category: "Awards",
    excerpt: "iMate Engineering received the Thinkers of Tomorrow award at the News18 network event in Chennai on 24 March 2023.",
    image: img("2025/07/Thinkers-of-Tomorrow-award.png"),
    readMins: 2,
    body: [
      "On 24 March 2023, iMate Engineering received the Thinkers of Tomorrow award from the News18 network at an event in Chennai.",
      "The award recognises businesses in Tamil Nadu that are building for the long term. For iMate, that has meant investing in in-house capability: a full CNC machine shop, foundry, pattern and die manufacturing, CAD/CAM and hydrostatic testing on one site.",
    ],
  },
  {
    slug: "eepc-top-exporter-silver-2018-19",
    title: "EEPC India Top Exporter, Silver Trophy for 2018-19",
    date: "2022-07-21",
    category: "Exports",
    excerpt: "Presented by the Chief Minister of Karnataka in Bengaluru for South India export performance in 2018-19.",
    image: img("2025/07/Achieved-South-India-Export-Performance-Top-Exporter-Silver-Trophy-for-the-year-2018-2019.png"),
    readMins: 2,
    body: [
      "iMate Engineering received the EEPC India Southern Region Top Exporter Silver Trophy for export performance in 2018-19. The trophy was presented by Shri Basavaraj Bommai, Chief Minister of Karnataka, on 21 July 2022 in Bengaluru.",
      "This is the fifth consecutive year iMate has been recognised by the Engineering Export Promotion Council of India: Silver in 2014-15, Silver in 2016-17, Gold in 2017-18 and Silver in 2018-19, alongside a Star Performer Export Award.",
      "Export customers include compressor, valve and off-road equipment manufacturers in the USA and Europe, supplied with grey and ductile iron castings and finished machined components.",
    ],
  },
  {
    slug: "top-100-sme-india-2022",
    title: "Named one of the Top 100 SMEs in India for 2022",
    date: "2022-04-13",
    category: "Awards",
    excerpt: "India SME Forum award received at Taj Palace, New Delhi, from the Union Minister of MSME.",
    image: img("2025/07/Achieved-One-of-the-Top-100-SME-India-award-for-the-year-2022-from-India-SME-Forum.png"),
    readMins: 2,
    body: [
      "iMate Engineering was named one of the Top 100 SMEs in India for 2022 by the India SME Forum. The award was received on 13 April 2022 at Taj Palace, New Delhi, from Shri Narayan Rane, Union Minister of MSME, and Shri Bhanu Pratap Singh Verma, Minister of State.",
      "The Top 100 SME programme evaluates small and medium enterprises on growth, governance and competitiveness. iMate was recognised as a precision engineering exporter with ISO 9001:2015 certification and a track record of supplier awards.",
    ],
  },
  {
    slug: "fifth-komatsu-best-supplier-award",
    title: "A fifth Best Supplier Award from Komatsu",
    date: "2022-03-31",
    category: "Manufacturing",
    excerpt: "Komatsu recognised iMate as Best Supplier for 2021-22, the fifth time since 2012.",
    image: img("2025/07/Achieved-best-supplier-award-from-KOMATSU-during-the-period-of-2021-2022.png"),
    readMins: 2,
    body: [
      "Komatsu has named iMate Engineering a Best Supplier for 2021-22. It is the fifth such award, following 2012-13, 2013-14, 2014-15 and 2016-17.",
      "iMate supplies cast and machined off-road vehicle components to Komatsu's programmes. The parts are cast in grey and ductile iron, machined on horizontal and vertical machining centres, and inspected on a Mitutoyo CMM before despatch.",
      "Supplier awards are earned on quality, cost and delivery over a full year, which is why they matter more to us than any single audit.",
    ],
  },
  {
    slug: "eepc-top-exporter-gold-2017-18",
    title: "EEPC India Top Exporter, Gold Trophy for 2017-18",
    date: "2020-02-12",
    category: "Exports",
    excerpt: "Received from Dr. Tamilisai Soundararajan, Governor of Telangana, and EEPC officials.",
    image: img("2025/07/Gold-Trophy-for-the-year-2017-2018.png"),
    readMins: 2,
    body: [
      "iMate Engineering received the EEPC India Top Exporter Gold Trophy for South India export performance in 2017-18. The trophy was presented on 12 February 2020 by Dr. Tamilisai Soundararajan, Governor of Telangana, and EEPC officials.",
      "Gold follows two Silver trophies for 2014-15 and 2016-17, and reflects growth in exports of precision cast and machined components to customers in the USA and Europe.",
    ],
  },
];

export const postCategories = Array.from(new Set(posts.map((p) => p.category)));

export const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
