import { useEffect } from "react";
import { company } from "../data/site";

const set = (sel: string, attr: "content" | "href", value: string, create: () => HTMLElement) => {
  let el = document.head.querySelector<HTMLElement>(sel);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

/** Sets title, description, canonical and Open Graph tags for a route. */
export function useSeo(title: string, description: string, image?: string) {
  useEffect(() => {
    const full = title.includes("iMate") ? title : `${title} | ${company.short}`;
    document.title = full;
    const meta = (name: string) => () => Object.assign(document.createElement("meta"), { name });
    const prop = (property: string) => () => {
      const m = document.createElement("meta");
      m.setAttribute("property", property);
      return m;
    };
    set('meta[name="description"]', "content", description, meta("description"));
    set('meta[property="og:title"]', "content", full, prop("og:title"));
    set('meta[property="og:description"]', "content", description, prop("og:description"));
    set('meta[property="og:url"]', "content", `${company.site}${window.location.pathname}`, prop("og:url"));
    if (image) set('meta[property="og:image"]', "content", image, prop("og:image"));
    set('link[rel="canonical"]', "href", `${company.site}${window.location.pathname}`, () => Object.assign(document.createElement("link"), { rel: "canonical" }));
  }, [title, description, image]);
}
