import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Preloader from "./components/Preloader";
import { scrollTo, useLenis } from "./hooks/useLenis";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const VisionMission = lazy(() => import("./pages/VisionMission"));
const Quality = lazy(() => import("./pages/Quality"));
const Capabilities = lazy(() => import("./pages/Capabilities"));
const Career = lazy(() => import("./pages/Career"));
const Machineries = lazy(() => import("./pages/Machineries"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Awards = lazy(() => import("./pages/Awards"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Old URLs (from the WordPress site and earlier builds) that now live elsewhere. vercel.json carries the same map as 301s. */
const redirects: Record<string, string> = {
  "/about": "/profile",
  "/about-us": "/profile",
  "/awards": "/awards-certifications",
  "/contact": "/contact-us",
  "/schedule-an-appointment": "/contact-us",
  "/thank-you": "/contact-us",
  "/innovative-engineering-solutions": "/capabilities",
  "/capabilities-of-imate-engineering": "/capabilities",
  "/sitemap": "/",
};

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // wait for the lazy page to mount
      const t = window.setTimeout(() => {
        const el = document.querySelector<HTMLElement>(hash);
        if (el) scrollTo(el);
      }, 120);
      return () => window.clearTimeout(t);
    }
    scrollTo(0, true);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const location = useLocation();
  const reduce = useReducedMotion();
  useLenis();
  return (
    <>
      <Preloader />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-orange focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main">
        <Suspense fallback={<div className="min-h-screen bg-navy" />}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={location.pathname} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.22 }}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/vision-mission" element={<VisionMission />} />
                <Route path="/quality" element={<Quality />} />
                <Route path="/capabilities" element={<Capabilities />} />
                <Route path="/career" element={<Career />} />
                <Route path="/machineries" element={<Machineries />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/awards-certifications" element={<Awards />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/request-a-quote" element={<Contact quote />} />
                {Object.entries(redirects).map(([from, to]) => (
                  <Route key={from} path={from} element={<Navigate to={to} replace />} />
                ))}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
