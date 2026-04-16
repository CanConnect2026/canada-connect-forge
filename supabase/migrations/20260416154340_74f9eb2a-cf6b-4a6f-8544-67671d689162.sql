
CREATE TABLE public.restaurants (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  cuisine text NOT NULL,
  neighborhood text NOT NULL,
  price_range text NOT NULL DEFAULT '$$',
  halal boolean NOT NULL DEFAULT false,
  kosher boolean NOT NULL DEFAULT false,
  vegetarian_friendly boolean NOT NULL DEFAULT false,
  vegan_friendly boolean NOT NULL DEFAULT false,
  owner_name text,
  owner_home_country text,
  owner_story text,
  latitude double precision,
  longitude double precision,
  full_address text,
  google_places_id text UNIQUE,
  image_url text,
  website text,
  phone text,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published restaurants"
  ON public.restaurants FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage restaurants"
  ON public.restaurants FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_restaurants_updated_at
  BEFORE UPDATE ON public.restaurants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
