// SEO Configuration for ART - Adaptive Rural Tourism
// Site-wide constants
export const SITE_NAME = "ART - Adaptive Rural Tourism";
export const SITE_NAME_SHORT = "Adaptive Rural Tourism";
export const SITE_URL = "https://artvillagenaggar.com";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";
export const TWITTER_HANDLE = "@artvillagenaggar";

// Route metadata configuration
export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

export const routeMetadata: Record<string, PageMeta> = {
  "/": {
    title: "ART - Adaptive Rural Tourism | Rethinking Rural Living",
    description:
      "A community organization rethinking and redesigning village spaces. Volunteer programs, creative collaborations, and authentic Himalayan experiences in Chachogi village, Kullu Valley.",
    ogImage: "/og/home.jpg",
    ogImageAlt: "ART village home — Himalayan landscape at Chachogi",
  },
  "/stays": {
    title: "Accommodation | ART - Adaptive Rural Tourism",
    description:
      "Heritage rooms in a 100-year-old Kathkuni house. Duplex suites with hot tubs, cozy attic rooms, and full villa rental. Book your Himalayan stay.",
    ogImage: "/og/stays.jpg",
    ogImageAlt: "Summer Gold Duplex Suite interior at ART village",
  },
  "/stays/the-house": {
    title: "The House | ART - Adaptive Rural Tourism",
    description:
      "Experience the complete heritage villa with 6 bedrooms, traditional dining hall, and exclusive outdoor spaces. Dedicated chef and staff service.",
    ogImage: "/og/the-house.jpg",
    ogImageAlt: "The Kathkuni House heritage room interior",
  },
  "/stays/shepherd-hostel": {
    title: "Shepherd Hostel | ART - Adaptive Rural Tourism",
    description:
      "Budget-friendly dorm accommodation in the Himalayas. Shared spaces, community vibes, and authentic village experience at Chachogi.",
    ogImage: "/og/shepherd-hostel.jpg",
    ogImageAlt: "Shepherd Hostel dorm at ART village Naggar",
  },
  "/slow-life": {
    title: "Slow Life Staycation | ART - Adaptive Rural Tourism",
    description:
      "Embrace a responsible way of traveling at a slow, leisurely pace. Conscious travel, therapeutic relaxation, and contextual lifestyle in the Himalayas.",
    ogImage: "/og/slow-life.jpg",
    ogImageAlt: "Forest light through deodar trees in Chachogi village",
  },
  "/dining": {
    title: "Shepherd Cafe & Dining | ART - Adaptive Rural Tourism",
    description:
      "Farm-to-table dining in the Himalayas. Local Himachali, Mediterranean, and Asian cuisine. Wood-fired cooking with fresh mountain ingredients.",
    ogImage: "/og/dining.jpg",
    ogImageAlt: "Shepherd Cafe interior at ART village Naggar",
  },
  "/dining/cafe": {
    title: "The Cafe | ART - Adaptive Rural Tourism",
    description:
      "Seasonal menu at Shepherd Cafe. Fresh trout, wood-fired pizzas, traditional siddu, and locally foraged ingredients at 2,300 metres.",
    ogImage: "/og/cafe.jpg",
    ogImageAlt: "Wood-fired food at Shepherd Cafe, ART village",
  },
  "/story": {
    title: "Our Story | ART - Adaptive Rural Tourism",
    description:
      "How a 1,000-year-old building technique found new life. The story of Kathkuni architecture, Chachogi village, and our community initiatives.",
    ogImage: "/og/story.jpg",
    ogImageAlt: "Kathkuni stone and wood wall detail at ART village",
  },
  "/gallery": {
    title: "Gallery | ART - Adaptive Rural Tourism",
    description:
      "Visual journey through our community. Wood grain, stone texture, forest light. Photos of Kathkuni architecture and Himalayan village life.",
    ogImage: "/og/gallery.jpg",
    ogImageAlt: "Gallery of ART village — Himalayan life and Kathkuni architecture",
  },
  "/experiences": {
    title: "Experiences | ART - Adaptive Rural Tourism",
    description:
      "Village tours, farm-to-table cooking, snowline hikes, stargazing, forest walks, and traditional crafts. Immersive experiences at 2,300 metres.",
    ogImage: "/og/experiences.jpg",
    ogImageAlt: "Cultural experience at Chachogi village with ART",
  },
  "/shepherd-magazine": {
    title: "Shepherd Magazine | ART - Adaptive Rural Tourism",
    description:
      "Stories about Kathkuni architecture, village life, seasonal food, and Himalayan traditions.",
    ogImage: "/og/magazine.jpg",
    ogImageAlt: "Shepherd Magazine — stories from ART village Naggar",
    ogType: "website",
  },
  "/collaborate": {
    title: "Collaborate & Volunteer | ART - Adaptive Rural Tourism",
    description:
      "Join us as a volunteer, artist, or creative collaborator. Work exchange programs, community initiatives, and creative residencies in the Himalayas.",
    ogImage: "/og/collaborate.jpg",
    ogImageAlt: "Volunteers and guests at ART village Naggar",
  },
  "/contact": {
    title: "Contact & Directions | ART - Adaptive Rural Tourism",
    description:
      "How to reach Chachogi village, 4 km above Naggar. Contact details, directions by air and road, and collaboration inquiries.",
    ogImage: "/og/contact.jpg",
    ogImageAlt: "How to reach ART village — mountain road to Chachogi",
  },
  "/terms": {
    title: "Terms & Conditions | ART - Adaptive Rural Tourism",
    description:
      "Booking terms, cancellation policy, and guidelines for ART programs and stays.",
    noIndex: true,
  },
};

// Helper to get page metadata
export function getPageMeta(pathname: string): PageMeta {
  return (
    routeMetadata[pathname] || {
      title: `${SITE_NAME}`,
      description: routeMetadata["/"].description,
    }
  );
}

// Helper to build full title
export function buildTitle(pageTitle: string): string {
  if (pageTitle.includes(SITE_NAME)) {
    return pageTitle;
  }
  return `${pageTitle} | ${SITE_NAME}`;
}

// Helper to build canonical URL
export function buildCanonicalUrl(pathname: string): string {
  const cleanPath = pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;
  return `${SITE_URL}${cleanPath}`;
}

// Helper to build OG image URL
export function buildOgImageUrl(ogImage?: string): string {
  if (!ogImage) return `${SITE_URL}${DEFAULT_OG_IMAGE}`;
  if (ogImage.startsWith("http")) return ogImage;
  return `${SITE_URL}${ogImage}`;
}
