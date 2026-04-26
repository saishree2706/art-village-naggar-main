import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselImage {
  url: string;
  caption?: string;
}

export function ImageCarousel({ images }: { images: CarouselImage[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <figure className="my-16 -mx-5 md:-mx-20 lg:-mx-32">
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={images[current].url}
          alt={images[current].caption || ""}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-background/80 hover:bg-background text-foreground transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-background/80 hover:bg-background text-foreground transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <span className="absolute bottom-3 right-3 bg-background/70 font-sans text-[10px] tracking-widest px-2 py-1">
          {current + 1} / {images.length}
        </span>
      </div>

      {images[current].caption && (
        <figcaption className="font-sans text-xs text-muted-foreground mt-3 text-center tracking-[0.1em] px-5 md:px-20 lg:px-32">
          {images[current].caption}
        </figcaption>
      )}
    </figure>
  );
}

export default ImageCarousel;
