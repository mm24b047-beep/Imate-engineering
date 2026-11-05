import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";
import Linkedin from "./LinkedinIcon";
import { capabilities, categories, company, nav, telHref } from "../data/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-x pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-4">
            <img src={company.logoFooter} alt="iMate Engineering" width={160} height={50} className="h-10 w-auto" loading="lazy" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              Precision machining, iron casting and complete engineering solutions from Coimbatore, India. {company.iso} certified, supplying manufacturers in the USA, Europe and India since {company.founded}.
            </p>
            <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/40 hover:text-white">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>

          {/* links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Company</h2>
              <ul className="space-y-2.5 text-sm">
                {nav.flatMap((n) => (n.children ? n.children.map((c) => ({ label: c.label, to: c.to })) : [{ label: n.label, to: n.to }])).map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to} className="text-white/75 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Capabilities</h2>
              <ul className="space-y-2.5 text-sm">
                {capabilities.map((c) => (
                  <li key={c.slug}>
                    <Link to={`/capabilities#${c.slug}`} className="text-white/75 transition hover:text-white">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Products</h2>
              <ul className="space-y-2.5 text-sm">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link to={`/products#${c.slug}`} className="text-white/75 transition hover:text-white">
                      {c.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/request-a-quote" className="inline-flex items-center gap-1 font-semibold text-orange transition hover:text-white">
                    Request a quote <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* contact */}
          <div className="lg:col-span-3">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Contact</h2>
            <address className="not-italic space-y-4 text-sm text-white/75">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <span>
                  <span className="block font-semibold text-white">{company.factory.label}</span>
                  {company.factory.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </p>
              <p className="flex flex-col gap-1.5">
                {company.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="flex items-center gap-3 transition hover:text-white">
                    <Phone className="h-4 w-4 shrink-0 text-orange" /> {p}
                  </a>
                ))}
              </p>
              <p className="flex flex-col gap-1.5">
                {company.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="flex items-center gap-3 break-all transition hover:text-white">
                    <Mail className="h-4 w-4 shrink-0 text-orange" /> {e}
                  </a>
                ))}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-2">
            <span>GSTIN {company.gst}</span>
            <span>{company.iso}</span>
            <a href="/sitemap.xml" className="transition hover:text-white">
              Sitemap
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
