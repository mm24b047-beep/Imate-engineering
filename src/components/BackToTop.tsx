import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { scrollTo } from "../hooks/useLenis";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 900);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <button
      type="button"
      onClick={() => scrollTo(0)}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white shadow-[var(--shadow-float)] transition-all duration-300 hover:bg-orange ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
