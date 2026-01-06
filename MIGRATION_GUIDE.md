# Migrating Hardcoded Vendors to Supabase

## Current Situation
- You have 8 vendors hardcoded in `src/data/vendors.ts`
- These vendors have local images in `src/components/pictures/`
- Once you add vendors to Supabase, hardcoded ones won't show (no duplicates)

## Option 1: Manual Migration (Recommended for Now)

Since you have images as local files, the easiest way is:

1. **Go to Admin Dashboard**: `https://petahidupsolo.com/admin`
2. **For each hardcoded vendor**:
   - Click "Tambah Vendor"
   - Fill in all the information from `vendors.ts`
   - For images: You'll need to upload them manually through the form
   - The images will be stored in Supabase Storage
3. **After all vendors are migrated**, we can remove hardcoded data

## Option 2: Keep Hardcoded as Backup (Temporary)

If you want to keep hardcoded vendors visible while building up Supabase:

- We can modify the code to show BOTH (Supabase + hardcoded)
- But this could cause duplicates if same vendor exists in both
- Not recommended long-term

## Option 3: Full Migration Script (Advanced)

For bulk migration with image uploads, we'd need to:
1. Upload all local images to Supabase Storage first
2. Get the public URLs
3. Insert vendors with those URLs

This requires more setup but is faster for many vendors.

## Recommended Approach

**For now (8 vendors):**
1. Use Option 1 - manually add through admin interface
2. Upload images through the form (they go to Supabase Storage)
3. Once all migrated, we'll remove hardcoded vendors

**For future (1000+ vendors):**
- Use the admin interface to add new vendors
- Or we can build a CSV import feature later

## After Migration

Once all vendors are in Supabase:
- We'll update the code to ONLY use Supabase (remove hardcoded fallback)
- This ensures single source of truth
- No confusion about which vendors are "real"

---

**Question**: Do you want to migrate the 8 existing vendors manually, or should I help set up a bulk migration script?

