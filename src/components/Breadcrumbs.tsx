import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const names: Record<string, string> = {
  profile: "Company Profile",
  "vision-mission": "Vision & Mission",
  capabilities: "Capabilities",
  machineries: "Machineries",
  products: "Products",
  quality: "Quality",
  "awards-certifications": "Awards & Certifications",
  blog: "Blog",
  career: "Career",
  "contact-us": "Contact Us",
  "request-a-quote": "Request a Quote",
};

/** Breadcrumb trail built from the current route. Pass `last` to name a dynamic final segment (a product or article). */
export default function Breadcrumbs({ last, dark = true, className = "" }: { last?: string; dark?: boolean; className?: string }) {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);
  if (!parts.length) return null;
  const crumbs = parts.map((seg, i) => ({ to: "/" + parts.slice(0, i + 1).join("/"), label: i === parts.length - 1 && last ? last : (names[seg] ?? seg.replace(/-/g, " ")) }));
  const tone = dark ? "text-white/60" : "text-muted";
  const cur = dark ? "text-white" : "text-navy";
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: "https://imateengineering.in/" }, ...crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 2, name: c.label, item: `https://imateengineering.in${c.to}` }))];
  return (
    <nav aria-label="Breadcrumb" className={`text-xs ${tone} ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="transition hover:text-orange">
            Home
          </Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.to} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 opacity-60" aria-hidden />
            {i === crumbs.length - 1 ? (
              <span className={`font-medium ${cur}`} aria-current="page">
                {c.label}
              </span>
            ) : (
              <Link to={c.to} className="transition hover:text-orange">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items }) }} />
    </nav>
  );
}
