import type { Variants } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const stagger = (delay = 0.08, start = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: start } },
});

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0.6 },
  show: { clipPath: "inset(0 0 0% 0)", opacity: 1, transition: { duration: 1.1, ease: EASE } },
};

export const viewport = { once: true, margin: "0px 0px -10% 0px" } as const;
