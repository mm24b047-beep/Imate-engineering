import { GraduationCap, Users, TrendingUp, type LucideIcon } from "lucide-react";
import Section, { PageHero, Tbc } from "../components/Section";
import { Reveal, Stagger, Item } from "../components/Reveal";
import Button from "../components/Button";
import { useSeo } from "../hooks/useSeo";
import { company, plantImage } from "../data/site";

const points: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Users, title: "We care about our workforce", body: "Our people are the reason customers keep coming back. We look after them accordingly." },
  { icon: GraduationCap, title: "A platform to build skills", body: "Work on Mazak, Doosan and Hartford machining centres, a Mitutoyo CMM and current CAD/CAM software." },
  { icon: TrendingUp, title: "Room to advance", body: "A growing exporter with fifteen years of track record and a clear path from the floor to the office." },
];

export default function Career() {
  useSeo("Career | Join iMate Engineering, Coimbatore", "Careers at iMate Engineering, a precision machining and casting company in Kinathukadavu, Coimbatore. Write to us with your CV.", plantImage);
  const mail = `mailto:${company.emails[1]}?subject=${encodeURIComponent("Career enquiry")}`;
  return (
    <>
      <PageHero eyebrow="Career" title="Build precision parts. Build a career." lead="iMate aims to serve its clients well, and that starts with the people on the floor and in the office." image={plantImage} short>
        <Button href={mail} size="lg" arrow>
          Email your CV
        </Button>
      </PageHero>

      <Section eyebrow="Why work at iMate" title="What we offer.">
        <Stagger className="grid gap-5 md:grid-cols-3" gap={0.08}>
          {points.map((p) => (
            <Item key={p.title} className="card p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-tint text-orange">
                <p.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 display-sm">{p.title}</h3>
              <p className="mt-3 text-muted">{p.body}</p>
            </Item>
          ))}
        </Stagger>
      </Section>

      <Section tone="grey" eyebrow="Open positions" title="Current openings." compact>
        <Reveal>
          <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
            <Tbc>Vacancies to be supplied by iMate</Tbc>
            <p className="mx-auto mt-4 max-w-lg text-muted">No specific vacancies are published on the current site. Until they are, send your CV and the role you are interested in to the address below.</p>
            <a href={mail} className="mt-6 inline-block font-display text-xl font-bold text-navy underline decoration-orange underline-offset-4">
              {company.emails[1]}
            </a>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
