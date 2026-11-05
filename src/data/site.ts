import { img } from "../lib/img";

/* ──────────────────────────────────────────────────────────────────────
   All copy, contacts, machines, products and awards live here.
   Everything below is taken from imateengineering.in unless marked `tbc`
   (to be confirmed by the client). See CLIENT-REVIEW.md for the full list.
   ────────────────────────────────────────────────────────────────────── */

export const company = {
  name: "iMate Engineering Private Limited",
  short: "iMate Engineering",
  tagline: "Intelligent Manufacturing",
  founded: 2011,
  logo: img("2025/05/iMate.png"),
  logoFooter: img("2025/05/iMate-Footer-Logo.png"),
  md: "Mr. S. Kamaraj",
  mdRole: "Managing Director",
  phones: ["+91 73733 11677", "+91 95781 11166", "+91 98433 18099"],
  emails: ["kamraj@imateengineering.in", "imateengineering@gmail.com"],
  factory: {
    label: "Factory Office",
    lines: ["S.F. No. 69, Veerappagoundanur Road,", "Vadapudur Village, Kinathukadavu,", "Coimbatore 642109, Tamil Nadu, India."],
    maps: "https://maps.app.goo.gl/erusajsf57XChwvg9",
    /** Google Maps embed URL copied from the existing website's contact page (no API key needed). */
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7837.703424085192!2d77.004267!3d10.822658!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8458eadffe073%3A0x2bb3f09a9b78d97b!2si%20MATE%20ENGINEERING%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1748608922872!5m2!1sen!2sin",
  },
  registered: {
    label: "Registered Office",
    lines: ["3A, Emerald Green Paradise,", "164, Rajiv Gandhi Nagar, Sowripalayam,", "Coimbatore 641028, Tamil Nadu, India."],
  },
  gst: "33AACCI3620F1Z5",
  pan: "AACCI3620F",
  /** Only verified social profile. Facebook and Instagram links on the old site were placeholders. */
  linkedin: "https://www.linkedin.com/company/imate-engineering-private-ltd",
  site: "https://imateengineering.in",
  iso: "ISO 9001:2015",
  facility: { total: "30,000 sq. ft", factory: "5,000 sq. ft", storage: "1,000 sq. ft" },
};

export const telHref = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;

/* ─── Navigation ──────────────────────────────────────────────────────── */
export type NavItem = { label: string; to: string; children?: { label: string; to: string; blurb?: string }[] };

export const nav: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    to: "/profile",
    children: [
      { label: "Company Profile", to: "/profile", blurb: "Who we are and how we work" },
      { label: "Vision & Mission", to: "/vision-mission", blurb: "Where we are headed" },
      { label: "Career", to: "/career", blurb: "Join the iMate team" },
    ],
  },
  { label: "Capabilities", to: "/capabilities" },
  { label: "Machineries", to: "/machineries" },
  { label: "Products", to: "/products" },
  { label: "Quality", to: "/quality" },
  { label: "Awards", to: "/awards-certifications" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact-us" },
];

/* ─── Verified figures used for animated stats ────────────────────────── */
export const stats = [
  { value: 2011, label: "Production started", format: "year" as const },
  { value: 30000, label: "sq. ft total facility", format: "number" as const },
  { value: 400, label: "kg max casting weight", prefix: "80 g to ", format: "number" as const },
  { value: 5, label: "Komatsu Best Supplier awards", format: "number" as const },
];

/* ─── Capabilities (six cards) ────────────────────────────────────────── */
export type Capability = { slug: string; title: string; short: string; body: string[]; image: string; points: string[] };

export const capabilities: Capability[] = [
  {
    slug: "cnc-machining",
    title: "CNC Machining",
    short: "Horizontal and vertical machining centres plus CNC turning for high precision ferrous and non-ferrous components.",
    image: img("2025/06/Preparation-of-2D-drawings-with-sound-knowledge-in-Engineering.jpg"),
    body: [
      "A full-fledged CNC machine shop with horizontal and vertical machining centres from Mazak, Doosan, KAFO, Hartford and BFW, plus CNC turning. Machines are specified for accuracy of 0.010 to 0.015 mm and tool capacities up to 60 stations.",
      "We machine ferrous and non-ferrous materials to Indian and international standards, with GD&T and PPAP discipline built into the process.",
    ],
    points: ["Horizontal machining centres (Mazak, Doosan)", "Vertical machining centres (KAFO, Hartford, BFW with rotary table)", "CNC turning (Askar Spinner 10)", "Accuracy 0.010 to 0.015 mm", "GD&T and PPAP documentation"],
  },
  {
    slug: "iron-casting",
    title: "Iron Casting Foundry",
    short: "Grey and ductile iron castings from 80 g to 400 kg, supplied machined or as-cast.",
    image: img("2025/06/Cast-iron-Stainless-steels-and-steel-Valves-3-Gallery.jpg"),
    body: [
      "Our foundry capability produces grey iron and ductile iron castings across a weight range of 80 g to 400 kg. Castings move directly into our machine shop, so one supplier owns the part from pattern to finished component.",
      "This is the route most of our compressor, valve and off-road programmes follow: cast in house, machined in house, inspected on the CMM.",
    ],
    points: ["Grey iron and ductile iron", "80 g to 400 kg per piece", "Cast and machined under one roof", "Castings sourced for customer programmes where required"],
  },
  {
    slug: "pattern-and-die",
    title: "Pattern & Die Manufacturing",
    short: "Dies, fixtures, patterns and core boxes developed in house for complex requirements.",
    image: img("2025/05/Off-Road-Vehicle-Part-1.jpg"),
    body: [
      "Tooling is developed in house: patterns and core boxes for the foundry, and dies and fixtures for machining. Because the tool designer, the pattern shop and the machinist sit together, tooling changes are fast and tolerances are owned end to end.",
    ],
    points: ["Patterns and core boxes", "Dies and machining fixtures", "Tool development from 3D models", "Fast iteration on engineering changes"],
  },
  {
    slug: "cad-cam",
    title: "CAD/CAM & 3D Modelling",
    short: "Part modelling through assembly, CAM programming and tool design on current software.",
    image: img("2025/05/Machinery-Parts-2.jpg"),
    body: [
      "Our engineering office prepares 2D drawings and 3D models on the latest software, from part modelling through assembly, and generates CAM programs for the machine shop. Dies, fixtures, patterns and core boxes are designed from the same models.",
      "We accept STEP, IGES, DWG, DXF and PDF inputs and return drawings, programs and documentation in the format your quality team needs.",
    ],
    points: ["2D drawing preparation", "3D part and assembly modelling", "CAM programming for 3D machining", "PFD, control plan, FMEA, process capability, Gauge R&R"],
  },
  {
    slug: "hydrotesting",
    title: "Hydrotesting Facilities",
    short: "In-house hydrostatic testing so pressure-bearing parts ship with proof.",
    image: img("2025/06/Cast-iron-Stainless-steels-and-steel-Valves-1-Gallery.jpg"),
    body: [
      "Valve bodies, compressor components and other pressure-bearing parts are hydrostatically tested in house before despatch. Test records travel with the shipment.",
    ],
    points: ["Hydrostatic test facility in house", "Test records supplied with each lot", "Suited to valves and compressor parts"],
  },
  {
    slug: "value-added-services",
    title: "Value-Added Services",
    short: "Heat treatment, surface coating, 3D scanning, welding and sub-assembly, coordinated under one purchase order.",
    image: img("2025/05/Compressor-Parts-6.jpg"),
    body: [
      "Beyond casting and machining, we coordinate heat treatment, surface coating, 3D scanning, welding and sub-assembly so you receive a finished, ready-to-fit component rather than a part that still needs three more vendors.",
    ],
    points: ["Heat treatment", "Surface coating", "3D scanning", "Welding", "Sub-assembly"],
  },
];

/* ─── Engineering capabilities list (from the capabilities page) ──────── */
export const engineeringPoints = [
  "Preparation of 2D drawings with sound knowledge in engineering.",
  "3D modelling on the latest software, from part modelling through assembly, 3D machining (CAM programs) and tool development: dies, fixtures, patterns and core boxes.",
  "High precision machining with an array of modern machines and programming abilities.",
  "Working to Indian and international standards, GD&T and PPAP.",
  "Documentation: PFD, CCP, FMEA, process capability analysis and Gauge R&R.",
  "In-house test facility for hydrostatic testing.",
];

export const process = [
  { n: "01", title: "Send the drawing", body: "Share a PDF, STEP, IGES, DWG or DXF with quantity and target date." },
  { n: "02", title: "Engineering review", body: "We review material, process route, tolerance and testing requirements." },
  { n: "03", title: "Quote and plan", body: "You receive a commercial response and a clear manufacturing route." },
  { n: "04", title: "Make and verify", body: "Production, inspection, testing and documentation follow the agreed plan." },
];

/* ─── Industries (validated against existing products and customers) ──── */
export type Industry = { name: string; blurb: string; image: string; to: string; tbc?: boolean };

export const industries: Industry[] = [
  { name: "Automotive & Off-Road Equipment", blurb: "Off-road vehicle components for mining and construction equipment programmes, including a decade-long Komatsu relationship.", image: img("2025/05/Off-Road-Parts-Img.jpg"), to: "/products#off-road" },
  { name: "Compressors & Industrial Equipment", blurb: "Repeat-supply cast and machined parts for compressor builders such as Ingersoll Rand.", image: img("2025/05/Compressor-Parts-Img-1.jpg"), to: "/products#compressor" },
  { name: "Heavy Machinery", blurb: "Precision parts for general and textile machinery builders.", image: img("2025/05/Machinery-Parts-3.jpg"), to: "/products#machinery" },
  { name: "Fluid Handling & Valves", blurb: "Valve bodies and components in cast iron, stainless steel and carbon steel for flow-control customers.", image: img("2025/06/Cast-iron-Stainless-steels-and-steel-Valves-1-Gallery.jpg"), to: "/products#valves" },
  { name: "Energy & Industrial Infrastructure", blurb: "Heat exchanger components and pressure-bearing parts with hydrostatic test records.", image: img("2025/05/Our-services-includes-machining-of-precision-parts-BG.jpg"), to: "/products#heat-exchanger", tbc: true },
];

/* ─── Products ────────────────────────────────────────────────────────── */
export type Category = "Off Road Vehicle Parts" | "Compressor Parts" | "Machinery Parts" | "Cast Iron, Stainless Steel and Steel Valves" | "Heat Exchanger Components";

export type CategoryInfo = { name: Category; slug: string; image: string; blurb: string; tbc?: boolean };

export const categories: CategoryInfo[] = [
  { name: "Off Road Vehicle Parts", slug: "off-road", image: img("2025/05/Off-Road-Parts-Img.jpg"), blurb: "Machined and cast components for mining and construction equipment programmes." },
  { name: "Compressor Parts", slug: "compressor", image: img("2025/05/Compressor-Parts-Img-1.jpg"), blurb: "Repeat-supply components for industrial and medical compressors." },
  { name: "Machinery Parts", slug: "machinery", image: img("2025/05/Machinery-Parts-3.jpg"), blurb: "Precision parts for general and textile machinery builders." },
  { name: "Cast Iron, Stainless Steel and Steel Valves", slug: "valves", image: img("2025/06/Cast-iron-Stainless-steels-and-steel-Valves-1-Gallery.jpg"), blurb: "Valve bodies and components in cast iron, stainless and carbon steel." },
  { name: "Heat Exchanger Components", slug: "heat-exchanger", image: img("2025/05/Heat-exchanger-part-img.jpg"), blurb: "Cast and machined heat exchanger components such as tube sheets and bushes.", tbc: true },
];

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

export type Product = { id: string; name: string; category: Category; image: string };

export const products: Product[] = [
  ...range(10).map((i) => ({ id: `compressor-${i}`, name: `Compressor Part ${i}`, category: "Compressor Parts" as Category, image: img(`2025/05/Compressor-Parts-${i}.jpg`) })),
  ...range(9).map((i) => ({ id: `machinery-${i}`, name: `Machinery Part ${i}`, category: "Machinery Parts" as Category, image: img(`2025/05/Machinery-Parts-${i}.jpg`) })),
  ...range(3).map((i) => ({ id: `off-road-${i}`, name: `Off Road Vehicle Part ${i}`, category: "Off Road Vehicle Parts" as Category, image: img(`2025/05/Off-Road-Vehicle-Part-${i}.jpg`) })),
  { id: "heat-exchanger-1", name: "Heat Exchanger Component 1", category: "Heat Exchanger Components" as Category, image: img("2025/05/Heat-exchanger-part-img.jpg") },
  ...range(5).map((i) => ({ id: `valve-${i}`, name: `Cast Iron, Stainless Steel and Steel Valve ${i}`, category: "Cast Iron, Stainless Steel and Steel Valves" as Category, image: img(`2025/06/Cast-iron-Stainless-steels-and-steel-Valves-${i}-Gallery.jpg`) })),
];

/* ─── Machines ────────────────────────────────────────────────────────── */
export type Machine = { name: string; make: string; model: string; type: string; image: string; specs: [string, string][] };

export const machines: Machine[] = [
  {
    name: "KAFO Vertical Machining Center",
    make: "KAFO, Taiwan",
    model: "VMC16100",
    type: "Vertical machining centre",
    image: img("2025/06/KAFO-Vertical-Machining-Center.jpg"),
    specs: [
      ["Traverse X / Y / Z", "1620 / 1000 / 790 mm"],
      ["Table size", "2000 x 1000 mm"],
      ["Table load", "3000 kg"],
      ["Spindle power", "15 / 18 kW"],
      ["ATC", "40 tools"],
      ["Control", "Fanuc 0iMB"],
      ["Accuracy", "0.015 mm"],
      ["Quantity", "1"],
    ],
  },
  {
    name: "DOOSAN Horizontal Machining Center",
    make: "Doosan",
    model: "HM 6300",
    type: "Horizontal machining centre",
    image: img("2025/06/DOOSAN-Horizontal-Machining-Center.jpg"),
    specs: [
      ["Traverse X / Y / Z", "1000 / 800 / 850 mm"],
      ["Pallet size", "630 x 630 mm"],
      ["Pallet index", "1°"],
      ["Spindle power", "25 / 33 kW"],
      ["Spindle taper", "ISO #7/24"],
      ["Spindle speed", "20 to 8000 rpm"],
      ["ATC", "40 tools"],
      ["Accuracy", "0.010 mm"],
      ["Quantity", "1"],
    ],
  },
  {
    name: "HARTFORD 1270 Vertical Machining Center",
    make: "Hartford, Taiwan",
    model: "VMC 1270 AP",
    type: "Vertical machining centre",
    image: img("2025/06/HARTFORD-1270-Vertical-Machining-Center.jpg"),
    specs: [
      ["Traverse X / Y / Z", "1270 / 635 / 635 mm"],
      ["Table size", "1300 x 700 mm"],
      ["Table load", "800 kg"],
      ["Spindle power", "7.5 / 10 kW"],
      ["ATC", "24 tools"],
      ["Control", "Fanuc"],
      ["Accuracy", "0.015 mm"],
      ["Quantity", "1"],
    ],
  },
  {
    name: "MAZAK Horizontal Machining Center",
    make: "Mazak, Japan",
    model: "Horizontal Center Nexus 4000-III",
    type: "Horizontal machining centre",
    image: img("2025/06/MAZAK-Horizontal-Machining-Center.jpg"),
    specs: [
      ["Traverse X / Y / Z", "560 / 640 / 640 mm"],
      ["Table size", "400 x 400 mm"],
      ["Workpiece", "Ø 630 mm, height 900 mm"],
      ["Table load", "400 kg"],
      ["Spindle power", "22 / 30 kW"],
      ["Spindle speed", "35 to 14000 rpm"],
      ["ATC", "60 tools"],
      ["Control", "Mazatrol Matrix Nexus 2"],
      ["Accuracy", "0.010 mm"],
      ["Quantity", "1"],
    ],
  },
  {
    name: "BFW Vertical Machining Center with Rotary Table",
    make: "BFW, India",
    model: "Xtron 955",
    type: "Vertical machining centre, 4-axis",
    image: img("2025/06/BFW-Vertical-Machining-Center-with-Rotary-Table.jpg"),
    specs: [
      ["Traverse X / Y / Z", "900 / 500 / 500 mm"],
      ["Table size", "1100 x 510 mm"],
      ["Table load", "600 kg"],
      ["Spindle power", "7.5 / 11 kW"],
      ["Spindle speed", "8000 rpm"],
      ["ATC", "24 tools, BT40"],
      ["Control", "Fanuc 0iMF"],
      ["Rotary table", "250 mm, index accuracy 0.01 mm"],
      ["Accuracy", "0.010 mm"],
      ["Quantity", "1"],
    ],
  },
  {
    name: "CNC Turning Center",
    make: "Askar, India",
    model: "Spinner 10",
    type: "CNC turning centre",
    image: img("2025/06/CNC-Turning-Center.jpg"),
    specs: [
      ["Chuck", "200 mm"],
      ["Swing over bed", "350 mm"],
      ["Traverse X / Z", "150 / 350 mm"],
      ["Turn diameter", "250 mm"],
      ["Turning length", "325 mm"],
      ["Boring bar capacity", "40 mm"],
      ["Spindle power", "5.5 / 7.5 kW"],
      ["Spindle", "A2-5, bore Ø 60 mm, 4000 rpm"],
      ["Control", "Fanuc 0iTF"],
      ["Turret", "Bi-directional, 8 station, BTP80"],
      ["Accuracy", "0.010 mm"],
      ["Quantity", "1"],
    ],
  },
];

export const cmm: Machine = {
  name: "Coordinate Measuring Machine (CMM)",
  make: "Mitutoyo, Japan",
  model: "Crysta Plus 7106",
  type: "Inspection",
  image: img("2025/06/COORDINATE-MEASURING-MACHINE-CMM.jpg"),
  specs: [
    ["Measuring range X / Y / Z", "700 / 1000 / 600 mm"],
    ["Table size", "1720 x 880 mm"],
    ["Workpiece height", "800 mm"],
    ["Table load", "800 kg"],
    ["Software", "Geopak (Windows)"],
    ["Quantity", "1"],
  ],
};

/* ─── Quality ─────────────────────────────────────────────────────────── */
export const quality = {
  /** The live site has no written quality policy. This draft is marked tbc until the client approves it. */
  policyTbc: true,
  policy:
    "iMate Engineering is committed to supplying precision cast and machined components that meet customer drawings, specifications and delivery commitments the first time, every time. We maintain an ISO 9001:2015 quality management system, measure what we make, document what we measure, and improve our processes continuously.",
  pillars: [
    { title: "Inspection on a Mitutoyo CMM", body: "Crysta Plus 7106 with a 700 x 1000 x 600 mm measuring range, running Geopak. Critical dimensions are reported, not assumed." },
    { title: "Hydrostatic testing", body: "In-house hydrotest facility for valves, compressor parts and other pressure-bearing components." },
    { title: "Process documentation", body: "PFD, control plans, FMEA, process capability analysis and Gauge R&R prepared to customer and PPAP requirements." },
    { title: "Standards", body: "Work to Indian and international standards with GD&T applied on drawings and in inspection." },
  ],
  certifications: ["ISO 9001:2015 quality management system", "ZED Silver (Zero Defect Zero Effect)", "Dun & Bradstreet business recognition"],
};

/* ─── Awards ──────────────────────────────────────────────────────────── */
export type Award = { title: string; detail?: string; year?: string; image: string; group: "Export" | "Supplier" | "Industry" | "Certification"; tbc?: boolean };

export const awards: Award[] = [
  { group: "Certification", title: "ISO 9001:2015 Certificate", detail: "Quality management system certification", image: img("2025/07/ISO-90012015Certificate.png") },
  { group: "Supplier", title: "Komatsu Best Supplier Award", year: "2012-13", detail: "Best Supplier award from Komatsu India Private Limited for the financial year 2012-13. The first of five.", image: img("2025/07/Achieved-best-supplier-award-from-KOMATSU-during-the-period-of-2012-13.png") },
  { group: "Supplier", title: "Komatsu Best Supplier Award", year: "2013-14", detail: "Certificate of Appreciation for Best Performance in Quality, FY 2013-14, presented by Komatsu India Private Limited.", image: img("2025/07/Achieved-best-supplier-award-from-KOMATSU-during-the-period-of-2013-14.png") },
  { group: "Supplier", title: "Komatsu Best Supplier Award", year: "2014-15", detail: "Best Performance in Quality, First Place, FY 2014-15, awarded by Komatsu India Private Limited, Chennai Plant.", image: img("2025/07/Achieved-best-supplier-award-from-KOMATSU-during-the-period-of-2014-15.png") },
  { group: "Supplier", title: "Komatsu Best Supplier Award", year: "2016-17", detail: "Best Performance in Quality plaque from Komatsu India Private Limited, Chennai Plant, for FY 2016-17.", image: img("2025/07/Achieved-best-supplier-award-from-KOMATSU-during-the-period-of-2016-17.png") },
  { group: "Supplier", title: "Komatsu Best Supplier Award", year: "2021-22", detail: "Best Supplier award from Komatsu India for FY 2021-22, the fifth time iMate has been recognised by Komatsu.", image: img("2025/07/Achieved-best-supplier-award-from-KOMATSU-during-the-period-of-2021-2022.png") },
  { group: "Export", title: "Top Exporter, Silver Trophy, EEPC India", year: "2014-15", detail: "Southern region. Received from Mrs. Kiran Bedi, Lieutenant Governor of Puducherry, and EEPC officials.", image: img("2025/07/Achieved-TOP-EXPORTER-Silver-Trophy-Award-From-EEPC.png") },
  { group: "Export", title: "Top Exporter, Silver Trophy, EEPC India", year: "2016-17", detail: "Southern region. Received from the Industrial Minister of Kerala and EEPC officials.", image: img("2025/07/Achieved-TOP-EXPORTER-Silver-Trophy-Award-from-EEPC-1.png") },
  { group: "Export", title: "Top Exporter, Silver Trophy, EEPC India", year: "2016-17", detail: "Southern region. Received from Mr. Banwarilal Purohit, Governor of Tamil Nadu, and EEPC officials.", image: img("2025/07/Received-from-Mr.Banwarilal-Purohit-Honorable-Governor-Tamilnadu-and-EEPC-Officials.png") },
  { group: "Export", title: "Top Exporter, Gold Trophy, EEPC India", year: "2017-18", detail: "South India export performance. Received from Dr. Tamilisai Soundararajan, Governor of Telangana, and EEPC officials on 12 Feb 2020.", image: img("2025/07/Gold-Trophy-for-the-year-2017-2018.png") },
  { group: "Export", title: "Top Exporter, Silver Trophy, EEPC India", year: "2018-19", detail: "South India export performance. Received from Shri Basavaraj Bommai, Chief Minister of Karnataka, 21 July 2022, Bengaluru.", image: img("2025/07/Achieved-South-India-Export-Performance-Top-Exporter-Silver-Trophy-for-the-year-2018-2019.png") },
  { group: "Export", title: "Star Performer Export Award, EEPC India", detail: "Year to be confirmed from the award certificate.", image: img("2025/07/Achieved-STAR-PERFORMER-Export-Award-from-EEPC.png"), tbc: true },
  { group: "Industry", title: "Top 100 SME India", year: "2022", detail: "India SME Forum. Received from Shri Narayan Rane, Minister of MSME, and Shri Bhanu Pratap Singh Verma, 13 April 2022, Taj Palace, New Delhi.", image: img("2025/07/Achieved-One-of-the-Top-100-SME-India-award-for-the-year-2022-from-India-SME-Forum.png") },
  { group: "Industry", title: "Thinkers of Tomorrow, News18", year: "2023", detail: "Given by the News18 network on 24 March 2023, Chennai.", image: img("2025/07/Thinkers-of-Tomorrow-award.png") },
  { group: "Industry", title: "Industry Outlook", year: "2024", image: img("2025/07/Industry-Outlook-2024.png") },
  { group: "Certification", title: "ZED Silver", detail: "Zero Defect Zero Effect certification", image: img("2025/07/Zed-Silver.png") },
  { group: "Certification", title: "Dun & Bradstreet", detail: "Business recognition", image: img("2025/07/Dun-Bradstreet.png") },
];

/* ─── Clients and testimonial ─────────────────────────────────────────── */
export const clients = [
  { name: "ORB Inox", logo: img("2025/05/ORB-Inox.png") },
  { name: "Flowserve", logo: img("2025/05/Flowserve.png") },
  { name: "Komatsu", logo: img("2025/05/Komatsu.png") },
  { name: "Ingersoll Rand", logo: img("2025/05/IR-Ingersoll-Rand.png") },
  { name: "Hubbell", logo: img("2025/05/Hub-Bell.png") },
  { name: "Hirotec India", logo: img("2025/05/Hirotec-India.png") },
];

export type Testimonial = { quote: string; name: string; role: string; companyName: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "iMate is associated with IR now close to a decade, supplying critical ferrous and non-ferrous casting and machining components, catering across the different IR plants and BUs spreading across the world while meeting quality, cost and delivery.",
    name: "Pradeep Dhareshwar",
    role: "Corporate Quality, Compression Technologies & Services",
    companyName: "Ingersoll Rand (India) Limited",
  },
];

/* ─── Why choose iMate ────────────────────────────────────────────────── */
export const whyChoose = [
  { icon: "Factory", title: "Engineering expertise since 2011", body: "Fifteen years of build-to-print manufacturing for compressor, off-road, valve and machinery programmes." },
  { icon: "BadgeCheck", title: "ISO 9001:2015 certified", body: "A certified quality management system, backed by ZED Silver and Dun & Bradstreet recognition." },
  { icon: "Layers", title: "In-house manufacturing", body: "Casting, pattern making, machining, hydrotesting and inspection on one 30,000 sq. ft site." },
  { icon: "Cog", title: "CNC machining and casting", body: "Mazak, Doosan, KAFO, Hartford and BFW machining centres fed by grey and ductile iron casting." },
  { icon: "Gauge", title: "Quality-focused processes", body: "Mitutoyo CMM inspection, GD&T, PPAP documentation, FMEA and Gauge R&R." },
  { icon: "Wrench", title: "Value-added services", body: "Heat treatment, coating, 3D scanning, welding and sub-assembly coordinated for you." },
  { icon: "Globe", title: "International supply experience", body: "EEPC Top Exporter trophies for five consecutive years of export performance to the USA and Europe." },
];

/* ─── Vision and mission (from the live site) ─────────────────────────── */
export const vision = {
  mission: {
    title: "Our Mission",
    body: "To bridge the gap between complex engineering challenges and seamless, high-performance solutions through innovation, precision and reliability, with a client-centric approach in everything we make.",
  },
  vision: {
    title: "Our Vision",
    kicker: "Shaping the future of engineering globally",
    body: "iMate envisions a world where engineering excellence transforms industries and empowers progress. We aim to be the preferred manufacturing partner for businesses across the Americas, Europe, the Middle East, Africa and APAC, anticipating tomorrow's challenges with scalable strategies.",
  },
  commitments: [
    { title: "Global expertise, local impact", body: "International best practices combined with regional insight and a factory in Coimbatore, India's engineering belt." },
    { title: "Innovation-driven approach", body: "Exploring emerging technologies and processes that improve efficiency and sustainability on the shop floor." },
    { title: "Client-centric solutions", body: "Long-term partnerships and customised services, measured by the decade-long relationships we keep." },
  ],
};

/* ─── Equipment gallery. These are manufacturer photographs of the machines on iMate's floor; replace with shop-floor photography when available. */
export const facilityGallery = [
  { src: img("2025/06/Preparation-of-2D-drawings-with-sound-knowledge-in-Engineering.jpg"), label: "CNC milling of a precision component", tag: "CNC machining" },
  { src: img("2025/06/MAZAK-Horizontal-Machining-Center.jpg"), label: "Mazak HCN 4000-III horizontal machining centre", tag: "Equipment" },
  { src: img("2025/06/DOOSAN-Horizontal-Machining-Center.jpg"), label: "Doosan HM 6300 horizontal machining centre", tag: "Equipment" },
  { src: img("2025/06/COORDINATE-MEASURING-MACHINE-CMM.jpg"), label: "Mitutoyo Crysta Plus 7106 CMM", tag: "Inspection" },
  { src: img("2025/06/Quality.png"), label: "Measuring instruments and gauges", tag: "Inspection" },
  { src: img("2025/06/KAFO-Vertical-Machining-Center.jpg"), label: "KAFO VMC16100 vertical machining centre", tag: "Equipment" },
  { src: img("2025/06/BFW-Vertical-Machining-Center-with-Rotary-Table.jpg"), label: "BFW Xtron 955 with rotary table", tag: "Equipment" },
  { src: img("2025/06/CNC-Turning-Center.jpg"), label: "Askar Spinner 10 CNC turning centre", tag: "Equipment" },
];

/* ─── Key photographs ─────────────────────────────────────────────────── */
/** Full-bleed hero background (1600 px wide, dark steel). */
export const heroImage = img("2025/05/Ready-to-work-with-us-BG.jpg");
/** Portrait CNC turning photograph used as the hero feature card and the intro split image. */
export const heroCard = img("2025/05/Building-quality-through-industrial-innovation.jpg");
export const profileImage = img("2025/05/Building-quality-through-industrial-innovation.jpg");
export const capabilitiesImage = img("2025/06/Preparation-of-2D-drawings-with-sound-knowledge-in-Engineering.jpg");
/** Cast valve body, used where a casting photograph is needed (no foundry floor photo exists yet). */
export const foundryImage = img("2025/06/Cast-iron-Stainless-steels-and-steel-Valves-2-Gallery.jpg");
/** Wide industrial plant photograph (1600 px) for page heroes and the closing CTA. */
export const plantImage = img("2025/05/Our-services-includes-machining-of-precision-parts-BG.jpg");
export const profileHero = plantImage;
export const qualityImage = img("2025/06/Quality.png");
/** Optional looping background video for the home hero. Set to "/video/hero.mp4" once real shop-floor footage is placed in public/video. */
export const heroVideo: string | null = null;

export const officeHours = [
  ["Monday to Saturday", "9:00 AM to 6:00 PM IST"],
  ["Sunday", "Closed"],
] as const;

/* ─── Form configuration ──────────────────────────────────────────────── */
export const materials = ["Grey iron", "Ductile iron (SG iron)", "Carbon steel", "Stainless steel", "Aluminium", "Brass / bronze", "Other / as per drawing"];

export const enquirySubjects = ["Request a quote", "Compressor parts", "Machinery parts", "Off road vehicle parts", "Valves", "Heat exchanger components", "Casting and patterns", "Partnership", "Career", "Other"];
