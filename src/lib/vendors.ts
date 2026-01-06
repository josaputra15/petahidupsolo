import { supabase, type DatabaseVendor } from './supabase';
import type { Vendor } from '@/data/vendors';

// Convert database vendor to app vendor format
const dbToVendor = (db: DatabaseVendor): Vendor => ({
  id: db.id,
  slug: db.slug,
  name: db.name,
  age: db.age,
  vendorType: db.vendor_type,
  sells: db.sells,
  story: db.story,
  photos: db.photos,
  location: {
    lat: Number(db.location_lat),
    lng: Number(db.location_lng),
    addressText: db.location_address,
  },
  radiusMeters: db.radius_meters,
  tags: db.tags,
  createdAt: db.created_at,
});

// Convert app vendor to database format
const vendorToDb = (vendor: Omit<Vendor, 'id' | 'createdAt'> & { id?: string }): Omit<DatabaseVendor, 'id' | 'created_at' | 'updated_at'> => ({
  slug: vendor.slug,
  name: vendor.name,
  age: vendor.age,
  vendor_type: vendor.vendorType,
  sells: vendor.sells,
  story: vendor.story,
  photos: vendor.photos,
  location_lat: vendor.location.lat,
  location_lng: vendor.location.lng,
  location_address: vendor.location.addressText,
  radius_meters: vendor.radiusMeters,
  tags: vendor.tags,
  is_active: true,
});

// Fetch all active vendors
export const fetchVendors = async (): Promise<Vendor[]> => {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }

  return data.map(dbToVendor);
};

// Fetch vendor by slug
export const fetchVendorBySlug = async (slug: string): Promise<Vendor | null> => {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    console.error('Error fetching vendor:', error);
    throw error;
  }

  return dbToVendor(data);
};

// Create new vendor (admin only)
export const createVendor = async (vendor: Omit<Vendor, 'id' | 'createdAt'>): Promise<Vendor> => {
  const dbVendor = vendorToDb(vendor);
  
  const { data, error } = await supabase
    .from('vendors')
    .insert(dbVendor)
    .select()
    .single();

  if (error) {
    console.error('Error creating vendor:', error);
    throw error;
  }

  return dbToVendor(data);
};

// Update vendor (admin only)
export const updateVendor = async (id: string, vendor: Partial<Omit<Vendor, 'id' | 'createdAt'>>): Promise<Vendor> => {
  const updates: Partial<DatabaseVendor> = {};
  
  if (vendor.slug !== undefined) updates.slug = vendor.slug;
  if (vendor.name !== undefined) updates.name = vendor.name;
  if (vendor.age !== undefined) updates.age = vendor.age;
  if (vendor.vendorType !== undefined) updates.vendor_type = vendor.vendorType;
  if (vendor.sells !== undefined) updates.sells = vendor.sells;
  if (vendor.story !== undefined) updates.story = vendor.story;
  if (vendor.photos !== undefined) updates.photos = vendor.photos;
  if (vendor.location !== undefined) {
    updates.location_lat = vendor.location.lat;
    updates.location_lng = vendor.location.lng;
    updates.location_address = vendor.location.addressText;
  }
  if (vendor.radiusMeters !== undefined) updates.radius_meters = vendor.radiusMeters;
  if (vendor.tags !== undefined) updates.tags = vendor.tags;

  const { data, error } = await supabase
    .from('vendors')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating vendor:', error);
    throw error;
  }

  return dbToVendor(data);
};

// Delete vendor (admin only - soft delete by setting is_active to false)
export const deleteVendor = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('vendors')
    .update({ is_active: false })
    .eq('id', id);

  if (error) {
    console.error('Error deleting vendor:', error);
    throw error;
  }
};

// Upload image to Supabase Storage
export const uploadVendorImage = async (file: File, vendorSlug: string, imageIndex: number): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${vendorSlug}-${imageIndex}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('vendor-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    console.error('Error uploading image:', error);
    throw error;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('vendor-images')
    .getPublicUrl(data.path);

  return publicUrl;
};

// Delete image from Supabase Storage
export const deleteVendorImage = async (imageUrl: string): Promise<void> => {
  // Extract file path from URL
  const urlParts = imageUrl.split('/');
  const fileName = urlParts[urlParts.length - 1];

  const { error } = await supabase.storage
    .from('vendor-images')
    .remove([fileName]);

  if (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

