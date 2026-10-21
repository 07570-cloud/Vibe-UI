-- ==========================================
-- Schema for Vibe UI Show (Next.js + Supabase)
-- ==========================================

-- 1. Create table for HTML vibes
CREATE TABLE IF NOT EXISTS public.vibes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    author_name TEXT NOT NULL DEFAULT 'Anonymous',
    file_name TEXT NOT NULL,
    file_size INTEGER DEFAULT 0,
    html_code TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    likes_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.vibes ENABLE ROW LEVEL SECURITY;

-- 3. Set up access policies
-- Read policy: Anyone can view vibes
CREATE POLICY "Public vibes are viewable by everyone"
ON public.vibes
FOR SELECT
USING (true);

-- Insert policy: Anyone can upload a new HTML vibe
CREATE POLICY "Anyone can insert vibes"
ON public.vibes
FOR INSERT
WITH CHECK (true);

-- Update policy: Allow updating views and likes
CREATE POLICY "Anyone can update vibe stats"
ON public.vibes
FOR UPDATE
USING (true);

-- Delete policy: Admin or public deletion
CREATE POLICY "Anyone can delete vibes"
ON public.vibes
FOR DELETE
USING (true);

-- Optional: RPC function for atomic like increments
CREATE OR REPLACE FUNCTION increment_likes(row_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.vibes
  SET likes_count = likes_count + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
