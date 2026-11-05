import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { PageHero } from "../components/Section";
import { Reveal, Stagger, Item } from "../components/Reveal";
import Cta from "../components/Cta";
import { useSeo } from "../hooks/useSeo";
import { fmtDate, postCategories, posts } from "../data/blog";
import { heroImage } from "../data/site";

export default function Blog() {
  useSeo("Blog and News | iMate Engineering", "News, awards and manufacturing updates from iMate Engineering, Coimbatore.", heroImage);
  const [cat, setCat] = useState<string>("All");
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;
  const shown = (cat === "All" ? rest : sorted.filter((p) => p.category === cat && p !== featured)).filter(Boolean);

  return (
    <>
      <PageHero eyebrow="Blog" title="News from the shop floor." lead="Awards, exports and manufacturing updates from iMate Engineering." image={heroImage} short>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {["All", ...postCategories].map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full border px-4 py-1.5 text-sm transition ${cat === c ? "border-white bg-white text-navy" : "border-white/25 text-white/85 hover:bg-white/10"}`}>
              {c}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="bg-white">
        <div className="container-x section-pad">
          {cat === "All" && (
            <Reveal>
              <Link to={`/blog/${featured.slug}`} className="group card grid overflow-hidden lg:grid-cols-12">
                <div className="img-frame aspect-[16/9] lg:col-span-7 lg:aspect-auto">
                  <img src={featured.image} alt={featured.title} loading="lazy" width={1200} height={700} />
                </div>
                <div className="flex flex-col justify-center p-8 lg:col-span-5 lg:p-12">
                  <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-orange">
                    {featured.category} <span className="h-px w-6 bg-line" /> <span className="text-muted">{fmtDate(featured.date)}</span>
                  </p>
                  <h2 className="mt-4 display-md">{featured.title}</h2>
                  <p className="mt-4 text-muted">{featured.excerpt}</p>
                  <span className="link-line mt-8 text-sm">
                    Read article <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
            {shown.map((p) => (
              <Item key={p.slug} as="article">
                <Link to={`/blog/${p.slug}`} className="group card flex h-full flex-col overflow-hidden">
                  <div className="img-frame aspect-[4/3]">
                    <img src={p.image} alt={p.title} loading="lazy" width={800} height={600} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-orange">
                      {p.category}
                      <span className="flex items-center gap-1 font-medium normal-case tracking-normal text-muted">
                        <Clock className="h-3.5 w-3.5" /> {p.readMins} min
                      </span>
                    </p>
                    <h3 className="mt-3 display-sm">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
                    <p className="mt-auto pt-5 text-xs text-muted">{fmtDate(p.date)}</p>
                  </div>
                </Link>
              </Item>
            ))}
          </Stagger>
          {shown.length === 0 && <p className="mt-8 text-center text-muted">No more articles in this category yet.</p>}
        </div>
      </section>
      <Cta />
    </>
  );
}
