import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import Breadcrumbs from "./Breadcrumbs";

type Tone = "white" | "grey" | "navy";

/** Standard section with eyebrow, heading, lead and optional right-aligned action. */
export default function Section({
  id,
  eyebrow,
  title,
  lead,
  action,
  children,
  tone = "white",
  className = "",
  align = "left",
  compact = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
  tone?: Tone;
  className?: string;
  align?: "left" | "center";
  compact?: boolean;
}) {
  const bg = { white: "bg-white", grey: "bg-grey", navy: "bg-navy text-white" }[tone];
  const dark = tone === "navy";
  return (
    <section id={id} className={`${bg} ${className} relative`}>
      <div className={`container-x ${compact ? "py-16 sm:py-20" : "section-pad"}`}>
        {(title || eyebrow) && (
          <div className={`mb-12 sm:mb-16 ${align === "center" ? "mx-auto max-w-3xl text-center" : "grid gap-6 lg:grid-cols-12 lg:items-end"}`}>
            <Reveal className={align === "center" ? "" : "lg:col-span-8"}>
              {eyebrow && <p className={`eyebrow mb-5 ${align === "center" ? "justify-center before:hidden" : ""}`}>{eyebrow}</p>}
              {title && <h2 className={`display-lg ${dark ? "text-white" : ""}`}>{title}</h2>}
              {lead && <div className={`mt-5 max-w-2xl lead ${dark ? "text-white/70" : ""} ${align === "center" ? "mx-auto" : ""}`}>{lead}</div>}
            </Reveal>
            {action && (
              <Reveal className="lg:col-span-4 lg:flex lg:justify-end" delay={0.1}>
                {action}
              </Reveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/** Inner-page hero: full-bleed image, dark overlay, large title. */
export function PageHero({ eyebrow, title, lead, image, children, short = false }: { eyebrow: string; title: ReactNode; lead?: ReactNode; image: string; children?: ReactNode; short?: boolean }) {
  return (
    <section className={`relative flex items-end overflow-hidden bg-navy text-white ${short ? "min-h-[52vh]" : "min-h-[66vh]"}`}>
      <img src={image} alt="" width={1600} height={900} loading="eager" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover kenburns opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30" aria-hidden />
      <div className="absolute inset-0 grid-texture opacity-40" aria-hidden />
      <div className="container-x relative pt-40 pb-14 sm:pb-20">
        <Reveal>
          <Breadcrumbs className="mb-8" />
          <p className="eyebrow on-dark mb-6">{eyebrow}</p>
          <h1 className="display-xl max-w-4xl">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{lead}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

/** Small "awaiting client confirmation" badge. */
export function Tbc({ children = "To be confirmed by iMate" }: { children?: ReactNode }) {
  return <span className="tbc">{children}</span>;
}
