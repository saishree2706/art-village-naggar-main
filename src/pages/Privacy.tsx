import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const privacyData = [
  {
    title: null,
    paragraphs: [
      'The terms "We" / "Us" / "Our" / "Company" individually and collectively refer to Art Village Naggar, and the terms "You" / "Your" / "Yourself" refer to the users.',
      "This Privacy Policy is an electronic record in the form of an electronic contract formed under the Information Technology Act, 2000, and the rules made thereunder and the amended provisions pertaining to electronic documents / records in various statutes as amended by the Information Technology Act, 2000. This Privacy Policy does not require any physical, electronic, or digital signature.",
      'This Privacy Policy is a legally binding document between you and Art Village Naggar (both terms defined below). The terms of this Privacy Policy will be effective upon your acceptance of the same (directly or indirectly in electronic form, by clicking on the "I accept" tab or by use of the website or by other means) and will govern the relationship between you and Art Village Naggar for your use of the website "www.artvillagenaggar.com" (defined below).',
      "This document is published and shall be construed in accordance with the provisions of the Information Technology (reasonable security practices and procedures and sensitive personal data of information) rules, 2011 under Information Technology Act, 2000, which require the publishing of the Privacy Policy for collection, use, storage, and transfer of sensitive personal data or information.",
      "Please read this Privacy Policy carefully. By using the Website, you indicate that you understand, agree, and consent to this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use this Website.",
      "By providing us with your Information or by making use of the facilities provided by the Website, you hereby consent to the collection, storage, processing, and transfer of any or all of Your Personal Information and Non-Personal Information by us as specified under this Privacy Policy. You further agree that such collection, use, storage, and transfer of Your Information shall not cause any loss or wrongful gain to you or any other person.",
    ],
  },
  {
    title: "User Information",
    paragraphs: [
      "To avail of certain services on our Websites, users are required to provide certain information for the registration process, namely: a) your name, b) email address, c) sex, d) age, e) PIN code, f) credit card or debit card details, g) medical records and history, h) sexual orientation, i) biometric information, j) password, etc., and / or your occupation, interests, and the like. The Information as supplied by the users enables us to improve our sites and provide you with the most user-friendly experience.",
      "All required information is service-dependent, and we may use the above-said user information to maintain, protect, and improve our services (including advertising services) and for developing new services.",
      "Such information will not be considered sensitive if it is freely available and accessible in the public domain or is furnished under the Right to Information Act, 2005, or any other law for the time being in force.",
    ],
  },
  {
    title: "Cookies",
    paragraphs: [
      'To improve the responsiveness of the sites for our users, we may use "cookies" or similar electronic tools to collect information and assign each visitor a unique, random number as a User Identification (User ID) to understand the user\'s individual interests using the Identified Computer. Unless you voluntarily identify yourself (through registration, for example), we will have no way of knowing who you are, even if we assign a cookie to your computer. The only personal information a cookie can contain is information you supply (an example of this is when you ask for a personalized itinerary). A cookie cannot read data off your hard drive. Our advertisers may also assign their own cookies to your browser (if you click on their ads), a process that we do not control.',
      "Our web servers automatically collect limited information about your computer's connection to the Internet, including your IP address, when you visit our site. Your IP address does not identify you personally. We use this information to deliver our web pages to you upon request, to tailor our site to the interests of our users, to measure traffic within our site, and to let advertisers know the geographic locations from where our visitors come.",
    ],
  },
  {
    title: "Links to Other Sites",
    paragraphs: [
      "Our policy discloses the privacy practices for our own website only. Our site provides links to other websites that are beyond our control. We shall in no way be responsible for your use of such sites.",
    ],
  },
  {
    title: "Information Sharing",
    paragraphs: [
      "We share sensitive personal information with any third party without obtaining the prior consent of the user in the following limited circumstances:",
      "(a) When it is requested or required by law or by any court or governmental agency or authority to disclose, for the purpose of verification of identity, or for the prevention, detection, investigation including cyber incidents, or for prosecution and punishment of offenses. These disclosures are made in good faith and belief that such disclosure is reasonably necessary for enforcing these Terms; for complying with the applicable laws and regulations.",
      "(b) We propose to share such information within our group companies and officers and employees of such group companies for processing personal information on our behalf. We also ensure that these recipients of such information agree to process such information based on our instructions and in compliance with this Privacy Policy and any other appropriate confidentiality and security measures.",
    ],
  },
  {
    title: "Information Security",
    paragraphs: [
      "We take appropriate security measures to protect against unauthorized access to or unauthorized alteration, disclosure, or destruction of data. These include internal reviews of our data collection, storage, and processing practices and security measures, including appropriate encryption and physical security measures to guard against unauthorized access to systems where we store personal data.",
      "All information gathered on our website is securely stored within our controlled database. The database is stored on servers secured behind a firewall; access to the servers is password-protected and is strictly limited. However, as effective as our security measures are, no security system is impenetrable. We cannot guarantee the security of our database, nor can we guarantee that information you supply will not be intercepted while being transmitted to us over the Internet.",
      "We may change our Privacy Policy from time to time to incorporate necessary future changes. Our use of any information we gather will always be consistent with the policy under which the information was collected, regardless of what the new policy may be.",
    ],
  },
  {
    title: "Grievance Redressal",
    paragraphs: [
      "Any complaints, abuse, or concerns with regard to content and/or comment or breach of these terms shall be immediately informed to the designated manager via in writing or through email signed with the electronic signature to Art Village Naggar.",
    ],
  },
];

const Privacy = () => {
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
                Privacy Policy
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-sans text-sm tracking-[0.15em] text-muted-foreground"
              >
                How we collect, use, and protect your information
              </motion.p>
            </ScrollReveal>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="px-6 md:px-12 pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-12">
              {privacyData.map((section, index) => (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <div className="border-b border-border/50 pb-8">
                    {section.title && (
                      <h2 className="font-serif text-xl md:text-2xl mb-4">
                        {section.title}
                      </h2>
                    )}
                    <div className="space-y-4">
                      {section.paragraphs.map((para, i) => (
                        <p
                          key={i}
                          className="font-sans text-sm text-muted-foreground leading-relaxed"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Contact Note */}
            <ScrollReveal delay={0.3}>
              <div className="mt-16 p-8 bg-secondary/30 text-center">
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please reach out to us.
                </p>
                <a
                  href="https://wa.me/919816650400?text=Hi%2C%20I%20have%20a%20question%20about%20your%20privacy%20policy"
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

export default Privacy;
