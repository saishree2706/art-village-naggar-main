import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import woodTexture from "@/assets/wood-texture.jpg";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"texture" | "text" | "exit">("texture");

  useEffect(() => {
    // Phase 1: Texture visible → Phase 2: Text appears
    const textTimer = setTimeout(() => setPhase("text"), 800);
    // Phase 3: Exit
    const exitTimer = setTimeout(() => setPhase("exit"), 3800);
    // Complete
    const doneTimer = setTimeout(() => onComplete(), 4600);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        animate={
          phase === "exit"
            ? { scale: 1.1, opacity: 0 }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Wood texture background */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src={woodTexture}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-deep-charcoal/60" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          {/* Wordmark */}
          <motion.h1
            className="text-warm-cream"
            initial={{ opacity: 0, y: 20 }}
            animate={
              phase === "text" || phase === "exit"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="font-sans font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight block">ART</span>
            <span className="font-serif text-lg md:text-2xl lg:text-3xl tracking-wide block mt-2">Adaptive Rural Tourism</span>
          </motion.h1>

          {/* Divider line */}
          <motion.div
            className="mx-auto mt-6 mb-6 h-px bg-warm-cream/30"
            initial={{ width: 0 }}
            animate={
              phase === "text" || phase === "exit"
                ? { width: 80 }
                : { width: 0 }
            }
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          />

          {/* Tagline */}
          <motion.p
            className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-warm-cream/60"
            initial={{ opacity: 0 }}
            animate={
              phase === "text" || phase === "exit"
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            Rethinking Rural Living
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
