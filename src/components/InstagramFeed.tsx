import { Play, Layers } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  useInstagramPosts,
  formatInstagramDate,
  type InstagramPost,
} from "@/hooks/useInstagramPosts";

// TODO: replace with the actual handle once confirmed
const INSTAGRAM_HANDLE = "artvillagenaggar";
const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

interface TileProps {
  post: InstagramPost;
  className?: string;
}

function Tile({ post, className = "" }: TileProps) {
  const isVideo = post.mediaType === "VIDEO";
  const isCarousel = post.mediaType === "CAROUSEL_ALBUM";
  const formattedDate = formatInstagramDate(post.timestamp);
  const captionExcerpt =
    post.caption.length > 140 ? `${post.caption.slice(0, 140).trim()}…` : post.caption;
  const altText = post.caption.slice(0, 80) || "Instagram post from Art Village Naggar";

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden bg-secondary block ${className}`}
      aria-label={`View Instagram post from ${formattedDate}`}
    >
      <img
        src={post.mediaUrl}
        alt={altText}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        loading="lazy"
      />

      {(isVideo || isCarousel) && (
        <div className="absolute top-3 right-3 z-10 text-background drop-shadow-md">
          {isVideo ? (
            <Play className="w-4 h-4" fill="currentColor" />
          ) : (
            <Layers className="w-4 h-4" />
          )}
        </div>
      )}

      {/* Hover gradient + caption */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
        <p className="font-sans text-[9px] tracking-[0.28em] uppercase text-background/85 mb-2">
          {formattedDate}
        </p>
        {captionExcerpt && (
          <p className="font-serif italic text-sm text-background leading-snug line-clamp-3">
            {captionExcerpt}
          </p>
        )}
      </div>
    </a>
  );
}

function SkeletonGrid() {
  return (
    <>
      {/* Desktop skeleton */}
      <div className="hidden md:block aspect-square">
        <div className="grid h-full grid-cols-3 grid-rows-3 gap-px bg-border animate-pulse">
          <div className="col-span-2 row-span-2 bg-secondary" />
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-secondary" />
          ))}
        </div>
      </div>

      {/* Mobile skeleton */}
      <div className="md:hidden animate-pulse">
        <div className="aspect-[2/1] bg-secondary mb-px" />
        <div className="grid grid-cols-2 gap-px bg-border">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-secondary" />
          ))}
        </div>
        <div className="aspect-[2/1] bg-secondary mt-px" />
      </div>
    </>
  );
}

export default function InstagramFeed() {
  const { data: posts, isLoading, isError } = useInstagramPosts();

  // Silent fallback — if the API is down or unconfigured, don't render anything.
  if (isError || (!isLoading && (!posts || posts.length === 0))) {
    return null;
  }

  const visible = posts?.slice(0, 6) ?? [];

  return (
    <section className="py-14 md:py-24 px-5 md:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Follow Along
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-12">
            Moments from Chachogi.
          </h2>
        </ScrollReveal>

        {isLoading && <SkeletonGrid />}

        {!isLoading && visible.length >= 6 && (
          <ScrollReveal>
            {/* Desktop — bento grid */}
            <div className="hidden md:block aspect-square">
              <div className="grid h-full grid-cols-3 grid-rows-3 gap-px bg-border">
                <Tile post={visible[0]} className="col-span-2 row-span-2" />
                {visible.slice(1, 6).map((post) => (
                  <Tile key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Mobile — stacked bento */}
            <div className="md:hidden">
              <Tile post={visible[0]} className="block aspect-[2/1]" />
              <div className="grid grid-cols-2 gap-px bg-border mt-px">
                {visible.slice(1, 5).map((post) => (
                  <Tile key={post.id} post={post} className="aspect-square" />
                ))}
              </div>
              {visible[5] && (
                <div className="mt-px">
                  <Tile post={visible[5]} className="block aspect-[2/1]" />
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Fallback grid for < 6 posts */}
        {!isLoading && visible.length > 0 && visible.length < 6 && (
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border">
              {visible.map((post) => (
                <Tile key={post.id} post={post} className="aspect-square" />
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* View on Instagram */}
        <ScrollReveal>
          <div className="mt-12">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-xs tracking-[0.2em] uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-all duration-500"
            >
              View on Instagram
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
