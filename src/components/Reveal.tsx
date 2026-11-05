import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger, viewport } from "../lib/motion";

/** Scroll-triggered fade/slide in. Wrap any block. */
export function Reveal({ children, className = "", delay = 0, variants = fadeUp, as = "div" }: { children: ReactNode; className?: string; delay?: number; variants?: Variants; as?: "div" | "section" | "li" | "p" | "span" | "figure" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  if (reduce) return <M className={className}>{children}</M>;
  return (
    <M className={className} variants={variants} initial="hidden" whileInView="show" viewport={viewport} transition={{ delay }}>
      {children}
    </M>
  );
}

/** Parent that staggers its <Item> children. */
export function Stagger({ children, className = "", gap = 0.08, as = "div" }: { children: ReactNode; className?: string; gap?: number; as?: "div" | "ul" | "ol" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  if (reduce) return <M className={className}>{children}</M>;
  return (
    <M className={className} variants={stagger(gap)} initial="hidden" whileInView="show" viewport={viewport}>
      {children}
    </M>
  );
}

export function Item({ children, className = "", as = "div", variants = fadeUp }: { children: ReactNode; className?: string; as?: "div" | "li" | "article" | "figure"; variants?: Variants }) {
  const M = motion[as];
  return (
    <M className={className} variants={variants}>
      {children}
    </M>
  );
}
