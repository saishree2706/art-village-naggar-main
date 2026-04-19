import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import SplashScreen from "@/components/SplashScreen";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { OrganizationSchema } from "@/components/StructuredData";
import { EASING, HERO_TIMING } from "@/lib/animations";
import heroImg from "@/assets/home/20260222-P1034400.jpg";
import woodTexture from "@/assets/wood-texture.jpg";
// Accommodation images
import entireKathkuniVilla from "@/assets/Entire Kathkuni House (6 Bedrooms)/Entire Kathkuni Villa.avif";
import summerGoldSuite from "@/assets/Summer Gold Duplex Suite/Summer Gold Duplex Suite 1.webp";
import springGreenRoom from "@/assets/Spring Green Attic Room/Spring Green Attic Room 1.webp";
// Experience images
import expCultural from "@/assets/experiences/20260220-P1034047.jpg";
import expCooking from "@/assets/experiences/Pizza.jpg";
import expHikes from "@/assets/experiences/20180311-_DSC0492.jpg";
import expStargazing from "@/assets/experiences/20190109-_DSC0741.jpg";
import expForest from "@/assets/experiences/IMG_20180918_165742.jpg";
import dining1 from "@/assets/dining/dining 1.avif";
const Index = () => {
  const hasSeenSplash = sessionStorage.getItem("splash_seen") === "true";
  const [showSplash, setShowSplash] = useState(!hasSeenSplash);

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem("splash_seen", "true");
    setShowSplash(false);
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <PageTransition>
      <SEO />
      <OrganizationSchema />
    <main className="bg-background overflow-x-hidden">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <Navigation />

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen min-h-[100dvh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src={heroImg}
            alt="ART - Adaptive Rural Tourism - Community initiatives in the Himalayas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/30" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] text-center px-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: HERO_TIMING.tagline.delay, duration: HERO_TIMING.tagline.duration, ease: EASING }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-background/60 mb-6"
          >
            Chachogi Village · Naggar · Kullu Valley
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: HERO_TIMING.heading.delay, duration: HERO_TIMING.heading.duration, ease: EASING }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-background font-normal italic leading-[1.1]"
          >
            Embrace a<br />slow life.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: HERO_TIMING.description.delay, duration: HERO_TIMING.description.duration, ease: EASING }}
            className="mt-6 font-sans text-sm md:text-base text-background/70 max-w-md"
          >
            Conscious Travel · Therapeutic Relaxation · Contextual Lifestyle
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: HERO_TIMING.cta.delay, duration: HERO_TIMING.cta.duration, ease: EASING }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/collaborate"
              className="inline-block font-sans text-xs tracking-[0.2em] uppercase bg-background text-foreground px-8 py-4 hover:bg-background/90 transition-all duration-500"
            >
              Collaborate
            </Link>
            <Link
              to="/stays"
              className="inline-block font-sans text-xs tracking-[0.2em] uppercase border border-background/70 text-background px-8 py-4 hover:bg-background/10 transition-all duration-500"
            >
              Book a Stay
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: HERO_TIMING.scrollIndicator.delay, duration: HERO_TIMING.scrollIndicator.duration, ease: EASING }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-px h-12 bg-background/30 animate-pulse" />
        </motion.div>
      </section>

      {/* About / Mission */}
      <section className="py-16 md:py-28 px-5 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
          <ScrollReveal>
            <div>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                ART - Adaptive Rural Tourism
              </p>
              <h2 className="font-serif text-3xl md:text-4xl leading-[1.3] mb-8">
                A community organization rethinking rural living.
              </h2>
              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
                We are not a hotel — we're a movement. ART brings together volunteers, collaborators,
                and conscious travelers to preserve cultural and environmental heritage, support local communities, and create
                sustainable livelihoods in the Himalayas.
              </p>
              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
                You are not just booking a room. You are reliving a lifestyle that is disappearing and your presence helps it survive.
                In a world of fast paced travel iteneraries, it is a pause that urges you to go slow, appreciate and ponder upon the simpler things in life.
                After all life in Himalayas was always meant to be a slow and spiritual.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/collaborate"
                  className="inline-block font-sans text-xs tracking-[0.2em] uppercase border-b border-foreground pb-1 hover:border-foreground/50 transition-all duration-500"
                >
                  Join Our Community
                </Link>
                <Link
                  to="/slow-life"
                  className="inline-block font-sans text-xs tracking-[0.2em] uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-all duration-500"
                >
                  Discover Slow Life
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={woodTexture}
                alt="Traditional Kathkuni architecture detail"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Kathkuni Heritage */}
      <section className="py-14 md:py-24 px-5 md:px-12 bg-secondary/50">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Kathkuni Architecture
            </p>
            <h2 className="font-serif text-3xl md:text-5xl italic leading-[1.2] mb-8">
              "A 1,000-year-old building technique, still standing, now hosting."
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4">
              Kathkuni is the traditional wood-and-stone construction of the Western Himalayas.
              Alternating layers of deodar cedar and local stone, interlocked without cement,
              creating walls 700mm thick that have survived earthquakes for a millennium.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Every element represents unique cultural and ecological harmony — a living testament
              to sustainable design principles that modern architecture is only beginning to rediscover.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Accommodation Options */}
      <section className="py-16 md:py-28 px-5 md:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 text-center">
              Where to Stay
            </p>
            <h2 className="font-serif text-2xl md:text-4xl text-center mb-10 md:mb-16">
              Choose your experience.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Kathkuni House",
                subtitle: "Full villa rental with 2 duplex suites and 2 deluxe rooms. Exclusive chef and staff service.",
                img: entireKathkuniVilla,
                link: "/stays",
                guests: "6-16 guests",
              },
              {
                title: "Duplex Suites",
                subtitle: "Two-level signature suites with panoramic views, stone hot tub, fireplace, and kitchenette.",
                img: summerGoldSuite,
                link: "/stays",
                guests: "2-4 guests",
              },
              {
                title: "Attic Rooms",
                subtitle: "Cozy double rooms with queen bed, attached bath, and mountain or garden views.",
                img: springGreenRoom,
                link: "/stays",
                guests: "2 guests",
              },
            ].map((tier, i) => (
              <ScrollReveal key={tier.title} delay={i * 0.15}>
                <Link to={tier.link} className="group block">
                  <div className="aspect-[3/4] overflow-hidden mb-5">
                    <img
                      src={tier.img}
                      alt={tier.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                    {tier.guests}
                  </p>
                  <h3 className="font-serif text-xl md:text-2xl mb-2">{tier.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {tier.subtitle}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-12">
              <Link
                to="/stays"
                className="inline-block font-sans text-xs tracking-[0.2em] uppercase border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-all duration-500"
              >
                View All Stays
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Experience Highlights */}
      <section className="py-14 md:py-24 px-5 md:px-12 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Experiences
            </p>
            <h2 className="font-serif text-3xl md:text-4xl mb-12">
              Immerse yourself in local culture.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Village Cultural & Heritage Tours",
                description: "Explore temple tours, architectural walks, and timeless Kathkuni craftsmanship.",
                img: expCultural,
              },
              {
                title: "Farm-to-Table Cooking",
                description: "Prepare meals using fresh farm ingredients and create wood-fired pizzas.",
                img: expCooking,
              },
              {
                title: "Snowline Hikes & Meadow Retreat",
                description: "Trek through crisp mountain air to breathtaking alpine landscapes.",
                img: expHikes,
              },
              {
                title: "Stargazing & Night Camping",
                description: "Lie beneath a sky ablaze with stars, warmed by the crackling campfire.",
                img: expStargazing,
              },
              {
                title: "Forest Walks & Hidden Trails",
                description: "Discover secret trails that lead to breathtaking views through forested areas.",
                img: expForest,
              },
              {
                title: "Shepherd Cafe & Dining",
                description: "Local Himachali, Mediterranean, and Asian cuisine with farm-to-table freshness.",
                img: dining1,
              },
            ].map((exp, i) => (
              <ScrollReveal key={exp.title} delay={i * 0.1}>
                <Link to="/experiences" className="group block">
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img
                      src={exp.img}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-serif text-lg mb-2 group-hover:text-primary transition-colors">{exp.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-12">
              <Link
                to="/experiences"
                className="inline-block font-sans text-xs tracking-[0.2em] uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-all duration-500"
              >
                Explore All Experiences
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-28 px-5 md:px-12 bg-secondary/50 text-center">
        <ScrollReveal>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Get Involved
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl italic mb-6 md:mb-8">
            Be part of a community rethinking rural living.
          </h2>
          <p className="font-sans text-base text-muted-foreground max-w-xl mx-auto mb-8">
            Whether you want to volunteer, collaborate on creative projects, or simply experience
            conscious travel — there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/collaborate"
              className="inline-block font-sans text-xs tracking-[0.2em] uppercase bg-foreground text-background px-8 py-4 hover:bg-foreground/90 transition-all duration-500"
            >
              Volunteer & Collaborate
            </Link>
            <Link
              to="/shepherd-magazine"
              className="inline-block font-sans text-xs tracking-[0.2em] uppercase border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-all duration-500"
            >
              Read Shepherd Magazine
            </Link>
          </div>
          <p className="font-sans text-sm text-muted-foreground mt-6">
            <Link to="/stays" className="underline hover:text-foreground transition-colors">
              Looking to book a stay?
            </Link>
          </p>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
    </PageTransition>
  );
};

export default Index;
