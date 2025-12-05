import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

// Supabase client using service role for server-side operations
export const supabase = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
