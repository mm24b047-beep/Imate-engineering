import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import { Reveal, Stagger, Item } from "../components/Reveal";
import Breadcrumbs from "../components/Breadcrumbs";
import Button from "../components/Button";
import Lightbox from "../components/Lightbox";
import Cta from "../components/Cta";
import { useSeo } from "../hooks/useSeo";
import { capabilities, categories, company, products } from "../data/site";

/** One product. Only the photograph, category and the company's general process are shown: no invented specifications. */
export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const cat = product ? categories.find((c) => c.name === product.category) : undefined;
  useSeo(product ? `${product.name} | ${product.category}` : "Product", product && cat ? `${product.name} from iMate Engineering, Coimbatore. ${cat.blurb}` : "", product?.image);
  const [open, setOpen] = useState(false);
  if (!product || !cat) return <Navigate to="/products" replace />;

  const siblings = products.filter((p) => p.category === product.category && p.id !== product.id);
  const i = products.indexOf(product);
  const prev = products[(i - 1 + products.length) % products.length];
  const next = products[(i + 1) % products.length];
  const quoteHref = `/request-a-quote?subject=${encodeURIComponent(product.category)}&product=${encodeURIComponent(product.name)}`;
  const specs: [string, string][] = [
    ["Product family", product.category],
    ["Processes available", "Iron casting, CNC machining, hydrotesting, heat treatment and coating coordination"],
    ["Materials", "Ferrous and non-ferrous, to your drawing"],
    ["Documentation", "Inspection report, material certificate and test records on request"],
    ["Supply", "Build to print for OEM programmes, repeat supply"],
  ];

  return (
    <>
      <section className="bg-navy pt-32 pb-10 text-white sm:pt-36">
        <div className="container-x">
          <Reveal>
            <Breadcrumbs last={product.name} className="mb-6" />
            <Link to={`/products#${cat.slug}`} className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
              <ArrowLeft className="h-4 w-4" /> {product.category}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x py-12 sm:py-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <button type="button" onClick={() => setOpen(true)} className="card group relative block w-full overflow-hidden" aria-label={`Enlarge photo of ${product.name}`}>
              <div className="img-frame aspect-square bg-white">
                <img src={product.image} alt={`${product.name}, ${product.category}`} width={500} height={500} loading="eager" fetchPriority="high" />
              </div>
              <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy/80 text-white opacity-0 transition group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
            </button>
          </Reveal>
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-5">{product.category}</p>
              <h1 className="display-lg">{product.name}</h1>
              <p className="mt-5 lead">{cat.blurb}</p>
              <p className="mt-3 text-sm text-muted">Photograph from iMate's current product gallery. Detailed specifications are supplied against your drawing; nothing here is assumed.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="spec mt-8">
                {specs.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to={quoteHref} size="lg" arrow>
                  Request a quote for this part
                </Button>
                <Button href={`mailto:${company.emails[0]}?subject=${encodeURIComponent(`Enquiry: ${product.name}`)}`} size="lg" variant="ghost">
                  Email {company.emails[0]}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="bg-grey">
          <div className="container-x py-16 sm:py-20">
            <Reveal className="mb-8 flex items-end justify-between gap-6">
              <h2 className="display-md">More {product.category.toLowerCase()}</h2>
              <Link to={`/products#${cat.slug}`} className="link-line text-sm">
                View category <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6" gap={0.04}>
              {siblings.slice(0, 6).map((p) => (
                <Item key={p.id} as="figure">
                  <Link to={`/products/${p.id}`} className="group card block overflow-hidden transition hover:-translate-y-1">
                    <div className="img-frame aspect-square">
                      <img src={p.image} alt={`${p.name}, ${p.category}`} loading="lazy" width={500} height={500} />
                    </div>
                    <figcaption className="p-3 text-xs font-semibold text-navy">{p.name}</figcaption>
                  </Link>
                </Item>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <section className="bg-white">
        <div className="container-x py-12 flex flex-wrap items-center justify-between gap-4 border-t border-line">
          <Link to={`/products/${prev.id}`} className="link-line text-sm">
            <ArrowLeft className="h-4 w-4" /> {prev.name}
          </Link>
          <Link to="/capabilities" className="text-sm text-muted transition hover:text-navy">
            How we make it: {capabilities.length} capabilities
          </Link>
          <Link to={`/products/${next.id}`} className="link-line text-sm">
            {next.name} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Lightbox src={open ? product.image : null} alt={product.name} caption={`${product.name} · ${product.category}`} onClose={() => setOpen(false)} />
      <Cta />
    </>
  );
}
