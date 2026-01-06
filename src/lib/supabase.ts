import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

