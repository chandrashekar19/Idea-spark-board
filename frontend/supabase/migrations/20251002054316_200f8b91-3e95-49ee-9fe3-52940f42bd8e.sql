-- Create ideas table for storing user-submitted ideas
CREATE TABLE public.ideas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL CHECK (char_length(text) <= 280),
  upvotes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (anyone can read)
CREATE POLICY "Anyone can view ideas" 
ON public.ideas 
FOR SELECT 
USING (true);

-- Anyone can insert ideas
CREATE POLICY "Anyone can create ideas" 
ON public.ideas 
FOR INSERT 
WITH CHECK (true);

-- Anyone can update ideas (for upvoting)
CREATE POLICY "Anyone can update ideas" 
ON public.ideas 
FOR UPDATE 
USING (true);

-- Create index for faster queries
CREATE INDEX idx_ideas_created_at ON public.ideas(created_at DESC);