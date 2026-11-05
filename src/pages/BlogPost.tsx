import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Reveal } from "../components/Reveal";
import Button from "../components/Button";
import Cta from "../components/Cta";
import Breadcrumbs from "../components/Breadcrumbs";
import { useSeo } from "../hooks/useSeo";
import { fmtDate, posts } from "../data/blog";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  useSeo(post ? post.title : "Article", post ? post.excerpt : "", post?.image);
  if (!post) return <Navigate to="/blog" replace />;

  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const i = sorted.indexOf(post);
  const next = sorted[(i + 1) % sorted.length];
  const related = sorted.filter((p) => p !== post).slice(0, 3);

  return (
    <>
      <article>
        <header className="relative flex min-h-[60vh] items-end overflow-hidden bg-navy text-white">
          <img src={post.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 kenburns" width={1600} height={900} loading="eager" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" aria-hidden />
          <div className="container-x relative pt-40 pb-14">
            <Reveal>
              <Breadcrumbs last={post.title} className="mb-6" />
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
                <ArrowLeft className="h-4 w-4" /> All articles
              </Link>
              <p className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-orange">
                {post.category} <span className="h-px w-6 bg-white/30" /> <span className="text-white/70">{fmtDate(post.date)}</span>
                <span className="flex items-center gap-1 font-medium normal-case tracking-normal text-white/70">
                  <Clock className="h-3.5 w-3.5" /> {post.readMins} min read
                </span>
              </p>
              <h1 className="display-lg mt-4 max-w-4xl text-white">{post.title}</h1>
            </Reveal>
          </div>
        </header>

        <div className="container-x section-pad grid gap-12 lg:grid-cols-12">
          <Reveal className="prose-imate lg:col-span-7 lg:col-start-2">
            <p className="font-display text-xl font-medium text-navy">{post.excerpt}</p>
            {post.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8">
              <Button to="/request-a-quote" arrow>
                Request a quote
              </Button>
              <Button to={`/blog/${next.slug}`} variant="ghost" arrow>
                Next article
              </Button>
            </div>
          </Reveal>
          <aside className="lg:col-span-3 lg:col-start-10">
            <Reveal delay={0.1}>
              <p className="eyebrow mb-5">More articles</p>
              <ul className="space-y-5">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/blog/${r.slug}`} className="group block">
                      <p className="text-xs text-muted">{fmtDate(r.date)}</p>
                      <p className="mt-1 font-display font-bold leading-snug text-navy group-hover:text-orange">{r.title}</p>
                      <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-orange">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </article>
      <Cta />
    </>
  );
}
