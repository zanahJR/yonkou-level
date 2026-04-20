import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'TU_URL',
  'TU_ANON_KEY'
);
