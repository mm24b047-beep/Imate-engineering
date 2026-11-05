import { clients } from "../data/site";

/** Continuous client logo strip. Logos keep their native proportions. */
export default function LogoMarquee({ dark = false }: { dark?: boolean }) {
  const list = [...clients, ...clients];
  return (
    <div className="marquee relative overflow-hidden" aria-label="Customer logos">
      <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r ${dark ? "from-navy" : "from-white"} to-transparent`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l ${dark ? "from-navy" : "from-white"} to-transparent`} />
      <div className="marquee-track items-center gap-16 px-8">
        {list.map((c, i) => (
          <div key={c.name + i} className="flex h-16 w-40 shrink-0 items-center justify-center" aria-hidden={i >= clients.length}>
            <img src={c.logo} alt={i < clients.length ? c.name : ""} loading="lazy" className={`max-h-12 w-auto max-w-[150px] object-contain transition duration-500 ${dark ? "brightness-0 invert opacity-75 hover:opacity-100" : "grayscale opacity-70 hover:grayscale-0 hover:opacity-100"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
