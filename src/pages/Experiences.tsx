import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { SITE_URL } from "@/lib/seo";
import { motion } from "framer-motion";
import { EASING, HERO_TIMING } from "@/lib/animations";
// Experience images
import expCultural from "@/assets/experiences/20260220-P1034047.jpg";
import expCooking from "@/assets/experiences/pizza.jpg";
import expHikes from "@/assets/experiences/cover_img.jpg";
import expStargazing from "@/assets/experiences/20190109-_DSC0741.jpg";
import expForest from "@/assets/experiences/IMG_20180918_165742.jpg";
import expCrafts from "@/assets/experiences/IMG_1378.jpg";
import expOutdoorCook from "@/assets/experiences/outdoor_cooking.jpg";
import expGameNight from "@/assets/experiences/game_night.jpeg";
import expDanceNight from "@/assets/experiences/dance_night.jpg";
import snowPhoto from "@/assets/experiences/snowline_trek.jpg";
import traditionalDanceNight from "@/assets/experiences/traditionalAttire.jpg";

const WHATSAPP_ENQUIRE_URL =
  "https://wa.me/919816650400?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20the%20Art%20Village%20Experience%20Package";
// TODO: Replace with the actual GetYourGuide listing URL once published
const GET_YOUR_GUIDE_URL = "https://www.getyourguide.com/en-gb/manali-himachal-pradesh-l32162/manali-chachogi-himachali-village-stay-culture-t932532/";

interface Experience {
  title: string;
  category: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
}

const experiences: Experience[] = [
  {
    title: "Village Cultural & Heritage Tours",
    category: "Cultural",
    tagline: "Timeless traditions",
    description:
      "Walk through temple courtyards and 100-year-old homes with our village hosts — stories, Kathkuni craft, and the slow tempo of Chachogi.",
    highlights: [
      "Temple and ceremonial spaces",
      "Walks through century-old homes",
      "Stories from village elders",
    ],
    image: expCultural,
  },
  {
    title: "Farm-to-Table Cooking & Wood-Fire Pizza",
    category: "Culinary",
    tagline: "Flavours that tell a story",
    description:
      "Cook alongside our village chef using farm produce. Traditional Himachali recipes and wood-fired pizzas straight from the oven.",
    highlights: [
      "Hands-on cooking with local ingredients",
      "Traditional Himachali recipes",
      "Wood-fired pizza making",
    ],
    image: expCooking,
  },
  {
    title: "Snowline Hikes & Meadow Retreat",
    category: "Outdoor",
    tagline: "Trek to breathtaking heights",
    description:
      "Guided treks from gentle morning walks to alpine meadow expeditions — snow, wildflowers, and silence, paced to suit you.",
    highlights: [
      "Chanderkhani Pass expedition",
      "Alpine meadow exploration",
      "Expert local guides",
    ],
    image: snowPhoto,
  },
  {
    title: "Stargazing & Night Camping",
    category: "Evening",
    tagline: "A sky ablaze with stars",
    description:
      "At 2,300 metres with almost no light pollution, the sky opens up. Bonfire, blankets, and the option to camp out till dawn.",
    highlights: [
      "Bonfire gatherings",
      "Night sky observation",
      "Optional overnight camping",
    ],
    image: expStargazing,
  },
  {
    title: "Forest Walks & Hidden Trails",
    category: "Outdoor",
    tagline: "Off the beaten path",
    description:
      "Quiet trails through deodar forests, led by people who grew up here. Hidden viewpoints, small waterfalls, and the smell of pine.",
    highlights: [
      "Guided forest meditation walks",
      "Wild plant identification",
      "Bird watching and viewpoints",
    ],
    image: expForest,
  },
  {
    title: "Traditional Crafts Workshop",
    category: "Crafts",
    tagline: "Learn from master artisans",
    description:
      "Sit with the artisans who restored Art Village. Learn how a Kathkuni joint holds without nails — just geometry and patience.",
    highlights: [
      "Kathkuni joinery demonstration",
      "Local weaving techniques",
      "Take home your creation",
    ],
    image: expCrafts,
  },
  {
    title: "Outdoor Cooking by the Fire",
    category: "Culinary",
    tagline: "Smoke, embers, slow simmers",
    description:
      "Cook over an open wood fire under the sky — siddu, slow curries, and roasted vegetables. Watch the embers settle as the evening turns slow.",
    highlights: [
      "Open-fire siddu and slow curries",
      "Iron tawa and clay-pot cooking",
      "Eat where you cook, under the sky",
    ],
    image: expOutdoorCook,
  },
  {
    title: "Game Night",
    category: "Evening",
    tagline: "Old games, easy laughter",
    description:
      "Local card games passed around with chai and pakoras. Easy evenings where strangers become friends.",
    highlights: [
      "Card games",
      "Hot chai and homemade snacks",
      "Open to all ages",
    ],
    image: expGameNight,
  },
  {
    title: "Dance Night Under the Stars",
    category: "Evening",
    tagline: "Naati rhythms and mountain music",
    description:
      "Join a Naati circle and let the music carry the night. Dancing together until the courtyard quiets down.",
    highlights: [
      "Naati and folk dance",
      "Traditional attire",
      "Live acoustic and folk music performances",
    ],
    image: traditionalDanceNight,
  },
  {
    title: "Bon Fire Storytelling & Music",
    category: "Evening",
    tagline: "Where mountain stories meet the warmth of the fire",
    description:
      "As the night settles over the valley, gather around the glowing bonfire for soulful folk music, timeless local stories, and heartfelt conversations under the stars.",
    highlights: [
      "Open storytelling",
      "Ancient tales and folklore from the Himalayas",
      "Singing and sharing around the fire",
    ],
    image: expDanceNight,
  },
];

const Experiences = () => {
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

        {/* Hero — cinematic single photo */}
        <section className="relative h-[88dvh] md:h-[92dvh] overflow-hidden">
          <motion.div
            initial={{ scale: 1.04 }}
            animate={{ scale: 1.12 }}
            transition={{ duration: 22, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={expHikes}
              alt="Snowline trek above Naggar village"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Vertical gradient — light at top, dark at bottom for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/10 via-foreground/30 to-foreground/80" />

          {/* Top centered badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: HERO_TIMING.tagline.delay, duration: HERO_TIMING.tagline.duration, ease: EASING }}
            className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 flex items-center gap-4"
          >
            <span className="h-px w-8 md:w-12 bg-background/50" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.35em] uppercase text-background/85 whitespace-nowrap">
              Immersive Experiences
            </span>
            <span className="h-px w-8 md:w-12 bg-background/50" />
          </motion.div>

          {/* Main content — bottom left */}
          <div className="relative z-10 flex flex-col justify-end h-full pb-20 md:pb-28 px-5 md:px-12">
            <div className="max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: HERO_TIMING.heading.delay, duration: HERO_TIMING.heading.duration, ease: EASING }}
                className="font-serif text-5xl sm:text-6xl md:text-8xl text-background font-normal leading-[1.02] tracking-tight"
              >
                Nine ways to{" "}
                <em className="italic font-light">slow down</em>.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: HERO_TIMING.description.delay, duration: HERO_TIMING.description.duration, ease: EASING }}
                className="font-sans text-base md:text-lg text-background/80 mt-6 max-w-xl leading-relaxed"
              >
                Step away from ordinary routines and connect with nature, local
                culture, and mountain landscapes.
              </motion.p>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8, ease: EASING }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
          >
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-background/60">
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="block h-8 w-px bg-background/50"
            />
          </motion.div>
        </section>

        {/* Experience Package CTA */}
        <section className="px-5 md:px-12 -mt-12 md:-mt-20 relative z-20">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto bg-background border border-foreground/10 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 md:gap-12 p-8 md:p-12 items-center">
                <div>
                  <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
                    Curated Experience Package
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-4">
                    The Art Village Sampler — Authentic Himachali Village Stay & Culture
                  </h2>
                  <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                    Escape Manali's crowds and discover Chachogi, a hidden Himalayan gem! Stay in a traditional Himachali home, savour local flavours, and immerse yourself in mountain culture for an authentic experience.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href={WHATSAPP_ENQUIRE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-center font-sans text-xs tracking-[0.2em] uppercase bg-foreground text-background px-8 py-4 hover:bg-foreground/90 transition-colors"
                  >
                    Enquire on WhatsApp
                  </a>
                  <a
                    href={GET_YOUR_GUIDE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-center font-sans text-xs tracking-[0.2em] uppercase border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
                  >
                    Book on GetYourGuide
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
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
          <div className="max-w-6xl mx-auto">
            {experiences.map((exp, i) => {
              const isFirst = i === 0;
              const isReversed = i % 2 === 1;
              return (
                <ScrollReveal key={exp.title}>
                  <article
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
                      isFirst ? "pt-0 mt-0" : "pt-14 md:pt-24 mt-14 md:mt-24 border-t border-foreground/10"
                    } ${isReversed ? "md:[direction:rtl]" : ""}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden group">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    <div className={isReversed ? "md:[direction:ltr]" : ""}>
                      {/* Numbered index + category */}
                      <div className="flex items-baseline gap-4 mb-7">
                        <span className="font-serif text-5xl md:text-6xl text-foreground/15 font-normal leading-none tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px flex-1 max-w-12 bg-foreground/15" />
                        <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground">
                          {exp.category}
                        </span>
                      </div>

                      <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                        {exp.tagline}
                      </p>
                      <h2 className="font-serif text-2xl md:text-3xl mb-5 leading-tight">
                        {exp.title}
                      </h2>
                      <p className="font-sans text-base text-muted-foreground leading-relaxed mb-7">
                        {exp.description}
                      </p>

                      <ul className="flex flex-wrap gap-x-3 gap-y-2">
                        {exp.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="font-sans text-xs tracking-wide text-muted-foreground/80 px-3 py-1.5 border border-foreground/15 rounded-full"
                          >
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
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
