import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { EASING, HERO_TIMING } from "@/lib/animations";
import { useNotionArticles, fallbackArticles, formatArticleDate, type Article } from "@/hooks/useNotionArticles";

// Default images for articles without cover images
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

// ---------------------------------------------------------------------------
// Static project data — update titles, descriptions, and tags as needed
// ---------------------------------------------------------------------------
const projects = [
  {
    id: "1",
    title: "Kathkuni Restoration Initiative",
    description:
      "Documenting and restoring traditional Kathkuni wood-and-stone construction techniques across Chachogi village.",
    tag: "Ongoing",
  },
  {
    id: "2",
    title: "Shepherd Volunteer Programme",
    description:
      "Work exchange programme connecting skilled volunteers with community-building projects in the Kullu Valley.",
    tag: "Open",
  },
  {
    id: "3",
    title: "Mountain Food Archive",
    description:
      "Recording and preserving traditional Himachali recipes, seasonal food practices, and indigenous crop knowledge.",
    tag: "Ongoing",
  },
  {
    id: "4",
    title: "Village Commons Design",
    description:
      "Community-led redesign of shared spaces in Chachogi — courtyards, water points, and gathering areas.",
    tag: "Planning",
  },
  {
    id: "5",
    title: "Slow Economy Map",
    description:
      "Mapping local artisans, seasonal growers, and traditional crafts in the upper Kullu Valley.",
    tag: "Completed",
  },
  {
    id: "6",
    title: "Chachogi School Garden",
    description:
      "Establishing a permaculture garden at the local school to teach sustainable growing practices to children.",
    tag: "Ongoing",
  },
];

type Tab = "projects" | "articles";

const tabContentVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.2 } },
};

const Blogs = () => {
  const { data: notionArticles, isLoading, isError } = useNotionArticles();
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

  const featuredArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1);

  return (
    <PageTransition>
      <SEO />
      <main className="bg-background overflow-x-hidden">
        <Navigation variant="magazine" />

        {/* Hero */}
        <section className="pt-28 pb-10 md:pt-40 md:pb-16 px-5 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: HERO_TIMING.tagline.delay, duration: HERO_TIMING.tagline.duration, ease: EASING }}
              className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4"
            >
              Publications
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: HERO_TIMING.heading.delay, duration: HERO_TIMING.heading.duration, ease: EASING }}
              className="font-serif text-3xl sm:text-4xl md:text-6xl leading-[1.15] mb-6"
            >
              Shepherd Magazine
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: HERO_TIMING.description.delay, duration: HERO_TIMING.description.duration, ease: EASING }}
              className="font-sans text-base text-muted-foreground leading-relaxed max-w-xl"
            >
              Observations from 2,300 metres. Stories about Kathkuni architecture,
              the people of Chachogi, the food that grows here, and the seasons that shape everything.
            </motion.p>
          </div>
        </section>

        {/* Tab switcher */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="px-5 md:px-12 border-b border-border"
        >
          <div className="max-w-6xl mx-auto flex items-end gap-10">
            <button
              onClick={() => setActiveTab("projects")}
              className={`relative pb-4 font-sans text-sm tracking-[0.12em] uppercase transition-colors duration-200 ${
                activeTab === "projects"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Our Projects
              {activeTab === "projects" && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab("articles")}
              className={`relative pb-4 font-sans text-sm tracking-[0.12em] uppercase transition-colors duration-200 ${
                activeTab === "articles"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Articles
              {activeTab === "articles" && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                />
              )}
            </button>
          </div>
        </motion.section>

        {/* Tab content */}
        <AnimatePresence mode="wait">

          {/* ── PROJECTS ── */}
          {activeTab === "projects" && (
            <motion.section
              key="projects"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="px-5 md:px-12 py-14 md:py-20"
            >
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {projects.map((project, i) => (
                  <ScrollReveal key={project.id} delay={i * 0.07}>
                    <div className="border border-border p-6 md:p-8 flex flex-col gap-4 h-full">
                      <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">
                        {project.tag}
                      </span>
                      <h3 className="font-serif text-xl leading-[1.3]">
                        {project.title}
                      </h3>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
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
            >
              {/* Category filter — only shown when there are articles */}
              {!isLoading && articles.length > 0 && (
                <div className="px-5 md:px-12 pt-10 pb-8">
                  <div className="max-w-6xl mx-auto flex gap-3 flex-wrap">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`font-sans text-xs tracking-[0.1em] uppercase px-4 py-2 border transition-colors ${
                          selectedCategory === cat
                            ? "border-foreground text-foreground bg-foreground/5"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading skeleton */}
              {isLoading && (
                <div className="px-5 md:px-12 py-16 md:py-20">
                  <div className="max-w-6xl mx-auto animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                      <div className="aspect-[16/10] bg-secondary" />
                      <div className="flex flex-col justify-center space-y-4">
                        <div className="h-3 bg-secondary w-1/4" />
                        <div className="h-7 bg-secondary w-3/4" />
                        <div className="h-3 bg-secondary w-full" />
                        <div className="h-3 bg-secondary w-2/3" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Featured article */}
              {!isLoading && featuredArticle && (
                <div className="px-5 md:px-12 mb-14 md:mb-20">
                  <div className="max-w-6xl mx-auto">
                    <ScrollReveal>
                      <Link
                        to={`/shepherd-magazine/${featuredArticle.slug}`}
                        className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12"
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={getArticleImage(featuredArticle, 0)}
                            alt={featuredArticle.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                            {featuredArticle.category} · {formatArticleDate(featuredArticle.date)}
                          </p>
                          <h2 className="font-serif text-2xl md:text-3xl leading-[1.3] mb-4 group-hover:text-primary transition-colors">
                            {featuredArticle.title}
                          </h2>
                          <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
                            {featuredArticle.excerpt}
                          </p>
                          <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">
                            {featuredArticle.readTime}
                          </p>
                        </div>
                      </Link>
                    </ScrollReveal>
                  </div>
                </div>
              )}

              {/* Article grid */}
              {!isLoading && otherArticles.length > 0 && (
                <div className="px-5 md:px-12 pb-16 md:pb-24">
                  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {otherArticles.map((article, i) => (
                      <ScrollReveal key={article.id} delay={i * 0.1}>
                        <Link to={`/shepherd-magazine/${article.slug}`} className="group block">
                          <div className="aspect-[3/2] overflow-hidden mb-4">
                            <img
                              src={getArticleImage(article, i + 1)}
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                            {article.category} · {article.readTime}
                          </p>
                          <h3 className="font-serif text-lg leading-[1.3] mb-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-3">
                            {article.excerpt}
                          </p>
                        </Link>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty state — no articles at all */}
              {!isLoading && articles.length === 0 && (
                <div className="px-5 md:px-12 pb-16 md:pb-24">
                  <div className="max-w-6xl mx-auto border-t border-border pt-16 pb-24">
                    <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-5">
                      Coming Soon
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl leading-[1.3] mb-4 max-w-md">
                      The first issue is being written.
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-sm">
                      Stories about Kathkuni architecture, mountain food, and life at 2,300 metres.
                      Check back soon.
                    </p>
                  </div>
                </div>
              )}

              {/* Empty state — category filter has no results */}
              {!isLoading && articles.length > 0 && filteredArticles.length === 0 && (
                <div className="px-5 md:px-12 pb-16 md:pb-24">
                  <div className="max-w-6xl mx-auto text-center py-16">
                    <p className="font-sans text-sm text-muted-foreground mb-4">
                      No articles in this category yet.
                    </p>
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className="font-sans text-xs tracking-[0.2em] uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-all duration-300"
                    >
                      View all articles
                    </button>
                  </div>
                </div>
              )}
            </motion.section>
          )}

        </AnimatePresence>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Blogs;
