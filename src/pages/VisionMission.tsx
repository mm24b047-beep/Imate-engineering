import { Compass, Lightbulb, Handshake, type LucideIcon } from "lucide-react";
import Section, { PageHero } from "../components/Section";
import { Reveal, Stagger, Item } from "../components/Reveal";
import Cta from "../components/Cta";
import { useSeo } from "../hooks/useSeo";
import { plantImage, vision } from "../data/site";

const icons: LucideIcon[] = [Compass, Lightbulb, Handshake];

export default function VisionMission() {
  useSeo("Vision and Mission | iMate Engineering", "iMate Engineering's mission: bridging complex engineering challenges and high-performance solutions through innovation, precision and reliability. Our vision: shaping the future of engineering globally.", plantImage);
  return (
    <>
      <PageHero eyebrow="Vision and mission" title={vision.vision.kicker} lead="Where iMate Engineering is headed, and what we promise along the way." image={plantImage} short />

      <section className="bg-white">
        <div className="container-x section-pad grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-2xl bg-navy p-10 text-white sm:p-12">
              <div className="absolute inset-0 grid-texture opacity-30" aria-hidden />
              <p className="eyebrow on-dark relative mb-6">{vision.mission.title}</p>
              <p className="relative font-display text-2xl font-bold leading-snug text-white sm:text-3xl">{vision.mission.body}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-line bg-grey p-10 sm:p-12">
              <p className="eyebrow mb-6">{vision.vision.title}</p>
              <p className="font-display text-2xl font-bold leading-snug text-navy sm:text-3xl">{vision.vision.body}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="grey" eyebrow="Our commitment to excellence" title="Three commitments we hold ourselves to.">
        <Stagger className="grid gap-5 md:grid-cols-3" gap={0.1}>
          {vision.commitments.map((c, i) => {
            const Icon = icons[i];
            return (
              <Item key={c.title} className="card p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-tint text-orange">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 display-sm">{c.title}</h3>
                <p className="mt-3 text-muted">{c.body}</p>
              </Item>
            );
          })}
        </Stagger>
      </Section>

      <Cta />
    </>
  );
}
