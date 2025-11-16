import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Theme, UserGamification } from "@/types/gamification";
import { isThemeUnlocked } from "@/utils/gamificationUtils";
import { Palette, Lock, Check, Crown, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ThemeSelectorProps {
  themes: Theme[];
  unlockedThemes: string[];
  currentTheme: string;
  userStats: Pick<UserGamification, 'level' | 'xp' | 'highest_score'>;
  onThemeChange: (themeName: string) => void;
}

export const ThemeSelector = ({ 
  themes, 
  unlockedThemes, 
  currentTheme,
  userStats,
  onThemeChange 
}: ThemeSelectorProps) => {
  const [open, setOpen] = useState(false);

  const getUnlockText = (theme: Theme) => {
    switch (theme.unlock_requirement) {
      case 'level':
        return `Level ${theme.unlock_value}`;
      case 'xp':
        return `${theme.unlock_value} XP`;
      case 'score':
        return `${theme.unlock_value}% Score`;
      default:
        return '';
    }
  };

  const handleThemeSelect = (themeName: string) => {
    onThemeChange(themeName);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="w-4 h-4" />
          Themes
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Theme Collection
          </DialogTitle>
          <DialogDescription>
            Unlock new themes by leveling up and achieving high scores
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {themes.map((theme, idx) => {
              const unlocked = unlockedThemes.includes(theme.name) || theme.unlock_value === 0;
              const isCurrent = currentTheme === theme.name;
              const canUnlock = !unlocked && isThemeUnlocked(theme, userStats);

              return (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card 
                    className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                      isCurrent ? 'ring-2 ring-primary' : ''
                    } ${!unlocked && !canUnlock ? 'opacity-50' : ''}`}
                    onClick={() => unlocked && handleThemeSelect(theme.name)}
                  >
                    {/* Theme Preview */}
                    <div 
                      className="h-20 rounded-lg mb-3 relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, hsl(${theme.primary_color}), hsl(${theme.secondary_color}))`
                      }}
                    >
                      {theme.is_premium && (
                        <Crown className="absolute top-2 right-2 w-5 h-5 text-yellow-400" />
                      )}
                      {isCurrent && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                          <Badge className="bg-white text-black">
                            <Check className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Theme Info */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{theme.display_name}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {theme.description}
                          </p>
                        </div>
                      </div>

                      {/* Unlock Status */}
                      <div className="flex items-center justify-between">
                        {unlocked ? (
                          <Badge variant="outline" className="text-xs">
                            <Check className="w-3 h-3 mr-1" />
                            Unlocked
                          </Badge>
                        ) : canUnlock ? (
                          <Badge variant="default" className="text-xs bg-green-500">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Ready to Unlock!
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            <Lock className="w-3 h-3 mr-1" />
                            {getUnlockText(theme)}
                          </Badge>
                        )}

                        {theme.is_premium && (
                          <Badge className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500">
                            Premium
                          </Badge>
                        )}
                      </div>

                      {/* Action Button */}
                      {unlocked && !isCurrent && (
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => handleThemeSelect(theme.name)}
                        >
                          Apply Theme
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
