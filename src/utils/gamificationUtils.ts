import { LevelInfo } from "@/types/gamification";

// XP calculation formulas
export const calculateXPForLevel = (level: number): number => {
  // Exponential growth: 100 * (1.5 ^ (level - 1))
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

export const calculateTotalXPForLevel = (level: number): number => {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += calculateXPForLevel(i);
  }
  return total;
};

export const getLevelFromXP = (xp: number): number => {
  let level = 1;
  let requiredXP = 0;
  
  while (xp >= requiredXP + calculateXPForLevel(level)) {
    requiredXP += calculateXPForLevel(level);
    level++;
  }
  
  return level;
};

export const getLevelInfo = (totalXP: number): LevelInfo => {
  const level = getLevelFromXP(totalXP);
  const xpForCurrentLevel = calculateTotalXPForLevel(level);
  const xpForNextLevel = calculateTotalXPForLevel(level + 1);
  const currentXP = totalXP - xpForCurrentLevel;
  const requiredXP = xpForNextLevel - xpForCurrentLevel;
  const progress = (currentXP / requiredXP) * 100;

  return {
    level,
    currentXP,
    xpForCurrentLevel,
    xpForNextLevel,
    progress,
    title: getLevelTitle(level)
  };
};

export const getLevelTitle = (level: number): string => {
  if (level >= 50) return "🏆 Grand Master";
  if (level >= 40) return "👑 Legend";
  if (level >= 30) return "⭐ Master";
  if (level >= 20) return "💎 Expert";
  if (level >= 15) return "🔥 Advanced";
  if (level >= 10) return "⚡ Proficient";
  if (level >= 7) return "🎯 Skilled";
  if (level >= 5) return "📚 Learner";
  if (level >= 3) return "🌱 Beginner";
  return "🥚 Novice";
};

// Calculate XP earned from a quiz
export const calculateQuizXP = (
  score: number,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  questionsCount: number
): number => {
  // Base XP calculation
  let baseXP = Math.floor((score / 100) * questionsCount * 10);
  
  // Difficulty multiplier
  const difficultyMultiplier = {
    beginner: 1.0,
    intermediate: 1.5,
    advanced: 2.0
  };
  
  baseXP = Math.floor(baseXP * difficultyMultiplier[difficulty]);
  
  // Bonus for perfect score
  if (score === 100) {
    baseXP += 50;
  } else if (score >= 90) {
    baseXP += 25;
  }
  
  // Minimum XP
  return Math.max(baseXP, 10);
};

// Check if theme is unlocked
export const isThemeUnlocked = (
  theme: { unlock_requirement: string; unlock_value: number },
  userStats: { level: number; xp: number; highest_score: number }
): boolean => {
  switch (theme.unlock_requirement) {
    case 'level':
      return userStats.level >= theme.unlock_value;
    case 'xp':
      return userStats.xp >= theme.unlock_value;
    case 'score':
      return userStats.highest_score >= theme.unlock_value;
    default:
      return false;
  }
};

// Format XP with commas
export const formatXP = (xp: number): string => {
  return xp.toLocaleString();
};
