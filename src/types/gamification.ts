export interface UserGamification {
  id: string;
  user_id: string;
  xp: number;
  level: number;
  total_quizzes_taken: number;
  highest_score: number;
  total_study_time_minutes: number;
  current_theme: string;
  created_at: string;
  updated_at: string;
}

export interface Theme {
  id: string;
  name: string;
  display_name: string;
  description: string;
  unlock_requirement: 'level' | 'xp' | 'score';
  unlock_value: number;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  preview_image?: string;
  is_premium: boolean;
  created_at: string;
}

export interface UserUnlockedTheme {
  id: string;
  user_id: string;
  theme_id: string;
  unlocked_at: string;
}

export interface XPTransaction {
  id: string;
  user_id: string;
  xp_amount: number;
  source: 'quiz' | 'achievement' | 'daily_login' | 'bonus';
  source_details?: any;
  created_at: string;
}

export interface LevelInfo {
  level: number;
  currentXP: number;
  xpForCurrentLevel: number;
  xpForNextLevel: number;
  progress: number; // 0-100
  title: string;
}
