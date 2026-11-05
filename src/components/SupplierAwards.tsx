import { Reveal, Stagger, Item } from "./Reveal";
import { awards, clients } from "../data/site";

/**
 * Komatsu Best Supplier awards as a year-by-year timeline.
 * The plaque photographs are small (309 x 206 px), so the year and the wording of each award are
 * given as large text rather than relying on the image.
 */
export default function SupplierAwards({ onOpen, dark = false }: { onOpen?: (globalIndex: number) => void; dark?: boolean }) {
  const list = awards.filter((a) => a.group === "Supplier");
  const komatsu = clients.find((c) => c.name === "Komatsu");
  const text = dark ? "text-white" : "text-navy";
  const muted = dark ? "text-white/65" : "text-muted";

  return (
    <div>
      <Reveal className={`mb-10 flex flex-wrap items-end justify-between gap-6 ${text}`}>
        <div className="flex items-center gap-5">
          {komatsu && (
            <span className="inline-flex h-16 w-28 items-center justify-center rounded-xl bg-white p-3 shadow-[var(--shadow-card)]">
              <img src={komatsu.logo} alt="Komatsu" className="max-h-10 w-auto object-contain" loading="lazy" />
            </span>
          )}
          <div>
            <p className={`font-display text-5xl font-extrabold leading-none tracking-tight sm:text-6xl ${text}`}>
              {list.length}
              <span className="text-orange">×</span>
            </p>
            <p className={`mt-1 text-sm font-semibold uppercase tracking-[0.16em] ${muted}`}>Komatsu Best Supplier Award</p>
          </div>
        </div>
        <p className={`max-w-md text-sm ${muted}`}>Awarded by Komatsu India Private Limited on a full year of quality, cost and delivery performance. Five times between 2012 and 2022.</p>
      </Reveal>

      <Stagger as="ol" className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:pt-14" gap={0.08}>
        {/* connector line on desktop */}
        <span aria-hidden className={`absolute left-0 right-0 top-[18px] hidden h-px lg:block ${dark ? "bg-white/15" : "bg-line"}`} />
        {list.map((a) => {
          const idx = awards.indexOf(a);
          return (
            <Item as="li" key={a.year} className="relative">
              {/* timeline dot */}
              <span aria-hidden className={`absolute -top-14 left-0 hidden h-9 w-9 items-center justify-center rounded-full border-4 lg:flex ${dark ? "border-navy bg-orange" : "border-white bg-orange"} shadow-[var(--shadow-card)]`}>
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>
              <button type="button" onClick={onOpen ? () => onOpen(idx) : undefined} className={`card group flex h-full w-full flex-col overflow-hidden text-left transition ${onOpen ? "hover:-translate-y-1" : "cursor-default"}`} aria-label={`Komatsu Best Supplier Award ${a.year}`}>
                <div className="flex shrink-0 items-baseline justify-between border-b border-line bg-grey px-5 py-4">
                  <span className="font-display text-2xl font-extrabold tracking-tight text-navy">{a.year}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange">FY</span>
                </div>
                <div className="img-frame aspect-[3/2] shrink-0 bg-white p-4">
                  <img src={a.image} alt={`Komatsu Best Supplier Award plaque, ${a.year}`} loading="lazy" width={309} height={206} className="!object-contain" />
                </div>
                <p className="px-5 pb-5 text-sm leading-relaxed text-charcoal">{a.detail}</p>
              </button>
            </Item>
          );
        })}
      </Stagger>
    </div>
  );
}
