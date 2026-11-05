import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** Counts up to a verified figure when it scrolls into view. */
export default function Counter({ value, format = "number", prefix = "", suffix = "", className = "" }: { value: number; format?: "number" | "year"; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const fmt = (n: number) => (format === "year" ? String(Math.round(n)) : Math.round(n).toLocaleString("en-IN"));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!inView || reduce) {
      el.textContent = fmt(value);
      return;
    }
    const from = format === "year" ? value - 40 : 0;
    const ctrl = animate(from, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (el.textContent = fmt(v)) });
    return () => ctrl.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduce]);

  return (
    <span className={className}>
      {prefix}
      <span ref={ref}>{fmt(value)}</span>
      {suffix}
    </span>
  );
}
