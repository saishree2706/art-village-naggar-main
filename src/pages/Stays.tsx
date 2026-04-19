import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import ImageCarousel from "@/components/ImageCarousel";
import SEO from "@/components/SEO";
import { AccommodationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { SITE_URL } from "@/lib/seo";
import { motion } from "framer-motion";
import { Users, Bed, Bath, Mountain, Flame, ExternalLink } from "lucide-react";
import { EASING, HERO_TIMING } from "@/lib/animations";

// Import images - Entire Kathkuni House
import entireKathkuniVilla from "@/assets/Entire Kathkuni House (6 Bedrooms)/Entire Kathkuni Villa.avif";

// Import images - Fall Maroon Attic Room
import fallMaroon1 from "@/assets/Fall Maroon Attic Room/Fall Maroon Attic Room 1.webp";
import fallMaroon2 from "@/assets/Fall Maroon Attic Room/Fall Maroon Attic Room 2.webp";
import fallMaroon4 from "@/assets/Fall Maroon Attic Room/Fall Maroon Attic Room 4.webp";

// Import images - Spring Green Attic Room
import springGreen1 from "@/assets/Spring Green Attic Room/Spring Green Attic Room 1.webp";
import springGreen2 from "@/assets/Spring Green Attic Room/Spring Green Attic Room  2.webp";
import springGreen3 from "@/assets/Spring Green Attic Room/Spring Green Attic Room  3.webp";
import springGreen4 from "@/assets/Spring Green Attic Room/Spring Green Attic Room  4.webp";
import springGreen5 from "@/assets/Spring Green Attic Room/Spring Green Attic Room  5.webp";
import springGreen7 from "@/assets/Spring Green Attic Room/Spring Green Attic Room  7.webp";

// Import images - Summer Gold Duplex Suite
import summerGold1 from "@/assets/Summer Gold Duplex Suite/Summer Gold Duplex Suite 1.webp";
import summerGold2 from "@/assets/Summer Gold Duplex Suite/Summer Gold Duplex Suite 2.webp";
import summerGold3 from "@/assets/Summer Gold Duplex Suite/Summer Gold Duplex Suite 3.webp";
import summerGold4 from "@/assets/Summer Gold Duplex Suite/Summer Gold Duplex Suite 4.webp";
import summerGold5 from "@/assets/Summer Gold Duplex Suite/Summer Gold Duplex Suite 5.webp";
import summerGold6 from "@/assets/Summer Gold Duplex Suite/Summer Gold Duplex Suite 6.webp";
import summerGold7 from "@/assets/Summer Gold Duplex Suite/Summer Gold Duplex Suite 7.webp";
import summerGold8 from "@/assets/Summer Gold Duplex Suite/Summer Gold Duplex Suite 8.webp";

// Import images - Winter Blue Duplex Studio
import winterBlue1 from "@/assets/Winter Blue Duplex Studio/Winter Blue Duplex Studio 1.webp";
import winterBlue2 from "@/assets/Winter Blue Duplex Studio/Winter Blue Duplex Studio 2.webp";
import winterBlue3 from "@/assets/Winter Blue Duplex Studio/Winter Blue Duplex Studio 3.webp";
import winterBlue4 from "@/assets/Winter Blue Duplex Studio/Winter Blue Duplex Studio 4.webp";
import winterBlue5 from "@/assets/Winter Blue Duplex Studio/Winter Blue Duplex Studio 5.webp";
import winterBlue6 from "@/assets/Winter Blue Duplex Studio/Winter Blue Duplex Studio 6.webp";
import winterBlue7 from "@/assets/Winter Blue Duplex Studio/Winter Blue Duplex Studio 7.webp";
import winterBlue8 from "@/assets/Winter Blue Duplex Studio/Winter Blue Duplex Studio 8.webp";

// Featured accommodation
const featuredAccommodation = {
  id: "kathkuni-house",
  name: "Entire Kathkuni House",
  subtitle: "6 Bedrooms",
  description:
    "Experience the complete heritage villa with 2 duplex suites, 2 deluxe attic rooms, a traditional dining hall, and exclusive outdoor spaces. Includes dedicated chef and staff service for an unforgettable group retreat.",
  images: [entireKathkuniVilla],
  airbnbLink: "https://www.airbnb.co.in/rooms/1269463075803029322",
  features: [
    { icon: Users, label: "6-16 Guests" },
    { icon: Bed, label: "6 Bedrooms" },
    { icon: Mountain, label: "Valley Views" },
    { icon: Flame, label: "Fireplace" },
  ],
};

// Duplex Suites
const duplexSuites = [
  {
    id: "summer-gold",
    name: "Summer Gold Duplex Suite",
    description:
      "North-facing premium suite with panoramic valley views, heritage wood floors, earthen walls, private veranda, stone hot tub, and a cozy fireplace.",
    images: [summerGold1, summerGold2, summerGold3, summerGold4, summerGold5, summerGold6, summerGold7, summerGold8],
    airbnbLink: "https://www.airbnb.co.in/rooms/898430473088156687",
    capacity: "2-4 Guests",
  },
  {
    id: "winter-blue",
    name: "Winter Blue Duplex Studio",
    description:
      "A signature suite crafted for an instagrammable lifestyle experience. Features panoramic views, healing stone hot tub, charming fireplace, and thoughtful design details.",
    images: [winterBlue1, winterBlue2, winterBlue3, winterBlue4, winterBlue5, winterBlue6, winterBlue7, winterBlue8],
    airbnbLink: "https://www.airbnb.co.in/rooms/1318115446497662496",
    capacity: "2-4 Guests",
  },
];

// Attic Rooms
const atticRooms = [
  {
    id: "spring-green",
    name: "Spring Green Attic Room",
    description:
      "Cozy double room with queen bed and attached shower bath. Private balcony with snow peak and village views.",
    images: [springGreen1, springGreen2, springGreen3, springGreen4, springGreen5, springGreen7],
    airbnbLink: "https://www.airbnb.co.in/rooms/21466866",
    capacity: "2 Guests",
  },
  {
    id: "fall-maroon",
    name: "Fall Maroon Attic Room",
    description:
      "Double room with kitchenette, queen bed, and attached shower bath. Attached balcony with garden views and ample natural light.",
    images: [fallMaroon1, fallMaroon2, fallMaroon4],
    airbnbLink: "https://www.airbnb.co.in/rooms/1055715753752546041",
    capacity: "2 Guests",
  },
];

const Stays = () => {
  return (
    <PageTransition>
      <SEO />
      <AccommodationSchema
        name="ART - Heritage Accommodation"
        description="Heritage rooms in a 100-year-old Kathkuni house. Duplex suites with hot tubs, cozy attic rooms, and full villa rental."
        image="https://artvillagenaggar.com/og-image.jpg"
        amenities={["Mountain View", "Fireplace", "Hot Tub", "Free WiFi", "Restaurant"]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Stays", url: `${SITE_URL}/stays` },
        ]}
      />
      <main className="bg-background overflow-x-hidden">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-28 pb-10 md:pt-40 md:pb-16 px-5 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: HERO_TIMING.tagline.delay, duration: HERO_TIMING.tagline.duration, ease: EASING }}
                className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4"
              >
                Stay With Us
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: HERO_TIMING.heading.delay, duration: HERO_TIMING.heading.duration, ease: EASING }}
                className="font-serif text-4xl md:text-6xl mb-6"
              >
                Accommodation
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: HERO_TIMING.description.delay, duration: HERO_TIMING.description.duration, ease: EASING }}
                className="font-sans text-base text-muted-foreground max-w-xl mx-auto leading-relaxed"
              >
                Heritage rooms in a 100-year-old Kathkuni house, each with its own character,
                view, and story to tell.
              </motion.p>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured: Entire House */}
        <section className="px-5 md:px-12 pb-14 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageCarousel
                    images={featuredAccommodation.images}
                    alt={featuredAccommodation.name}
                  />
                </div>

                {/* Content */}
                <div className="lg:pl-4">
                  <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    Featured
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl mb-2">
                    {featuredAccommodation.name}
                  </h2>
                  <p className="font-sans text-sm text-muted-foreground mb-6">
                    {featuredAccommodation.subtitle}
                  </p>
                  <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8">
                    {featuredAccommodation.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {featuredAccommodation.features.map((feature) => (
                      <div key={feature.label} className="flex items-center gap-3">
                        <feature.icon className="w-5 h-5 text-foreground/60" />
                        <span className="font-sans text-sm text-muted-foreground">
                          {feature.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={featuredAccommodation.airbnbLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase bg-foreground text-background px-8 py-4 hover:bg-foreground/90 transition-all duration-500"
                  >
                    Book Entire House
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-5 md:px-12">
          <div className="border-t border-border/50" />
        </div>

        {/* Duplex Suites Section */}
        <section className="px-5 md:px-12 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  Premium Suites
                </p>
                <h2 className="font-serif text-2xl md:text-3xl">
                  Duplex Suites
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              {duplexSuites.map((suite, index) => (
                <ScrollReveal key={suite.id} delay={index * 0.1}>
                  <div className="group">
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden mb-5">
                      <ImageCarousel
                        images={suite.images}
                        alt={suite.name}
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-serif text-xl md:text-2xl">
                          {suite.name}
                        </h3>
                        <span className="font-sans text-xs text-muted-foreground">
                          {suite.capacity}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-5">
                        {suite.description}
                      </p>
                      <a
                        href={suite.airbnbLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase border border-foreground/20 px-5 py-3 hover:bg-foreground hover:text-background transition-all duration-500"
                      >
                        Book on Airbnb
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-5 md:px-12">
          <div className="border-t border-border/50" />
        </div>

        {/* Attic Rooms Section */}
        <section className="px-5 md:px-12 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  Cozy Retreats
                </p>
                <h2 className="font-serif text-2xl md:text-3xl">
                  Attic Rooms
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              {atticRooms.map((room, index) => (
                <ScrollReveal key={room.id} delay={index * 0.1}>
                  <div className="group">
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden mb-5">
                      <ImageCarousel
                        images={room.images}
                        alt={room.name}
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-serif text-xl md:text-2xl">
                          {room.name}
                        </h3>
                        <span className="font-sans text-xs text-muted-foreground">
                          {room.capacity}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-5">
                        {room.description}
                      </p>
                      <a
                        href={room.airbnbLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase border border-foreground/20 px-5 py-3 hover:bg-foreground hover:text-background transition-all duration-500"
                      >
                        Book on Airbnb
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Terms Notice */}
        <section className="px-5 md:px-12 pb-6 md:pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <p className="font-sans text-xs text-muted-foreground">
                All bookings are subject to our{" "}
                <Link to="/terms" className="underline hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="py-14 md:py-28 px-5 md:px-12 bg-secondary/30">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-serif text-2xl md:text-3xl mb-4">
                Need help choosing?
              </h2>
              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8">
                We're happy to help you find the perfect room for your stay.
                Reach out via WhatsApp and we'll respond within a few hours.
              </p>
              <a
                href="https://wa.me/919816650400?text=Hi%2C%20I%27m%20interested%20in%20booking%20a%20stay%20at%20Art%20Village%20Naggar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-sans text-sm tracking-[0.1em] uppercase bg-foreground text-background px-8 py-4 hover:bg-foreground/90 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Stays;
