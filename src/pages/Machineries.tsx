import { useState } from "react";
import Section, { PageHero } from "../components/Section";
import { Reveal, Stagger, Item } from "../components/Reveal";
import SpecTable from "../components/SpecTable";
import Lightbox from "../components/Lightbox";
import Cta from "../components/Cta";
import { useSeo } from "../hooks/useSeo";
import { cmm, heroImage, machines } from "../data/site";

export default function Machineries() {
  useSeo("Machineries | CNC Machining Centres and Inspection Equipment", "iMate Engineering's equipment list: Mazak, Doosan, KAFO, Hartford and BFW machining centres, Askar CNC turning and a Mitutoyo Crysta Plus CMM, with full specifications.", machines[3].image);
  const all = [...machines, cmm];
  const [open, setOpen] = useState<number | null>(null);
  const types = Array.from(new Set(machines.map((m) => m.type)));
  const [filter, setFilter] = useState<string>("All");
  const shown = filter === "All" ? machines : machines.filter((m) => m.type === filter);

  return (
    <>
      <PageHero eyebrow="Machineries" title="Equipment specified for accuracy, not just capacity." lead="Every machine below is on our floor today. Specifications are the manufacturer's, as recorded by iMate." image={heroImage} short />

      <Section
        eyebrow="Machine shop"
        title="CNC machining centres."
        lead="Horizontal and vertical machining centres plus CNC turning, with accuracy from 0.010 mm."
        action={
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by machine type">
            {["All", ...types].map((t) => (
              <button key={t} type="button" onClick={() => setFilter(t)} aria-pressed={filter === t} className={`rounded-full border px-4 py-1.5 text-sm transition ${filter === t ? "border-navy bg-navy text-white" : "border-line text-charcoal hover:bg-grey"}`}>
                {t}
              </button>
            ))}
          </div>
        }
      >
        <Stagger className="grid gap-6 lg:grid-cols-2" gap={0.07}>
          {shown.map((m) => {
            const idx = all.indexOf(m);
            return (
              <Item key={m.name} as="article" className="card overflow-hidden">
                <div className="grid sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <button type="button" onClick={() => setOpen(idx)} className="img-frame aspect-[4/3] text-left sm:aspect-auto sm:h-full" aria-label={`Enlarge photo of ${m.name}`}>
                    <img src={m.image} alt={m.name} loading="lazy" width={700} height={525} />
                  </button>
                  <div className="p-6 sm:p-7">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange">{m.type}</p>
                    <h3 className="mt-2 display-sm">{m.name}</h3>
                    <dl className="mt-3 grid grid-cols-2 gap-x-4 text-sm">
                      <div>
                        <dt className="text-muted">Manufacturer</dt>
                        <dd className="font-medium">{m.make}</dd>
                      </div>
                      <div>
                        <dt className="text-muted">Model</dt>
                        <dd className="font-medium">{m.model}</dd>
                      </div>
                    </dl>
                    <SpecTable rows={m.specs} className="mt-4" />
                  </div>
                </div>
              </Item>
            );
          })}
        </Stagger>
      </Section>

      <Section tone="grey" eyebrow="Inspection" title="Coordinate measuring machine." lead="Parts are measured on a Mitutoyo CMM before despatch.">
        <Reveal>
          <article className="card overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <button type="button" onClick={() => setOpen(all.length - 1)} className="img-frame aspect-[4/3] text-left lg:aspect-auto lg:h-full" aria-label="Enlarge photo of the CMM">
                <img src={cmm.image} alt={cmm.name} loading="lazy" width={900} height={675} />
              </button>
              <div className="p-7 sm:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange">{cmm.type}</p>
                <h3 className="mt-2 display-md">{cmm.name}</h3>
                <p className="mt-2 text-muted">
                  {cmm.make} · {cmm.model}
                </p>
                <SpecTable rows={cmm.specs} className="mt-6" />
              </div>
            </div>
          </article>
        </Reveal>
      </Section>

      <Lightbox src={open === null ? null : all[open].image} alt={open === null ? "" : all[open].name} caption={open === null ? "" : `${all[open].name} · ${all[open].make} ${all[open].model}`} onClose={() => setOpen(null)} onPrev={() => setOpen((v) => (v === null ? null : (v - 1 + all.length) % all.length))} onNext={() => setOpen((v) => (v === null ? null : (v + 1) % all.length))} />
      <Cta title="Need a part machined on this equipment?" body="Send the drawing. We will confirm the machine, the route and the price." />
    </>
  );
}
