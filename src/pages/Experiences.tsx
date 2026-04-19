import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { SITE_URL } from "@/lib/seo";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASING, HERO_TIMING } from "@/lib/animations";
// Experience images
import expCultural from "@/assets/experiences/20260220-P1034047.jpg";
import expCooking from "@/assets/experiences/pizza.jpg";
import expHikes from "@/assets/experiences/20180311-_DSC0492.jpg";
import expStargazing from "@/assets/experiences/20190109-_DSC0741.jpg";
import expForest from "@/assets/experiences/IMG_20180918_165742.jpg";
import expCrafts from "@/assets/experiences/IMG_1378.jpg";

const experiences = [
  {
    title: "Village Cultural & Heritage Tours",
    tagline: "Discover timeless traditions",
    description:
      "Explore the village of Chachogi to experience local traditions and hospitality. Walk through temple courtyards, admire architectural marvels, and learn about timeless Kathkuni craftsmanship and stories passed through generations.",
    highlights: [
      "Temple tours and ceremonial spaces",
      "Architectural walks through 100-year-old houses",
      "Stories from village elders",
      "Understanding the devta tradition",
    ],
    image: expCultural,
  },
  {
    title: "Farm-to-Table Cooking & Wood-Fire Pizza",
    tagline: "Flavours that tell a story",
    description:
      "Prepare meals using fresh farm ingredients and create wood-fired pizzas with our village chef. Learn traditional Himachali recipes and modern techniques using locally sourced produce from our gardens and neighboring farms.",
    highlights: [
      "Hands-on cooking with local ingredients",
      "Traditional Himachali recipe secrets",
      "Wood-fired pizza making",
      "Farm-to-table philosophy",
    ],
    image: expCooking,
  },
  {
    title: "Snowline Hikes & Meadow Retreat",
    tagline: "Trek to breathtaking heights",
    description:
      "Mountain trekking experiences that lead you through crisp mountain air to snow-covered meadows and breathtaking alpine landscapes. Guided treks tailored to your fitness level, from gentle morning walks to full-day adventures.",
    highlights: [
      "Chanderkhani Pass expedition",
      "Alpine meadow exploration",
      "Seasonal wildflower trails",
      "Expert local guides",
    ],
    image: expHikes,
  },
  {
    title: "Stargazing & Night Camping",
    tagline: "Beneath a sky ablaze with stars",
    description:
      "Experience magical evenings under a canopy of stars, warmed by the crackling campfire. At 2,300 meters with minimal light pollution, the night sky reveals its full splendor. Optional overnight camping for the adventurous.",
    highlights: [
      "Bonfire gatherings",
      "Night sky observation",
      "Overnight camping options",
      "Traditional storytelling",
    ],
    image: expStargazing,
  },
  {
    title: "Forest Walks & Hidden Trails",
    tagline: "Off the beaten path",
    description:
      "Venture off the beaten path into the deodar forests that surround the village. Discover secret trails that lead to breathtaking viewpoints, hidden waterfalls, and spaces of profound natural beauty known only to locals.",
    highlights: [
      "Guided forest meditation walks",
      "Wild plant identification",
      "Secret viewpoint discoveries",
      "Bird watching opportunities",
    ],
    image: expForest,
  },
  {
    title: "Traditional Crafts Workshop",
    tagline: "Learn from master artisans",
    description:
      "Spend time with the artisans who restored Art Village. Learn to identify deodar by smell, understand how a Kathkuni joint works — no nails, no glue, just geometry. Experience traditional weaving and wood carving techniques.",
    highlights: [
      "Kathkuni joinery demonstration",
      "Local weaving techniques",
      "Wood carving basics",
      "Take home your creation",
    ],
    image: expCrafts,
  },
];

const Experiences = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <PageTransition>
      <SEO />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Experiences", url: `${SITE_URL}/experiences` },
        ]}
      />
      <main className="bg-background overflow-x-hidden">
        <Navigation />

        {/* Hero */}
        <section ref={heroRef} className="relative h-[70dvh] overflow-hidden">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img
              src={expCultural}
              alt="Village cultural experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/40" />
          </motion.div>
          <div className="relative z-10 flex flex-col justify-end h-full pb-12 md:pb-16 px-5 md:px-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: HERO_TIMING.tagline.delay, duration: HERO_TIMING.tagline.duration, ease: EASING }}
              className="font-sans text-xs tracking-[0.3em] uppercase text-background/60 mb-4"
            >
              Immersive Experiences
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: HERO_TIMING.heading.delay, duration: HERO_TIMING.heading.duration, ease: EASING }}
              className="font-serif text-4xl sm:text-5xl md:text-7xl text-background font-normal"
            >
              Experiences
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: HERO_TIMING.description.delay, duration: HERO_TIMING.description.duration, ease: EASING }}
              className="font-sans text-base text-background/70 mt-4 max-w-xl"
            >
              Step away from ordinary routines and connect with nature, local culture, and mountain landscapes.
            </motion.p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-36 px-5 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-[1.3] mb-6 md:mb-8">
                Not activities. Not itineraries.
                <span className="hidden md:inline"><br /></span>
                <span className="inline md:hidden"> </span>
                Time spent with people who know this place.
              </h2>
              <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Every experience at ART is designed to help you connect deeply
                with the land, the culture, and the people who call this valley home.
                These aren't tourist activities — they're invitations to participate
                in a way of life that has evolved here over centuries.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Experiences Grid */}
        <section className="px-5 md:px-12 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto space-y-16 md:space-y-32">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.title}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                    <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                      {exp.tagline}
                    </p>
                    <h2 className="font-serif text-2xl md:text-3xl mb-4">{exp.title}</h2>
                    <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
                      {exp.description}
                    </p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, j) => (
                        <li key={j} className="font-sans text-sm text-muted-foreground/80 flex items-start gap-2">
                          <span className="text-foreground mt-1">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Booking Note */}
        <section className="py-14 md:py-28 px-5 md:px-12 bg-secondary/50">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-serif text-2xl md:text-3xl italic mb-6">
                "We don't sell experiences. We share the ones we already have."
              </h2>
              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
                All experiences are arranged directly with your hosts during your stay.
                No booking platform, no fixed schedule. Tell us what interests you when
                you arrive, and we'll make it happen based on weather, season, and availability.
              </p>
              <p className="font-sans text-sm text-muted-foreground/70">
                Most experiences are complimentary for guests. Some specialized activities
                may have additional costs which we'll discuss upfront.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-36 px-5 md:px-12 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-5xl italic mb-8">
              Ready to experience the mountains differently?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/collaborate"
                className="inline-block font-sans text-xs tracking-[0.2em] uppercase bg-foreground text-background px-8 py-4 hover:bg-foreground/90 transition-colors"
              >
                Collaborate
              </Link>
              <Link
                to="/stays"
                className="inline-block font-sans text-xs tracking-[0.2em] uppercase border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
              >
                Book a Stay
              </Link>
            </div>
          </ScrollReveal>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Experiences;
