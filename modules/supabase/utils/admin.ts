// lib/supabase/admin.ts

import { createClient } from '@supabase/supabase-js';

// These environment variables are only available on the server
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase URL or Service Role Key is missing.');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);