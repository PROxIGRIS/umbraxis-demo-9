import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { LevelInfo } from "@/types/gamification";
import { Trophy, Star } from "lucide-react";

interface LevelDisplayProps {
  levelInfo: LevelInfo;
  showTitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LevelDisplay = ({ 
  levelInfo, 
  showTitle = true, 
  size = 'md',
  className = "" 
}: LevelDisplayProps) => {
  const sizeClasses = {
    sm: "text-sm px-3 py-1",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-2.5"
  };

  const iconSize = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Badge 
          className={`${sizeClasses[size]} bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 font-bold shadow-lg`}
        >
          <Trophy className={`${iconSize[size]} mr-1.5`} />
          Level {levelInfo.level}
        </Badge>
      </motion.div>
      
      {showTitle && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-1"
        >
          <Star className={`${iconSize[size]} text-yellow-500`} />
          <span className={`font-semibold text-muted-foreground ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}`}>
            {levelInfo.title}
          </span>
        </motion.div>
      )}
    </div>
  );
};
