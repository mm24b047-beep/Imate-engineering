import { useEffect } from "react";
import Lenis from "lenis";

/** Inertia smooth scrolling (Evostel-style). Disabled when the visitor prefers reduced motion. */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    (window as unknown as { lenis?: Lenis }).lenis = lenis;
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);
}

/** Scroll helper that goes through Lenis when it is running. */
export function scrollTo(target: number | HTMLElement, immediate = false) {
  const lenis = (window as unknown as { lenis?: Lenis }).lenis;
  if (lenis) lenis.scrollTo(target, { immediate, offset: typeof target === "number" ? 0 : -88 });
  else if (typeof target === "number") window.scrollTo({ top: target, behavior: immediate ? ("instant" as ScrollBehavior) : "smooth" });
  else target.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
}
