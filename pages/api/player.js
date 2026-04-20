import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .limit(1)
    .single();

  if (error || !data) {
    return res.status(500).json({ error: "No data" });
  }

  const level = Math.floor(data.points / 100);

  res.status(200).json({
    ...data,
    level,
  });
}
