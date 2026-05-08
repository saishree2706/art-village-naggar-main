import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselImage {
  url: string;
  caption?: string;
}

interface Props {
  images: (string | CarouselImage)[];
  alt?: string;
  /**
   * "fill"    — fills its parent container (no own margins or aspect ratio).
   *             Use when the parent already sets size (e.g. aspect-[4/3] wrapper).
   * "content" — editorial bleed style with own aspect-[16/9] and wide margins.
   *             Default; used inside article/project content columns.
   */
  variant?: "fill" | "content";
}

function normalize(images: (string | CarouselImage)[]): CarouselImage[] {
  return images.map((img) => (typeof img === "string" ? { url: img } : img));
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "8%" : "-8%",
    opacity: 0,
    scale: 1.02,
    filter: "blur(6px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-8%" : "8%",
    opacity: 0,
    scale: 1.02,
    filter: "blur(6px)",
  }),
};

const slideTransition = {
  duration: 0.7,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export function ImageCarousel({ images, alt = "", variant = "content" }: Props) {
  const slides = normalize(images);
  const [[current, direction], setPage] = useState<[number, number]>([0, 0]);

  const goTo = (next: number) => {
    const wrapped = (next + slides.length) % slides.length;
    const dir = wrapped === current ? 0 : wrapped > current ? 1 : -1;
    setPage([wrapped, dir]);
  };

  const prev = () => goTo(current === 0 ? slides.length - 1 : current - 1);
  const next = () => goTo(current === slides.length - 1 ? 0 : current + 1);

  useEffect(() => {
    if (slides.length <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, slides.length]);

  const hasMultiple = slides.length > 1;

  const slideStack = (
    <AnimatePresence custom={direction} initial={false} mode="popLayout">
      <motion.img
        key={current}
        src={slides[current].url}
        alt={slides[current].caption || alt}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={slideTransition}
        drag={hasMultiple ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) next();
          else if (info.offset.x > 60) prev();
        }}
        className="absolute inset-0 w-full h-full object-cover select-none cursor-grab active:cursor-grabbing"
        loading={current === 0 ? "eager" : "lazy"}
        draggable={false}
      />
    </AnimatePresence>
  );

  const overlays = hasMultiple && (
    <>
      {/* Top + bottom subtle gradient for control contrast */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Counter pill */}
      <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
        <span className="block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span className="font-mono text-[10px] tracking-[0.3em]">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        aria-label="Previous image"
        className="group absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:border-white/40 active:scale-95"
      >
        <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        className="group absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:border-white/40 active:scale-95"
      >
        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Bottom indicator bars */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/15">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to image ${i + 1}`}
            className="relative h-1 overflow-hidden rounded-full transition-all duration-500"
            style={{ width: i === current ? 28 : 10 }}
          >
            <span className="absolute inset-0 bg-white/30" />
            <motion.span
              className="absolute inset-0 bg-white"
              initial={false}
              animate={{ opacity: i === current ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>
    </>
  );

  if (variant === "fill") {
    return (
      <div className="relative w-full h-full overflow-hidden">
        {slideStack}
        {overlays}
      </div>
    );
  }

  return (
    <figure className="my-16 -mx-5 md:-mx-20 lg:-mx-32">
      <div className="relative overflow-hidden aspect-[16/9] bg-foreground/5 rounded-sm shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]">
        {slideStack}
        {overlays}
      </div>
      {slides[current].caption && (
        <figcaption className="font-sans text-xs text-muted-foreground mt-3 text-center tracking-[0.1em] px-5 md:px-20 lg:px-32">
          {slides[current].caption}
        </figcaption>
      )}
    </figure>
  );
}

export default ImageCarousel;
