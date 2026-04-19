import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASING, HERO_TIMING } from "@/lib/animations";
// Slow Life images
import heroImage from "@/assets/slow-life/img_3840.jpg";
import consciousTravel from "@/assets/slow-life/20260220-P1034047.jpg";
import therapeuticRelax from "@/assets/slow-life/20241011_183347_060.jpg";
import contextualLifestyle from "@/assets/slow-life/slow life 1.jpg";
import villageView from "@/assets/slow-life/slow life 2.jpg";

const pillars = [
  {
    title: "Conscious Travel",
    description:
      "Travel that goes beyond sightseeing. Immerse yourself in local culture, gain insights, and engage in meaningful interactions with the community. Every journey here is an opportunity for personal growth and connection.",
    img: consciousTravel,
  },
  {
    title: "Therapeutic Relaxation",
    description:
      "Let the mountains heal you. From yoga sessions in traditional wooden houses to forest walks and stargazing, we offer experiences designed to restore your mind, body, and spirit in the embrace of nature.",
    img: therapeuticRelax,
  },
  {
    title: "Contextual Lifestyle",
    description:
      "Live as the village lives. Learn traditional crafts, cook with local ingredients, wear traditional Kullu dress, and participate in village customs. Experience a lifestyle that has evolved in harmony with these mountains for generations.",
    img: contextualLifestyle,
  },
];

const SlowLife = () => {
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
        <section ref={heroRef} className="relative h-screen min-h-[100dvh] overflow-hidden">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img
              src={heroImage}
              alt="Forest light through deodar trees"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/40" />
          </motion.div>
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] text-center px-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: HERO_TIMING.tagline.delay, duration: HERO_TIMING.tagline.duration, ease: EASING }}
              className="font-sans text-xs tracking-[0.3em] uppercase text-background/60 mb-6"
            >
              A Different Way to Travel
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: HERO_TIMING.heading.delay, duration: HERO_TIMING.heading.duration, ease: EASING }}
              className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-background font-normal italic leading-[1.1]"
            >
              Slow Life<br />Staycation
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: HERO_TIMING.description.delay, duration: HERO_TIMING.description.duration, ease: EASING }}
              className="mt-8 font-sans text-base md:text-lg text-background/70 max-w-xl"
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
                className="inline-block font-sans text-xs tracking-[0.2em] uppercase bg-background text-foreground px-8 py-4 hover:bg-background/90 transition-all duration-700"
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
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-36 px-5 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-serif text-3xl md:text-5xl italic leading-[1.2] mb-8">
                "Embrace a responsible way of traveling at a slow, leisurely pace."
              </h2>
              <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
                In a world that moves too fast, we invite you to slow down. A Slow Life Staycation
                at ART is not about escaping reality — it's about discovering a
                more meaningful way to experience it.
              </p>
              <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Here, you'll immerse yourself in local culture, gain insights from generations of
                mountain wisdom, and engage in meaningful interactions with our community. This is
                travel that transforms.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="py-14 md:py-24 px-5 md:px-12 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 text-center">
                Our Philosophy
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-center mb-10 md:mb-16">
                The Three Pillars of Slow Living
              </h2>
            </ScrollReveal>

            <div className="space-y-16 md:space-y-32">
              {pillars.map((pillar, i) => (
                <ScrollReveal key={pillar.title}>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={pillar.img}
                        alt={pillar.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                      <h3 className="font-serif text-2xl md:text-3xl mb-6">{pillar.title}</h3>
                      <p className="font-sans text-base text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* The Setting */}
        <section className="py-14 md:py-28 px-5 md:px-12 bg-secondary/50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <ScrollReveal>
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={villageView}
                  alt="Chachogi village view"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  The Setting
                </p>
                <h3 className="font-serif text-2xl md:text-3xl mb-6 leading-[1.3]">
                  Chachogi Village — Where Time Moves Differently
                </h3>
                <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
                  Perched at 2,300 meters in the Kullu Valley, Chachogi is a village of just 20 houses,
                  one road, and no concrete. Here, the rhythms of daily life are set by the sun,
                  the seasons, and centuries of mountain wisdom.
                </p>
                <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
                  Surrounded by deodar forests and snow-capped peaks, this is a place where you can
                  truly disconnect from the noise of modern life and reconnect with what matters.
                </p>
                <p className="font-sans text-base text-muted-foreground leading-relaxed">
                  The village temple, the local devta, the communal spaces — every element of life
                  here reflects a deep harmony between people, culture, and landscape.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-16 md:py-36 px-5 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-serif text-3xl md:text-5xl italic leading-[1.2] mb-8">
                "The best things in life are not rushed."
              </h2>
              <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                A Slow Life Staycation is an invitation to rediscover the pleasure of unhurried mornings,
                the joy of meals shared around a fire, the wonder of a sky full of stars, and the
                peace that comes from being truly present.
              </p>
              <Link
                to="/stays"
                className="inline-block font-sans text-xs tracking-[0.2em] uppercase border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-all duration-500"
              >
                Begin Your Journey
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-36 px-5 md:px-12 bg-foreground text-background text-center">
          <ScrollReveal>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-background/60 mb-6">
              Ready to Slow Down?
            </p>
            <h2 className="font-serif text-3xl md:text-5xl italic mb-8">
              Be part of our community.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/collaborate"
                className="inline-block font-sans text-xs tracking-[0.2em] uppercase bg-background text-foreground px-8 py-4 hover:bg-background/90 transition-all duration-500"
              >
                Collaborate
              </Link>
              <Link
                to="/stays"
                className="inline-block font-sans text-xs tracking-[0.2em] uppercase border border-background px-8 py-4 hover:bg-background hover:text-foreground transition-all duration-500"
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

export default SlowLife;
