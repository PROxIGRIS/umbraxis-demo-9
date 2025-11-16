import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Sparkles, Star, Zap } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { Theme } from "@/types/gamification";

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  newlyUnlockedThemes?: Theme[];
}

export const LevelUpModal = ({ 
  isOpen, 
  onClose, 
  newLevel,
  newlyUnlockedThemes = []
}: LevelUpModalProps) => {
  
  useEffect(() => {
    if (isOpen) {
      // Epic confetti celebration
      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FFA500', '#FF6347']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FFA500', '#FF6347']
        });

        confetti({
          particleCount: 2,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: randomInRange(0.1, 0.9), y: 0.6 },
          colors: ['#667eea', '#764ba2', '#f093fb']
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <motion.div
          className="text-center py-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          {/* Animated Trophy */}
          <motion.div
            className="relative inline-block mb-6"
            animate={{ 
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ duration: 0.8, repeat: 2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-50" />
            <Trophy className="w-24 h-24 text-yellow-500 relative z-10" />
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-orange-500" />
            </motion.div>
          </motion.div>

          {/* Level Up Text */}
          <motion.h2
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            LEVEL UP!
          </motion.h2>
          
          <motion.div
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="text-5xl font-bold text-primary">
              {newLevel}
            </span>
            <Zap className="w-6 h-6 text-orange-500" />
          </motion.div>

          <motion.p
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Congratulations! You've reached a new level!
          </motion.p>

          {/* Newly Unlocked Themes */}
          <AnimatePresence>
            {newlyUnlockedThemes.length > 0 && (
              <motion.div
                className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="font-semibold mb-2 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  New Themes Unlocked!
                </h3>
                <div className="space-y-1">
                  {newlyUnlockedThemes.map((theme, idx) => (
                    <motion.div
                      key={theme.id}
                      className="text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                    >
                      🎨 {theme.display_name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Close Button */}
          <Button
            onClick={onClose}
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Awesome! Continue Learning
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
