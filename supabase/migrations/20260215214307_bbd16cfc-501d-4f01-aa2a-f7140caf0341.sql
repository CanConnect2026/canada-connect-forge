
-- Table to store rotating video tips
CREATE TABLE public.video_tips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  platform TEXT NOT NULL DEFAULT 'youtube',
  social_channel_url TEXT,
  social_channel_label TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.video_tips ENABLE ROW LEVEL SECURITY;

-- Anyone can view active tips
CREATE POLICY "Anyone can view active video tips"
  ON public.video_tips FOR SELECT
  USING (is_active = true);

-- Admins can manage
CREATE POLICY "Admins can manage video tips"
  ON public.video_tips FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Timestamp trigger
CREATE TRIGGER update_video_tips_updated_at
  BEFORE UPDATE ON public.video_tips
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
