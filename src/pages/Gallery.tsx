import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { EASING } from "@/lib/animations";

// Gallery images
import gallery1 from "@/assets/gallery/Gallery1.webp";
import gallery2 from "@/assets/gallery/Gallery2.webp";
import gallery3 from "@/assets/gallery/Gallery3.webp";
import gallery4 from "@/assets/gallery/Gallery4.webp";
import gallery5 from "@/assets/gallery/Gallery5.webp";
import gallery6 from "@/assets/gallery/Gallery 6.webp";
import gallery7 from "@/assets/gallery/Gallery 7.webp";
import gallery8 from "@/assets/gallery/Gallery 8.webp";
import gallery9 from "@/assets/gallery/Gallery 9.webp";
import gallery10 from "@/assets/gallery/Gallery 10.webp";
import gallery11 from "@/assets/gallery/Gallery 11.webp";
import gallery12 from "@/assets/gallery/Gallery 12.webp";
import gallery14 from "@/assets/gallery/Gallery 14.webp";
import gallery15 from "@/assets/gallery/Gallery 15.webp";
import gallery16 from "@/assets/gallery/Gallery 16.webp";
import gallery17 from "@/assets/gallery/Gallery 17.webp";
import gallery18 from "@/assets/gallery/Gallery 18.webp";
import gallery19 from "@/assets/gallery/Gallery 19.webp";
import gallery20 from "@/assets/gallery/Gallery 20.webp";
import gallery22 from "@/assets/gallery/Gallery 22.webp";
import gallery23 from "@/assets/gallery/Gallery 23.webp";
import gallery25 from "@/assets/gallery/Gallery 25.webp";
import gallery26 from "@/assets/gallery/Gallery 26.webp";
import gallery29 from "@/assets/gallery/Gallery 29.webp";
import gallery31 from "@/assets/gallery/Gallery 31.webp";
import gallery32 from "@/assets/gallery/Gallery 32.webp";
import gallery33 from "@/assets/gallery/Gallery 33.webp";
import gallery34 from "@/assets/gallery/Gallery 34.webp";
import gallery35 from "@/assets/gallery/Gallery 35.webp";
import gallery36 from "@/assets/gallery/Gallery 36.webp";
import gallery37 from "@/assets/gallery/Gallery 37.webp";
import gallery38 from "@/assets/gallery/Gallery 38.webp";
import gallery40 from "@/assets/gallery/Gallery 40.webp";
import gallery41 from "@/assets/gallery/Gallery 41.webp";
import gallery43 from "@/assets/gallery/Gallery 43.webp";
import gallery45 from "@/assets/gallery/Gallery 45.webp";
import gallery47 from "@/assets/gallery/Gallery 47.webp";
import gallery49 from "@/assets/gallery/Gallery 49.webp";
import gallery50 from "@/assets/gallery/Gallery 50.webp";
import gallery51 from "@/assets/gallery/Gallery 51.webp";
import gallery54 from "@/assets/gallery/Gallery 54.webp";
import gallery55 from "@/assets/gallery/Gallery 55.webp";
import gallery58 from "@/assets/gallery/Gallery58.webp";
import gallery59 from "@/assets/gallery/Gallery59.webp";

const images = [
  gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8,
  gallery9, gallery10, gallery11, gallery12, gallery14, gallery15, gallery16,
  gallery17, gallery18, gallery19, gallery20, gallery22, gallery23, gallery25,
  gallery26, gallery29, gallery31, gallery32, gallery33, gallery34, gallery35,
  gallery36, gallery37, gallery38, gallery40, gallery41, gallery43, gallery45,
  gallery47, gallery49, gallery50, gallery51, gallery54, gallery55, gallery58, gallery59,
];

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const goToPrevious = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1);
    }
  }, [lightboxIndex]);

  const goToNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === images.length - 1 ? 0 : lightboxIndex + 1);
    }
  }, [lightboxIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, goToPrevious, goToNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <PageTransition>
      <SEO />
      <main className="bg-background overflow-x-hidden">
        <Navigation />

        {/* Hero */}
        <section className="pt-28 pb-10 md:pt-40 md:pb-16 px-5 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-serif text-4xl md:text-6xl mb-4"
              >
                Gallery
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-sans text-sm text-muted-foreground max-w-md mx-auto"
              >
                The visual language of Art Village — wood grain, stone texture, forest light.
              </motion.p>
            </ScrollReveal>
          </div>
        </section>

        {/* Masonry Grid */}
        <section className="px-3 md:px-8 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
            {images.map((img, i) => (
              <div
                key={i}
                className="break-inside-avoid mb-3 md:mb-4 cursor-pointer group overflow-hidden"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={img}
                  alt={`Gallery image ${i + 1}`}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3 text-white/60 hover:text-white transition-colors"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close"
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              {/* Previous button */}
              <button
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 p-3 text-white/60 hover:text-white transition-colors bg-black/30 hover:bg-black/50 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              {/* Next button */}
              <button
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 p-3 text-white/60 hover:text-white transition-colors bg-black/30 hover:bg-black/50 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              {/* Image */}
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: EASING }}
                src={images[lightboxIndex]}
                alt={`Gallery image ${lightboxIndex + 1}`}
                className="max-w-[90dvw] max-h-[85dvh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Image counter */}
              <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-white/50 font-sans text-sm">
                {lightboxIndex + 1} / {images.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Gallery;
