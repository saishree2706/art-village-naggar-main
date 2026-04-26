import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import guestsTour from "@/assets/guests-tour.jpg";
import collabImage from "@/Collaborate/collab.jpg";

const VOLUNTEER_FORM_LINK = "https://forms.gle/YZymXVkZmPHkdfVX8";
const COLLABORATE_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSc6NDrHl92TSHChaNpfEV28TuNY7-TeZDR3tf1l_SQouhb4_A/viewform";

const Collaborate = () => {
  return (
    <PageTransition>
      <SEO />
      <main className="bg-background overflow-x-hidden">
        <Navigation />

        {/* Hero */}
        <section className="pt-28 pb-12 md:pt-40 md:pb-20 px-5 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4"
              >
                Join Our Community
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-serif text-4xl md:text-6xl mb-4"
              >
                Volunteer & Collaborate
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-sans text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                Be part of a community rethinking rural living. Whether you're looking for a meaningful
                volunteer experience or want to collaborate on creative projects, we welcome you.
              </motion.p>
            </ScrollReveal>
          </div>
        </section>

        {/* Volunteer Section */}
        <section className="py-14 md:py-28 px-5 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
              <ScrollReveal direction="left">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={guestsTour}
                    alt="Volunteering at ART"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2} direction="right">
                <div>
                  <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    Volunteer Program
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl mb-6">
                    Live the Shepherd Life
                  </h2>
                  <div className="space-y-4 font-sans text-base text-muted-foreground leading-relaxed">
                    {/* <p>
                      <strong className="text-foreground">Volunteer Yatra</strong> is our immersive program where you become
                      part of our community, not just a visitor. Wake up to mountain views, share meals with locals,
                      and contribute to meaningful work that shapes rural tourism.
                    </p> */}
                    <p>
                      This volunteering opportunity calls upon young creative minds from different domains. I am looking for a team that could contribute to the process of identifying target audiences for conscious and responsible tourism offerings. Thereafter, the team would also help me in creating tailored experiences and marketing content that would appeal to our targeted audiences. Volunteers can expect to learn problem-solving, design thinking, and the user-centred design process during their time here.

The team of volunteers will be accommodated in our in-house dorm. Hence, the team would be called "shepherds" who would metaphorically bring the astray sheep back on the path. Three times meals and an easy non-hectic work schedule is to be expected for all shepherds.
                    </p>
                    <p>
                      <strong className="text-foreground">Expectations from Volunteer: </strong>We are looking for dreamers, creators, and innovators who want to see change. Participants from be of from any field and background as long as they share our vision and agree with our motto. Also, applicants should be enthusiastic about the Himalayas and must not mind the minor hardships and discomforts of mountain life.
                    </p>
                    {/* <p>
                      <strong className="text-foreground">What you'll do:</strong> Engage in hospitality operations,
                      assist with community workshops, participate in design and renovation projects, help with
                      sustainable farming initiatives, and support local cultural events and festivals.
                    </p>
                    <p>
                      <strong className="text-foreground">What you'll gain:</strong> Free accommodation in our heritage
                      Kathkuni house, home-cooked meals, deep cultural immersion, hands-on experience in sustainable
                      tourism, and lifelong connections with the mountain community.
                    </p>
                    <p>
                      <strong className="text-foreground">Duration:</strong> Minimum 2 weeks commitment. Ideal for
                      students, gap-year travelers, professionals on sabbatical, or anyone seeking a meaningful break
                      from urban life.
                    </p> */}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    <a
                      href={VOLUNTEER_FORM_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase bg-foreground text-background px-6 py-3 hover:bg-foreground/90 transition-all duration-300"
                    >
                      Apply Now
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <Link
                      to="/shepherd-magazine?tab=projects"
                      className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase border border-foreground/20 px-6 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
                    >
                      Life as a Shepherd
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Life at ART - Image Break */}
        <section className="py-12 md:py-16 px-5 md:px-12 bg-secondary/30">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Life at ART
              </p>
              <p className="font-serif text-xl md:text-2xl italic leading-relaxed">
                "Bask in the sun and laze on our wooden verandas, witness Himachali village
                customs and festivities, or take a hike through endless country landscapes and forests."
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Collaborate Section */}
        <section className="py-14 md:py-28 px-5 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
              <ScrollReveal delay={0.2} direction="left">
                <div className="md:order-2">
                  <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    Creative Partnerships
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl mb-6">
                    Collaborate With Us
                  </h2>
                  <div className="space-y-4 font-sans text-base text-muted-foreground leading-relaxed">
                    <p>
                      <strong className="text-foreground">ART (Adaptive Rural Tourism)</strong> is a community
                      organization dedicated to rethinking and redesigning village spaces. We're not a hotel —
                      we're a movement to preserve cultural and environmental heritage while creating sustainable livelihoods.
                    </p>
                    <p>
                      <strong className="text-foreground">Our initiatives include:</strong> Heritage architecture
                      restoration, sustainable farming programs, local artisan workshops, cultural documentation
                      projects, and community-driven tourism experiences.
                    </p>
                    <p>
                      <strong className="text-foreground">Who can collaborate:</strong> Artists seeking residency,
                      researchers studying rural development, architects interested in traditional techniques,
                      photographers documenting mountain culture, and organizations aligned with our mission.
                    </p>
                    <p>
                      <strong className="text-foreground">Past collaborations:</strong> We've worked with design
                      students, documentary filmmakers, sustainable tourism consultants, and cultural anthropologists
                      from across the world.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    <a
                      href={COLLABORATE_FORM_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase bg-foreground text-background px-6 py-3 hover:bg-foreground/90 transition-all duration-300"
                    >
                      Propose a Collaboration
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <Link
                      to="/shepherd-magazine?tab=articles"
                      className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase border border-foreground/20 px-6 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
                    >
                      View Publications
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="md:order-1 aspect-[4/5] overflow-hidden">
                  <img
                    src={collabImage}
                    alt="Collaborate with ART"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-14 md:py-28 px-5 md:px-12 bg-secondary/30">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-serif text-2xl md:text-3xl mb-4">
                Have questions?
              </h2>
              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8">
                Reach out to us and we'll help you find the right opportunity.
              </p>
              <a
                href="https://wa.me/919816650400?text=Hi%2C%20I%27m%20interested%20in%20collaborating%20with%20ART%20-%20Adaptive%20Rural%20Tourism"
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

export default Collaborate;
