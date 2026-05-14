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
      <div className="hidden md:block aspect-square max-w-4xl mx-auto">
        <div className="grid h-full grid-cols-3 grid-rows-3 gap-px bg-border animate-pulse">
          <div className="col-span-2 row-span-2 bg-secondary" />
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-secondary" />
          ))}
        </div>
      </div>

      {/* Mobile skeleton */}
      <div className="md:hidden max-w-md mx-auto animate-pulse">
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
  const newestDate = visible[0] ? formatInstagramDate(visible[0].timestamp) : "";

  return (
    <section className="px-5 md:px-12 pt-12 md:pt-16 pb-16 md:pb-24">
      <div className="max-w-5xl mx-auto">
        {/* Magazine section mark — thick rule, centered ornament + label, hairline */}
        <ScrollReveal>
          <div className="mb-12 md:mb-16">
            <div className="h-[3px] bg-foreground" />
            <div className="py-7 md:py-9 text-center">
              <span
                aria-hidden
                className="block font-serif text-xl md:text-2xl text-foreground/30 leading-none mb-4 tracking-[0.6em]"
              >
                ·  ·  ·
              </span>
              <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted-foreground">
                From the Notebook
              </p>
            </div>
            <div className="h-px bg-border" />
          </div>

          <div className="mb-10 md:mb-12 flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-serif text-2xl md:text-3xl leading-tight">
              Latest from <span className="italic">@{INSTAGRAM_HANDLE}</span>
            </h2>
            {newestDate && !isLoading && (
              <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                Updated {newestDate}
              </p>
            )}
          </div>
        </ScrollReveal>

        {isLoading && <SkeletonGrid />}

        {!isLoading && visible.length >= 6 && (
          <ScrollReveal>
            {/* Desktop — bento grid */}
            <div className="hidden md:block aspect-square max-w-4xl mx-auto">
              <div className="grid h-full grid-cols-3 grid-rows-3 gap-px bg-border">
                <Tile post={visible[0]} className="col-span-2 row-span-2" />
                {visible.slice(1, 6).map((post) => (
                  <Tile key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Mobile — stacked bento */}
            <div className="md:hidden max-w-md mx-auto">
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border max-w-4xl mx-auto">
              {visible.map((post) => (
                <Tile key={post.id} post={post} className="aspect-square" />
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* View on Instagram */}
        <ScrollReveal>
          <div className="mt-10 md:mt-12 flex justify-center">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[10px] tracking-[0.25em] uppercase border-b border-foreground/30 pb-1 hover:border-foreground hover:gap-3 transition-all inline-flex items-center gap-2"
            >
              View on Instagram
              <span aria-hidden>→</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
