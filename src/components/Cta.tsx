import { plantImage } from "../data/site";
import Button from "./Button";
import { Reveal } from "./Reveal";

/** Bold closing call to action: industrial photograph, dark overlay. */
export default function Cta({ title = "Ready to Build Something Precise?", body = "Send us a drawing, a material and a quantity. iMate Engineering will come back with a manufacturing route, a timeline and a quote.", image = plantImage }: { title?: string; body?: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/50" aria-hidden />
      <div className="container-x relative py-24 sm:py-32">
        <Reveal className="max-w-3xl">
          <p className="eyebrow on-dark mb-6">Start a conversation</p>
          <h2 className="display-lg text-white">{title}</h2>
          <p className="mt-6 max-w-xl text-lg text-white/75">{body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/request-a-quote" size="lg" arrow>
              Discuss Your Requirements
            </Button>
            <Button to="/contact-us" size="lg" variant="outline-white">
              Contact Our Team
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
