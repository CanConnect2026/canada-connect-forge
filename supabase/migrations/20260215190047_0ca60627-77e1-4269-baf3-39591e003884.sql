
-- ========================
-- 1. ENUMS
-- ========================
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.listing_type AS ENUM ('free', 'nonprofit', 'paid');
CREATE TYPE public.claim_status AS ENUM ('unclaimed', 'pending', 'approved', 'rejected');
CREATE TYPE public.verification_status AS ENUM ('unverified', 'verified', 'rejected');

-- ========================
-- 2. PROFILES TABLE
-- ========================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Public profiles are viewable" ON public.profiles FOR SELECT USING (true);

-- ========================
-- 3. USER ROLES TABLE
-- ========================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- ========================
-- 4. LISTINGS TABLE (Core CMS)
-- ========================
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description_en TEXT,
  description_fr TEXT,
  category TEXT NOT NULL,
  province TEXT NOT NULL DEFAULT 'ON',
  city TEXT NOT NULL,
  full_address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  phone TEXT,
  email TEXT,
  website TEXT,
  social_links JSONB DEFAULT '{}',
  services_provided TEXT[],
  opening_hours JSONB DEFAULT '{}',
  pricing_info TEXT,
  logo_url TEXT,
  images TEXT[] DEFAULT '{}',
  listing_type listing_type NOT NULL DEFAULT 'free',
  claim_status claim_status NOT NULL DEFAULT 'unclaimed',
  verification_status verification_status NOT NULL DEFAULT 'unverified',
  languages_served TEXT[] NOT NULL DEFAULT '{"English"}',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  claimed_by UUID REFERENCES auth.users(id),
  external_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Public can read published listings
CREATE POLICY "Anyone can view published listings" ON public.listings FOR SELECT USING (is_published = true);
-- Admins can do anything
CREATE POLICY "Admins can manage all listings" ON public.listings FOR ALL USING (public.has_role(auth.uid(), 'admin'));
-- Claimants can update their own claimed listings
CREATE POLICY "Claimants can update their listings" ON public.listings FOR UPDATE USING (auth.uid() = claimed_by AND claim_status = 'approved');

-- Index for geo queries
CREATE INDEX idx_listings_geo ON public.listings (latitude, longitude) WHERE latitude IS NOT NULL;
CREATE INDEX idx_listings_category ON public.listings (category);
CREATE INDEX idx_listings_city ON public.listings (city);
CREATE INDEX idx_listings_type ON public.listings (listing_type);

-- ========================
-- 5. CLAIMS TABLE
-- ========================
CREATE TABLE public.listing_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  organization_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  proof_description TEXT,
  status claim_status NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  external_circle_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.listing_claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own claims" ON public.listing_claims FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can submit claims" ON public.listing_claims FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage claims" ON public.listing_claims FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- ========================
-- 6. SUGGESTED SERVICES TABLE
-- ========================
CREATE TABLE public.suggested_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_by UUID REFERENCES auth.users(id),
  organization_name TEXT NOT NULL,
  category TEXT,
  city TEXT,
  province TEXT DEFAULT 'ON',
  website TEXT,
  is_free BOOLEAN,
  notes TEXT,
  languages TEXT[],
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.suggested_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit suggestions" ON public.suggested_services FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view their own suggestions" ON public.suggested_services FOR SELECT USING (auth.uid() = submitted_by);
CREATE POLICY "Admins can manage suggestions" ON public.suggested_services FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- ========================
-- 7. AUTO-CREATE PROFILE ON SIGNUP
-- ========================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ========================
-- 8. UPDATED_AT TRIGGER
-- ========================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON public.listings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON public.listing_claims FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
