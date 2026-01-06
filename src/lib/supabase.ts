import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a dummy client if env vars are missing (for development)
// This prevents the app from crashing, but Supabase operations will fail gracefully
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

// Database types (will match our schema)
export interface DatabaseVendor {
  id: string;
  slug: string;
  name: string;
  age?: number;
  vendor_type: string;
  sells: string[];
  story: string;
  photos: string[];
  location_lat: number;
  location_lng: number;
  location_address: string;
  radius_meters: number;
  tags: string[];
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

