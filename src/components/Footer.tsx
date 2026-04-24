import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { Instagram, Youtube, Facebook, Phone } from "lucide-react";

interface FooterProps {
  variant?: "magazine";
}

const Footer = ({ variant }: FooterProps = {}) => {
  return (
    <footer className="bg-foreground text-background py-14 md:py-24 px-5 md:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="font-serif text-xl md:text-3xl mb-10 md:mb-16 max-w-xl leading-relaxed">
            Embrace a responsible way of traveling at a slow, leisurely pace.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-16">
          <ScrollReveal delay={0.1}>
            <div>
              <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-background/40 mb-4">
                Location
              </h4>
              <p className="font-sans text-sm text-background/70 leading-relaxed">
                Chachogi Village<br />
                Naggar, Kullu Valley<br />
                Himachal Pradesh, India<br />
                175130
              </p>
              <p className="font-sans text-xs text-background/30 mt-3">
                4km dirt road from Naggar
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-background/40 mb-4">
                Contact
              </h4>
              <p className="font-sans text-sm text-background/70 leading-relaxed mb-4">
                <a href="tel:+919816650400" className="hover:text-background transition-colors">
                  +91 98166 50400
                </a>
              </p>
              <a
                href="https://wa.me/919816650400"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-sm text-background/70 hover:text-background transition-colors"
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div>
              <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-background/40 mb-4">
                Hours
              </h4>
              <p className="font-sans text-sm text-background/70 leading-relaxed">
                <span className="text-background/50">Sun - Wed:</span><br />
                9:00 AM - 10:30 PM
              </p>
              <p className="font-sans text-sm text-background/70 leading-relaxed mt-2">
                <span className="text-background/50">Thu - Sat:</span><br />
                9:00 AM - 12:30 AM
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div>
              <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-background/40 mb-4">
                Follow Us
              </h4>
              <div className="flex gap-4 mb-6">
                <a
                  href="https://www.instagram.com/artvillagenaggar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/40 hover:text-background transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@AdaptiveRuralTourism"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/40 hover:text-background transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/artvillagenaggar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/40 hover:text-background transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
              <a
                href="https://www.tripadvisor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs text-background/40 hover:text-background transition-colors"
              >
                TripAdvisor
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Navigation Links — hidden on magazine pages */}
        {variant !== "magazine" && (
          <div className="border-t border-background/10 pt-8 mb-8">
            <ScrollReveal delay={0.5}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <div>
                  <h4 className="font-sans text-xs tracking-[0.15em] uppercase text-background/40 mb-3">
                    Explore
                  </h4>
                  <div className="flex flex-col gap-2">
                    <Link to="/slow-life" className="font-sans text-sm text-background/70 hover:text-background transition-colors">Slow Life</Link>
                    <Link to="/experiences" className="font-sans text-sm text-background/70 hover:text-background transition-colors">Experiences</Link>
                    <Link to="/dining" className="font-sans text-sm text-background/70 hover:text-background transition-colors">Dining</Link>
                    <Link to="/gallery" className="font-sans text-sm text-background/70 hover:text-background transition-colors">Gallery</Link>
                    <Link to="/shepherd-magazine" className="font-sans text-sm text-background/70 hover:text-background transition-colors">Shepherd Magazine</Link>
                  </div>
                </div>
                <div>
                  <h4 className="font-sans text-xs tracking-[0.15em] uppercase text-background/40 mb-3">
                    Stay
                  </h4>
                  <div className="flex flex-col gap-2">
                    <Link to="/stays" className="font-sans text-sm text-background/70 hover:text-background transition-colors">Accommodation</Link>
                    <Link to="/stays#kathkuni-house" className="font-sans text-sm text-background/70 hover:text-background transition-colors">Kathkuni House</Link>
                    <Link to="/stays#winter-blue" className="font-sans text-sm text-background/70 hover:text-background transition-colors">Duplex Suites</Link>
                    <Link to="/stays#fall-maroon" className="font-sans text-sm text-background/70 hover:text-background transition-colors">Attic Rooms</Link>
                  </div>
                </div>
                <div>
                  <h4 className="font-sans text-xs tracking-[0.15em] uppercase text-background/40 mb-3">
                    Info
                  </h4>
                  <div className="flex flex-col gap-2">
                    <Link to="/contact" className="font-sans text-sm text-background/70 hover:text-background transition-colors">Contact</Link>
                    <Link to="/story" className="font-sans text-sm text-background/70 hover:text-background transition-colors">Our Story</Link>
                    <Link to="/collaborate" className="font-sans text-sm text-background/70 hover:text-background transition-colors">Collaborate</Link>
                    <Link to="/terms" className="font-sans text-sm text-background/70 hover:text-background transition-colors">Terms & Conditions</Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-sans font-bold text-xl tracking-tight">ART</span>
            <span className="font-serif text-sm tracking-wide">Adaptive Rural Tourism</span>
          </Link>
          <p className="font-sans text-xs text-background/30">
            Community · Collaboration · Conscious Living
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
