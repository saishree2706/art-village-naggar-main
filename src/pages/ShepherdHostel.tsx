import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import BookingCalendar from "@/components/BookingCalendar";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/shepherd-hostel.jpg";
import villagePath from "@/assets/village-path.jpg";

const ShepherdHostel = () => {
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
          <img src={heroImg} alt="Shepherd Hostel dorm" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/30" />
        </motion.div>
        <div className="relative z-10 flex flex-col justify-end h-full pb-16 px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-background/60 mb-4"
          >
            Dorm &middot; From ₹800/night
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl text-background font-normal"
          >
            The Shepherd Hostel
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl italic leading-[1.3] mb-8">
              "The cheapest bed in a 1,000-year-old tradition."
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
              This is not a budget compromise. It's a philosophical position. Heritage preservation
              should be accessible to a 22-year-old with a backpack. The Shepherd Hostel exists
              because Kathkuni shouldn't be a rich person's novelty — it should be something
              anyone can sleep in, learn from, and carry forward.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
              Shared sleeping. Shared meals. Radical simplicity. You eat what the house eats.
              You help if you want to. You learn the names of the people who built these walls.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-secondary/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <ScrollReveal>
            <div className="aspect-[4/5] overflow-hidden">
              <img src={villagePath} alt="Path to the hostel" className="w-full h-full object-cover" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div>
              <h3 className="font-serif text-2xl mb-6">What you get</h3>
              <div className="space-y-4 font-sans text-base text-muted-foreground leading-relaxed">
                <p>A bed in a shared dorm. 6 beds per room. Clean linen, warm blankets.</p>
                <p>Shared bathroom with hot water — heated by the sun and, in winter, by wood fire.</p>
                <p>Access to the common room with the fire stove. This is where stories happen.</p>
                <p>Shared meals available — dal, rice, sabzi, roti. What the mountain provides.</p>
                <p>The same village, the same architecture, the same stars.</p>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <p className="font-serif text-2xl mb-2">₹800 / night</p>
                <p className="font-sans text-sm text-muted-foreground">Per person, per night. Meals extra.</p>
              </div>

              <a
                href="mailto:hello@artvillagenaggar.com?subject=Booking Inquiry — Shepherd Hostel"
                className="inline-block mt-8 font-sans text-xs tracking-[0.2em] uppercase border border-foreground/20 px-8 py-4 hover:bg-foreground hover:text-background transition-all duration-500"
              >
                Send an inquiry
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Availability & Booking */}
      <section className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Availability
            </p>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Reserve a bed</h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-12 max-w-xl">
              Check what's available, send us your dates. We'll confirm within 24 hours.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <BookingCalendar propertyName="The Shepherd Hostel" />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
    </PageTransition>
  );
};

export default ShepherdHostel;
