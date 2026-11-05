import { useSearchParams } from "react-router-dom";
import { Mail, MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import Linkedin from "../components/LinkedinIcon";
import { PageHero } from "../components/Section";
import { Reveal } from "../components/Reveal";
import EnquiryForm from "../components/EnquiryForm";
import MapEmbed from "../components/MapEmbed";
import { useSeo } from "../hooks/useSeo";
import { company, heroImage, officeHours, telHref } from "../data/site";

export default function Contact({ quote = false }: { quote?: boolean }) {
  const [params] = useSearchParams();
  const subject = params.get("subject") ?? "Request a quote";
  const product = params.get("product") ?? "";
  useSeo(
    quote ? "Request a Quote | iMate Engineering" : "Contact Us | iMate Engineering, Coimbatore",
    quote ? "Send your drawing, material, quantity and target date. iMate Engineering will reply with a manufacturing route and a quote." : "Contact iMate Engineering Private Limited, Kinathukadavu, Coimbatore. Phone +91 73733 11677, email kamraj@imateengineering.in.",
    heroImage,
  );

  return (
    <>
      <PageHero eyebrow={quote ? "Request a quote" : "Contact us"} title={quote ? "Send us the drawing. We will send you a plan." : "Let's talk about your next component."} lead={quote ? "Share the part, material, quantity and date. Our engineering team reviews every enquiry before quoting." : "Phone, email or the form below. Drawings in PDF, STEP, IGES, DWG or DXF can follow by email."} image={heroImage} short />

      <section className="bg-white">
        <div className="container-x section-pad grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* details */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-5">Contact details</p>
              <h2 className="display-md">Reach the team directly.</h2>
            </Reveal>
            <Reveal className="mt-8 space-y-7" delay={0.1}>
              <div className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-tint text-orange">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="field-label">Phone</p>
                  {company.phones.map((p) => (
                    <a key={p} href={telHref(p)} className="block text-lg font-semibold text-navy transition hover:text-orange">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-tint text-orange">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="field-label">Email</p>
                  {company.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="block break-all text-lg font-semibold text-navy transition hover:text-orange">
                      {e}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-tint text-orange">
                  <MapPin className="h-5 w-5" />
                </span>
                <div className="grid gap-5 sm:grid-cols-2">
                  {([company.factory, company.registered] as { label: string; lines: string[]; maps?: string }[]).map((a) => (
                    <address key={a.label} className="not-italic">
                      <p className="field-label">{a.label}</p>
                      {a.lines.map((l) => (
                        <p key={l} className="text-charcoal">
                          {l}
                        </p>
                      ))}
                      {a.maps && (
                        <a href={a.maps} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-orange">
                          Open in Google Maps <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </address>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-tint text-orange">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="field-label">Office hours</p>
                  {officeHours.map(([d, h]) => (
                    <p key={d} className="text-charcoal">
                      <span className="font-medium">{d}:</span> {h}
                    </p>
                  ))}
                </div>
              </div>
              <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-navy transition hover:bg-grey">
                <Linkedin className="h-4 w-4" /> iMate on LinkedIn
              </a>
            </Reveal>
          </div>

          {/* form */}
          <Reveal className="lg:col-span-7" delay={0.15}>
            <div className="card p-6 sm:p-10">
              <h2 className="display-sm">{quote ? "Quote enquiry" : "Send an enquiry"}</h2>
              <p className="mt-2 text-sm text-muted">Fields marked * are required. We reply by email, usually within two working days.{quote ? " Drawings in PDF, STEP, IGES, DWG or DXF help us quote faster." : ""}</p>
              <EnquiryForm className="mt-8" quote={quote} defaultSubject={subject} defaultRequirement={product} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-grey">
        <div className="container-x py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow mb-5">Find us</p>
            <h2 className="display-md">Kinathukadavu, Coimbatore.</h2>
            <p className="mt-3 max-w-xl text-muted">The factory is on Veerappagoundanur Road, Vadapudur Village, south of Coimbatore on the Pollachi road.</p>
          </Reveal>
          <Reveal className="mt-8" delay={0.1}>
            <MapEmbed className="h-[420px]" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
