import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE } from "../lib/motion";

/**
 * Image that wipes in (clip-path) with a slow settle-down scale when it scrolls into view,
 * then drifts gently (parallax) as the page scrolls past it.
 */
export default function ImageReveal({ src, alt, className = "", imgClassName = "", parallax = 10, width, height, eager = false, children }: { src: string; alt: string; className?: string; imgClassName?: string; parallax?: number; width?: number; height?: number; eager?: boolean; children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-parallax}%`, `${parallax}%`]);

  return (
    <motion.div ref={ref} className={`relative overflow-hidden bg-grey ${className}`} initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "0px 0px -12% 0px" }} transition={{ duration: 1.1, ease: EASE }}>
      <motion.div className="absolute inset-[-12%]" style={reduce ? undefined : { y }}>
        <motion.img src={src} alt={alt} width={width} height={height} loading={eager ? "eager" : "lazy"} className={`h-full w-full object-cover ${imgClassName}`} initial={reduce ? false : { scale: 1.18 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "0px 0px -12% 0px" }} transition={{ duration: 1.4, ease: EASE }} />
      </motion.div>
      {children}
    </motion.div>
  );
}
