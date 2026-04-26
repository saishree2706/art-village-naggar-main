import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import { EASING } from "@/lib/animations";
import { getVideoEmbed } from "@/lib/utils";
import { useNotionProject, type ContentBlock } from "@/hooks/useNotionProject";
import { ImageCarousel } from "@/components/ImageCarousel";
import { groupContentBlocks, type CarouselBlock } from "@/lib/content";

function tagColor(tag: string): string {
  switch (tag) {
    case "Ongoing":   return "text-[#2C5F2E]";
    case "Open":      return "text-[#C4752A]";
    case "Planning":  return "text-[#6B5B93]";
    case "Completed": return "text-[#4A4A4A]";
    default:          return "text-muted-foreground";
  }
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={index} className="font-sans text-base text-foreground/80 leading-[1.9] mb-6">
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
          <p className="font-sans text-base text-foreground leading-relaxed">{block.content}</p>
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
          <img src={block.url} alt={block.caption || ""} className="w-full object-cover" loading="lazy" />
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

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, isError, error } = useNotionProject(slug);

  if (isLoading) {
    return (
      <PageTransition>
        <main className="bg-background overflow-x-hidden">
          <Navigation variant="magazine" />
          <div className="pt-28 md:pt-36 px-5 md:px-12">
            <div className="max-w-3xl mx-auto animate-pulse">
              <div className="h-[3px] bg-secondary mb-8" />
              <div className="h-2 bg-secondary w-1/5 mb-6" />
              <div className="h-12 bg-secondary w-3/4 mb-4" />
              <div className="h-5 bg-secondary w-full mb-2" />
              <div className="h-5 bg-secondary w-2/3 mb-8" />
              <div className="h-[3px] bg-secondary mb-10" />
            </div>
            <div className="max-w-5xl mx-auto animate-pulse">
              <div className="aspect-[16/9] bg-secondary mb-12" />
            </div>
          </div>
          <Footer variant="magazine" />
        </main>
      </PageTransition>
    );
  }

  if (isError || !project) {
    return (
      <PageTransition>
        <main className="bg-background overflow-x-hidden">
          <Navigation variant="magazine" />
          <section className="pt-28 md:pt-36 px-5 md:px-12 pb-24">
            <div className="max-w-3xl mx-auto">
              <div className="h-[3px] bg-foreground mb-8" />
              <h1 className="font-serif text-3xl md:text-4xl mb-4">
                {(error as Error)?.message === "Project not found" ? "Project not found" : "Something went wrong"}
              </h1>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-10">
                {(error as Error)?.message === "Project not found"
                  ? "This project doesn't exist or has been removed."
                  : "We couldn't load this project. Please try again later."}
              </p>
              <div className="h-[3px] bg-foreground mb-8" />
              <Link
                to="/shepherd-magazine?tab=projects"
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

  const videoEmbed = getVideoEmbed(project.video ?? null);

  return (
    <PageTransition>
      <main className="bg-background overflow-x-hidden">
        <Navigation variant="magazine" />

        {/* ── HEADER ── */}
        <header className="pt-28 md:pt-36 px-5 md:px-12">
          <div className="max-w-3xl mx-auto">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASING }}
            >
              <Link
                to="/shepherd-magazine?tab=projects"
                className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Our Projects
              </Link>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: EASING }}
              className="h-[3px] bg-foreground origin-left mb-6"
            />

            {/* Tag */}
            {project.tag && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className={`font-sans text-[10px] tracking-[0.3em] uppercase mb-5 ${tagColor(project.tag)}`}
              >
                {project.tag}
              </motion.p>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: EASING }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.15] mb-6"
            >
              {project.title}
            </motion.h1>

            {/* Description as deck */}
            {project.description && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="font-serif italic text-lg text-muted-foreground leading-relaxed mb-6"
              >
                {project.description}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="h-[3px] bg-foreground"
            />
          </div>
        </header>

        {/* ── COVER PHOTO ── */}
        {project.photo && (
          <section className="px-5 md:px-8 my-10 md:my-14">
            <ScrollReveal>
              <div className="max-w-5xl mx-auto">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={project.photo}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* ── CONTENT BLOCKS ── */}
        {project.content.length > 0 && (
          <section className="px-5 md:px-12">
            <div className="max-w-2xl mx-auto">
              <ScrollReveal>
                {groupContentBlocks(project.content).map((block, index) => {
                  if (block.type === "image_carousel") {
                    return <ImageCarousel key={index} images={(block as CarouselBlock).images} />;
                  }
                  return renderBlock(block as ContentBlock, index);
                })}
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* ── VIDEO ── (after content) */}
        {videoEmbed && (
          <section className="px-5 md:px-8 mt-10 md:mt-14 mb-4 md:mb-6">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px flex-1 bg-border" />
                  <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-muted-foreground whitespace-nowrap">
                    Watch
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
                      title={project.title}
                    />
                  ) : (
                    <video src={videoEmbed.src} controls className="w-full h-full" title={project.title} />
                  )}
                </div>
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* ── BACK LINK ── */}
        <section className="px-5 md:px-12 pb-16 md:pb-28">
          <div className="max-w-2xl mx-auto mt-10 pt-6 border-t-[3px] border-foreground">
            <Link
              to="/shepherd-magazine?tab=projects"
              className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
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
};

export default ProjectDetail;
