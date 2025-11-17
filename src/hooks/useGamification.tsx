import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserGamification, Theme, LevelInfo } from "@/types/gamification";
import { 
  getLevelInfo, 
  calculateQuizXP, 
  getLevelFromXP,
  isThemeUnlocked 
} from "@/utils/gamificationUtils";
import { useToast } from "@/hooks/use-toast";

export const useGamification = () => {
  const [userGamification, setUserGamification] = useState<UserGamification | null>(null);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [unlockedThemes, setUnlockedThemes] = useState<string[]>([]);
  const [levelInfo, setLevelInfo] = useState<LevelInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user gamification data
  const fetchGamificationData = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      // Fetch user gamification stats
      const { data: gamData, error: gamError } = await supabase
        .from('user_gamification')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (gamError && gamError.code !== 'PGRST116') {
        console.error('Error fetching gamification data:', gamError);
      }

      if (gamData) {
        setUserGamification(gamData);
        setLevelInfo(getLevelInfo(gamData.xp));
      }

      // Fetch all themes
      const { data: themesData, error: themesError } = await supabase
        .from('themes')
        .select('*')
        .order('unlock_value', { ascending: true });

      if (themesError) {
        console.error('Error fetching themes:', themesError);
      } else {
        setThemes((themesData || []) as Theme[]);
      }

      // Fetch unlocked themes
      const { data: unlockedData, error: unlockedError } = await supabase
        .from('user_unlocked_themes')
        .select('theme_id, themes(name)')
        .eq('user_id', user.id);

      if (unlockedError) {
        console.error('Error fetching unlocked themes:', unlockedError);
      } else {
        const unlockedNames = unlockedData?.map((u: any) => u.themes?.name).filter(Boolean) || [];
        setUnlockedThemes(unlockedNames);
      }

    } catch (error) {
      console.error('Error in fetchGamificationData:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGamificationData();
  }, [fetchGamificationData]);

  // Award XP for completing a quiz
  const awardQuizXP = useCallback(async (
    score: number,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    questionsCount: number
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !userGamification) return null;

      const xpEarned = calculateQuizXP(score, difficulty, questionsCount);
      const newTotalXP = userGamification.xp + xpEarned;
      const oldLevel = userGamification.level;
      const newLevel = getLevelFromXP(newTotalXP);
      const leveledUp = newLevel > oldLevel;

      // Update user gamification
      const { error: updateError } = await supabase
        .from('user_gamification')
        .update({
          xp: newTotalXP,
          level: newLevel,
          total_quizzes_taken: userGamification.total_quizzes_taken + 1,
          highest_score: Math.max(score, userGamification.highest_score)
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      // Record XP transaction
      await supabase.from('xp_transactions').insert({
        user_id: user.id,
        xp_amount: xpEarned,
        source: 'quiz',
        source_details: { score, difficulty, questionsCount }
      });

      // Check for newly unlocked themes
      const newlyUnlocked: Theme[] = [];
      for (const theme of themes) {
        if (!unlockedThemes.includes(theme.name)) {
          const unlocked = isThemeUnlocked(theme, {
            level: newLevel,
            xp: newTotalXP,
            highest_score: Math.max(score, userGamification.highest_score)
          });

          if (unlocked) {
            await supabase.from('user_unlocked_themes').insert({
              user_id: user.id,
              theme_id: theme.id
            });
            newlyUnlocked.push(theme);
          }
        }
      }

      // Refresh data
      await fetchGamificationData();

      return {
        xpEarned,
        leveledUp,
        newLevel,
        newlyUnlockedThemes: newlyUnlocked
      };

    } catch (error) {
      console.error('Error awarding XP:', error);
      toast({
        title: "Error",
        description: "Failed to update XP. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  }, [userGamification, themes, unlockedThemes, fetchGamificationData, toast]);

  // Change theme
  const changeTheme = useCallback(async (themeName: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !userGamification) return;

      const { error } = await supabase
        .from('user_gamification')
        .update({ current_theme: themeName })
        .eq('user_id', user.id);

      if (error) throw error;

      // Apply theme to document
      const theme = themes.find(t => t.name === themeName);
      if (theme) {
        applyThemeColors(theme);
      }

      await fetchGamificationData();

      toast({
        title: "Theme Changed",
        description: `Successfully applied ${themes.find(t => t.name === themeName)?.display_name}`,
      });

    } catch (error) {
      console.error('Error changing theme:', error);
      toast({
        title: "Error",
        description: "Failed to change theme",
        variant: "destructive"
      });
    }
  }, [userGamification, themes, fetchGamificationData, toast]);

  // Apply theme colors to CSS variables
  const applyThemeColors = (theme: Theme) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary_color);
    root.style.setProperty('--secondary', theme.secondary_color);
    root.style.setProperty('--accent', theme.accent_color);
  };

  // Apply current theme on load
  useEffect(() => {
    if (userGamification && themes.length > 0) {
      const currentTheme = themes.find(t => t.name === userGamification.current_theme);
      if (currentTheme) {
        applyThemeColors(currentTheme);
      }
    }
  }, [userGamification, themes]);

  return {
    userGamification,
    themes,
    unlockedThemes,
    levelInfo,
    isLoading,
    awardQuizXP,
    changeTheme,
    refreshData: fetchGamificationData
  };
};
