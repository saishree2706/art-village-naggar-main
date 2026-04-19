import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import BookingCalendar from "@/components/BookingCalendar";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/the-house-room.jpg";
import kathkuniWall from "@/assets/kathkuni-wall.jpg";
import fireStove from "@/assets/fire-stove.jpg";
import woodTexture from "@/assets/wood-texture.jpg";

const rooms = [
  {
    name: "The Kathkuni Suite",
    description:
      "The largest room. Original ceiling beams from the 1920s restoration. The walls are 700mm of interlocking deodar and stone. In January, when it's minus 8 outside, this room stays warm without a heater. That's not insulation. That's Kathkuni.",
    details: "Sleeps 2 · Private bathroom · Mountain view · Fire stove",
    price: "₹4,500 / night",
    img: heroImg,
  },
  {
    name: "The Stone Room",
    description:
      "Ground floor. Stone walls on three sides. The room is cool in summer, warm in winter. Furniture made from forest waste by a carpenter in the next village. The bed frame is reclaimed bridge wood — it crossed a river for forty years before it held you.",
    details: "Sleeps 2 · Shared bathroom · Garden access",
    price: "₹3,500 / night",
    img: kathkuniWall,
  },
  {
    name: "The Attic",
    description:
      "Top floor, under the original slate roof. Low ceilings, exposed joinery, a single window framing the valley. For people who want to be close to the structure itself — to hear the wood creak when the temperature drops.",
    details: "Sleeps 2 · Private bathroom · Valley view",
    price: "₹3,500 / night",
    img: woodTexture,
  },
];

const TheHouse = () => {
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
          <img src={heroImg} alt="Kathkuni room interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/30" />
        </motion.div>
        <div className="relative z-10 flex flex-col justify-end h-full pb-16 px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-background/60 mb-4"
          >
            Premium Rooms
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl text-background font-normal"
          >
            The House
          </motion.h1>
        </div>
      </section>

      {/* Architectural story */}
      <section className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
              The Architecture
            </p>
            <h2 className="font-serif text-2xl md:text-3xl leading-[1.4] mb-8">
              The walls are 700mm thick. In January, when it's minus 8 outside, the room stays warm
              without a heater. That's not insulation. That's Kathkuni.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
              Kathkuni buildings survived the 1905 Kangra earthquake that flattened everything around
              them. The British surveyors couldn't explain it. The villagers could — they'd been
              building this way for a thousand years. Alternating layers of deodar cedar and local
              stone, interlocked without mortar, the structure flexes rather than fractures.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              Every room in The House is a conversation with this technique. The furniture is made
              from forest waste — fallen trees, discarded planks, bridge wood. 90% recycled
              materials. Not as a sustainability gesture, but because the mountain provides what the
              mountain provides, and a good designer uses what's there.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Rooms */}
      {rooms.map((room, i) => (
        <section key={room.name} className={`py-16 md:py-24 px-6 md:px-12 ${i % 2 === 1 ? "bg-secondary/30" : ""}`}>
          <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
            <ScrollReveal direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`${i % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={room.img} alt={room.name} className="w-full h-full object-cover" />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction={i % 2 === 0 ? "right" : "left"}>
              <div className={`${i % 2 === 1 ? "md:order-1" : ""}`}>
                <h3 className="font-serif text-2xl md:text-3xl mb-6">{room.name}</h3>
                <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
                  {room.description}
                </p>
                <p className="font-sans text-sm text-muted-foreground/70 mb-4">{room.details}</p>
                <p className="font-serif text-xl">{room.price}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      {/* Availability & Booking */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Availability
            </p>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Book your stay</h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-12 max-w-xl">
              We keep it simple. Check what's available, tell us your dates, and we'll confirm
              within 24 hours. No algorithms, no dynamic pricing. Just honest availability.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <BookingCalendar propertyName="The House" />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
    </PageTransition>
  );
};

export default TheHouse;
