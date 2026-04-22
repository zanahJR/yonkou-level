import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    const { playerId, opponentId, result } = req.body;

    if (!playerId || !result) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const { data } = await supabase
      .from("players")
      .select("haki, wins, loses")
      .eq("id", playerId)
      .single();

    // 🔥 guardar partida con rival
    await supabase.from("matches").insert([
      {
        player_id: playerId,
        opponent_id: opponentId || null,
        result: result
      }
    ]);

    const newHaki = data.haki + (result === "win" ? 2 : 0);
    const newWins = data.wins + (result === "win" ? 1 : 0);
    const newLoses = data.loses + (result === "lose" ? 1 : 0);

    await supabase
      .from("players")
      .update({
        haki: newHaki,
        wins: newWins,
        loses: newLoses,
      })
      .eq("id", playerId);

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Error servidor" });
  }
}
