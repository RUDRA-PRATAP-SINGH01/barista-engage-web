import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface LandingCtaProps {
  onEnter: () => void;
  exiting: boolean;
}

export function LandingCta({ onEnter, exiting }: LandingCtaProps) {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center gap-6 px-6 pb-16"
      animate={exiting ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.button
        type="button"
        onClick={onEnter}
        className="group inline-flex items-center gap-2 rounded-lg bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.28 }}
      >
        Enter Dashboard
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </motion.button>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span>Audience Builder</span>
        <span className="hidden sm:inline text-border">·</span>
        <span>Campaign Studio</span>
        <span className="hidden sm:inline text-border">·</span>
        <span>Live Analytics</span>
      </motion.div>
    </motion.div>
  );
}
