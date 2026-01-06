-- Peta Hidup Solo Database Schema
-- Run this in your Supabase SQL Editor

-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER,
  vendor_type TEXT NOT NULL CHECK (vendor_type IN ('makanan', 'barang', 'jasa')),
  sells TEXT[] DEFAULT '{}',
  story TEXT NOT NULL,
  photos TEXT[] DEFAULT '{}',
  location_lat NUMERIC(10, 7) NOT NULL,
  location_lng NUMERIC(10, 7) NOT NULL,
  location_address TEXT NOT NULL,
  radius_meters INTEGER DEFAULT 100,
  tags TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_vendors_slug ON vendors(slug);
CREATE INDEX IF NOT EXISTS idx_vendors_vendor_type ON vendors(vendor_type);
CREATE INDEX IF NOT EXISTS idx_vendors_is_active ON vendors(is_active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_vendors_updated_at 
  BEFORE UPDATE ON vendors 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active vendors (public access)
CREATE POLICY "Public can view active vendors"
  ON vendors FOR SELECT
  USING (is_active = true);

-- Policy: Only authenticated users can insert (we'll restrict to admins later)
CREATE POLICY "Authenticated users can insert vendors"
  ON vendors FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Only authenticated users can update
CREATE POLICY "Authenticated users can update vendors"
  ON vendors FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can delete
CREATE POLICY "Authenticated users can delete vendors"
  ON vendors FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create storage bucket for vendor images
INSERT INTO storage.buckets (id, name, public)
VALUES ('vendor-images', 'vendor-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: Anyone can view images
CREATE POLICY "Public can view vendor images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'vendor-images');

-- Storage policy: Authenticated users can upload images
CREATE POLICY "Authenticated users can upload vendor images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'vendor-images' AND auth.role() = 'authenticated');

-- Storage policy: Authenticated users can update images
CREATE POLICY "Authenticated users can update vendor images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'vendor-images' AND auth.role() = 'authenticated');

-- Storage policy: Authenticated users can delete images
CREATE POLICY "Authenticated users can delete vendor images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'vendor-images' AND auth.role() = 'authenticated');

