import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { EASING } from "@/lib/animations";
import { getVideoEmbed } from "@/lib/utils";
import { useNotionArticles, fallbackArticles, formatArticleDate, type Article } from "@/hooks/useNotionArticles";
import { useNotionProjects } from "@/hooks/useNotionProjects";

import blogKathkuni from "@/assets/blog-kathkuni-detail.jpg";
import blogSeasons from "@/assets/blog-seasons.jpg";
import blogFood from "@/assets/blog-food.jpg";
import kathkuniWall from "@/assets/kathkuni-wall.jpg";
import fireStove from "@/assets/fire-stove.jpg";
import villagePath from "@/assets/village-path.jpg";

const defaultImages = [blogKathkuni, blogSeasons, blogFood, kathkuniWall, fireStove, villagePath];

function getArticleImage(article: Article, index: number): string {
  if (article.coverImage) return article.coverImage;
  return defaultImages[index % defaultImages.length];
}

type Tab = "projects" | "articles";

const tabContentVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
};

function tagColor(tag: string): string {
  switch (tag) {
    case "Ongoing":   return "text-[#2C5F2E]";
    case "Open":      return "text-[#C4752A]";
    case "Planning":  return "text-[#6B5B93]";
    case "Completed": return "text-[#4A4A4A]";
    default:          return "text-muted-foreground";
  }
}

const Blogs = () => {
  const { data: notionArticles, isLoading: articlesLoading, isError: articlesError } = useNotionArticles();
  const { data: projects = [], isLoading: projectsLoading, isError: projectsError } = useNotionProjects();
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const articles = notionArticles && notionArticles.length > 0 ? notionArticles : fallbackArticles;

  const categories = useMemo(() => {
    const cats = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];
    return cats.filter(Boolean);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "All") return articles;
    return articles.filter((a) => a.category === selectedCategory);
  }, [articles, selectedCategory]);

  const coverArticle = filteredArticles[0];
  const midArticles  = filteredArticles.slice(1, 3);
  const gridArticles = filteredArticles.slice(3);

  return (
    <PageTransition>
      <SEO />
      <main className="bg-background overflow-x-hidden">
        <Navigation variant="magazine" />

        {/* ── MASTHEAD ── */}
        <header className="pt-28 md:pt-36 px-5 md:px-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, ease: EASING }}
              className="h-[3px] bg-foreground origin-left"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="py-2 flex justify-center gap-5 md:gap-10"
            >
              {["Architecture", "Food", "Land", "Community", "Volunteering", "Collaboration"].map((topic) => (
                <span key={topic} className="font-sans text-[9px] md:text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                  {topic}
                </span>
              ))}
            </motion.div>

            <div className="h-px bg-border" />

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: EASING }}
              className="font-serif text-center py-6 md:py-8 text-5xl sm:text-6xl md:text-8xl tracking-tight leading-none"
            >
              The Shepherd Magazine
            </motion.h1>

            <div className="h-px bg-border" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="py-2 flex justify-between items-center"
            >
              <span className="font-sans text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                Adaptive Rural Tourism in the Himalayas
              </span>
              <span className="font-sans text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                Chachogi, Naggar, Himachal Pradesh · 2,300 m
              </span>
            </motion.div>

            <div className="h-[3px] bg-foreground" />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-center font-serif italic text-sm md:text-base text-muted-foreground py-4"
            >
              Observations from 2,300 metres — stories of Kathkuni architecture, mountain food, and the seasons that shape everything.
            </motion.p>

            <div className="h-px bg-border" />
          </div>
        </header>

        {/* ── TAB NAV ── */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="px-5 md:px-12"
        >
          <div className="max-w-5xl mx-auto flex items-end gap-10 pt-6">
            <button
              onClick={() => setActiveTab("projects")}
              className={`relative pb-4 font-sans text-sm tracking-[0.15em] uppercase transition-colors duration-200 ${
                activeTab === "projects" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Our Projects
              {activeTab === "projects" && (
                <motion.span layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("articles")}
              className={`relative pb-4 font-sans text-sm tracking-[0.15em] uppercase transition-colors duration-200 ${
                activeTab === "articles" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Articles
              {activeTab === "articles" && (
                <motion.span layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground" />
              )}
            </button>
          </div>
          <div className="max-w-5xl mx-auto h-px bg-border" />
        </motion.nav>

        {/* ── TAB CONTENT ── */}
        <AnimatePresence mode="wait">

          {/* ── PROJECTS ── */}
          {activeTab === "projects" && (
            <motion.section
              key="projects"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="px-5 md:px-12 py-12 md:py-16"
            >
              <div className="max-w-5xl mx-auto">

                <div className="mb-8">
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Field Notes</p>
                  <h2 className="font-serif text-2xl md:text-3xl mb-4">Ongoing Work from Chachogi</h2>
                  <div className="h-px bg-border" />
                </div>

                {/* Loading skeleton */}
                {projectsLoading && (
                  <div className="animate-pulse divide-y divide-border">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="py-8 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12">
                        <div className="space-y-3">
                          <div className="h-2 bg-secondary w-1/4" />
                          <div className="h-6 bg-secondary w-3/4" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-secondary w-full" />
                          <div className="h-2 bg-secondary w-5/6" />
                          <div className="h-2 bg-secondary w-4/5" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Error */}
                {projectsError && !projectsLoading && (
                  <div className="py-12 border-t border-border">
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Notice</p>
                    <p className="font-serif italic text-xl text-muted-foreground">
                      Field notes are being gathered. Projects will appear shortly.
                    </p>
                  </div>
                )}

                {/* Live project list */}
                {!projectsLoading && projects.length > 0 && (
                  <div>
                    {projects.map((project, i) => {
                      const embed = getVideoEmbed(project.video);
                      const issueNo = String(i + 1).padStart(2, "0");
                      const isFeatured = i === 0;

                      return (
                        <ScrollReveal key={project.id} delay={i * 0.07}>
                          <div className={`py-10 md:py-14 border-b border-border ${isFeatured ? "pb-12 md:pb-16" : ""}`}>

                            {/* Issue number + tag row */}
                            <div className="flex items-center gap-4 mb-4">
                              <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-muted-foreground/50">
                                No. {issueNo}
                              </span>
                              {project.tag && (
                                <>
                                  <span className="text-border select-none text-xs">·</span>
                                  <span className={`font-sans text-[9px] tracking-[0.3em] uppercase ${tagColor(project.tag)}`}>
                                    {project.tag}
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Clickable title */}
                            <Link to={`/shepherd-magazine/project/${project.id}`} className="group block">
                              <h3 className={`font-serif leading-[1.2] mb-5 group-hover:text-primary transition-colors ${isFeatured ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"}`}>
                                {project.title}
                              </h3>
                            </Link>

                            {/* Description */}
                            {project.description && (
                              <p className={`font-sans text-muted-foreground leading-relaxed mb-7 ${isFeatured ? "text-base max-w-2xl" : "text-sm max-w-xl"}`}>
                                {project.description}
                              </p>
                            )}

                            {/* Photo — links to detail */}
                            {project.photo && (
                              <Link to={`/shepherd-magazine/project/${project.id}`} className="group block mb-7">
                                <div className={`overflow-hidden ${isFeatured ? "aspect-[16/9]" : "aspect-[21/9]"}`}>
                                  <img
                                    src={project.photo}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                    loading={isFeatured ? "eager" : "lazy"}
                                  />
                                </div>
                              </Link>
                            )}

                            {/* Read more */}
                            <Link
                              to={`/shepherd-magazine/project/${project.id}`}
                              className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-7"
                            >
                              Read more <span className="text-xs">→</span>
                            </Link>

                            {/* Video */}
                            {embed && (
                              <div>
                                <div className="flex items-center gap-4 mb-4">
                                  <div className="h-px flex-1 bg-border" />
                                  <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-muted-foreground whitespace-nowrap">
                                    Watch
                                  </span>
                                  <div className="h-px flex-1 bg-border" />
                                </div>
                                <div className="aspect-video">
                                  {embed.type === "iframe" ? (
                                    <iframe
                                      src={embed.src}
                                      className="w-full h-full"
                                      allowFullScreen
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      title={project.title}
                                    />
                                  ) : (
                                    <video
                                      src={embed.src}
                                      controls
                                      className="w-full h-full"
                                      title={project.title}
                                    />
                                  )}
                                </div>
                              </div>
                            )}

                          </div>
                        </ScrollReveal>
                      );
                    })}
                  </div>
                )}

                {/* Empty state */}
                {!projectsLoading && !projectsError && projects.length === 0 && (
                  <div className="py-16 border-t border-foreground/20">
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Coming Soon</p>
                    <h3 className="font-serif text-2xl leading-[1.3] mb-3">No projects yet.</h3>
                    <p className="font-sans text-sm text-muted-foreground">
                      Field notes from Chachogi will appear here soon.
                    </p>
                  </div>
                )}

              </div>
            </motion.section>
          )}

          {/* ── ARTICLES ── */}
          {activeTab === "articles" && (
            <motion.section
              key="articles"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="px-5 md:px-12"
            >

              {/* Category filter bar */}
              {!articlesLoading && articles.length > 0 && (
                <div className="max-w-5xl mx-auto pt-8 pb-6">
                  <div className="flex gap-6 flex-wrap border-b border-border pb-4">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`font-sans text-[10px] tracking-[0.22em] uppercase pb-1 border-b-2 transition-colors ${
                          selectedCategory === cat
                            ? "border-foreground text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading skeleton */}
              {articlesLoading && (
                <div className="max-w-5xl mx-auto py-16 animate-pulse space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10">
                    <div className="aspect-[16/10] bg-secondary" />
                    <div className="space-y-4 py-4">
                      <div className="h-2 bg-secondary w-1/4" />
                      <div className="h-8 bg-secondary w-3/4" />
                      <div className="h-2 bg-secondary w-full" />
                      <div className="h-2 bg-secondary w-2/3" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[0, 1].map((i) => (
                      <div key={i} className="space-y-3">
                        <div className="aspect-[16/10] bg-secondary" />
                        <div className="h-2 bg-secondary w-1/3" />
                        <div className="h-5 bg-secondary w-2/3" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error */}
              {articlesError && !articlesLoading && (
                <div className="max-w-5xl mx-auto py-16 border-t border-border">
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Notice</p>
                  <p className="font-serif italic text-xl text-muted-foreground">
                    The magazine is being typeset. Articles will appear shortly.
                  </p>
                </div>
              )}

              {/* ── COVER STORY ── */}
              {!articlesLoading && coverArticle && (
                <ScrollReveal>
                  <div className="max-w-5xl mx-auto py-10 border-b border-border">
                    <div className="mb-6 flex items-center gap-4">
                      <div className="h-px flex-1 bg-border" />
                      <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-muted-foreground whitespace-nowrap">
                        Cover Story
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>

                    <Link
                      to={`/shepherd-magazine/${coverArticle.slug}`}
                      className="group grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-12"
                    >
                      <div className="aspect-[4/3] md:aspect-[16/11] overflow-hidden">
                        <img
                          src={getArticleImage(coverArticle, 0)}
                          alt={coverArticle.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          loading="eager"
                        />
                      </div>
                      <div className="flex flex-col justify-center gap-4">
                        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                          {coverArticle.category}
                        </p>
                        <h2 className="font-serif text-3xl md:text-4xl leading-[1.2] group-hover:text-primary transition-colors">
                          {coverArticle.title}
                        </h2>
                        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                          {coverArticle.excerpt}
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                            {formatArticleDate(coverArticle.date)}
                          </span>
                          <span className="text-border select-none">·</span>
                          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                            {coverArticle.readTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </ScrollReveal>
              )}

              {/* ── TWO MEDIUM STORIES ── */}
              {!articlesLoading && midArticles.length > 0 && (
                <div className="max-w-5xl mx-auto py-10 border-b border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                    {midArticles.map((article, i) => (
                      <ScrollReveal key={article.id} delay={i * 0.1}>
                        <Link
                          to={`/shepherd-magazine/${article.slug}`}
                          className={`group block py-6 md:py-0 ${i === 0 ? "md:pr-10" : "md:pl-10"}`}
                        >
                          <div className="aspect-[16/10] overflow-hidden mb-5">
                            <img
                              src={getArticleImage(article, i + 1)}
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                              loading="lazy"
                            />
                          </div>
                          <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">
                            {article.category} · {formatArticleDate(article.date)}
                          </p>
                          <h3 className="font-serif text-xl md:text-2xl leading-[1.3] mb-3 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {article.excerpt}
                          </p>
                        </Link>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}

              {/* ── TEXT-DENSE ARCHIVE GRID ── */}
              {!articlesLoading && gridArticles.length > 0 && (
                <div className="max-w-5xl mx-auto py-10 pb-24">
                  <div className="mb-6">
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">From the Archive</p>
                    <div className="h-px bg-border" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                    {gridArticles.map((article, i) => (
                      <ScrollReveal key={article.id} delay={i * 0.07}>
                        <Link
                          to={`/shepherd-magazine/${article.slug}`}
                          className={`group block py-6 ${
                            i % 3 === 0 ? "md:pr-8" : i % 3 === 1 ? "md:px-8" : "md:pl-8"
                          }`}
                        >
                          <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">
                            {article.category}
                          </p>
                          <h3 className="font-serif text-lg leading-[1.35] mb-3 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                            {article.excerpt}
                          </p>
                          <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60">
                            {formatArticleDate(article.date)} · {article.readTime}
                          </p>
                        </Link>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty — no articles */}
              {!articlesLoading && articles.length === 0 && !articlesError && (
                <div className="max-w-5xl mx-auto py-20 border-t border-foreground">
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Coming Soon</p>
                  <h3 className="font-serif text-2xl md:text-3xl mb-4 max-w-md leading-[1.3]">
                    The first issue is being written.
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-sm">
                    Stories about Kathkuni architecture, mountain food, and life at 2,300 metres. Check back soon.
                  </p>
                </div>
              )}

              {/* Empty — category filter has no results */}
              {!articlesLoading && articles.length > 0 && filteredArticles.length === 0 && (
                <div className="max-w-5xl mx-auto py-16 text-center">
                  <p className="font-sans text-sm text-muted-foreground mb-4">No articles in this category yet.</p>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="font-sans text-[10px] tracking-[0.2em] uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-all"
                  >
                    View all articles
                  </button>
                </div>
              )}

            </motion.section>
          )}

        </AnimatePresence>

        <Footer variant="magazine" />
      </main>
    </PageTransition>
  );
};

export default Blogs;
