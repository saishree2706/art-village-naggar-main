import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { BlogPostSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { SITE_URL } from "@/lib/seo";
import { useNotionArticle, formatArticleDate, type ContentBlock } from "@/hooks/useNotionArticle";

const DEFAULT_COVER = "/og/magazine.jpg";

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={index} className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
          {block.content}
        </p>
      );

    case "heading_1":
      return (
        <h2 key={index} className="font-serif text-3xl md:text-4xl leading-[1.3] mt-12 mb-6">
          {block.content}
        </h2>
      );

    case "heading_2":
      return (
        <h3 key={index} className="font-serif text-2xl md:text-3xl leading-[1.3] mt-10 mb-5">
          {block.content}
        </h3>
      );

    case "heading_3":
      return (
        <h4 key={index} className="font-serif text-xl md:text-2xl leading-[1.3] mt-8 mb-4">
          {block.content}
        </h4>
      );

    case "bulleted_list_item":
      return (
        <li key={index} className="font-sans text-base text-muted-foreground leading-relaxed ml-6 mb-2 list-disc">
          {block.content}
        </li>
      );

    case "numbered_list_item":
      return (
        <li key={index} className="font-sans text-base text-muted-foreground leading-relaxed ml-6 mb-2 list-decimal">
          {block.content}
        </li>
      );

    case "quote":
      return (
        <blockquote key={index} className="border-l-2 border-foreground/20 pl-6 my-8 italic">
          <p className="font-serif text-xl text-foreground/80 leading-relaxed">
            {block.content}
          </p>
        </blockquote>
      );

    case "callout":
      return (
        <div key={index} className="bg-secondary/50 border border-border p-6 my-8">
          <p className="font-sans text-base text-foreground leading-relaxed">
            {block.content}
          </p>
        </div>
      );

    case "divider":
      return <hr key={index} className="border-border my-12" />;

    case "image":
      return (
        <figure key={index} className="my-10">
          <img
            src={block.url}
            alt={block.caption || ""}
            className="w-full object-cover"
            loading="lazy"
          />
          {block.caption && (
            <figcaption className="font-sans text-sm text-muted-foreground mt-3 text-center">
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
          <Navigation />
          <section className="pt-28 pb-16 md:pt-40 md:pb-36 px-5 md:px-12">
            <div className="max-w-3xl mx-auto">
              <div className="animate-pulse">
                <div className="h-4 bg-secondary rounded w-24 mb-4" />
                <div className="h-12 bg-secondary rounded w-3/4 mb-8" />
                <div className="h-4 bg-secondary rounded w-32 mb-12" />
                <div className="aspect-[16/9] bg-secondary rounded mb-12" />
                <div className="space-y-4">
                  <div className="h-4 bg-secondary rounded w-full" />
                  <div className="h-4 bg-secondary rounded w-5/6" />
                  <div className="h-4 bg-secondary rounded w-4/5" />
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </PageTransition>
    );
  }

  // Error state
  if (isError || !article) {
    return (
      <PageTransition>
        <main className="bg-background overflow-x-hidden">
          <Navigation />
          <section className="pt-28 pb-16 md:pt-40 md:pb-36 px-5 md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-3xl md:text-4xl mb-6">
                {(error as Error)?.message === "Article not found"
                  ? "Article not found"
                  : "Something went wrong"}
              </h1>
              <p className="font-sans text-base text-muted-foreground mb-8">
                {(error as Error)?.message === "Article not found"
                  ? "The article you're looking for doesn't exist or has been unpublished."
                  : "We couldn't load this article. Please try again later."}
              </p>
              <Link
                to="/shepherd-magazine"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-all duration-500"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all articles
              </Link>
            </div>
          </section>
          <Footer />
        </main>
      </PageTransition>
    );
  }

  const coverImage = article.coverImage || DEFAULT_COVER;
  const articleUrl = `${SITE_URL}/shepherd-magazine/${article.slug}`;

  return (
    <PageTransition>
      <SEO
        title={`${article.title} | ART - Adaptive Rural Tourism`}
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
          { name: "Shepherd Magazine", url: `${SITE_URL}/shepherd-magazine` },
          { name: article.title, url: articleUrl },
        ]}
      />
      <main className="bg-background overflow-x-hidden">
        <Navigation />

        {/* Header */}
        <section className="pt-28 pb-6 md:pt-40 md:pb-12 px-5 md:px-12">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <Link
                to="/shepherd-magazine"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                All articles
              </Link>

              <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                {article.category} · {formatArticleDate(article.date)}
              </p>

              <h1 className="font-serif text-3xl md:text-5xl leading-[1.2] mb-6">
                {article.title}
              </h1>

              <p className="font-sans text-sm text-muted-foreground">
                {article.readTime}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Cover Image */}
        <section className="px-5 md:px-12 mb-10 md:mb-12">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Content */}
        <section className="px-5 md:px-12 pb-16 md:pb-24">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="prose-custom">
                {article.content.map((block, index) => renderBlock(block, index))}
              </div>
            </ScrollReveal>

            {/* Back link */}
            <div className="mt-16 pt-8 border-t border-border">
              <Link
                to="/shepherd-magazine"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all articles
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default BlogPost;
