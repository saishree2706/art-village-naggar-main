import { motion } from "framer-motion";
import { ReactNode } from "react";
import { EASING, DURATION } from "@/lib/animations";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.normal, ease: EASING }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
