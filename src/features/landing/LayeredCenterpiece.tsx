import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayeredCenterpieceProps {
  onEnter: () => void;
  exiting: boolean;
}

const layers = [
  {
    width: "min(92vw, 920px)",
    height: 210,
    bottom: 0,
    radius: 72,
    opacity: 0.35,
    borderOpacity: 0.22,
  },
  {
    width: "min(80vw, 760px)",
    height: 178,
    bottom: 28,
    radius: 64,
    opacity: 0.45,
    borderOpacity: 0.28,
  },
  {
    width: "min(68vw, 600px)",
    height: 148,
    bottom: 54,
    radius: 56,
    opacity: 0.55,
    borderOpacity: 0.34,
  },
  {
    width: "min(56vw, 460px)",
    height: 118,
    bottom: 78,
    radius: 48,
    opacity: 0.65,
    borderOpacity: 0.42,
  },
] as const;

const accentDots = [
  { left: "8%", top: "42%" },
  { left: "50%", top: "18%" },
  { left: "92%", top: "42%" },
] as const;

export function LayeredCenterpiece({
  onEnter,
  exiting,
}: LayeredCenterpieceProps) {
  return (
    <motion.div
      className="relative mx-auto h-[min(38vh,340px)] w-full max-w-[980px]"
      animate={
        exiting
          ? { opacity: 0, scale: 0.94, y: 24 }
          : { opacity: 1, scale: 1, y: 0 }
      }
      transition={{ duration: 0.55, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {layers.map((layer, index) => (
          <div
            key={layer.width}
            className="landing-layer absolute left-1/2 -translate-x-1/2 overflow-hidden"
            style={{
              width: layer.width,
              height: layer.height,
              bottom: layer.bottom,
              borderRadius: layer.radius,
              background: `linear-gradient(180deg, rgba(75, 140, 255, ${layer.opacity * 0.14}) 0%, rgba(255, 255, 255, 0.02) 48%, rgba(75, 140, 255, 0.04) 100%)`,
              border: `1px solid rgba(75, 140, 255, ${layer.borderOpacity})`,
              boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 48px rgba(75, 140, 255, ${0.06 + index * 0.03})`,
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              aria-hidden
              className="landing-layer-sweep absolute inset-0"
              style={{ animationDelay: `${index * 0.45}s` }}
            />
            {index === 0 &&
              accentDots.map((dot) => (
                <span
                  key={`${dot.left}-${dot.top}`}
                  className="absolute size-2 rounded-full bg-primary shadow-[0_0_14px_rgba(75,140,255,0.9)]"
                  style={{ left: dot.left, top: dot.top }}
                />
              ))}
          </div>
        ))}

        <div
          className="absolute left-1/2 z-10 -translate-x-1/2"
          style={{ bottom: 108 }}
        >
          <motion.button
            type="button"
            onClick={onEnter}
            className={cn(
              "landing-cta-btn group flex items-center gap-2.5 rounded-full border border-primary/55 bg-[rgba(4,10,28,0.82)] px-9 py-4 text-base font-semibold text-foreground backdrop-blur-md",
            )}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: [
                "0 0 32px rgba(75, 140, 255, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                "0 0 52px rgba(75, 140, 255, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.14)",
                "0 0 32px rgba(75, 140, 255, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            Enter Dashboard
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
