import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, Phone, Mail } from "lucide-react";
import { company, nav, telHref } from "../data/site";
import Button from "./Button";

/** Routes whose hero sits behind a transparent header. */
const TRANSPARENT_ROUTES = ["/", "/profile", "/vision-mission", "/capabilities", "/machineries", "/products", "/quality", "/awards-certifications", "/career", "/contact-us", "/request-a-quote", "/blog"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const { pathname } = useLocation();
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    setOpen(false);
    setDrop(null);
  }, [pathname]);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const transparentRoute = TRANSPARENT_ROUTES.includes(pathname) || pathname.startsWith("/blog/") || pathname.startsWith("/products/");
  const onDark = transparentRoute && !scrolled && !open;
  const textCls = onDark ? "text-white" : "text-navy";

  const openDrop = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setDrop(label);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setDrop(null), 120);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${onDark ? "" : "nav-solid"}`}>
      <div className={`container-x transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="iMate Engineering home">
            <img src={onDark ? company.logoFooter : company.logo} alt="iMate Engineering" width={150} height={46} className="h-9 w-auto sm:h-10" />
          </Link>

          <nav className="hidden xl:flex items-center gap-1" aria-label="Primary">
            {nav.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname === n.to || n.children?.some((c) => c.to === pathname || pathname.startsWith(c.to + "/"));
              const cls = `relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors ${textCls} ${active ? (onDark ? "bg-white/12" : "bg-grey") : onDark ? "hover:bg-white/10" : "hover:bg-grey"}`;
              if (!n.children) {
                return (
                  <NavLink key={n.to} to={n.to} end={n.to === "/"} className={cls}>
                    {n.label}
                  </NavLink>
                );
              }
              return (
                <div key={n.label} className="relative" onMouseEnter={() => openDrop(n.label)} onMouseLeave={scheduleClose}>
                  <NavLink to={n.to} className={cls} aria-haspopup="menu" aria-expanded={drop === n.label} onFocus={() => openDrop(n.label)}>
                    {n.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${drop === n.label ? "rotate-180" : ""}`} aria-hidden />
                  </NavLink>
                  <AnimatePresence>
                    {drop === n.label && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }} className="absolute left-0 top-full pt-3" onMouseEnter={() => openDrop(n.label)} onMouseLeave={scheduleClose}>
                        <ul role="menu" className="min-w-64 rounded-2xl border border-line bg-white p-2 shadow-[var(--shadow-float)]">
                          {n.children.map((c) => (
                            <li key={c.to} role="none">
                              <NavLink role="menuitem" to={c.to} className={({ isActive }) => `block rounded-xl px-4 py-2.5 transition-colors ${isActive ? "bg-orange-tint" : "hover:bg-grey"}`}>
                                <span className="block text-sm font-semibold text-navy">{c.label}</span>
                                {c.blurb && <span className="block text-xs text-muted">{c.blurb}</span>}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button to="/request-a-quote" variant={onDark ? "white" : "primary"} className="hidden md:inline-flex">
              Request a Quote
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition xl:hidden ${onDark ? "border-white/25 text-white hover:bg-white/10" : "border-line text-navy hover:bg-grey"}`}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="xl:hidden fixed inset-0 z-40 bg-white">
            <div className="container-x h-full overflow-y-auto pt-24 pb-10">
              <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }} className="divide-y divide-line">
                {nav.map((n) => (
                  <motion.li key={n.label} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                    <NavLink to={n.to} end={n.to === "/"} className={({ isActive }) => `block py-4 font-display text-2xl font-bold ${isActive ? "text-orange" : "text-navy"}`}>
                      {n.label}
                    </NavLink>
                    {n.children && (
                      <ul className="pb-3 pl-1">
                        {n.children.map((c) => (
                          <li key={c.to}>
                            <NavLink to={c.to} className={({ isActive }) => `block py-2 text-base ${isActive ? "text-orange" : "text-muted"}`}>
                              {c.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-8 flex flex-col gap-3">
                <Button to="/request-a-quote" size="lg" arrow>
                  Request a Quote
                </Button>
                <div className="mt-4 space-y-2 text-sm text-muted">
                  <a className="flex items-center gap-2" href={telHref(company.phones[0])}>
                    <Phone className="h-4 w-4" /> {company.phones[0]}
                  </a>
                  <a className="flex items-center gap-2" href={`mailto:${company.emails[0]}`}>
                    <Mail className="h-4 w-4" /> {company.emails[0]}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
