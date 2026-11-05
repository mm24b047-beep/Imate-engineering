import { company } from "../data/site";

/** Google Maps embed of the factory, using the same embed the existing website uses. No API key required. */
export default function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`img-frame rounded-2xl ${className}`}>
      <iframe title="iMate Engineering factory location on Google Maps" src={company.factory.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="h-full min-h-[320px] w-full border-0" />
    </div>
  );
}
