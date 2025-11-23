import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { X, Clock, Sparkles } from "lucide-react";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface BannerContent {
  id: string;
  title: string;
  description: string;
  button_text: string | null;
  button_link: string | null;
  button_enabled: boolean;
  countdown_enabled: boolean;
  countdown_end_at: string | null;
  lottie_url: string;
}

export const UrgencyBanner = () => {
  const navigate = useNavigate();
  const LS_SHOWN_KEY = "urgencyBanner:shown";
  const [bannerContent, setBannerContent] = useState<BannerContent | null>(null);

  const [isVisible, setIsVisible] = useState(false);
    try {
      return typeof window !== "undefined" && !localStorage.getItem(LS_SHOWN_KEY);
    } catch {
      return true;
    }
  });

  // Fetch banner content from database
  useEffect(() => {
    const fetchBanner = async () => {
      const { data, error } = await supabase
        .from("banner_content")
        .select("*")
        .eq("is_active", true)
        .single();

      if (!error && data) {
        setBannerContent(data);
      }
    };

    fetchBanner();
  }, []);

  // Lottie animation data
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    if (!bannerContent?.lottie_url) return;
    
    let cancelled = false;
    fetch(bannerContent.lottie_url)
      .then((r) => r.json())
      .then((data) => !cancelled && setAnimationData(data))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [bannerContent]);

  const computeLeft = (msLeft) => {
    if (msLeft <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true };
    const totalSeconds = Math.floor(msLeft / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds, expired: false };
  };

  const [timeLeft, setTimeLeft] = useState(() => computeLeft(0));

  useEffect(() => {
    if (!isVisible || !bannerContent?.countdown_enabled || !bannerContent?.countdown_end_at) return;
    
    const endTime = new Date(bannerContent.countdown_end_at).getTime();
    
    const tick = () => {
      const left = computeLeft(endTime - Date.now());
      setTimeLeft(left);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isVisible, bannerContent]);

  const handleClose = (persist = true) => {
    try {
      if (persist) localStorage.setItem(LS_SHOWN_KEY, "true");
    } catch {}
    setIsVisible(false);
  };

  const handleCTAClick = () => {
    handleClose(true);
    
    if (!bannerContent?.button_link) return;
    
    // Check if it's an internal anchor link
    if (bannerContent.button_link.startsWith("#")) {
      const el = document.getElementById(bannerContent.button_link.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } 
    // Check if it's an internal route
    else if (bannerContent.button_link.startsWith("/")) {
      navigate(bannerContent.button_link);
    }
    // External link
    else {
      window.open(bannerContent.button_link, "_blank", "noopener,noreferrer");
    }
  };

  const formatted = useMemo(() => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`;
  }, [timeLeft]);

  if (!isVisible || !bannerContent) return null;

  return (
    <AlertDialog open={isVisible} onOpenChange={() => handleClose(true)}>
      <AlertDialogContent className="p-0 border-0 overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-gradient-to-br from-background via-secondary to-background w-[90vw] max-w-[90vw] sm:max-w-2xl md:max-w-3xl border-2 border-primary/20">
        <VisuallyHidden>
          <AlertDialogTitle>{bannerContent.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {bannerContent.description}
          </AlertDialogDescription>
        </VisuallyHidden>
        
        {/* Close button */}
        <button
          onClick={() => handleClose(true)}
          className="absolute top-4 right-4 z-50 text-foreground/70 hover:text-foreground transition-all hover:scale-110"
          aria-label="Close offer"
        >
          <X className="w-5 h-5" />
        </button>

        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-4 sm:gap-6 p-4 sm:p-6 md:p-10"
          >
            {/* Left side - Lottie animation */}
            <div className="flex justify-center items-center relative min-h-[120px] sm:min-h-[160px]">
              {animationData && (
                <Lottie
                  animationData={animationData}
                  loop
                  autoplay
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 drop-shadow-2xl"
                />
              )}
              <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent blur-3xl" />
            </div>

            {/* Right side - Text & CTA */}
            <div className="space-y-4 text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight"
              >
                {bannerContent.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-foreground/80 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed"
              >
                {bannerContent.description}
              </motion.p>

              {/* Timer */}
              {bannerContent.countdown_enabled && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 }}
                  className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 bg-primary/10 border-2 border-primary/20 rounded-full px-3 sm:px-5 py-1.5 sm:py-2 backdrop-blur-sm"
                >
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="font-mono text-base sm:text-lg md:text-xl font-bold text-primary">
                    {formatted}
                  </span>
                </motion.div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pt-2 sm:pt-3">
                {bannerContent.button_enabled && bannerContent.button_text && (
                  <Button
                    onClick={handleCTAClick}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:scale-105 rounded-full px-4 sm:px-8 py-4 sm:py-6 w-full sm:w-auto text-sm sm:text-base group"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {bannerContent.button_text}
                  </Button>
                )}

                <button
                  onClick={() => handleClose(false)}
                  className="text-foreground/60 hover:text-foreground text-xs sm:text-sm underline underline-offset-2 transition-all hover:scale-105"
                >
                  Remind me later
                </button>
              </div>
            </div>
          </motion.div>

        
        {/* Ambient glow background - matching hero */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      </AlertDialogContent>
    </AlertDialog>
  );
};
