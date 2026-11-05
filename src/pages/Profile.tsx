import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Section, { PageHero, Tbc } from "../components/Section";
import { Reveal, Stagger, Item } from "../components/Reveal";
import Button from "../components/Button";
import Counter from "../components/Counter";
import Cta from "../components/Cta";
import ImageReveal from "../components/ImageReveal";
import { useSeo } from "../hooks/useSeo";
import { company, profileHero, profileImage, foundryImage, process, vision } from "../data/site";

export default function Profile() {
  useSeo("About iMate Engineering | Company Profile", "iMate Engineering Private Limited, Coimbatore: precision machining, iron casting, pattern and die manufacturing and CAD/CAM since 2011. ISO 9001:2015 certified, supplying the USA, Europe and India.", profileHero);

  const timeline = [
    { year: "2011", text: "iMate Engineering begins production in Coimbatore, offering 3D modelling and precision manufacturing." },
    { year: "2012-13", text: "First Best Supplier Award from Komatsu, followed by awards in 2013-14, 2014-15, 2016-17 and 2021-22." },
    { year: "2014-15", text: "EEPC India Southern Region Top Exporter, Silver Trophy. Four more EEPC trophies follow through 2018-19." },
    { year: "2022", text: "Named one of the Top 100 SMEs in India by the India SME Forum." },
    { year: "2023-24", text: "Thinkers of Tomorrow award from News18 and Industry Outlook 2024 recognition." },
  ];

  return (
    <>
      <PageHero eyebrow="About us" title="A comprehensive solution to all your engineering needs." lead="Founded in 2011, iMate Engineering provides end-to-end precision manufacturing from a single site in Coimbatore, India." image={profileHero} />

      {/* overview */}
      <section className="bg-white">
        <div className="container-x section-pad grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">Company overview</p>
            <h2 className="display-lg">Precision engineering with a global presence.</h2>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="lead">
                iMate Engineering Private Limited is a full-service engineering provider. We machine ferrous and non-ferrous materials, cast grey and ductile iron, and build the patterns, dies and fixtures behind the parts we supply. Our goal is simple: to be a global name known for engineering excellence.
              </p>
              <p className="mt-5 lead">
                The company operates from a {company.facility.total} site in Kinathukadavu, Coimbatore, with a {company.facility.factory} factory floor and {company.facility.storage} of storage, a dedicated workforce and heavy, current-generation equipment. Castings, raw materials, heat treatment, surface coating and sub-assembly are coordinated for customers who want one accountable supplier.
              </p>
            </Reveal>
            <Stagger className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-3">
              {[
                { v: company.founded, l: "Established", f: "year" as const },
                { v: 30000, l: "sq. ft site", f: "number" as const },
                { v: 7, l: "CNC machines", f: "number" as const },
              ].map((s) => (
                <Item key={s.l}>
                  <p className="font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                    <Counter value={s.v} format={s.f} />
                  </p>
                  <p className="mt-1 text-sm text-muted">{s.l}</p>
                </Item>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* history */}
      <Section tone="grey" eyebrow="Company history" title="Fifteen years, one direction." lead="Milestones taken from the awards and certifications on record.">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <ImageReveal src={profileImage} alt="CNC turning at iMate Engineering" className="aspect-[4/5] rounded-2xl" width={500} height={610} />
          </Reveal>
          <Stagger as="ol" className="relative lg:col-span-7 lg:pl-6" gap={0.1}>
            <span className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-line lg:block" aria-hidden />
            {timeline.map((t) => (
              <Item as="li" key={t.year} className="relative mb-8 lg:pl-10">
                <span className="absolute -left-[1px] top-1.5 hidden h-4 w-4 rounded-full border-4 border-grey bg-orange lg:block" aria-hidden />
                <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-orange">{t.year}</p>
                <p className="mt-1 text-lg text-charcoal">{t.text}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* vision mission teaser */}
      <Section eyebrow="Vision and mission" title="Shaping the future of engineering globally." action={<Button to="/vision-mission" variant="ghost" arrow>Read our vision and mission</Button>}>
        <div className="grid gap-5 md:grid-cols-2">
          {[vision.mission, vision.vision].map((v) => (
            <Reveal key={v.title}>
              <div className="card h-full p-8">
                <h3 className="display-sm">{v.title}</h3>
                <p className="mt-3 text-muted">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* management */}
      <Section tone="navy" eyebrow="Management" title="Led from the shop floor.">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
              <p className="font-display text-2xl font-bold text-white">{company.md}</p>
              <p className="mt-1 text-orange">{company.mdRole}</p>
              <p className="mt-5 text-sm text-white/65">
                <Tbc>Profile and photograph to be supplied by iMate</Tbc>
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <p className="text-lg text-white/75">Management introductions, photographs and a leadership message will appear here once iMate provides them. Nothing on this page is invented: the name and role above are from the company's own records.</p>
          </Reveal>
        </div>
      </Section>

      {/* manufacturing philosophy */}
      <Section tone="grey" eyebrow="Manufacturing philosophy" title="One supplier, one drawing, one accountable team." lead="How a part moves through iMate.">
        <div className="grid gap-12 lg:grid-cols-12">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:col-span-7" gap={0.08}>
            {process.map((p) => (
              <Item key={p.n} className="card p-7">
                <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">{p.n}</p>
                <h3 className="mt-3 display-sm">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.body}</p>
              </Item>
            ))}
          </Stagger>
          <Reveal className="lg:col-span-5">
            <ImageReveal src={foundryImage} alt="Cast valve body" className="h-full min-h-[320px] rounded-2xl" />
          </Reveal>
        </div>
        <Reveal className="mt-12">
          <Link to="/capabilities" className="link-line">
            See every capability in detail <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Section>

      <Cta />
    </>
  );
}
