-- Create gamification tables

-- User gamification progress
CREATE TABLE IF NOT EXISTS public.user_gamification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  total_quizzes_taken INTEGER NOT NULL DEFAULT 0,
  highest_score INTEGER NOT NULL DEFAULT 0,
  total_study_time_minutes INTEGER NOT NULL DEFAULT 0,
  current_theme TEXT NOT NULL DEFAULT 'default',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Themes definition
CREATE TABLE IF NOT EXISTS public.themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  description TEXT NOT NULL,
  unlock_requirement TEXT NOT NULL, -- 'level', 'xp', 'score'
  unlock_value INTEGER NOT NULL,
  primary_color TEXT NOT NULL,
  secondary_color TEXT NOT NULL,
  accent_color TEXT NOT NULL,
  preview_image TEXT,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User unlocked themes
CREATE TABLE IF NOT EXISTS public.user_unlocked_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  theme_id UUID REFERENCES public.themes(id) ON DELETE CASCADE NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, theme_id)
);

-- XP history for tracking
CREATE TABLE IF NOT EXISTS public.xp_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  xp_amount INTEGER NOT NULL,
  source TEXT NOT NULL, -- 'quiz', 'achievement', 'daily_login', 'bonus'
  source_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_unlocked_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_gamification
CREATE POLICY "Users can view their own gamification data"
  ON public.user_gamification FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own gamification data"
  ON public.user_gamification FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gamification data"
  ON public.user_gamification FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for themes (everyone can view)
CREATE POLICY "Anyone can view themes"
  ON public.themes FOR SELECT
  USING (true);

-- RLS Policies for user_unlocked_themes
CREATE POLICY "Users can view their own unlocked themes"
  ON public.user_unlocked_themes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own unlocked themes"
  ON public.user_unlocked_themes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for xp_transactions
CREATE POLICY "Users can view their own XP transactions"
  ON public.xp_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own XP transactions"
  ON public.xp_transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_user_gamification_updated_at
  BEFORE UPDATE ON public.user_gamification
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert default themes
INSERT INTO public.themes (name, display_name, description, unlock_requirement, unlock_value, primary_color, secondary_color, accent_color, is_premium) VALUES
  ('default', 'Classic Blue', 'The default theme - clean and professional', 'level', 0, '221.2 83.2% 53.3%', '217.2 91.2% 59.8%', '210 40% 96.1%', false),
  ('midnight', 'Midnight Purple', 'Deep purple hues for night owls', 'level', 3, '263 70% 50%', '270 60% 40%', '280 65% 60%', false),
  ('emerald', 'Emerald Forest', 'Fresh green tones for focus', 'level', 5, '142.1 76.2% 36.3%', '160 84% 39%', '151 55% 41.5%', false),
  ('sunset', 'Sunset Orange', 'Warm orange gradients', 'xp', 1000, '24.6 95% 53.1%', '20.5 90.6% 48.2%', '27.9 96% 61%', false),
  ('ocean', 'Ocean Blue', 'Calm ocean depths', 'xp', 2500, '199 89% 48%', '204 94% 44%', '195 80% 52%', false),
  ('crimson', 'Crimson Fire', 'Bold red energy', 'score', 90, '0 72% 51%', '348 83% 47%', '356 75% 53%', false),
  ('gold', 'Golden Crown', 'Luxurious gold shine', 'level', 10, '45 93% 47%', '38 92% 50%', '43 100% 51%', true),
  ('aurora', 'Aurora Borealis', 'Mystical northern lights', 'xp', 5000, '180 62% 55%', '200 80% 45%', '220 70% 50%', true);

-- Function to automatically create gamification profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user_gamification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_gamification (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

-- Trigger to create gamification profile on user signup
CREATE TRIGGER on_auth_user_created_gamification
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_gamification();