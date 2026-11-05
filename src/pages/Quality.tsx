import { ShieldCheck, Ruler, Droplets, FileCheck2, type LucideIcon } from "lucide-react";
import Section, { PageHero, Tbc } from "../components/Section";
import { Reveal, Stagger, Item } from "../components/Reveal";
import SpecTable from "../components/SpecTable";
import Button from "../components/Button";
import Cta from "../components/Cta";
import ImageReveal from "../components/ImageReveal";
import { useSeo } from "../hooks/useSeo";
import { awards, cmm, company, quality, qualityImage } from "../data/site";

const icons: LucideIcon[] = [Ruler, Droplets, FileCheck2, ShieldCheck];

export default function Quality() {
  useSeo("Quality | ISO 9001:2015, CMM Inspection and Hydrotesting", "iMate Engineering quality: ISO 9001:2015 quality management system, Mitutoyo Crysta Plus CMM inspection, in-house hydrostatic testing and PPAP-level documentation.", qualityImage);
  const certs = awards.filter((a) => a.group === "Certification");
  return (
    <>
      <PageHero eyebrow="Quality" title="Measured, documented, certified." lead={`${company.iso} quality management, CMM inspection and hydrostatic testing on site.`} image={qualityImage} short />

      {/* policy */}
      <section className="bg-white">
        <div className="container-x section-pad grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">Quality policy</p>
            <h2 className="display-lg">What we commit to on every order.</h2>
            {quality.policyTbc && (
              <p className="mt-5">
                <Tbc>Draft wording, for iMate to approve</Tbc>
              </p>
            )}
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <blockquote className="rounded-2xl border-l-4 border-orange bg-grey p-8 font-display text-xl font-medium leading-relaxed text-navy sm:p-10 sm:text-2xl">{quality.policy}</blockquote>
          </Reveal>
        </div>
      </section>

      {/* pillars */}
      <Section tone="grey" eyebrow="Quality assurance" title="Inspection, testing and process control.">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
          {quality.pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <Item key={p.title} className="card p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-orange">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 display-sm">{p.title}</h3>
                <p className="mt-3 text-sm text-muted">{p.body}</p>
              </Item>
            );
          })}
        </Stagger>
      </Section>

      {/* inspection equipment */}
      <Section eyebrow="Inspection facilities" title="Coordinate measuring machine." lead="The CMM sits at the centre of our inspection room. Critical dimensions are measured and reported for every lot.">
        <Reveal>
          <article className="card overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="img-frame aspect-[4/3] lg:aspect-auto lg:h-full">
                <img src={cmm.image} alt={cmm.name} loading="lazy" width={900} height={675} />
              </div>
              <div className="p-7 sm:p-10">
                <h3 className="display-md">{cmm.name}</h3>
                <p className="mt-2 text-muted">
                  {cmm.make} · {cmm.model}
                </p>
                <SpecTable rows={cmm.specs} className="mt-6" />
              </div>
            </div>
          </article>
        </Reveal>
      </Section>

      {/* testing */}
      <Section tone="navy" eyebrow="Testing processes" title="Hydrostatic testing in house.">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <ImageReveal src={qualityImage} alt="Measuring instruments and gauges" className="aspect-[4/3] rounded-2xl" />
          </Reveal>
          <Reveal className="lg:col-span-6" delay={0.1}>
            <p className="text-lg text-white/80">Pressure-bearing parts such as valve bodies and compressor components are hydrostatically tested on site before despatch, and the test record ships with the lot. Documentation follows your PPAP level: process flow diagrams, control plans, FMEA, process capability studies and Gauge R&R.</p>
            <ul className="mt-8 space-y-3 text-white/80">
              {["In-house hydrostatic test facility", "Test certificates supplied per lot", "GD&T applied in drawing review and inspection", "PFD, CCP, FMEA, Cpk and Gauge R&R to customer requirements"].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* certifications */}
      <Section tone="grey" eyebrow="Certifications" title="Certified, not just claimed." action={<Button to="/awards-certifications" variant="ghost" arrow>All awards and certificates</Button>}>
        <Stagger className="grid gap-5 sm:grid-cols-3" gap={0.08}>
          {certs.map((c) => (
            <Item key={c.title} as="figure" className="card overflow-hidden">
              <div className="img-frame aspect-[4/3] bg-white p-5">
                <img src={c.image} alt={c.title} loading="lazy" width={600} height={450} className="!object-contain" />
              </div>
              <figcaption className="p-5">
                <h3 className="font-display font-bold text-navy">{c.title}</h3>
                {c.detail && <p className="mt-1 text-sm text-muted">{c.detail}</p>}
              </figcaption>
            </Item>
          ))}
        </Stagger>
      </Section>

      <Cta title="Need inspection records with your parts?" body="Tell us the PPAP level or the documents your quality team expects and we will quote accordingly." />
    </>
  );
}
