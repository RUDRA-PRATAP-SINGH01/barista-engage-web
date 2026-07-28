import { motion } from "motion/react";

interface LandingHeroProps {
  exiting: boolean;
}

export function LandingHero({ exiting }: LandingHeroProps) {
  return (
    <motion.div
      className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center px-6 text-center"
      animate={
        exiting
          ? { opacity: 0, y: -12 }
          : { opacity: 1, y: 0 }
      }
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.p
        className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight text-foreground"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        Barista Engage
      </motion.p>

      <motion.h1
        className="mt-4 text-[clamp(1.35rem,3vw,1.85rem)] font-medium leading-snug tracking-tight text-muted-foreground"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12 }}
      >
        Transform customer data into revenue
      </motion.h1>

      <motion.p
        className="mt-5 max-w-[34rem] text-base leading-relaxed text-muted-foreground sm:text-[15px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        AI audience segments, campaign intelligence, and retention insights —
        built for modern coffee brands.
      </motion.p>
    </motion.div>
  );
}
