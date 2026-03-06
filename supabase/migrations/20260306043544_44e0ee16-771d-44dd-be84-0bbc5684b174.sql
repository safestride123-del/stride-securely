
-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  blood_group TEXT DEFAULT 'O+',
  date_of_birth DATE,
  gender TEXT DEFAULT 'Female',
  notification_enabled BOOLEAN DEFAULT true,
  location_enabled BOOLEAN DEFAULT true,
  voice_recording_enabled BOOLEAN DEFAULT false,
  dark_mode BOOLEAN DEFAULT false,
  sos_custom_message TEXT DEFAULT 'I am in danger. Please help immediately!',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Emergency contacts
CREATE TABLE public.emergency_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  relation TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own contacts" ON public.emergency_contacts FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Career resources
CREATE TABLE public.career_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  details TEXT,
  eligibility TEXT,
  link TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.career_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read career resources" ON public.career_resources FOR SELECT TO authenticated USING (true);

-- User course progress (cloud-persisted)
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  completed_lessons TEXT[] DEFAULT '{}',
  quiz_scores JSONB DEFAULT '{}',
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  last_activity DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own progress" ON public.user_progress FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Danger reports
CREATE TABLE public.danger_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  location TEXT NOT NULL,
  danger_type TEXT NOT NULL,
  description TEXT,
  is_anonymous BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.danger_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can insert reports" ON public.danger_reports FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can view own reports" ON public.danger_reports FOR SELECT TO authenticated USING (auth.uid() = user_id);
