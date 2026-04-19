import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const termsData = [
  {
    title: "Payment & Booking",
    items: [
      "The full booking amount must be paid before check-in. Food bill can be paid at checkout.",
      "All guests must carry valid identification documents.",
    ],
  },
  {
    title: "Cancellation Policy",
    items: [
      "Booking is refundable in case of cancellation until 14 days before the check-in date.",
      "A 5% service charge will be levied if cancellation occurs after 48 hours of the booking.",
      "Guests are liable to pay the entire reservation amount if they do not show up on the day of check-in or cancel any reserved date without 14 days' prior notice.",
    ],
  },
  {
    title: "Check-in & Check-out",
    items: [
      "Check-in time is 2pm and check-out time is 12pm.",
      "Early check-in or late check-out is subject to availability and requires 12-hour prior host approval.",
      "We do not provide check-in or checkout assistance during closed hours (11pm to 6am).",
    ],
  },
  {
    title: "Location & Access",
    items: [
      "The property is located in a remote village that is not yet connected by a metaled road. The road to the property is a 4km (30-minute drive) steep dirt track.",
      "The nearest market, bus stop, postal service and medical facility is 4km away.",
      "We do not recommend the property for people with critical health conditions or any other situation which requires easy emergency access to the hospital, highway and other public utilities.",
      "Remoteness of the location is part of the stay experience and we do not provide any cancellation policy waiver due to difficulty of access or poor road conditions.",
      "Cancellation charges will only be waived off if due to unforeseen circumstances we are unable to safely shuttle the guest at our own arrangement to and from, between the property location, and the nearest road head with open transportation connectivity.",
    ],
  },
  {
    title: "Shuttle Service",
    items: [
      "As part of some bookings, we provide free pick-up and drop shuttle service from the nearest convenient road head and bus drop off point.",
      "To avail pick-up and drop-off service you must book the service at least 1 hour in advance and reach the designated spot sharply on time.",
      "Pick-up service starts from 12:30 pm onwards till 9 pm. Drop-off service starts from 10:30 am and ends at 7 pm.",
    ],
  },
  {
    title: "Parking",
    items: [
      "Guests can drive their own vehicle to the property location at their own risk.",
      "Otherwise, we will help them park their vehicle in the Government Parking at Naggar and shuttle them in our own vehicle.",
      "Government Parking Naggar is guarded and has ample parking space.",
      "At the property location, guest's cars are parked in a shared public parking at owner's own risk.",
    ],
  },
  {
    title: "Advance Booking & Availability",
    items: [
      "Due to remote location, certain facilities, experiences and menu items might not be available without advance notice.",
      "Guests are advised to book their stays and experiences well in advance and place food orders for special items with prior notice.",
      "In some cases, last minute bookings and late-night check-in may be rejected.",
    ],
  },
  {
    title: "Meal Timings",
    items: [
      "Breakfast is from 9:00 AM to 11:00 AM.",
      "Dinner is from 8:00 PM to 11:00 PM.",
      "Meals will be served as a buffet in the dining area at the ground floor of the property building.",
      "À la carte items from the room service menu can be served inside rooms, but no buffet items or full meals will be served in rooms.",
      "Last order for À la carte items is at 10 PM.",
    ],
  },
  {
    title: "Property Conduct",
    items: [
      "This is a rural heritage and cultural experience, not a typical hotel stay.",
      "Guests must remove shoes while on heritage wooden floors, and in religious spaces in accordance with local culture.",
      "Guests are expected to maintain cordial and civilized conduct, be respectful to the rural surroundings, and follow the cultural practices of the local villagers.",
      "Use of abusive/disrespectful/argumentative language, shouting, banging of furniture, jumping on wooden floors or excessively loud music at odd times may lead to removal from the premises.",
    ],
  },
  {
    title: "Service Hours",
    items: [
      "We don't provide any 24-hour staff or services.",
      "Calling staff or seeking services during closed hours (11pm to 6am) will attract a late-night charge unless there is an emergency.",
    ],
  },
  {
    title: "Property Care",
    items: [
      "When not in use, all doors and windows must be kept closed as pests or insects may enter. This is an old wooden house in a forest surrounding — some pests or insects are expected even after thorough cleaning.",
      "Guests must not take room or restaurant amenities like slippers, furniture, cutlery, furnishings, etc. outside their designated room or outside the restaurant premise.",
      "Guests must not take home any room amenity item, pluck fruits/flowers or other produce without permission from the respective property/land owner.",
    ],
  },
  {
    title: "Prohibited Activities",
    items: [
      "Use of illicit drugs and contraband is not permitted anywhere on the property.",
    ],
  },
  {
    title: "Damages & Penalties",
    items: [
      "Smoking in non-designated areas, violation of rules, excessive uncleanliness, or littering and destruction inside or outside the property will attract penalties of minimum ₹5000.",
      "Guests must return the space as it was provided to them at check-in.",
      "Any damage or deterioration to property items or parts during the guest's stay will be considered the guest's responsibility.",
      "Charges for damages will be calculated based on the current market price + transportation + rental period loss.",
    ],
  },
];

const Terms = () => {
  return (
    <PageTransition>
      <SEO />
      <main className="bg-background overflow-x-hidden">
        <Navigation />

        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-serif text-4xl md:text-6xl mb-4"
              >
                Terms & Conditions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-sans text-sm tracking-[0.15em] text-muted-foreground"
              >
                Please read these terms carefully before booking
              </motion.p>
            </ScrollReveal>
          </div>
        </section>

        {/* Terms Content */}
        <section className="px-6 md:px-12 pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-12">
              {termsData.map((section, index) => (
                <ScrollReveal key={section.title} delay={index * 0.05}>
                  <div className="border-b border-border/50 pb-8">
                    <h2 className="font-serif text-xl md:text-2xl mb-4">
                      {section.title}
                    </h2>
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li
                          key={i}
                          className="font-sans text-sm text-muted-foreground leading-relaxed flex items-start gap-3"
                        >
                          <span className="text-foreground/40 mt-1.5 text-xs">●</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Contact Note */}
            <ScrollReveal delay={0.3}>
              <div className="mt-16 p-8 bg-secondary/30 text-center">
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about these terms, please contact us before booking.
                </p>
                <a
                  href="https://wa.me/919816650400?text=Hi%2C%20I%20have%20a%20question%20about%20your%20terms%20and%20conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-sans text-xs tracking-[0.15em] uppercase border border-foreground/20 px-6 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Terms;
