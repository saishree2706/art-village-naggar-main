import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { BlogPostSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { SITE_URL } from "@/lib/seo";
import { EASING } from "@/lib/animations";
import { getVideoEmbed } from "@/lib/utils";
import { useNotionArticle, formatArticleDate, type ContentBlock } from "@/hooks/useNotionArticle";

const DEFAULT_COVER = "/og/magazine.jpg";

function renderBlock(block: ContentBlock, index: number, isFirstParagraph: boolean) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={index}
          className={
            isFirstParagraph
              ? "font-sans text-base text-foreground/80 leading-[1.9] mb-6 first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none first-letter:text-foreground"
              : "font-sans text-base text-foreground/80 leading-[1.9] mb-6"
          }
        >
          {block.content}
        </p>
      );

    case "heading_1":
      return (
        <h2 key={index} className="font-serif text-3xl md:text-4xl leading-[1.25] mt-14 mb-6 pt-4 border-t border-border">
          {block.content}
        </h2>
      );

    case "heading_2":
      return (
        <h3 key={index} className="font-serif text-2xl md:text-3xl leading-[1.3] mt-12 mb-5">
          {block.content}
        </h3>
      );

    case "heading_3":
      return (
        <h4 key={index} className="font-serif text-xl md:text-2xl leading-[1.3] mt-10 mb-4">
          {block.content}
        </h4>
      );

    case "bulleted_list_item":
      return (
        <li key={index} className="font-sans text-base text-foreground/80 leading-[1.8] ml-5 mb-2 list-disc">
          {block.content}
        </li>
      );

    case "numbered_list_item":
      return (
        <li key={index} className="font-sans text-base text-foreground/80 leading-[1.8] ml-5 mb-2 list-decimal">
          {block.content}
        </li>
      );

    case "quote":
      return (
        <blockquote key={index} className="border-l-[3px] border-primary pl-6 my-10 md:my-12">
          <p className="font-serif text-xl md:text-2xl italic text-foreground leading-[1.5]">
            {block.content}
          </p>
        </blockquote>
      );

    case "callout":
      return (
        <div key={index} className="bg-secondary/40 border-l-[3px] border-foreground/20 pl-6 py-5 my-8">
          <p className="font-sans text-base text-foreground leading-relaxed">
            {block.content}
          </p>
        </div>
      );

    case "divider":
      return (
        <div key={index} className="flex items-center gap-4 my-12">
          <div className="h-px flex-1 bg-border" />
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60">· · ·</span>
          <div className="h-px flex-1 bg-border" />
        </div>
      );

    case "image":
      return (
        <figure key={index} className="my-12 -mx-4 md:-mx-12">
          <img
            src={block.url}
            alt={block.caption || ""}
            className="w-full object-cover"
            loading="lazy"
          />
          {block.caption && (
            <figcaption className="font-sans text-xs text-muted-foreground mt-3 text-center tracking-[0.1em]">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "code":
      return (
        <pre key={index} className="bg-foreground text-background p-6 my-8 overflow-x-auto">
          <code className="font-mono text-sm">{block.content}</code>
        </pre>
      );

    default:
      return null;
  }
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, isError, error } = useNotionArticle(slug);

  // Loading state
  if (isLoading) {
    return (
      <PageTransition>
        <main className="bg-background overflow-x-hidden">
          <Navigation variant="magazine" />
          <div className="pt-28 md:pt-36 px-5 md:px-12">
            <div className="max-w-3xl mx-auto animate-pulse">
              <div className="h-[3px] bg-secondary mb-8" />
              <div className="h-2 bg-secondary w-1/4 mb-6" />
              <div className="h-12 bg-secondary w-3/4 mb-4" />
              <div className="h-5 bg-secondary w-full mb-2" />
              <div className="h-5 bg-secondary w-2/3 mb-8" />
              <div className="h-px bg-secondary mb-4" />
              <div className="h-2 bg-secondary w-20 mb-8" />
              <div className="h-[3px] bg-secondary mb-10" />
            </div>
            <div className="max-w-5xl mx-auto animate-pulse">
              <div className="aspect-[16/9] bg-secondary mb-12" />
            </div>
            <div className="max-w-2xl mx-auto animate-pulse space-y-4 pb-24">
              <div className="h-3 bg-secondary w-full" />
              <div className="h-3 bg-secondary w-5/6" />
              <div className="h-3 bg-secondary w-4/5" />
            </div>
          </div>
          <Footer variant="magazine" />
        </main>
      </PageTransition>
    );
  }

  // Error state
  if (isError || !article) {
    return (
      <PageTransition>
        <main className="bg-background overflow-x-hidden">
          <Navigation variant="magazine" />
          <section className="pt-28 md:pt-36 px-5 md:px-12 pb-24">
            <div className="max-w-3xl mx-auto">
              <div className="h-[3px] bg-foreground mb-8" />
              <h1 className="font-serif text-3xl md:text-4xl mb-4">
                {(error as Error)?.message === "Article not found" ? "Article not found" : "Something went wrong"}
              </h1>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-10">
                {(error as Error)?.message === "Article not found"
                  ? "This article doesn't exist or has been unpublished."
                  : "We couldn't load this article. Please try again later."}
              </p>
              <div className="h-[3px] bg-foreground mb-8" />
              <Link
                to="/shepherd-magazine?tab=articles"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to The Shepherd
              </Link>
            </div>
          </section>
          <Footer variant="magazine" />
        </main>
      </PageTransition>
    );
  }

  const coverImage = article.coverImage || DEFAULT_COVER;
  const articleUrl = `${SITE_URL}/shepherd-magazine/${article.slug}`;
  const videoEmbed = getVideoEmbed(article.video ?? null);
  const firstParaIndex = article.content.findIndex((b) => b.type === "paragraph");

  return (
    <PageTransition>
      <SEO
        title={`${article.title} | The Shepherd`}
        description={article.excerpt}
        ogImage={coverImage}
        ogType="article"
        article={{
          publishedTime: article.date,
          author: "ART - Adaptive Rural Tourism",
          tags: [article.category],
        }}
      />
      <BlogPostSchema
        title={article.title}
        description={article.excerpt}
        datePublished={article.date}
        image={coverImage}
        url={articleUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "The Shepherd", url: `${SITE_URL}/shepherd-magazine` },
          { name: article.title, url: articleUrl },
        ]}
      />

      <main className="bg-background overflow-x-hidden">
        <Navigation variant="magazine" />

        {/* ── ARTICLE HEADER ── */}
        <header className="pt-28 md:pt-36 px-5 md:px-12">
          <div className="max-w-3xl mx-auto">

            {/* Back link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASING }}
            >
              <Link
                to="/shepherd-magazine?tab=articles"
                className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                The Shepherd
              </Link>
            </motion.div>

            {/* Top thick rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: EASING }}
              className="h-[3px] bg-foreground origin-left mb-6"
            />

            {/* Category + date */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-5"
            >
              {article.category}
              {article.date && (
                <> · {formatArticleDate(article.date)}</>
              )}
            </motion.p>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: EASING }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.15] mb-6"
            >
              {article.title}
            </motion.h1>

            {/* Excerpt as italic deck */}
            {article.excerpt && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="font-serif italic text-lg text-muted-foreground leading-relaxed mb-6"
              >
                {article.excerpt}
              </motion.p>
            )}

            {/* Thin rule + read time */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="h-px bg-border mb-4" />
              <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-4">
                {article.readTime}
              </p>
              <div className="h-[3px] bg-foreground" />
            </motion.div>

          </div>
        </header>

        {/* ── COVER IMAGE ── wider than text column */}
        <section className="px-5 md:px-8 my-10 md:my-14">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── INLINE VIDEO (if present) ── */}
        {videoEmbed && (
          <section className="px-5 md:px-8 mb-10 md:mb-14">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px flex-1 bg-border" />
                  <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-muted-foreground whitespace-nowrap">
                    Watch the Story
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="aspect-video">
                  {videoEmbed.type === "iframe" ? (
                    <iframe
                      src={videoEmbed.src}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      title={article.title}
                    />
                  ) : (
                    <video
                      src={videoEmbed.src}
                      controls
                      className="w-full h-full"
                      title={article.title}
                    />
                  )}
                </div>
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* ── ARTICLE CONTENT ── narrow column for readability */}
        <section className="px-5 md:px-12 pb-16 md:pb-28">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              {article.content.map((block, index) =>
                renderBlock(block, index, index === firstParaIndex)
              )}
            </ScrollReveal>

            {/* Editorial back link */}
            <div className="mt-16 pt-6 border-t-[3px] border-foreground">
              <Link
                to="/shepherd-magazine?tab=articles"
                className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to The Shepherd
              </Link>
            </div>
          </div>
        </section>

        <Footer variant="magazine" />
      </main>
    </PageTransition>
  );
};

export default BlogPost;
