import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { SITE_URL } from "@/lib/seo";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { EASING, HERO_TIMING } from "@/lib/animations";
// Dining images
import dining1 from "@/assets/dining/dining 1.avif";
import dining2 from "@/assets/dining/dining 2.avif";
import dining4 from "@/assets/dining/dining 4.avif";
// Food images
import foodTrout from "@/assets/Food/Trout Fish.jpg";
import foodSiddu from "@/assets/Food/Siddu.jpg";
import foodLingad from "@/assets/Food/Lingad ki Sabji.jpg";
import foodKhichdi from "@/assets/Food/Khichidi.jpg";
import foodBread from "@/assets/Food/Bread.jpeg";
import foodPadThai from "@/assets/Food/Pad Thai Noodles.jpg";
import foodRajma from "@/assets/Food/Rajma Chawal.jpg";
import foodPasta from "@/assets/Food/White Sauce Pasta.jpg";
import foodPoha from "@/assets/Food/Indore Poha.jpg";

const cuisineTypes = [
  {
    name: "Local Himachali",
    description: "Traditional recipes passed down through generations — siddu, babru, aktori, and seasonal mountain delicacies.",
  },
  {
    name: "Mediterranean",
    description: "Fresh, simple flavors that complement our mountain setting — wood-fired pizzas, fresh pastas, and grilled dishes.",
  },
  {
    name: "Asian",
    description: "Pan-Asian influences with local ingredients — warming broths, fresh preparations, and comfort foods.",
  },
];

const menuHighlights = [
  { name: "Freshly Grilled Trout", description: "From the Beas river, prepared over wood fire", image: foodTrout },
  { name: "Ghee Siddu", description: "Traditional steamed bread with walnut-poppy seed filling", image: foodSiddu },
  { name: "Lingad ki Sabji", description: "Foraged fern shoots in seasonal preparation", image: foodLingad },
  { name: "Local Rice Khichdi", description: "Comfort food made with mountain-grown rice and lentils", image: foodKhichdi },
  { name: "Fresh Baked Bread", description: "Daily bread from our wood-fired oven", image: foodBread },
  { name: "Pad Thai Noodles", description: "Rice noodles tossed with mountain vegetables and house tamarind sauce", image: foodPadThai },
  { name: "Rajma Chawal", description: "Slow-cooked red kidney beans with mountain-grown rice", image: foodRajma },
  { name: "White Sauce Pasta", description: "Creamy pasta with seasonal vegetables and fresh herbs", image: foodPasta },
  { name: "Indore Poha", description: "Flattened rice with roasted peanuts, mustard, and fresh coriander", image: foodPoha },
];

const Dining = () => {
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
          { name: "Dining", url: `${SITE_URL}/dining` },
        ]}
      />
      <main className="bg-background overflow-x-hidden">
        <Navigation />

        {/* Hero */}
        <section ref={heroRef} className="relative h-[85dvh] overflow-hidden">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img src={dining1} alt="Shepherd Cafe dining" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-foreground/40" />
          </motion.div>
          <div className="relative z-10 flex flex-col justify-end h-full pb-12 md:pb-16 px-5 md:px-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: HERO_TIMING.tagline.delay, duration: HERO_TIMING.tagline.duration, ease: EASING }}
              className="font-sans text-xs tracking-[0.3em] uppercase text-background/60 mb-4"
            >
              Farm to Table
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: HERO_TIMING.heading.delay, duration: HERO_TIMING.heading.duration, ease: EASING }}
              className="font-serif text-4xl sm:text-5xl md:text-7xl text-background font-normal"
            >
              Shepherd Cafe
              <span className="hidden md:inline"><br /></span>
              <span className="inline md:hidden"> </span>
              & Dining Hall
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: HERO_TIMING.description.delay, duration: HERO_TIMING.description.duration, ease: EASING }}
              className="font-sans text-base text-background/70 mt-4 max-w-xl"
            >
              A blend of casual and traditional Himachali dining.
            </motion.p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 md:py-36 px-5 md:px-12">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="font-serif text-3xl md:text-5xl italic leading-[1.3] mb-8">
                "Everything on this menu walked here, grew here, or was made by someone whose name we know."
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
                The Shepherd Cafe is the heart of ART Village — a gathering place where guests,
                locals, and travelers share tables and meals. Our kitchen operates with fresh
                ingredients and emphasizes traditional cooking methods, including wood-fired
                preparation techniques passed down through generations.
              </p>
              <p className="font-sans text-base text-muted-foreground leading-relaxed">
                We believe in food that tells a story. Every ingredient has a name attached to it —
                not a brand name, but a person's name. The farmer who grew it, the forager who
                found it, the cook who prepared it.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Cuisine Types */}
        <section className="py-14 md:py-24 px-5 md:px-12 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 text-center">
                Our Cuisine
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-center mb-10 md:mb-16">
                Three culinary traditions, one table.
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
              {cuisineTypes.map((cuisine, i) => (
                <ScrollReveal key={cuisine.name} delay={i * 0.15}>
                  <div className="text-center">
                    <h3 className="font-serif text-xl md:text-2xl mb-4">{cuisine.name}</h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      {cuisine.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* The Space */}
        <section className="py-16 md:py-36 px-5 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center">
            <ScrollReveal>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={dining2} alt="The cafe interior" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  The Space
                </p>
                <h3 className="font-serif text-2xl md:text-3xl mb-6 leading-[1.3]">
                  Where the village sits down together.
                </h3>
                <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
                  Reclaimed wood tables. Furniture made from forest waste. A fire stove that runs
                  from November to March. The view from the window is the same one the village has
                  watched for centuries — the valley, the river, the far ridge.
                </p>
                <p className="font-sans text-base text-muted-foreground leading-relaxed">
                  The cafe accommodates both casual dining and larger group meals through our
                  dining hall setup. You don't need to be a guest to eat here — walk up the hill,
                  sit down, and the chai will appear.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Menu Highlights */}
        <section className="py-14 md:py-24 px-5 md:px-12 bg-secondary/50">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Signature Offerings
              </p>
              <h2 className="font-serif text-3xl md:text-4xl mb-10 md:mb-16 leading-[1.3]">
                From our kitchen.
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {menuHighlights.map((item, i) => (
                <ScrollReveal key={item.name} delay={i * 0.06}>
                  <div>
                    <div className="aspect-[4/5] overflow-hidden mb-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-serif text-base md:text-lg leading-[1.2] mb-1">{item.name}</h3>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.3}>
              <div className="mt-10 md:mt-14">
                <a
                  href="https://art12.ola.click/products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-all duration-500"
                >
                  View Full Menu <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Farm to Table Process */}
        <section className="py-16 md:py-36 px-5 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <ScrollReveal>
              <div className="aspect-[3/4] overflow-hidden">
                <img src={dining1} alt="Hands preparing food" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  Our Approach
                </p>
                <h3 className="font-serif text-2xl md:text-3xl mb-6 leading-[1.3]">
                  The food has names. So do the people behind it.
                </h3>
                <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
                  The vegetables come from the garden behind the building or from neighbors
                  two houses away. The trout comes from the river. The wild greens come from
                  the forest above the village, foraged by people who have walked these paths
                  their whole lives.
                </p>
                <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
                  There is no fixed menu. What's served depends on what's growing, what's been
                  foraged, what the season allows. The menu is a conversation between the
                  kitchen and the mountain.
                </p>
                <p className="font-sans text-base text-muted-foreground leading-relaxed">
                  We emphasize wood-fired cooking because that's how food has been prepared
                  here for generations. The smoke, the char, the slow heat — these are flavors
                  you can't replicate with modern methods.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Image Strip */}
        <section className="pb-6 md:pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 px-3 md:px-4">
            <ScrollReveal>
              <div className="aspect-[16/10] overflow-hidden">
                <img src={dining2} alt="The fire stove" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="aspect-[16/10] overflow-hidden">
                <img src={dining4} alt="Evening meal by the fire" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-16 md:py-32 px-5 md:px-12 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-5xl italic mb-6 max-w-2xl mx-auto leading-[1.3]">
              The chai is always on. Always.
            </h2>
            <p className="font-sans text-base text-muted-foreground max-w-lg mx-auto leading-relaxed mb-8">
              Walk up the hill. Sit down. You don't need a reservation.
              You don't need to be a guest. You just need to be hungry.
            </p>
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

export default Dining;
