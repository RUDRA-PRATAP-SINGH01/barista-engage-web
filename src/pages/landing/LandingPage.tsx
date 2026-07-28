import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LandingBackground } from "@/features/landing/LandingBackground";
import { LandingCta } from "@/features/landing/LandingCta";
import { LandingHero } from "@/features/landing/LandingHero";
import { LandingNavbar } from "@/features/landing/LandingNavbar";

export function LandingPage() {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  const handleEnter = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    window.setTimeout(() => {
      navigate("/dashboard");
    }, 420);
  }, [exiting, navigate]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background text-foreground">
      <LandingBackground />
      <LandingNavbar />

      <main className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center pt-20">
          <LandingHero exiting={exiting} />
          <div className="mt-10">
            <LandingCta onEnter={handleEnter} exiting={exiting} />
          </div>
        </div>
      </main>
    </div>
  );
}
