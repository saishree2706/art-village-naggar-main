import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { EASING } from "@/lib/animations";

import {
  useNotionArticles,
  fallbackArticles,
  formatArticleDate,
  type Article,
} from "@/hooks/useNotionArticles";
import { useNotionProjects } from "@/hooks/useNotionProjects";

import blogKathkuni from "@/assets/blog-kathkuni-detail.jpg";
import blogSeasons from "@/assets/blog-seasons.jpg";
import blogFood from "@/assets/blog-food.jpg";
import kathkuniWall from "@/assets/kathkuni-wall.jpg";
import fireStove from "@/assets/fire-stove.jpg";
import villagePath from "@/assets/village-path.jpg";

const defaultImages = [blogKathkuni, blogSeasons, blogFood, kathkuniWall, fireStove, villagePath];
const PAGE_SIZE = 12;

function getArticleImage(article: Article, index: number): string {
  if (article.coverImage) return article.coverImage;
  return defaultImages[index % defaultImages.length];
}

function tagColor(tag: string): string {
  switch (tag) {
    case "Ongoing":
      return "text-[#2C5F2E]";
    case "Open":
      return "text-[#C4752A]";
    case "Planning":
      return "text-[#6B5B93]";
    case "Completed":
      return "text-[#4A4A4A]";
    default:
      return "text-muted-foreground";
  }
}

type Tab = "projects" | "articles";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function buildPageList(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pages: (number | "ellipsis")[] = [1];
  if (currentPage > 3) pages.push("ellipsis");
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (currentPage < totalPages - 2) pages.push("ellipsis");
  pages.push(totalPages);
  return pages;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = buildPageList(currentPage, totalPages);

  return (
    <div className="mt-16 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="font-sans text-[10px] tracking-[0.25em] uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-foreground/30 inline-flex items-center gap-2"
      >
        <span aria-hidden>←</span>
        Previous
      </button>

      <div className="flex items-center gap-4">
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <span
              key={`ellipsis-${i}`}
              className="font-sans text-sm text-muted-foreground select-none"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`font-serif text-base tabular-nums transition-colors ${
                p === currentPage
                  ? "text-foreground underline underline-offset-4"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-current={p === currentPage ? "page" : undefined}
              aria-label={`Page ${p}`}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="font-sans text-[10px] tracking-[0.25em] uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-foreground/30 inline-flex items-center gap-2"
      >
        Next
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}

const Archive = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab: Tab =
    (searchParams.get("tab") as Tab) === "projects" ? "projects" : "articles";
  const parsedPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const articleCategory = searchParams.get("category") || "All";
  const projectStatus = searchParams.get("status") || "All";

  const {
    data: notionArticles,
    isLoading: articlesLoading,
    isError: articlesError,
  } = useNotionArticles();
  const {
    data: projects = [],
    isLoading: projectsLoading,
    isError: projectsError,
  } = useNotionProjects();

  const articles =
    notionArticles && notionArticles.length > 0 ? notionArticles : fallbackArticles;

  const articleCategories = useMemo(
    () => ["All", ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean)))],
    [articles],
  );

  const projectStatuses = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.tag).filter(Boolean)))],
    [projects],
  );

  const filteredArticles = useMemo(() => {
    if (articleCategory === "All") return articles;
    return articles.filter((a) => a.category === articleCategory);
  }, [articles, articleCategory]);

  const filteredProjects = useMemo(() => {
    if (projectStatus === "All") return projects;
    return projects.filter((p) => p.tag === projectStatus);
  }, [projects, projectStatus]);

  const totalArticlePages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE));
  const totalProjectPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));

  const pagedArticles = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredArticles.slice(start, start + PAGE_SIZE);
  }, [filteredArticles, currentPage]);

  const pagedProjects = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProjects.slice(start, start + PAGE_SIZE);
  }, [filteredProjects, currentPage]);

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    for (const [k, v] of Object.entries(updates)) {
      if (v === null || v === "") next.delete(k);
      else next.set(k, v);
    }
    setSearchParams(next);
  };

  const setTab = (tab: Tab) => {
    updateParams({ tab, page: null });
  };

  const setCategory = (cat: string) => {
    updateParams({ category: cat === "All" ? null : cat, page: null });
  };

  const setStatus = (status: string) => {
    updateParams({ status: status === "All" ? null : status, page: null });
  };

  const setPage = (p: number) => {
    updateParams({ page: p === 1 ? null : p.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageTransition>
      <SEO />
      <main className="bg-background overflow-x-hidden">
        <Navigation variant="magazine" />

        {/* Header */}
        <header className="pt-28 md:pt-36 px-5 md:px-12">
          <div className="max-w-5xl mx-auto">
            <Link
              to="/shepherd-magazine"
              className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 mb-8"
            >
              <span aria-hidden>←</span>
              Back to current issue
            </Link>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, ease: EASING }}
              className="h-[3px] bg-foreground origin-left"
            />

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: EASING }}
              className="py-6 md:py-10 text-center"
            >
              <p className="font-sans text-[10px] md:text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">
                The Shepherd Magazine
              </p>
              <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-none">
                <span className="italic font-light">The</span> Archive
              </h1>
              <p className="font-serif italic text-sm md:text-base text-muted-foreground mt-5 max-w-xl mx-auto">
                Every project and article, from issue one to today.
              </p>
            </motion.div>

            <div className="h-px bg-border" />
          </div>
        </header>

        {/* Tab nav */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="px-5 md:px-12"
        >
          <div className="max-w-5xl mx-auto flex items-end gap-10 pt-6">
            <button
              onClick={() => setTab("projects")}
              className={`relative pb-4 font-sans text-sm tracking-[0.15em] uppercase transition-colors duration-200 ${
                activeTab === "projects"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Projects
              <span className="ml-2 font-sans text-[10px] text-muted-foreground tabular-nums">
                ({projects.length})
              </span>
              {activeTab === "projects" && (
                <motion.span
                  layoutId="archive-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                />
              )}
            </button>
            <button
              onClick={() => setTab("articles")}
              className={`relative pb-4 font-sans text-sm tracking-[0.15em] uppercase transition-colors duration-200 ${
                activeTab === "articles"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Articles
              <span className="ml-2 font-sans text-[10px] text-muted-foreground tabular-nums">
                ({articles.length})
              </span>
              {activeTab === "articles" && (
                <motion.span
                  layoutId="archive-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                />
              )}
            </button>
          </div>
          <div className="max-w-5xl mx-auto h-px bg-border" />
        </motion.nav>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.section
              key="projects-archive"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASING }}
              className="px-5 md:px-12 py-10 md:py-14"
            >
              <div className="max-w-5xl mx-auto">
                {/* Filter chips */}
                {projectStatuses.length > 1 && (
                  <div className="mb-10 flex gap-6 flex-wrap border-b border-border pb-4">
                    {projectStatuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatus(status)}
                        className={`font-sans text-[10px] tracking-[0.22em] uppercase pb-1 border-b-2 transition-colors ${
                          projectStatus === status
                            ? "border-foreground text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}

                {projectsLoading && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-pulse">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i}>
                        <div className="aspect-[4/3] bg-secondary mb-4" />
                        <div className="h-2 bg-secondary w-1/3 mb-3" />
                        <div className="h-5 bg-secondary w-3/4 mb-3" />
                        <div className="h-2 bg-secondary w-full mb-2" />
                        <div className="h-2 bg-secondary w-5/6" />
                      </div>
                    ))}
                  </div>
                )}

                {projectsError && !projectsLoading && (
                  <div className="py-20 text-center border-t border-border">
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                      Notice
                    </p>
                    <p className="font-serif italic text-xl text-muted-foreground">
                      Field notes are being gathered. Check back shortly.
                    </p>
                  </div>
                )}

                {!projectsLoading && pagedProjects.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {pagedProjects.map((project, i) => (
                      <ScrollReveal key={project.id} delay={i * 0.04}>
                        <Link
                          to={`/shepherd-magazine/project/${project.slug}`}
                          className="group block"
                        >
                          <div className="aspect-[4/3] overflow-hidden mb-4 bg-secondary">
                            {project.photo && (
                              <img
                                src={project.photo}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                loading={i < 3 ? "eager" : "lazy"}
                              />
                            )}
                          </div>
                          {project.tag && (
                            <p
                              className={`font-sans text-[9px] tracking-[0.3em] uppercase mb-2 ${tagColor(project.tag)}`}
                            >
                              {project.tag}
                            </p>
                          )}
                          <h3 className="font-serif text-xl leading-[1.25] mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {project.title}
                          </h3>
                          {project.description && (
                            <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-3">
                              {project.description}
                            </p>
                          )}
                        </Link>
                      </ScrollReveal>
                    ))}
                  </div>
                )}

                {!projectsLoading && pagedProjects.length === 0 && projects.length > 0 && (
                  <div className="py-16 text-center">
                    <p className="font-sans text-sm text-muted-foreground mb-4">
                      No projects matching "{projectStatus}".
                    </p>
                    <button
                      onClick={() => setStatus("All")}
                      className="font-sans text-[10px] tracking-[0.2em] uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-all"
                    >
                      Show all projects
                    </button>
                  </div>
                )}

                {!projectsLoading && projects.length === 0 && !projectsError && (
                  <div className="py-20 text-center border-t border-foreground/20">
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
                      Coming Soon
                    </p>
                    <p className="font-serif italic text-xl text-muted-foreground">
                      No projects in the archive yet.
                    </p>
                  </div>
                )}

                <Pagination
                  currentPage={Math.min(currentPage, totalProjectPages)}
                  totalPages={totalProjectPages}
                  onPageChange={setPage}
                />
              </div>
            </motion.section>
          )}

          {activeTab === "articles" && (
            <motion.section
              key="articles-archive"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASING }}
              className="px-5 md:px-12 py-10 md:py-14"
            >
              <div className="max-w-5xl mx-auto">
                {/* Filter chips */}
                {articleCategories.length > 1 && (
                  <div className="mb-10 flex gap-6 flex-wrap border-b border-border pb-4">
                    {articleCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`font-sans text-[10px] tracking-[0.22em] uppercase pb-1 border-b-2 transition-colors ${
                          articleCategory === cat
                            ? "border-foreground text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}

                {articlesLoading && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-pulse">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i}>
                        <div className="aspect-[16/10] bg-secondary mb-4" />
                        <div className="h-2 bg-secondary w-1/3 mb-3" />
                        <div className="h-5 bg-secondary w-3/4 mb-3" />
                        <div className="h-2 bg-secondary w-full" />
                      </div>
                    ))}
                  </div>
                )}

                {articlesError && !articlesLoading && (
                  <div className="py-20 text-center border-t border-border">
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                      Notice
                    </p>
                    <p className="font-serif italic text-xl text-muted-foreground">
                      The archive is being typeset. Check back shortly.
                    </p>
                  </div>
                )}

                {!articlesLoading && pagedArticles.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {pagedArticles.map((article, i) => (
                      <ScrollReveal key={article.id} delay={i * 0.04}>
                        <Link
                          to={`/shepherd-magazine/${article.slug}`}
                          className="group block"
                        >
                          <div className="aspect-[16/10] overflow-hidden mb-4 bg-secondary">
                            <img
                              src={getArticleImage(article, i)}
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                              loading={i < 3 ? "eager" : "lazy"}
                            />
                          </div>
                          <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">
                            {article.category} · {formatArticleDate(article.date)}
                          </p>
                          <h3 className="font-serif text-xl leading-[1.3] mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {article.excerpt}
                          </p>
                        </Link>
                      </ScrollReveal>
                    ))}
                  </div>
                )}

                {!articlesLoading && pagedArticles.length === 0 && articles.length > 0 && (
                  <div className="py-16 text-center">
                    <p className="font-sans text-sm text-muted-foreground mb-4">
                      No articles in this category yet.
                    </p>
                    <button
                      onClick={() => setCategory("All")}
                      className="font-sans text-[10px] tracking-[0.2em] uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-all"
                    >
                      Show all articles
                    </button>
                  </div>
                )}

                {!articlesLoading && articles.length === 0 && !articlesError && (
                  <div className="py-20 text-center border-t border-foreground/20">
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
                      Coming Soon
                    </p>
                    <p className="font-serif italic text-xl text-muted-foreground">
                      The first issue is being written.
                    </p>
                  </div>
                )}

                <Pagination
                  currentPage={Math.min(currentPage, totalArticlePages)}
                  totalPages={totalArticlePages}
                  onPageChange={setPage}
                />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <Footer variant="magazine" />
      </main>
    </PageTransition>
  );
};

export default Archive;
