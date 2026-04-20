import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  const { data } = await supabase
    .from('players')
    .select('*')
    .order('points', { ascending: false });

  res.status(200).json(data);
}
