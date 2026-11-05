import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, Loader2, Paperclip, X } from "lucide-react";
import Button from "./Button";
import { company, enquirySubjects, materials } from "../data/site";

/*
  Contact and Request-a-Quote forms (one component, `quote` switches the extra fields on).

  Submission
  - VITE_FORM_ENDPOINT set: POST to it. JSON when there is no attachment, multipart/form-data when there is.
    Success and failure are reported from the real HTTP response; nothing is faked.
    Works with Web3Forms (set VITE_FORM_ACCESS_KEY too), Formspree, or a custom endpoint.
  - No endpoint: opens the visitor's mail client with the enquiry pre-filled and says so.
    Attachments cannot travel through a mailto link, so the visitor is asked to attach the file in the mail app.

  Protection
  - Honeypot field, minimum fill time, client-side validation. Server-side validation belongs to the endpoint
    (Web3Forms and Formspree validate and rate-limit; a custom API must do the same).

  Attachments
  - Only drawing/document types, max 10 MB, checked client-side. The endpoint must also validate them.
*/

const ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim();
const ACCESS_KEY = (import.meta.env.VITE_FORM_ACCESS_KEY as string | undefined)?.trim();
const MAX_FILE = 10 * 1024 * 1024;
const FILE_TYPES = [".pdf", ".step", ".stp", ".iges", ".igs", ".dwg", ".dxf", ".zip", ".png", ".jpg", ".jpeg"];

type Fields = { name: string; company: string; email: string; phone: string; subject: string; requirement: string; material: string; quantity: string; message: string; website: string };
type Errors = Partial<Record<keyof Fields | "file", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+\d][\d\s().-]{6,19}$/;

function validate(f: Fields, quote: boolean, file: File | null): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (f.phone.trim() && !PHONE.test(f.phone.trim())) e.phone = "Enter a valid phone number, with country code if outside India.";
  if (quote && !f.requirement.trim()) e.requirement = "Tell us what the part is.";
  if (quote && f.quantity.trim() && !/^[\d,.\s]+(\s*(pcs|nos|units|per\s*(year|month|annum)|\/\s*(yr|mo)))?.*$/i.test(f.quantity.trim())) e.quantity = "Enter a quantity, e.g. 500 pcs per year.";
  if (f.message.trim().length < 20) e.message = "Tell us a little more (at least 20 characters).";
  if (file) {
    const ext = "." + (file.name.split(".").pop() ?? "").toLowerCase();
    if (!FILE_TYPES.includes(ext)) e.file = `Allowed file types: ${FILE_TYPES.join(", ")}`;
    else if (file.size > MAX_FILE) e.file = "Files must be under 10 MB.";
  }
  return e;
}

export default function EnquiryForm({ quote = false, defaultSubject = "Request a quote", defaultRequirement = "", className = "" }: { quote?: boolean; defaultSubject?: string; defaultRequirement?: string; className?: string }) {
  const [fields, setFields] = useState<Fields>({ name: "", company: "", email: "", phone: "", subject: defaultSubject, requirement: defaultRequirement, material: "", quantity: "", message: "", website: "" });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");
  const opened = useRef(Date.now());
  const fileInput = useRef<HTMLInputElement>(null);

  const set = (k: keyof Fields) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields((f) => ({ ...f, [k]: ev.target.value }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (fields.website || Date.now() - opened.current < 2500) return; // honeypot / too fast to be human
    const e = validate(fields, quote, file);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      (ev.currentTarget.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      return;
    }

    const payload: Record<string, string> = {
      name: fields.name.trim(),
      company: fields.company.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim(),
      subject: fields.subject,
      product_requirement: fields.requirement.trim(),
      message: fields.message.trim(),
      from_page: window.location.href,
    };
    if (quote) {
      payload.material = fields.material;
      payload.quantity = fields.quantity.trim();
    }

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`${fields.subject}: ${payload.name}${payload.company ? ` (${payload.company})` : ""}`);
      const lines = [`Name: ${payload.name}`, `Company: ${payload.company}`, `Email: ${payload.email}`, `Phone: ${payload.phone}`, `Product requirement: ${payload.product_requirement}`];
      if (quote) lines.push(`Material: ${payload.material}`, `Quantity: ${payload.quantity}`);
      if (file) lines.push(`Attachment to follow: ${file.name}`);
      window.location.href = `mailto:${company.emails[0]}?cc=${company.emails[1]}&subject=${subject}&body=${encodeURIComponent(lines.join("\n") + "\n\n" + payload.message)}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    setServerMsg("");
    try {
      let res: Response;
      const subjectLine = `[iMate website] ${payload.subject}`;
      if (file) {
        const fd = new FormData();
        if (ACCESS_KEY) fd.append("access_key", ACCESS_KEY);
        Object.entries({ ...payload, subject: subjectLine }).forEach(([k, v]) => fd.append(k, v));
        fd.append("attachment", file, file.name);
        res = await fetch(ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: fd });
      } else {
        res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(ACCESS_KEY ? { access_key: ACCESS_KEY, ...payload, subject: subjectLine } : payload),
        });
      }
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setStatus("sent");
        setFields({ name: "", company: "", email: "", phone: "", subject: defaultSubject, requirement: "", material: "", quantity: "", message: "", website: "" });
        setFile(null);
      } else {
        setStatus("error");
        setServerMsg(typeof data.message === "string" ? data.message : `The server responded with status ${res.status}.`);
      }
    } catch (err) {
      setStatus("error");
      setServerMsg(err instanceof Error ? err.message : "Network error.");
    }
  };

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <span id={`${k}-err`} role="alert" className="mt-1.5 block text-xs text-red-600">
        {errors[k]}
      </span>
    ) : null;
  const a11y = (k: keyof Errors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });

  if (status === "sent") {
    return (
      <div className={`card p-8 text-center ${className}`} role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
        <h3 className="mt-4 display-sm">Enquiry received</h3>
        <p className="mt-2 text-muted">Thank you. Our engineering team will review your requirement and reply to the email address you provided.</p>
        <Button className="mt-6" variant="secondary" onClick={() => setStatus("idle")}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={`grid gap-5 sm:grid-cols-2 ${className}`} encType="multipart/form-data">
      <fieldset className="contents">
        <legend className="sr-only">Your details</legend>
        <label className="text-sm">
          <span className="field-label">Full name *</span>
          <input name="name" value={fields.name} onChange={set("name")} className="field" autoComplete="name" required {...a11y("name")} />
          {err("name")}
        </label>
        <label className="text-sm">
          <span className="field-label">Company name</span>
          <input name="company" value={fields.company} onChange={set("company")} className="field" autoComplete="organization" />
        </label>
        <label className="text-sm">
          <span className="field-label">Business email *</span>
          <input name="email" type="email" value={fields.email} onChange={set("email")} className="field" autoComplete="email" required {...a11y("email")} />
          {err("email")}
        </label>
        <label className="text-sm">
          <span className="field-label">Phone number</span>
          <input name="phone" type="tel" value={fields.phone} onChange={set("phone")} className="field" autoComplete="tel" placeholder="+91" {...a11y("phone")} />
          {err("phone")}
        </label>
      </fieldset>

      <fieldset className="contents">
        <legend className="sr-only">Your requirement</legend>
        <label className="text-sm">
          <span className="field-label">{quote ? "Product category" : "Subject"}</span>
          <select name="subject" value={fields.subject} onChange={set("subject")} className="field">
            {enquirySubjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="field-label">Product or service requirement{quote ? " *" : ""}</span>
          <input name="requirement" value={fields.requirement} onChange={set("requirement")} className="field" placeholder="e.g. Ductile iron valve body, DN80" {...a11y("requirement")} />
          {err("requirement")}
        </label>
        {quote && (
          <>
            <label className="text-sm">
              <span className="field-label">Material requirement</span>
              <select name="material" value={fields.material} onChange={set("material")} className="field">
                <option value="">Select a material</option>
                {materials.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="field-label">Quantity</span>
              <input name="quantity" value={fields.quantity} onChange={set("quantity")} className="field" placeholder="e.g. 500 pcs per year" {...a11y("quantity")} />
              {err("quantity")}
            </label>
            <div className="text-sm sm:col-span-2">
              <span className="field-label">Technical drawing or document</span>
              <div className={`flex flex-wrap items-center gap-3 rounded-xl border border-dashed px-4 py-3 ${errors.file ? "border-red-500" : "border-line"}`}>
                <input ref={fileInput} id="attachment" name="file" type="file" accept={FILE_TYPES.join(",")} className="sr-only" onChange={(ev) => { setFile(ev.target.files?.[0] ?? null); setErrors((e) => ({ ...e, file: undefined })); }} aria-describedby={errors.file ? "file-err" : "file-help"} />
                <label htmlFor="attachment" className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-navy transition hover:bg-grey">
                  <Paperclip className="h-4 w-4" /> Choose file
                </label>
                {file ? (
                  <span className="inline-flex items-center gap-2 text-sm text-charcoal">
                    {file.name} <span className="text-muted">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                    <button type="button" onClick={() => { setFile(null); if (fileInput.current) fileInput.current.value = ""; }} aria-label="Remove file" className="rounded-full p-1 text-muted hover:bg-grey hover:text-navy">
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ) : (
                  <span id="file-help" className="text-xs text-muted">PDF, STEP, IGES, DWG, DXF, ZIP or image, up to 10 MB.{!ENDPOINT ? " Without a form backend, attach it in your mail app after clicking send." : ""}</span>
                )}
              </div>
              {err("file")}
            </div>
          </>
        )}
        <label className="text-sm sm:col-span-2">
          <span className="field-label">{quote ? "Additional message *" : "Message *"}</span>
          <textarea name="message" rows={5} value={fields.message} onChange={set("message")} className="field" placeholder="Tolerances, surface finish, testing, target date, delivery location." required {...a11y("message")} />
          {err("message")}
        </label>
      </fieldset>

      {/* honeypot */}
      <input type="text" name="website" value={fields.website} onChange={set("website")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" size="lg" arrow disabled={status === "sending"}>
          {status === "sending" ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Sending
            </span>
          ) : quote ? (
            "Send quote request"
          ) : (
            "Send enquiry"
          )}
        </Button>
        {status === "mailto" && (
          <p className="text-sm text-muted" role="status">
            Your mail app should now be open with the enquiry filled in{file ? `; please attach ${file.name} before sending` : ""}. If it did not open, email us at{" "}
            <a className="font-semibold text-navy underline" href={`mailto:${company.emails[0]}`}>
              {company.emails[0]}
            </a>
            .
          </p>
        )}
        {status === "error" && (
          <p className="flex items-start gap-2 text-sm text-red-600" role="alert">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              We could not send your enquiry ({serverMsg}). Please email{" "}
              <a className="font-semibold underline" href={`mailto:${company.emails[0]}`}>
                {company.emails[0]}
              </a>{" "}
              or call {company.phones[0]}.
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
