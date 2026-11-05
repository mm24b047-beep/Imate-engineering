import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ src, alt, caption, onClose, onPrev, onNext }: { src: string | null; alt?: string; caption?: string; onClose: () => void; onPrev?: () => void; onNext?: () => void }) {
  useEffect(() => {
    if (!src) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [src, onClose, onPrev, onNext]);

  const btn = "absolute inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20";

  return (
    <AnimatePresence>
      {src && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/95 p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal aria-label={alt ?? "Image"}>
          <motion.figure initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25 }} className="max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <img src={src} alt={alt ?? ""} className="max-h-[82vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl" />
            {caption && <figcaption className="mt-4 text-center text-sm text-white/75">{caption}</figcaption>}
          </motion.figure>
          <button type="button" onClick={onClose} aria-label="Close" className={`${btn} right-5 top-5`}>
            <X className="h-5 w-5" />
          </button>
          {onPrev && (
            <button type="button" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous" className={`${btn} left-4 top-1/2 -translate-y-1/2`}>
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {onNext && (
            <button type="button" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next" className={`${btn} right-4 top-1/2 -translate-y-1/2`}>
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
