import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { playerId, result } = req.body;

  const points = result === "win" ? 2 : 0;

  const { data } = await supabase
    .from("players")
    .select("haki")
    .eq("id", playerId)
    .single();

  await supabase
    .from("players")
    .update({ haki: data.haki + points })
    .eq("id", playerId);

  res.status(200).json({ ok: true });
}
