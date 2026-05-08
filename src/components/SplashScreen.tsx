import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import woodTexture from "@/assets/wood-texture.jpg";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"in" | "exit">("in");

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase("exit"), 2700);
    const doneTimer = setTimeout(() => onComplete(), 3300);

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
          className="fixed inset-0 z-[100] overflow-hidden bg-[#1c130c]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Blurred wood texture */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.18 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ filter: "blur(14px) saturate(0.85)" }}
          >
            <img
              src={woodTexture}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>

          {/* Warm tone overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a1d12]/55 via-[#1c130c]/70 to-[#0d0805]/85" />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* Soft golden glow behind logo */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.55, 0.4, 0.55], scale: 1 }}
            transition={{
              opacity: { duration: 3, times: [0, 0.4, 0.7, 1], ease: "easeInOut" },
              scale: { duration: 1.6, ease: [0.25, 0.1, 0.25, 1] },
            }}
            style={{
              width: 520,
              height: 520,
              background:
                "radial-gradient(circle, rgba(214,168,90,0.45) 0%, rgba(214,168,90,0.12) 35%, transparent 65%)",
              filter: "blur(20px)",
            }}
          />

          {/* Centered content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
            <motion.img
              src="/art_new_logo_white.png"
              alt="ART - Adaptive Rural Tourism"
              className="w-44 sm:w-56 md:w-72 lg:w-80 h-auto object-contain select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              draggable={false}
            />

            {/* Ornament divider: line  ✦  line */}
            <motion.div
              className="mt-8 flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.9, ease: "easeOut" }}
            >
              <motion.span
                className="block h-px bg-gradient-to-r from-transparent via-[#d6a85a]/70 to-[#d6a85a]"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.7, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <motion.span
                className="text-[#d6a85a] text-sm tracking-widest"
                initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.95, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                ✦
              </motion.span>
              <motion.span
                className="block h-px bg-gradient-to-l from-transparent via-[#d6a85a]/70 to-[#d6a85a]"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.7, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </motion.div>

            <motion.p
              className="mt-5 font-sans text-[10px] sm:text-xs tracking-[0.42em] uppercase text-[#e8d3a8]/75"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.8, ease: "easeOut" }}
            >
              Adaptive Rural Tourism
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
