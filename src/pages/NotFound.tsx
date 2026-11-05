import Button from "../components/Button";
import { useSeo } from "../hooks/useSeo";

export default function NotFound() {
  useSeo("Page not found | iMate Engineering", "The page you requested does not exist.");
  return (
    <section className="flex min-h-[70vh] items-center bg-navy text-white">
      <div className="container-x py-32">
        <p className="eyebrow on-dark mb-6">404</p>
        <h1 className="display-xl">That page has moved or never existed.</h1>
        <p className="mt-6 max-w-lg text-white/70">Try the navigation above, or go back to the homepage.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/" size="lg" arrow>
            Back to home
          </Button>
          <Button to="/contact-us" size="lg" variant="outline-white">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
