import { useState } from "react";
import { PageHero, Tbc } from "../components/Section";
import Section from "../components/Section";
import { Stagger, Item } from "../components/Reveal";
import Lightbox from "../components/Lightbox";
import Cta from "../components/Cta";
import SupplierAwards from "../components/SupplierAwards";
import { useSeo } from "../hooks/useSeo";
import { awards, heroImage, type Award } from "../data/site";

const groups: { key: Award["group"]; title: string; lead: string }[] = [
  { key: "Certification", title: "Certifications", lead: "Quality system and business certifications on record." },
  { key: "Supplier", title: "Supplier awards", lead: "Komatsu India has named iMate its Best Supplier five times, each on a full year of quality, cost and delivery performance." },
  { key: "Export", title: "Export awards", lead: "EEPC India Top Exporter trophies for Southern Region and South India export performance." },
  { key: "Industry", title: "Industry recognition", lead: "Recognition from national business forums and media." },
];

export default function Awards() {
  useSeo("Awards and Certifications | iMate Engineering", "ISO 9001:2015, five Komatsu Best Supplier awards, EEPC India Top Exporter Gold and Silver trophies, Top 100 SME India 2022, Thinkers of Tomorrow and more.", awards[0].image);
  const [open, setOpen] = useState<number | null>(null);
  const [filter, setFilter] = useState<Award["group"] | "All">("All");

  return (
    <>
      <PageHero eyebrow="Awards and certifications" title="Recognised for quality and excellence." lead={`${awards.length} awards and certificates, each with its photograph or scan and the date it was received.`} image={heroImage} short>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter awards">
          {(["All", ...groups.map((g) => g.key)] as const).map((k) => (
            <button key={k} type="button" onClick={() => setFilter(k)} aria-pressed={filter === k} className={`rounded-full border px-4 py-1.5 text-sm transition ${filter === k ? "border-white bg-white text-navy" : "border-white/25 text-white/85 hover:bg-white/10"}`}>
              {k === "All" ? "All" : groups.find((g) => g.key === k)!.title}
            </button>
          ))}
        </div>
      </PageHero>

      {groups
        .filter((g) => filter === "All" || filter === g.key)
        .map((g, gi) => {
          const items = awards.filter((a) => a.group === g.key);
          return (
            <Section key={g.key} tone={gi % 2 ? "grey" : "white"} eyebrow={g.title} title={g.key === "Supplier" ? "Komatsu Best Supplier Award, five times." : `${g.title}.`} lead={g.lead} compact>
              {g.key === "Supplier" ? (
                <SupplierAwards onOpen={setOpen} />
              ) : (
              <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
                {items.map((a) => {
                  const idx = awards.indexOf(a);
                  return (
                    <Item key={a.title + a.year + idx} as="figure">
                      <button type="button" onClick={() => setOpen(idx)} className="card group block w-full overflow-hidden text-left transition hover:-translate-y-1" aria-label={`Enlarge ${a.title}${a.year ? ` ${a.year}` : ""}`}>
                        <div className="img-frame aspect-[4/3] bg-white p-5">
                          <img src={a.image} alt={a.title} loading="lazy" width={600} height={450} className="!object-contain" />
                        </div>
                        <figcaption className="p-6">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange">{a.year ?? a.group}</p>
                          <h3 className="mt-2 font-display text-lg font-bold leading-snug text-navy">{a.title}</h3>
                          {a.detail && <p className="mt-2 text-sm text-muted">{a.detail}</p>}
                          {a.tbc && (
                            <p className="mt-3">
                              <Tbc>Awaiting award documentation</Tbc>
                            </p>
                          )}
                        </figcaption>
                      </button>
                    </Item>
                  );
                })}
              </Stagger>
              )}
            </Section>
          );
        })}

      <Lightbox src={open === null ? null : awards[open].image} alt={open === null ? "" : awards[open].title} caption={open === null ? "" : `${awards[open].title}${awards[open].year ? ` · ${awards[open].year}` : ""}`} onClose={() => setOpen(null)} onPrev={() => setOpen((v) => (v === null ? null : (v - 1 + awards.length) % awards.length))} onNext={() => setOpen((v) => (v === null ? null : (v + 1) % awards.length))} />
      <Cta />
    </>
  );
}
