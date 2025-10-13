-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'tutor')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for profiles
CREATE POLICY "Anyone can view profiles"
ON public.profiles
FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Create trigger for auto-creating profiles
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_profile
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_profile();

-- Create online_classes table
CREATE TABLE public.online_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  meeting_link TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')),
  max_students INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on online_classes
ALTER TABLE public.online_classes ENABLE ROW LEVEL SECURITY;

-- RLS policies for online_classes
CREATE POLICY "Anyone can view scheduled classes"
ON public.online_classes
FOR SELECT
TO authenticated, anon
USING (status != 'cancelled');

CREATE POLICY "Tutors can create classes"
ON public.online_classes
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = tutor_id AND
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'tutor')
);

CREATE POLICY "Tutors can update their own classes"
ON public.online_classes
FOR UPDATE
TO authenticated
USING (
  auth.uid() = tutor_id AND
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'tutor')
)
WITH CHECK (auth.uid() = tutor_id);

CREATE POLICY "Tutors can delete their own classes"
ON public.online_classes
FOR DELETE
TO authenticated
USING (
  auth.uid() = tutor_id AND
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'tutor')
);

-- Create trigger for updated_at on online_classes
CREATE TRIGGER online_classes_updated_at
BEFORE UPDATE ON public.online_classes
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create class_enrollments table
CREATE TABLE public.class_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES public.online_classes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'attended', 'missed')),
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (class_id, student_id)
);

-- Enable RLS on class_enrollments
ALTER TABLE public.class_enrollments ENABLE ROW LEVEL SECURITY;

-- RLS policies for class_enrollments
CREATE POLICY "Students can view their own enrollments"
ON public.class_enrollments
FOR SELECT
TO authenticated
USING (auth.uid() = student_id);

CREATE POLICY "Tutors can view enrollments for their classes"
ON public.class_enrollments
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.online_classes
    WHERE id = class_id AND tutor_id = auth.uid()
  )
);

CREATE POLICY "Students can enroll themselves"
ON public.class_enrollments
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = student_id AND
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'student')
);

CREATE POLICY "Students can update their own enrollments"
ON public.class_enrollments
FOR UPDATE
TO authenticated
USING (auth.uid() = student_id)
WITH CHECK (auth.uid() = student_id);

-- Create indexes for performance
CREATE INDEX idx_online_classes_tutor_id ON public.online_classes(tutor_id);
CREATE INDEX idx_online_classes_scheduled_at ON public.online_classes(scheduled_at);
CREATE INDEX idx_online_classes_status ON public.online_classes(status);
CREATE INDEX idx_class_enrollments_class_id ON public.class_enrollments(class_id);
CREATE INDEX idx_class_enrollments_student_id ON public.class_enrollments(student_id);