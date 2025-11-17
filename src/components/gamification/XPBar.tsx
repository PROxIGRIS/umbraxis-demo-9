import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { LevelInfo } from "@/types/gamification";
import { formatXP, calculateXPForLevel } from "@/utils/gamificationUtils";
import { Zap } from "lucide-react";

interface XPBarProps {
  levelInfo: LevelInfo;
  className?: string;
}

export const XPBar = ({ levelInfo, className = "" }: XPBarProps) => {
  const xpNeeded = calculateXPForLevel(levelInfo.level);

  return (
    <motion.div
      className={`bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium">XP Progress</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatXP(levelInfo.currentXP)} / {formatXP(xpNeeded)} XP
        </span>
      </div>
      
      <div className="relative">
        <Progress value={levelInfo.progress} className="h-3" />
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${levelInfo.progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ maxWidth: '100%' }}
        />
      </div>
      
      <div className="mt-2 text-xs text-center text-muted-foreground">
        {Math.floor(levelInfo.progress)}% to Level {levelInfo.level + 1}
      </div>
    </motion.div>
  );
};
