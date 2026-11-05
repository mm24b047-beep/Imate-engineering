import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Section, { PageHero, Tbc } from "../components/Section";
import { Reveal, Stagger, Item } from "../components/Reveal";
import Button from "../components/Button";
import Cta from "../components/Cta";
import { useSeo } from "../hooks/useSeo";
import { categories, heroImage, products, type Category } from "../data/site";

export default function Products() {
  useSeo("Products | Off-Road, Compressor, Machinery Parts, Valves and Heat Exchanger Components", "Precision cast and machined components from iMate Engineering: off-road vehicle parts, compressor parts, machinery parts, cast iron, stainless steel and steel valves, and heat exchanger components.", categories[0].image);
  const { hash } = useLocation();
  const [filter, setFilter] = useState<string>("all");
  useEffect(() => {
    const slug = hash.replace("#", "");
    if (categories.some((c) => c.slug === slug)) setFilter(slug);
  }, [hash]);

  const byCat = useMemo(() => Object.fromEntries(categories.map((c) => [c.name, products.filter((p) => p.category === c.name)])) as Record<Category, typeof products>, []);
  const shown = filter === "all" ? categories : categories.filter((c) => c.slug === filter);

  return (
    <>
      <PageHero eyebrow="Products" title="Precision components. Exceptional quality." lead={`${products.length} cast and machined components across ${categories.length} product families, made to drawing, inspected on the CMM, shipped with records.`} image={heroImage} short>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by product category">
          {[{ slug: "all", name: "All products" }, ...categories].map((c) => (
            <button key={c.slug} type="button" onClick={() => setFilter(c.slug)} aria-pressed={filter === c.slug} className={`rounded-full border px-4 py-1.5 text-sm transition ${filter === c.slug ? "border-white bg-white text-navy" : "border-white/25 text-white/85 hover:bg-white/10"}`}>
              {c.name}
            </button>
          ))}
        </div>
      </PageHero>

      {shown.map((c, ci) => {
        const items = byCat[c.name];
        return (
          <Section
            key={c.slug}
            id={c.slug}
            tone={ci % 2 ? "grey" : "white"}
            eyebrow={`Category 0${categories.indexOf(c) + 1}`}
            title={c.name}
            lead={c.blurb}
            className="scroll-mt-20"
            action={
              <Button to={`/request-a-quote?subject=${encodeURIComponent(c.name)}`} variant="secondary" arrow>
                Request a quote
              </Button>
            }
          >
            {items.length ? (
              <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5" gap={0.04}>
                {items.map((p) => (
                  <Item key={p.id} as="figure">
                    <Link to={`/products/${p.id}`} className="group card block h-full overflow-hidden transition hover:-translate-y-1">
                      <div className="img-frame aspect-square">
                        <img src={p.image} alt={`${p.name}, ${c.name}`} loading="lazy" width={500} height={500} />
                      </div>
                      <figcaption className="flex items-center justify-between gap-2 p-4">
                        <span className="text-sm font-semibold text-navy">{p.name}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-orange transition group-hover:translate-x-1" />
                      </figcaption>
                    </Link>
                  </Item>
                ))}
              </Stagger>
            ) : (
              <Reveal>
                <div className="rounded-2xl border border-dashed border-line p-10 text-center">
                  <Tbc>Product photographs to be supplied by iMate</Tbc>
                </div>
              </Reveal>
            )}
            {c.tbc && items.length > 0 && (
              <Reveal className="mt-6">
                <Tbc>More product photographs to be supplied by iMate</Tbc>
              </Reveal>
            )}
          </Section>
        );
      })}

      <Cta title="Looking for a part that is not pictured here?" body="Most of what we make is build-to-print for a single customer. Send your drawing and we will quote it." />
    </>
  );
}
