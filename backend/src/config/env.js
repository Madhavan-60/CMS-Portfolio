import dotenv from 'dotenv';

// Load environment variables early
dotenv.config();

export const env = {
  port: process.env.PORT || 4000,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  supabaseBucket: process.env.SUPABASE_BUCKET || 'media',
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
};

if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
  console.warn('Supabase credentials are missing; set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
}
