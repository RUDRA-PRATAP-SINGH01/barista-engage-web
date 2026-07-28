import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-context";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = async () => {
    const next = resolvedTheme === "light" ? "dark" : "light";

    const apply = () => setTheme(next);

    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => {
        ready: Promise<void>;
      };
    };

    if (!doc.startViewTransition) {
      apply();
      return;
    }

    const transition = doc.startViewTransition(apply);
    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: ["inset(0 0 100% 0)", "inset(0)"],
      },
      {
        duration: 800,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  if (!isMounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="size-10 rounded-full"
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="size-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-10 rounded-full hover:bg-primary/5"
      aria-label={
        resolvedTheme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      onClick={toggleTheme}
    >
      {resolvedTheme === "light" ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}
    </Button>
  );
}
