import { motion } from "motion/react";

interface LandingHeroProps {
  exiting: boolean;
}

export function LandingHero({ exiting }: LandingHeroProps) {
  return (
    <motion.div
      className="relative z-10 mx-auto flex max-w-[700px] flex-col items-center px-6 text-center"
      animate={
        exiting
          ? { opacity: 0, y: -16, scale: 0.98 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h1 className="text-[clamp(2.5rem,5.2vw,4.25rem)] leading-[1.05] font-bold tracking-tight text-foreground drop-shadow-[0_0_40px_rgba(75,140,255,0.12)]">
        Transform Customer Data
        <br />
        Into Revenue
      </h1>
      <p className="mt-6 max-w-[700px] text-base leading-relaxed font-light text-muted-foreground sm:text-lg">
        AI-powered audience segmentation, campaign intelligence, and customer
        retention insights for modern coffee brands.
      </p>
    </motion.div>
  );
}
