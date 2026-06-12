import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Intensity = "none" | "sm" | "md" | "lg" | "xl";

const blurMap: Record<Intensity, string> = {
  none: "0px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "40px",
};

const shadowMap: Record<Intensity, string> = {
  none: "none",
  sm: "0 4px 16px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
  md: "0 8px 32px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
  lg: "0 16px 48px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  xl: "0 24px 64px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
};

const glowMap: Record<Intensity, string> = {
  none: "none",
  sm: "0 0 20px rgba(75, 140, 255, 0.08)",
  md: "0 0 32px rgba(75, 140, 255, 0.14)",
  lg: "0 0 48px rgba(75, 140, 255, 0.2)",
  xl: "0 0 64px rgba(75, 140, 255, 0.28)",
};

export interface LiquidGlassCardProps
  extends Omit<React.ComponentProps<typeof motion.div>, "children"> {
  children: React.ReactNode;
  blurIntensity?: Intensity;
  shadowIntensity?: Intensity;
  glowIntensity?: Intensity;
  borderRadius?: string;
  draggable?: boolean;
  expandable?: boolean;
}

export function LiquidGlassCard({
  children,
  className,
  blurIntensity = "md",
  shadowIntensity = "md",
  glowIntensity = "sm",
  borderRadius = "16px",
  draggable = false,
  expandable = false,
  style,
  ...props
}: LiquidGlassCardProps) {
  const filterId = React.useId().replace(/:/g, "");
  const [expanded, setExpanded] = React.useState(false);
  const constraintsRef = React.useRef<HTMLDivElement>(null);

  const blur = blurMap[blurIntensity];
  const boxShadow = [shadowMap[shadowIntensity], glowMap[glowIntensity]]
    .filter((s) => s !== "none")
    .join(", ");

  const cardContent = (
    <>
      <svg
        aria-hidden
        className="pointer-events-none absolute size-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id={`liquid-glass-${filterId}`}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.012"
              numOctaves="3"
              seed="5"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          borderRadius,
          filter: `url(#liquid-glass-${filterId})`,
          backdropFilter: `blur(${blur})`,
          WebkitBackdropFilter: `blur(${blur})`,
          opacity: 0.55,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius,
          background:
            "linear-gradient(145deg, rgba(75,140,255,0.1) 0%, rgba(255,255,255,0.04) 45%, rgba(75,140,255,0.05) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.09)",
          boxShadow: boxShadow || undefined,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ borderRadius }}
      />

      {expandable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((v) => !v);
          }}
          className="absolute top-3 right-3 z-20 flex size-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
          aria-label={expanded ? "Collapse card" : "Expand card"}
        >
          {expanded ? (
            <Minimize2 className="size-3.5" />
          ) : (
            <Maximize2 className="size-3.5" />
          )}
        </button>
      )}

      <div className="relative z-10">{children}</div>
    </>
  );

  const motionProps = {
    layout: expandable,
    drag: draggable && !expanded,
    dragConstraints: constraintsRef,
    dragElastic: 0.12,
    dragMomentum: false,
    whileDrag: draggable ? { scale: 1.02, cursor: "grabbing" } : undefined,
    whileHover: { borderColor: "rgba(255,255,255,0.14)" },
    transition: {
      type: "spring" as const,
      stiffness: 380,
      damping: 28,
    },
    className: cn(
      "group/liquid-glass relative overflow-hidden",
      draggable && !expanded && "cursor-grab active:cursor-grabbing",
      expanded && "z-50",
      className,
    ),
    style: {
      borderRadius,
      backdropFilter: `blur(${blur})`,
      WebkitBackdropFilter: `blur(${blur})`,
      boxShadow: boxShadow || undefined,
      ...style,
    },
    ...props,
  };

  return (
    <div ref={constraintsRef} className="relative">
      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="fixed inset-4 z-50 flex items-stretch sm:inset-8"
          >
            <motion.div
              {...motionProps}
              className={cn(motionProps.className, "h-full w-full")}
              style={{
                ...motionProps.style,
                borderRadius: "20px",
              }}
            >
              {cardContent}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div key="collapsed" {...motionProps}>
            {cardContent}
          </motion.div>
        )}
      </AnimatePresence>

      {expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setExpanded(false)}
          aria-hidden
        />
      )}
    </div>
  );
}
