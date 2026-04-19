import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASING, HERO_TIMING } from "@/lib/animations";
import kathkuniWall from "@/assets/our story/20260222-P1034301.jpg";
import heroImg from "@/assets/hero-home.jpg";
import villagePath from "@/assets/village-path.jpg";
import handsWorking from "@/assets/our story/20260222-P1034318.jpg";
import forestLight from "@/assets/forest-light.jpg";
import woodTexture from "@/assets/wood-texture.jpg";

const About = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <PageTransition>
      <SEO />
    <main className="bg-background overflow-x-hidden">
      <Navigation />

      {/* Hero */}
      <section ref={heroRef} className="relative h-[85dvh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={kathkuniWall} alt="Kathkuni wall construction" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/20" />
        </motion.div>
        <div className="relative z-10 flex flex-col justify-end h-full pb-12 md:pb-16 px-5 md:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: HERO_TIMING.tagline.delay, duration: HERO_TIMING.tagline.duration, ease: EASING }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-background/60 mb-4"
          >
            Our Heritage
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: HERO_TIMING.heading.delay, duration: HERO_TIMING.heading.duration, ease: EASING }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl text-background font-normal"
          >
            The Story
          </motion.h1>
        </div>
      </section>

      {/* Layer 1: The Disappearance */}
      <section className="py-16 md:py-36 px-5 md:px-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Chapter One
            </p>
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.3] mb-8">
              A 1,000-year-old building technique is dying.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
              Kathkuni is the traditional wood-and-stone construction method of the Western
              Himalayas. For a thousand years, villagers built homes by alternating layers of
              deodar cedar and local stone, interlocked without cement or mortar. These buildings
              breathe. They flex during earthquakes. They stay warm in minus-8 winters without
              heating.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
              In 1905, the Kangra earthquake — 7.8 magnitude — flattened concrete buildings
              across the region. The Kathkuni houses stood. British surveyors documented the
              anomaly but couldn't explain it. The villagers could. They'd been building this
              way since before the surveyors' country existed.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              Today, fewer than a handful of master builders know the technique. Concrete is
              cheaper, faster, and comes with government subsidies. Every year, another Kathkuni
              house is demolished and replaced with a concrete box. The knowledge is dying with
              the generation that holds it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Full-width image break */}
      <section className="px-5 md:px-12">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto aspect-[21/9] overflow-hidden">
            <img src={heroImg} alt="Light through Kathkuni window" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </ScrollReveal>
      </section>

      {/* Layer 2: The Restoration */}
      <section className="py-16 md:py-36 px-5 md:px-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Chapter Two
            </p>
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.3] mb-8">
              One designer decided to fight back — not with protest, but with beauty.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
              Vijyendra Thakur grew up in a Kathkuni house. He became a designer. He watched
              the houses around him disappear. Instead of documenting the loss, he decided to
              intervene.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
              He bought a crumbling Kathkuni structure in Chachogi and restored it. Not as a
              museum. Not as a preservation project. As a place where people pay to sleep. The
              logic: if the building technique generates income, it survives. If it survives
              as a living, useful thing — not a relic — people will keep building it.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              90% of the materials are recycled. The furniture is made from forest waste — fallen
              trees, discarded planks, old bridge wood. Imperfections are kept. The wabi-sabi
              philosophy isn't aesthetic; it's economic. Using what's there, honouring what's
              worn, building beauty from the mountain's own discards.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Hands image */}
      <section className="px-5 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScrollReveal>
            <div className="aspect-square overflow-hidden">
              <img src={handsWorking} alt="Artisan hands working wood" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="aspect-square overflow-hidden">
              <img src={woodTexture} alt="Wood and stone detail" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Layer 3: The Village */}
      <section className="py-16 md:py-36 px-5 md:px-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Chapter Three
            </p>
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.3] mb-8">
              Chachogi has 20 houses, a devta, and a grandmother who makes the best siddu
              you'll ever eat.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
              Art Village is not a compound. It's a house in a village. When you stay here,
              you enter a community. The path to your room passes other people's doors.
              The sounds you hear are chickens, children, and the wind through deodar.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
              Chachogi sits at 2,300 metres, 4 kilometres above Naggar, which was the
              capital of the Kullu Kingdom for 1,400 years. The village has its own devta —
              a local deity with a temple, a palanquin, and an annual procession during
              Kullu Dussehra, when 300 devtas from across the valley gather in one place.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              The people here know the names of the trees. They know which wood is for building,
              which is for burning, which is for medicine. They know when the snow will come
              and when the wildflowers will follow it. They know things that are worth knowing.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Village and forest images */}
      <section className="px-5 md:px-12 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScrollReveal>
            <div className="aspect-[4/5] overflow-hidden">
              <img src={villagePath} alt="Village path in morning fog" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="aspect-[4/5] overflow-hidden">
              <img src={forestLight} alt="Forest light through deodar" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vijyendra */}
      <section className="py-16 md:py-36 px-5 md:px-12 bg-secondary/30">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
              The Founder
            </p>
            <h2 className="font-serif text-3xl md:text-4xl italic leading-[1.3] mb-8">
              "I didn't want to save Kathkuni by putting it in a museum. I wanted to save it
              by making it useful."
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              — Vijyendra Thakur, designer and founder of ART
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
    </PageTransition>
  );
};

export default About;
