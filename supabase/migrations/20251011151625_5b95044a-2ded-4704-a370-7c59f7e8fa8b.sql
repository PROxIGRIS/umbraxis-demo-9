-- Create role enum for user types
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create banner_content table
CREATE TABLE public.banner_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  button_text TEXT,
  button_link TEXT,
  button_enabled BOOLEAN DEFAULT true,
  countdown_enabled BOOLEAN DEFAULT true,
  countdown_end_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  lottie_url TEXT DEFAULT 'https://assets8.lottiefiles.com/packages/lf20_jbrw3hcz.json',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on banner_content
ALTER TABLE public.banner_content ENABLE ROW LEVEL SECURITY;

-- RLS policies for banner_content
CREATE POLICY "Anyone can view active banner"
ON public.banner_content
FOR SELECT
TO authenticated, anon
USING (is_active = true);

CREATE POLICY "Only admins can manage banner"
ON public.banner_content
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER banner_content_updated_at
BEFORE UPDATE ON public.banner_content
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert default banner content
INSERT INTO public.banner_content (
  title,
  description,
  button_text,
  button_link,
  button_enabled,
  countdown_end_at
) VALUES (
  'Limited-Time Launch Offer',
  'Get your first tuition session at 50% OFF. Experience personalized one-on-one tutoring that inspires confidence and boosts grades.',
  'Claim Your 50% Now',
  '#pricing',
  true,
  now() + interval '24 hours'
);