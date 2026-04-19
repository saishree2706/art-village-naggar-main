import { Helmet } from "react-helmet-async";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

// Organization schema (used on all pages)
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "A community organization rethinking and redesigning village spaces. Volunteer programs, creative collaborations, and authentic Himalayan experiences in Kullu Valley, Himachal Pradesh.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chachogi Village, 4 km above Naggar",
      addressLocality: "Naggar",
      addressRegion: "Himachal Pradesh",
      postalCode: "175130",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98166-50400",
      contactType: "reservations",
      email: "hello@artvillagenaggar.com",
    },
    sameAs: [
      "https://www.instagram.com/artvillagenaggar",
      "https://www.facebook.com/artvillagenaggar",
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// LocalBusiness schema (for Contact page)
export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: SITE_NAME,
    image: `${SITE_URL}/og-image.jpg`,
    url: SITE_URL,
    telephone: "+91-98166-50400",
    email: "hello@artvillagenaggar.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chachogi Village, 4 km above Naggar",
      addressLocality: "Naggar",
      addressRegion: "Himachal Pradesh",
      postalCode: "175130",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.1312,
      longitude: 77.1734,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free WiFi" },
      { "@type": "LocationFeatureSpecification", name: "Mountain View" },
      { "@type": "LocationFeatureSpecification", name: "Fireplace" },
      { "@type": "LocationFeatureSpecification", name: "Restaurant" },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// BlogPosting schema (for individual blog posts)
interface BlogPostSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
  url: string;
}

export const BlogPostSchema = ({
  title,
  description,
  datePublished,
  dateModified,
  author = SITE_NAME,
  image,
  url,
}: BlogPostSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: image || `${SITE_URL}/og-image.jpg`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Breadcrumb schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Accommodation schema (for Stays pages)
interface AccommodationSchemaProps {
  name: string;
  description: string;
  image: string;
  priceRange?: string;
  amenities?: string[];
}

export const AccommodationSchema = ({
  name,
  description,
  image,
  priceRange = "$$",
  amenities = [],
}: AccommodationSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name,
    description,
    image,
    priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chachogi Village, 4 km above Naggar",
      addressLocality: "Naggar",
      addressRegion: "Himachal Pradesh",
      postalCode: "175130",
      addressCountry: "IN",
    },
    amenityFeature: amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
