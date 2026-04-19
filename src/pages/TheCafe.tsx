import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/cafe-food.jpg";
import cafeSpace from "@/assets/cafe-space.jpg";
import makerHands from "@/assets/cafe-maker-hands.jpg";
import seasonalProduce from "@/assets/cafe-seasonal-produce.jpg";
import fireStove from "@/assets/fire-stove.jpg";
import blogFood from "@/assets/blog-food.jpg";

const makers = [
  {
    name: "Kamla Devi",
    role: "The siddu maker",
    story:
      "Her grandmother taught her mother. Her mother taught her. Three generations of the same dough, the same stuffing — poppy seed and walnut paste, hand-ground. Kamla Devi doesn't measure. She knows.",
  },
  {
    name: "Thakur Ji",
    role: "Two houses down",
    story:
      "Grows the black gram that becomes babru. His field is a ten-minute walk from the cafe kitchen. The distance between harvest and plate is measured in footsteps, not supply chains.",
  },
  {
    name: "Raman",
    role: "The cook",
    story:
      "Raman doesn't call himself a chef. He cooks. He knows when the turmeric in the garden is ready. He knows which wood burns cleanest for the tandoor. He learned by watching, not studying.",
  },
];

const seasons = [
  {
    name: "Winter",
    months: "Dec — Feb",
    description:
      "Root vegetables, preserved greens, slow-cooked dal. The fire stove runs all day. The food is heavier, warmer, built for minus 8. Chai appears without asking.",
  },
  {
    name: "Spring",
    months: "Mar — May",
    description:
      "Wild garlic from the forest floor. First nettles. Fresh greens that haven't been available for four months. The kitchen lightens. So does the menu.",
  },
  {
    name: "Summer",
    months: "Jun — Aug",
    description:
      "Everything grows. Tomatoes, beans, squash from the garden. Wild mushrooms after the rain. Trout from the Beas when the river is generous. The most abundant season.",
  },
  {
    name: "Autumn",
    months: "Oct — Nov",
    description:
      "Apple harvest. Walnut harvest. Aktori for Dussehra. The food becomes ceremonial, celebratory. Golden light on the table. The last outdoor meals before winter.",
  },
];

const TheCafe = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <PageTransition>
    <main className="bg-background overflow-x-hidden">
      <Navigation />

      {/* Hero */}
      <section ref={heroRef} className="relative h-[85dvh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={heroImg} alt="Food on wooden table by the fire" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/30" />
        </motion.div>
        <div className="relative z-10 flex flex-col justify-end h-full pb-16 px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-background/60 mb-4"
          >
            Open to all
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl text-background font-normal"
          >
            The Cafe
          </motion.h1>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-5xl italic leading-[1.3] mb-8">
              "Everything on this menu walked here, grew here, or was made by someone whose name we know."
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
              This is not a restaurant. It's a kitchen that opens its table. The food here doesn't
              arrive in trucks — it walks down from the forest, grows in the garden behind the building,
              or comes from a neighbour two houses away. Every ingredient has a name attached to it.
              Not a brand name. A person's name.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              The cafe is the public heart of Art Village. You don't need to be a guest to eat here.
              Walk up the hill, sit at a wooden table, and eat food that comes from the mountain
              and the people on it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* The Space — full bleed image + text */}
      <section className="px-6 md:px-12 pb-24 md:pb-36">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <ScrollReveal>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={cafeSpace} alt="The cafe interior — morning light, wooden tables, fire stove" className="w-full h-full object-cover" />
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
                Reclaimed wood tables. Wabi-sabi furniture made from forest waste. A fire stove that
                runs from November to March. The view from the window is the same one the village
                has watched for centuries — the valley, the river, the far ridge.
              </p>
              <p className="font-sans text-base text-muted-foreground leading-relaxed">
                Guests, locals, passing travellers — they share the same tables. There's no
                separate dining room. No reservation system. You arrive, you sit, the chai appears.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Makers */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              The Makers
            </p>
            <h2 className="font-serif text-3xl md:text-4xl mb-6 max-w-xl">
              The food has names. So do the people behind it.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mt-16 items-start">
            <ScrollReveal>
              <div className="aspect-[3/4] overflow-hidden">
                <img src={makerHands} alt="Hands kneading dough" className="w-full h-full object-cover" />
              </div>
            </ScrollReveal>
            <div className="space-y-10">
              {makers.map((maker, i) => (
                <ScrollReveal key={maker.name} delay={i * 0.1}>
                  <div className="border-b border-border/50 pb-8">
                    <h3 className="font-serif text-xl mb-1">{maker.name}</h3>
                    <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                      {maker.role}
                    </p>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      {maker.story}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Eating */}
      <section className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <ScrollReveal>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  Seasonal Eating
                </p>
                <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-[1.3]">
                  The mountain writes the menu. We just cook it.
                </h2>
                <p className="font-sans text-base text-muted-foreground leading-relaxed mb-12">
                  There is no fixed menu. What's served depends on what's growing, what's been
                  foraged, what the season allows. The menu is a conversation between the kitchen
                  and the mountain.
                </p>
              </ScrollReveal>

              <div className="space-y-8">
                {seasons.map((season, i) => (
                  <ScrollReveal key={season.name} delay={i * 0.1}>
                    <div>
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3 className="font-serif text-lg">{season.name}</h3>
                        <span className="font-sans text-xs text-muted-foreground tracking-wider">
                          {season.months}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                        {season.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <ScrollReveal delay={0.2}>
              <div className="aspect-[3/4] overflow-hidden md:mt-16">
                <img
                  src={seasonalProduce}
                  alt="Seasonal produce from the mountain"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Fire stove + food strip */}
      <section className="pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
          <ScrollReveal>
            <div className="aspect-[16/10] overflow-hidden">
              <img src={fireStove} alt="The fire stove — centre of winter life" className="w-full h-full object-cover" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="aspect-[16/10] overflow-hidden">
              <img src={blogFood} alt="Evening meal by the fire" className="w-full h-full object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Closing */}
      <section className="py-24 md:py-32 px-6 md:px-12 text-center">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-5xl italic mb-6 max-w-2xl mx-auto leading-[1.3]">
            The chai is always on. Always.
          </h2>
          <p className="font-sans text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Walk up the hill. Sit down. You don't need a reservation.
            You don't need to be a guest. You just need to be hungry.
          </p>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
    </PageTransition>
  );
};

export default TheCafe;
