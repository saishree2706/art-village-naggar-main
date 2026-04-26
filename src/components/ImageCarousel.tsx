import { useState } from "react";
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

export function ImageCarousel({ images, alt = "", variant = "content" }: Props) {
  const slides = normalize(images);
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  const controls = slides.length > 1 && (
    <>
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-background/80 hover:bg-background text-foreground transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-background/80 hover:bg-background text-foreground transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <span className="absolute bottom-2 right-2 bg-background/70 font-sans text-[10px] tracking-widest px-2 py-0.5">
        {current + 1} / {slides.length}
      </span>
    </>
  );

  if (variant === "fill") {
    return (
      <div className="relative w-full h-full">
        <img
          src={slides[current].url}
          alt={slides[current].caption || alt}
          className="w-full h-full object-cover"
          loading={current === 0 ? "eager" : "lazy"}
        />
        {controls}
      </div>
    );
  }

  return (
    <figure className="my-16 -mx-5 md:-mx-20 lg:-mx-32">
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={slides[current].url}
          alt={slides[current].caption || alt}
          className="w-full h-full object-cover"
          loading={current === 0 ? "eager" : "lazy"}
        />
        {controls}
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
