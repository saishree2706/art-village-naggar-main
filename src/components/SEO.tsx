import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import {
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
  getPageMeta,
  buildCanonicalUrl,
  buildOgImageUrl,
} from "@/lib/seo";

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
}

const SEO = ({
  title,
  description,
  ogImage,
  ogImageAlt,
  ogType,
  noIndex,
  article,
}: SEOProps) => {
  const { pathname } = useLocation();
  const pageMeta = getPageMeta(pathname);

  const finalTitle = title || pageMeta.title;
  const finalDescription = description || pageMeta.description;
  const finalOgImage = buildOgImageUrl(ogImage || pageMeta.ogImage);
  const finalOgImageAlt = ogImageAlt || pageMeta.ogImageAlt || finalTitle;
  const finalOgType = ogType || pageMeta.ogType || "website";
  const finalNoIndex = noIndex ?? pageMeta.noIndex ?? false;
  const canonicalUrl = buildCanonicalUrl(pathname);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {finalNoIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={finalOgType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalOgImageAlt} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:image:alt" content={finalOgImageAlt} />

      {/* Article Meta (for blog posts) */}
      {article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
    </Helmet>
  );
};

export default SEO;
