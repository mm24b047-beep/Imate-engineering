import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { company } from "../data/site";
import { EASE } from "../lib/motion";

/** Brand intro on first load of a session: wordmark, 0 to 100 counter, then the curtain lifts. */
export default function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem("imate-intro") && !reduce;
    } catch {
      return !reduce;
    }
  });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const dur = 1300;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        window.setTimeout(() => {
          setShow(false);
          document.body.style.overflow = "";
          try {
            sessionStorage.setItem("imate-intro", "1");
          } catch {
            /* ignore */
          }
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="preloader" className="fixed inset-0 z-[200] flex flex-col justify-between bg-navy-deep p-6 text-white sm:p-10" exit={{ y: "-100%", transition: { duration: 0.9, ease: EASE } }} aria-hidden>
          <div className="absolute inset-0 grid-texture opacity-30" />
          <div className="relative flex items-center justify-between">
            <img src={company.logoFooter} alt="" className="h-9 w-auto" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/50">{company.tagline}</span>
          </div>
          <div className="relative flex items-end justify-between">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }} className="max-w-sm font-display text-2xl font-bold leading-tight sm:text-3xl">
              Engineering Precision.
              <br />
              <span className="text-orange">Delivering Excellence.</span>
            </motion.p>
            <p className="font-display text-6xl font-extrabold tabular-nums tracking-tighter text-white/90 sm:text-8xl">{n}</p>
          </div>
          <div className="absolute bottom-0 left-0 h-1 bg-orange transition-[width] duration-100" style={{ width: `${n}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
