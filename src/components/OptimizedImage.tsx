import { useState } from "react";
import { motion } from "framer-motion";
import { EASING } from "@/lib/animations";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-[4/3]",
  priority = false,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`${aspectRatio} overflow-hidden bg-secondary/30 ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASING }}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
};

export default OptimizedImage;
