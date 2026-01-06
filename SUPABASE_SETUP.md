# Supabase Setup Guide for Peta Hidup Solo

This guide will walk you through setting up Supabase and migrating from hardcoded vendors to a database-driven system.

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign up/log in
2. Click "New Project"
3. Fill in:
   - **Project name**: `petahidupsolo` (or your choice)
   - **Database password**: Create a strong password and **save it securely**
   - **Region**: Choose closest to your users (e.g., Southeast Asia)
4. Wait 2-3 minutes for project to be created

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 3: Set Up Environment Variables

1. Create a `.env` file in the project root (copy from `.env.example` if it exists)
2. Add your credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. **Important**: Make sure `.env` is in `.gitignore` (already done)

## Step 4: Create Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click **Run** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

This creates:
- `vendors` table with all necessary columns
- Storage bucket for vendor images
- Security policies (RLS - Row Level Security)

## Step 5: Set Up Storage Bucket

The SQL script should have created the bucket, but verify:

1. Go to **Storage** in Supabase dashboard
2. You should see `vendor-images` bucket
3. If not, create it manually:
   - Click "New bucket"
   - Name: `vendor-images`
   - Make it **Public**

## Step 6: Create Admin User

1. Go to **Authentication** → **Users** in Supabase dashboard
2. Click **Add user** → **Create new user**
3. Enter:
   - **Email**: Your admin email (e.g., `admin@petahidupsolo.com`)
   - **Password**: Create a strong password
4. Click **Create user**
5. **Save these credentials** - you'll use them to log in to `/admin`

## Step 7: Test the Setup

1. Start your dev server: `npm run dev`
2. Visit `http://localhost:8080/admin/login`
3. Log in with the admin credentials you just created
4. You should see the admin dashboard

## Step 8: Migrate Existing Vendors (Optional)

If you want to import your existing vendors from `vendors.ts`:

1. Make sure you're logged in as admin in the browser
2. The migration script is in `scripts/migrate-vendors.ts`
3. For now, you can manually add vendors through the admin interface

**Note**: The migration script requires additional setup for handling local image files. For now, it's easier to:
- Add vendors manually through the admin interface
- Upload images directly through the form

## Step 9: Update Frontend to Use Supabase (When Ready)

Once you have vendors in Supabase, we'll update the frontend pages to fetch from Supabase instead of hardcoded data. For now, the system will work with both:
- Hardcoded data (fallback)
- Supabase data (when available)

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env` file exists in project root
- Check that variables start with `VITE_`
- Restart dev server after adding `.env`

### "Failed to fetch" errors
- Check your Supabase URL and key are correct
- Make sure RLS policies are set up correctly
- Verify you're logged in as admin for protected operations

### Images not uploading
- Check Storage bucket `vendor-images` exists and is public
- Verify storage policies are set correctly
- Check browser console for specific errors

## Next Steps

1. ✅ Supabase project created
2. ✅ Database schema created
3. ✅ Admin user created
4. ✅ Test admin login
5. ⏳ Add vendors through admin interface
6. ⏳ Update frontend to use Supabase data
7. ⏳ Deploy with environment variables set in Vercel

## Vercel Deployment

When deploying to Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
4. Redeploy

---

**Questions?** Check Supabase docs: https://supabase.com/docs

