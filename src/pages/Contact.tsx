import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { LocalBusinessSchema } from "@/components/StructuredData";
import { EASING, HERO_TIMING } from "@/lib/animations";
import howToReachImg from "@/assets/how-to-reach.jpg";

// Sanitize input to prevent XSS
const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const sanitizedName = sanitizeInput(formData.name).slice(0, 100);
    const sanitizedEmail = sanitizeInput(formData.email).slice(0, 100);
    const sanitizedMessage = sanitizeInput(formData.message).slice(0, 2000);

    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      setFormStatus("error");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setFormStatus("error");
      return;
    }

    // Form is valid - in production, send to backend API
    // For now, open WhatsApp with the message
    const whatsappMessage = `Name: ${sanitizedName}%0AEmail: ${sanitizedEmail}%0AMessage: ${sanitizedMessage}`;
    window.open(`https://wa.me/919816650400?text=${whatsappMessage}`, "_blank");

    setFormData({ name: "", email: "", message: "" });
    setFormStatus("success");
  };

  return (
    <PageTransition>
      <SEO />
      <LocalBusinessSchema />
    <main className="bg-background overflow-x-hidden">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[50dvh] md:h-[70dvh] overflow-hidden">
        <img
          src={howToReachImg}
          alt="Mountain road leading to Chachogi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: HERO_TIMING.tagline.delay, duration: HERO_TIMING.tagline.duration, ease: EASING }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-background/60 mb-4"
          >
            Contact & Directions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: HERO_TIMING.heading.delay, duration: HERO_TIMING.heading.duration, ease: EASING }}
            className="font-serif text-3xl sm:text-4xl md:text-6xl text-background leading-[1.15]"
          >
            The road ends here.
            <span className="hidden md:inline"><br /></span>
            <span className="inline md:hidden"> </span>
            The story begins.
          </motion.h1>
        </div>
      </section>

      {/* How to Reach */}
      <section className="py-16 md:py-32 px-5 md:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              How to reach
            </p>
            <h2 className="font-serif text-3xl md:text-4xl mb-10 md:mb-16">
              Getting to Chachogi
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <ScrollReveal delay={0.1}>
              <div>
                <h3 className="font-serif text-xl mb-4">By Air</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-3">
                  Fly to <strong>Bhuntar Airport (KUU)</strong>, Kullu — the nearest airport, 28 km from Naggar.
                </p>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  Daily flights from Delhi (1 hr). From Bhuntar, hire a taxi to Naggar (45 min),
                  then continue 4 km uphill to Chachogi village. We can arrange pickup.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <h3 className="font-serif text-xl mb-4">By Road</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-3">
                  <strong>From Delhi:</strong> 12 hours via Chandigarh–Mandi–Kullu (530 km).
                  Overnight Volvo buses run Delhi–Manali daily.
                </p>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  <strong>From Manali:</strong> 22 km south along the left bank road.
                  Don't cross to the highway side. The narrow road is the point.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div>
                <h3 className="font-serif text-xl mb-4">The Last 4 km</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-3">
                  From Naggar town, the road climbs through apple orchards and deodar forest
                  to Chachogi. The road is narrow — this is intentional, not a problem.
                </p>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  We're the last house on the road. When the road ends, you've arrived.
                  <strong> GPS: 32.1312° N, 77.1734° E</strong>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-14 md:py-28 px-5 md:px-12 bg-secondary/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Contact details */}
          <ScrollReveal>
            <div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Get in touch
              </p>
              <h2 className="font-serif text-3xl mb-10">
                The chai will be on.
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-sm text-foreground mb-1">Location</p>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      Chachogi Village, 4 km above Naggar<br />
                      Kullu Valley, Himachal Pradesh 175130<br />
                      India · 2,300 metres
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-sm text-foreground mb-1">Phone</p>
                    <p className="font-sans text-sm text-muted-foreground">+91 98166 50400</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-sm text-foreground mb-1">Email</p>
                    <p className="font-sans text-sm text-muted-foreground">hello@artvillagenaggar.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-sm text-foreground mb-1">Best time to visit</p>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      Open year-round. Each season is a different experience.
                      Winter is the most intimate. Spring and autumn are the most gentle.
                      Summer and monsoon are the most alive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact form */}
          <ScrollReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div>
                <label className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div>
                <label className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 font-sans text-sm text-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="font-sans text-xs tracking-[0.2em] uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-all duration-500"
              >
                Send message
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Embedded Map */}
      <section className="h-[280px] md:h-[500px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3377.5!2d77.1734!3d32.1312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDA3JzUyLjMiTiA3N8KwMTAnMjQuMiJF!5e0!3m2!1sen!2sin!4v1700000000000"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(0.8) contrast(1.1)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="ART - Adaptive Rural Tourism location"
        />
      </section>

      <Footer />
    </main>
    </PageTransition>
  );
};

export default Contact;
