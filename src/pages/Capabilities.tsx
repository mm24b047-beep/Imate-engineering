import { Check } from "lucide-react";
import Section, { PageHero } from "../components/Section";
import { Reveal, Stagger, Item } from "../components/Reveal";
import Button from "../components/Button";
import Cta from "../components/Cta";
import ImageReveal from "../components/ImageReveal";
import { useSeo } from "../hooks/useSeo";
import { capabilities, capabilitiesImage, heroImage, engineeringPoints } from "../data/site";

export default function Capabilities() {
  useSeo("Capabilities | CNC Machining, Iron Casting, Tooling, CAD/CAM, Hydrotesting", "iMate Engineering capabilities: CNC machining centres, grey and ductile iron casting from 80 g to 400 kg, pattern and die manufacturing, CAD/CAM and 3D modelling, hydrostatic testing and value-added services.", capabilitiesImage);
  return (
    <>
      <PageHero eyebrow="Capabilities" title="Complete engineering capabilities under one roof." lead="Six capabilities, one site, one accountable supplier." image={heroImage} short>
        <nav aria-label="Capabilities on this page" className="flex flex-wrap gap-2">
          {capabilities.map((c) => (
            <a key={c.slug} href={`#${c.slug}`} className="rounded-full border border-white/25 px-4 py-1.5 text-sm text-white/85 transition hover:border-white hover:bg-white/10">
              {c.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {capabilities.map((c, i) => (
        <section key={c.slug} id={c.slug} className={`scroll-mt-24 ${i % 2 ? "bg-grey" : "bg-white"}`}>
          <div className="container-x section-pad grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
              <ImageReveal src={c.image} alt={c.title} className="aspect-[4/3] rounded-2xl" />
            </Reveal>
            <div className="lg:col-span-6">
              <Reveal>
                <p className="eyebrow mb-5">Capability 0{i + 1}</p>
                <h2 className="display-lg">{c.title}</h2>
                {c.body.map((p) => (
                  <p key={p} className="mt-5 lead">
                    {p}
                  </p>
                ))}
              </Reveal>
              <Stagger as="ul" className="mt-8 grid gap-2.5 sm:grid-cols-2" gap={0.05}>
                {c.points.map((p) => (
                  <Item as="li" key={p} className="flex items-start gap-3 text-sm font-medium text-charcoal">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-tint text-orange">
                      <Check className="h-3 w-3" />
                    </span>
                    {p}
                  </Item>
                ))}
              </Stagger>
              <Reveal className="mt-8" delay={0.1}>
                <Button to="/request-a-quote" variant="secondary" arrow>
                  Discuss a {c.title.toLowerCase()} requirement
                </Button>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <Section tone="navy" eyebrow="Engineering office" title="What our engineering team brings to every drawing.">
        <Stagger as="ul" className="grid gap-4 md:grid-cols-2" gap={0.06}>
          {engineeringPoints.map((p, i) => (
            <Item as="li" key={p} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <span className="font-display text-sm font-bold tracking-[0.2em] text-orange">0{i + 1}</span>
              <p className="text-white/80">{p}</p>
            </Item>
          ))}
        </Stagger>
      </Section>

      <Cta />
    </>
  );
}
