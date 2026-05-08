import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"in" | "exit">("in");

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase("exit"), 2400);
    const doneTimer = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#f5f0e6]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.img
            src="/art_new_logo.png"
            alt="ART - Adaptive Rural Tourism"
            className="w-48 sm:w-60 md:w-80 lg:w-96 h-auto object-contain select-none"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
            draggable={false}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
