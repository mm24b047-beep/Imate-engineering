import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Quote, BadgeCheck, Cog, Factory, Gauge, Globe, Layers, Wrench, type LucideIcon } from "lucide-react";
import Button from "../components/Button";
import Section, { Tbc } from "../components/Section";
import { Reveal, Stagger, Item } from "../components/Reveal";
import Counter from "../components/Counter";
import LogoMarquee from "../components/LogoMarquee";
import Rail from "../components/Rail";
import Lightbox from "../components/Lightbox";
import Cta from "../components/Cta";
import ImageReveal from "../components/ImageReveal";
import SupplierAwards from "../components/SupplierAwards";
import { useSeo } from "../hooks/useSeo";
import { EASE } from "../lib/motion";
import { awards, capabilities, categories, company, facilityGallery, heroCard, heroImage, heroVideo, industries, profileImage, stats, testimonials, whyChoose } from "../data/site";

const icons: Record<string, LucideIcon> = { Factory, BadgeCheck, Layers, Cog, Gauge, Wrench, Globe };

export default function Home() {
  useSeo(
    "iMate Engineering | Precision CNC Machining, Iron Casting and Engineering Solutions, Coimbatore",
    "iMate Engineering Private Limited: ISO 9001:2015 certified precision machining, grey and ductile iron casting, pattern and die manufacturing and CAD/CAM from Coimbatore, India. Supplying the USA, Europe and India since 2011.",
    heroImage,
  );

  return (
    <>
      <Hero />
      <Intro />
      <Capabilities />
      <Industries />
      <ProductsShowcase />
      <WhyIMate />
      <Facility />
      <Awards />
      <Clients />
      <Testimonial />
      <Cta />
    </>
  );
}

/* ───────────────────────── 2. Hero ───────────────────────── */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const words = "Engineering Precision. Delivering Excellence.".split(" ");

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy text-white">
      <motion.div style={{ y }} className="absolute inset-0">
        {heroVideo ? (
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster={heroImage} aria-hidden>
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          <img src={heroImage} alt="" width={1920} height={1080} loading="eager" fetchPriority="high" className="h-full w-full object-cover kenburns" />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/25" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-transparent to-transparent" aria-hidden />

      <motion.div style={{ opacity: fade }} className="container-x relative pb-16 pt-40 sm:pb-24">
        {/* floating CNC feature card */}
        <motion.figure initial={{ opacity: 0, y: 40, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1.2, ease: EASE, delay: 0.9 }} style={{ y: cardY }} className="absolute right-12 top-32 hidden w-[300px] overflow-hidden rounded-2xl shadow-[var(--shadow-float)] ring-1 ring-white/15 xl:block 2xl:w-[340px]">
          <img src={heroCard} alt="CNC turning at iMate Engineering" width={500} height={610} loading="eager" className="aspect-[5/6] w-full object-cover" />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/90 to-transparent p-5 text-xs uppercase tracking-[0.18em] text-white/80">
            <span className="mb-1 block h-px w-8 bg-orange" />
            CNC turning · Kinathukadavu plant
          </figcaption>
        </motion.figure>
        <div className="max-w-4xl">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.2 }} className="eyebrow on-dark mb-7">
            Precision machining · Iron casting · Coimbatore, India
          </motion.p>
          <h1 className="display-xl" aria-label="Engineering Precision. Delivering Excellence.">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 pr-[0.25em] align-top">
                <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.35 + i * 0.08 }}>
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.85 }} className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Your trusted partner in precision machining, iron casting and complete engineering solutions.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 1.0 }} className="mt-10 flex flex-wrap gap-3">
            <Button to="/capabilities" size="lg" arrow>
              Explore Capabilities
            </Button>
            <Button to="/request-a-quote" size="lg" variant="outline-white">
              Request a Quote
            </Button>
          </motion.div>
        </div>

        {/* verified stats */}
        <motion.dl initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 1.2 }} className="mt-16 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:mt-20 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="order-2 text-xs uppercase tracking-[0.14em] text-white/55">{s.label}</dt>
              <dd className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <Counter value={s.value} format={s.format} prefix={s.prefix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <div className="pointer-events-none absolute bottom-6 right-6 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50 lg:flex">
        Scroll
        <span className="block h-10 w-px overflow-hidden bg-white/20">
          <motion.span className="block h-full w-full bg-orange" animate={{ y: ["-100%", "100%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
        </span>
      </div>
    </section>
  );
}

/* ───────────────────── 3. Company introduction ───────────────────── */
function Intro() {
  const highlights = ["Established in 2011", "Precision machining of ferrous and non-ferrous materials", "CNC machining facilities", "Iron casting foundry", "Pattern and die manufacturing", "In-house CAD/CAM facilities", "Global manufacturing and export experience"];
  return (
    <section className="bg-white">
      <div className="container-x section-pad">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="relative">
              <ImageReveal src={profileImage} alt="CNC turning at iMate Engineering" className="aspect-[4/5] rounded-2xl sm:aspect-[5/4] lg:aspect-[4/5]" width={500} height={610} />
              <div className="absolute -bottom-6 -right-4 rounded-2xl bg-navy p-6 text-white shadow-[var(--shadow-float)] sm:-right-8 sm:p-8">
                <p className="font-display text-4xl font-extrabold tracking-tight text-orange">
                  <Counter value={new Date().getFullYear() - company.founded} suffix="+" />
                </p>
                <p className="mt-1 text-sm text-white/70">years of precision manufacturing</p>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-5">About iMate Engineering</p>
              <h2 className="display-lg">Precision Engineering. Built on Experience.</h2>
              <p className="mt-6 lead">
                iMate Engineering Private Limited is a Coimbatore-based precision engineering company providing end-to-end manufacturing solutions. Since 2011 we have machined ferrous and non-ferrous components, cast grey and ductile iron, and built the patterns, dies and fixtures behind them, all from a {company.facility.total} site in Kinathukadavu.
              </p>
              <p className="mt-4 lead">We supply build-to-print components to manufacturers in the USA, Europe and India, with an {company.iso} quality system and a decade of supplier awards behind the work.</p>
            </Reveal>
            <Stagger as="ul" className="mt-8 grid gap-3 sm:grid-cols-2" gap={0.05}>
              {highlights.map((h) => (
                <Item as="li" key={h} className="flex items-start gap-3 text-sm font-medium text-charcoal">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                  {h}
                </Item>
              ))}
            </Stagger>
            <Reveal className="mt-10" delay={0.1}>
              <Button to="/profile" variant="secondary" size="lg" arrow>
                Discover Our Company
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── 4. Capabilities ───────────────────── */
function Capabilities() {
  return (
    <Section
      id="capabilities"
      tone="grey"
      eyebrow="Manufacturing capabilities"
      title="Complete Engineering Capabilities Under One Roof."
      lead="Casting, tooling, machining, testing and finishing on a single site, so one purchase order covers the whole part."
      action={
        <Button to="/capabilities" variant="ghost" arrow>
          All capabilities
        </Button>
      }
    >
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
        {capabilities.map((c, i) => (
          <Item key={c.slug} as="article">
            <Link to={`/capabilities#${c.slug}`} className="group block h-full overflow-hidden rounded-2xl bg-navy text-white">
              <div className="img-frame aspect-[4/3]">
                <img src={c.image} alt={c.title} loading="lazy" width={800} height={600} />
                <div className="img-overlay" />
                <span className="absolute left-5 top-5 font-display text-xs font-bold tracking-[0.2em] text-white/70">0{i + 1}</span>
              </div>
              <div className="relative -mt-16 p-6 sm:p-7">
                <h3 className="display-sm text-white">{c.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/70">{c.short}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange">
                  Explore more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Item>
        ))}
      </Stagger>
    </Section>
  );
}

/* ───────────────────── 5. Industries ───────────────────── */
function Industries() {
  return (
    <Section eyebrow="Industries we serve" title="Engineering Solutions Across Industries." lead="Sectors supported by our existing product lines and customer relationships.">
      <Stagger className="grid gap-5 md:grid-cols-6" gap={0.07}>
        {industries.map((ind, i) => (
          <Item key={ind.name} as="article" className={i < 2 ? "md:col-span-3" : "md:col-span-2"}>
            <Link to={ind.to} className="group relative block overflow-hidden rounded-2xl">
              <div className={`img-frame ${i < 2 ? "aspect-[16/10]" : "aspect-[4/5] sm:aspect-[4/3] md:aspect-[4/5]"}`}>
                <img src={ind.image} alt={ind.name} loading="lazy" width={900} height={700} />
                <div className="img-overlay" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                {ind.tbc && (
                  <p className="mb-2">
                    <Tbc>Validate with client</Tbc>
                  </p>
                )}
                <h3 className="display-sm text-white">{ind.name}</h3>
                <p className="mt-2 max-w-md text-sm text-white/75 opacity-0 transition-all duration-500 group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0">{ind.blurb}</p>
              </div>
            </Link>
          </Item>
        ))}
      </Stagger>
    </Section>
  );
}

/* ───────────────────── 6. Products showcase ───────────────────── */
function ProductsShowcase() {
  return (
    <Section
      tone="grey"
      eyebrow="Products"
      title="Precision Components. Exceptional Quality."
      lead="Cast and machined components across five product families, supplied to drawing with inspection and test records."
      action={
        <Button to="/products" variant="secondary" arrow>
          View All Products
        </Button>
      }
    >
      <Rail>
        {categories.map((c) => (
          <article key={c.slug} className="group w-[82vw] sm:w-[360px]">
            <Link to={`/products#${c.slug}`} className="card block h-full overflow-hidden">
              <div className="img-frame aspect-square">
                <img src={c.image} alt={c.name} loading="lazy" width={600} height={600} />
                {c.tbc && (
                  <span className="absolute left-4 top-4">
                    <Tbc>Images to be supplied</Tbc>
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="display-sm">{c.name}</h3>
                <p className="mt-2 text-sm text-muted">{c.blurb}</p>
                <span className="link-line mt-5 text-sm">
                  View details <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </Rail>
    </Section>
  );
}

/* ───────────────────── 7. Why choose iMate ───────────────────── */
function WhyIMate() {
  const [first, ...rest] = whyChoose;
  const FirstIcon = icons[first.icon];
  return (
    <Section tone="navy" eyebrow="Why choose iMate" title="Why Global Manufacturers Trust iMate." lead="Not a list of promises. These are the capabilities and credentials behind fifteen years of repeat supply.">
      <div className="absolute inset-0 grid-texture opacity-30" aria-hidden />
      <div className="relative grid gap-5 lg:grid-cols-12">
        {/* feature photo */}
        <Reveal className="lg:col-span-5 lg:row-span-2">
          <ImageReveal src={facilityGallery[0].src} alt={facilityGallery[0].label} className="h-full min-h-[320px] rounded-2xl" parallax={6}>
            <div className="img-overlay" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <FirstIcon className="mb-4 h-8 w-8 text-orange" />
              <h3 className="display-sm text-white">{first.title}</h3>
              <p className="mt-2 text-sm text-white/75">{first.body}</p>
            </div>
          </ImageReveal>
        </Reveal>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3" gap={0.06}>
          {rest.map((w) => {
            const Icon = icons[w.icon];
            return (
              <Item key={w.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition hover:border-orange/50 hover:bg-white/[0.07]">
                <Icon className="h-7 w-7 text-orange" />
                <h3 className="mt-5 font-display text-lg font-bold text-white">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{w.body}</p>
              </Item>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}

/* ───────────────────── 8. Facility gallery ───────────────────── */
function Facility() {
  const [i, setI] = useState<number | null>(null);
  const spans = ["md:col-span-2 md:row-span-2", "", "", "", "", "md:col-span-2", "", ""];
  return (
    <Section eyebrow="Our plant" title="The Equipment Behind Every Part." lead="Machining centres, turning, CMM inspection and the engineering office at our Kinathukadavu plant.">
      <Stagger className="grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[220px]" gap={0.05}>
        {facilityGallery.map((g, idx) => (
          <Item key={g.src} as="figure" className={spans[idx] ?? ""}>
            <button type="button" onClick={() => setI(idx)} className="group relative block h-full w-full overflow-hidden rounded-xl text-left">
              <div className="img-frame aspect-square h-full w-full md:aspect-auto">
                <img src={g.src} alt={g.label} loading="lazy" width={800} height={600} />
                <div className="absolute inset-0 bg-navy/0 transition group-hover:bg-navy/40" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white opacity-0 transition group-hover:opacity-100">
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-orange">{g.tag}</span>
                  <span className="block text-sm font-semibold">{g.label}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </figcaption>
            </button>
          </Item>
        ))}
      </Stagger>
      <Lightbox
        src={i === null ? null : facilityGallery[i].src}
        alt={i === null ? "" : facilityGallery[i].label}
        caption={i === null ? "" : facilityGallery[i].label}
        onClose={() => setI(null)}
        onPrev={() => setI((v) => (v === null ? null : (v - 1 + facilityGallery.length) % facilityGallery.length))}
        onNext={() => setI((v) => (v === null ? null : (v + 1) % facilityGallery.length))}
      />
    </Section>
  );
}

/* ───────────────────── 9. Awards ───────────────────── */
function Awards() {
  const featured = [awards.find((a) => a.title.startsWith("ISO")), awards.find((a) => a.title.startsWith("Top 100")), awards.find((a) => a.title.includes("Gold")), awards.find((a) => a.title.startsWith("Star")), awards.find((a) => a.title.startsWith("Thinkers")), awards.find((a) => a.title.startsWith("ZED"))].filter(Boolean) as typeof awards;
  return (
    <Section
      tone="grey"
      eyebrow="Awards and certifications"
      title="Recognised for Quality and Excellence."
      lead={`${company.iso} certified. Five Komatsu Best Supplier awards. Five consecutive EEPC India Top Exporter trophies.`}
      action={
        <Button to="/awards-certifications" variant="ghost" arrow>
          All {awards.length} awards
        </Button>
      }
    >
      <div className="mb-16 sm:mb-20">
        <SupplierAwards />
      </div>
      <Reveal className="mb-8">
        <p className="eyebrow">Export, industry and certification</p>
      </Reveal>
      <Rail>
        {featured.map((a) => (
          <article key={a.title + a.year} className="card w-[260px] overflow-hidden sm:w-[300px]">
            <div className="img-frame aspect-[4/3] bg-white p-4">
              <img src={a.image} alt={a.title} loading="lazy" width={600} height={450} className="!object-contain" />
            </div>
            <div className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange">
                {a.group}
                {a.year ? ` · ${a.year}` : ""}
              </p>
              <h3 className="mt-2 font-display text-base font-bold leading-snug text-navy">{a.title}</h3>
              {a.tbc && (
                <p className="mt-2">
                  <Tbc>Year to verify</Tbc>
                </p>
              )}
            </div>
          </article>
        ))}
      </Rail>
    </Section>
  );
}

/* ───────────────────── 10. Clients ───────────────────── */
function Clients() {
  return (
    <section className="bg-white">
      <div className="container-x py-20 sm:py-24">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow mb-5 justify-center before:hidden">Global customers</p>
          <h2 className="display-md">Trusted by Industry Leaders.</h2>
        </Reveal>
        <Reveal>
          <LogoMarquee />
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────── 11. Testimonial ───────────────────── */
function Testimonial() {
  return (
    <Section tone="grey" eyebrow="Testimonials" title="Building Trust Through Every Partnership." compact>
      <div className="grid gap-5 lg:grid-cols-2">
        {testimonials.map((t) => (
          <Reveal key={t.name}>
            <blockquote className="card relative h-full p-8 sm:p-10">
              <Quote className="absolute right-8 top-8 h-10 w-10 text-orange/20" aria-hidden />
              <p className="relative font-display text-xl font-medium leading-relaxed text-navy sm:text-2xl">“{t.quote}”</p>
              <footer className="mt-8 border-t border-line pt-6">
                <p className="font-semibold text-navy">{t.name}</p>
                <p className="text-sm text-muted">{t.role}</p>
                <p className="text-sm font-medium text-orange-dark">{t.companyName}</p>
              </footer>
            </blockquote>
          </Reveal>
        ))}
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-line p-8 text-muted sm:p-10">
            <div>
              <p className="eyebrow mb-4">More to come</p>
              <p className="text-lg text-charcoal">Customer testimonials are added here as they are approved. If you are a customer and would like to be quoted, we would be glad to hear from you.</p>
            </div>
            <Link to="/contact-us" className="link-line mt-8 text-sm">
              Share your experience <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
