import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/** Horizontal drag/scroll rail with progress bar and arrows. */
export default function Rail({ children, className = "", dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const upd = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 1;
      setProgress(max > 0 ? Math.max(0.1, p) : 1);
      setAtStart(el.scrollLeft <= 2);
      setAtEnd(el.scrollLeft >= max - 2);
    };
    upd();
    el.addEventListener("scroll", upd, { passive: true });
    const ro = new ResizeObserver(upd);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", upd);
      ro.disconnect();
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const w = first ? first.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  const onDown = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    drag.current = { on: true, x: e.clientX, left: el.scrollLeft, moved: false };
    el.classList.add("dragging");
  };
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !drag.current.on) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.left - dx;
  };
  const onUp = () => {
    const el = ref.current;
    if (!el) return;
    drag.current.on = false;
    el.classList.remove("dragging");
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const btn = `inline-flex h-11 w-11 items-center justify-center rounded-full border transition disabled:opacity-30 ${dark ? "border-white/20 text-white hover:bg-white/10" : "border-line text-navy hover:bg-grey"}`;

  return (
    <div className={className}>
      <div ref={ref} className="rail" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} onClickCapture={onClickCapture}>
        {children}
      </div>
      <div className="mt-8 flex items-center gap-6">
        <div className={`relative h-0.5 flex-1 overflow-hidden rounded-full ${dark ? "bg-white/15" : "bg-line"}`}>
          <div className="absolute left-0 top-0 h-full rounded-full bg-orange transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous" className={btn}>
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Next" className={btn}>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
