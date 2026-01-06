/**
 * Migration script to import existing vendors from vendors.ts to Supabase
 * 
 * Usage:
 * 1. Make sure you have VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env
 * 2. Run: npx tsx scripts/migrate-vendors.ts
 * 
 * Note: This script will upload images to Supabase Storage and create vendor records.
 * Make sure you're authenticated as an admin user first.
 */

import { createClient } from '@supabase/supabase-js';
import { vendors } from '../src/data/vendors';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function uploadImageToStorage(localPath: string, vendorSlug: string, index: number): Promise<string> {
  const fileName = path.basename(localPath);
  const fileExt = fileName.split('.').pop();
  const storageFileName = `${vendorSlug}-${index}.${fileExt}`;
  
  // Read file
  const fileBuffer = fs.readFileSync(localPath);
  const file = new File([fileBuffer], fileName, { type: `image/${fileExt}` });
  
  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('vendor-images')
    .upload(storageFileName, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    console.error(`Error uploading ${fileName}:`, error);
    throw error;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('vendor-images')
    .getPublicUrl(data.path);

  return publicUrl;
}

async function migrateVendors() {
  console.log('Starting migration...');
  console.log(`Found ${vendors.length} vendors to migrate\n`);

  for (let i = 0; i < vendors.length; i++) {
    const vendor = vendors[i];
    console.log(`[${i + 1}/${vendors.length}] Migrating ${vendor.name}...`);

    try {
      // Upload images if they're local files
      const photoUrls: string[] = [];
      
      for (let j = 0; j < vendor.photos.length; j++) {
        const photo = vendor.photos[j];
        
        // Check if it's a local import (starts with @/components/pictures/)
        if (typeof photo === 'string' && photo.includes('@/components/pictures/')) {
          // This is a local import, we'll need to handle it differently
          // For now, skip or use placeholder
          console.warn(`  Warning: Local image import detected for ${vendor.name} photo ${j + 1}`);
          photoUrls.push(photo); // Keep original for now
        } else if (typeof photo === 'string' && photo.startsWith('http')) {
          // Already a URL, use it
          photoUrls.push(photo);
        } else {
          // Try to find local file
          const localPath = path.join(__dirname, '../src/components/pictures', photo);
          if (fs.existsSync(localPath)) {
            const url = await uploadImageToStorage(localPath, vendor.slug, j);
            photoUrls.push(url);
            console.log(`  Uploaded image ${j + 1}`);
          } else {
            console.warn(`  Could not find image: ${photo}`);
            photoUrls.push(photo); // Keep original
          }
        }
      }

      // Insert vendor into database
      const { data, error } = await supabase
        .from('vendors')
        .insert({
          slug: vendor.slug,
          name: vendor.name,
          age: vendor.age,
          vendor_type: vendor.vendorType,
          sells: vendor.sells,
          story: vendor.story,
          photos: photoUrls,
          location_lat: vendor.location.lat,
          location_lng: vendor.location.lng,
          location_address: vendor.location.addressText,
          radius_meters: vendor.radiusMeters,
          tags: vendor.tags,
          is_active: true,
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          console.log(`  ⚠️  Vendor ${vendor.name} already exists, skipping...`);
        } else {
          throw error;
        }
      } else {
        console.log(`  ✅ Successfully migrated ${vendor.name}`);
      }
    } catch (error: any) {
      console.error(`  ❌ Error migrating ${vendor.name}:`, error.message);
    }
  }

  console.log('\n✅ Migration completed!');
}

// Run migration
migrateVendors().catch(console.error);

