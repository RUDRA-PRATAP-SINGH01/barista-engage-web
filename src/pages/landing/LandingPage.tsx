import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LandingBackground } from "@/features/landing/LandingBackground";
import { LandingHero } from "@/features/landing/LandingHero";
import { LandingNavbar } from "@/features/landing/LandingNavbar";
import { LayeredCenterpiece } from "@/features/landing/LayeredCenterpiece";

export function LandingPage() {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  const handleEnter = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    window.setTimeout(() => {
      navigate("/dashboard");
    }, 520);
  }, [exiting, navigate]);

  return (
    <div className="landing-page relative h-screen w-full overflow-hidden">
      <LandingBackground />
      <LandingNavbar />

      <main className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center pt-24 pb-[min(38vh,340px)]">
          <LandingHero exiting={exiting} />
        </div>

        <div className="absolute inset-x-0 bottom-0 px-4 pb-6">
          <LayeredCenterpiece onEnter={handleEnter} exiting={exiting} />
        </div>
      </main>
    </div>
  );
}
