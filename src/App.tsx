import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Lazy-loaded pages — each becomes its own JS chunk
const Index = lazy(() => import("./pages/Index"));
const Stays = lazy(() => import("./pages/Stays"));
const SlowLife = lazy(() => import("./pages/SlowLife"));
const Dining = lazy(() => import("./pages/Dining"));
const About = lazy(() => import("./pages/About"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Experiences = lazy(() => import("./pages/Experiences"));
const Contact = lazy(() => import("./pages/Contact"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const TheHouse = lazy(() => import("./pages/TheHouse"));
const TheCafe = lazy(() => import("./pages/TheCafe"));
const ShepherdHostel = lazy(() => import("./pages/ShepherdHostel"));
const Collaborate = lazy(() => import("./pages/Collaborate"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

// Redirect component for blog post slugs
const BlogPostRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/shepherd-magazine/${slug}`} replace />;
};

const queryClient = new QueryClient();

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/stays" element={<Stays />} />
          <Route path="/stays/the-house" element={<TheHouse />} />
          <Route path="/stays/shepherd-hostel" element={<ShepherdHostel />} />
          <Route path="/slow-life" element={<SlowLife />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/dining/cafe" element={<TheCafe />} />
          <Route path="/story" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/shepherd-magazine" element={<Blogs />} />
          <Route path="/shepherd-magazine/project/:id" element={<ProjectDetail />} />
          <Route path="/shepherd-magazine/:slug" element={<BlogPost />} />
          {/* Redirects for old blog URLs */}
          <Route path="/blogs" element={<Navigate to="/shepherd-magazine" replace />} />
          <Route path="/blogs/:slug" element={<BlogPostRedirect />} />
          <Route path="/collaborate" element={<Collaborate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
