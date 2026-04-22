import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    const { playerId, opponentId, result } = req.body;

    if (!playerId || !opponentId || !result) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    // 🔄 resultado inverso
    const opponentResult = result === "win" ? "lose" : "win";

    // 🔥 guardar para jugador
    await supabase.from("matches").insert([
      {
        player_id: playerId,
        opponent_id: opponentId,
        result: result,
      },
    ]);

    // 🔥 guardar para rival
    await supabase.from("matches").insert([
      {
        player_id: opponentId,
        opponent_id: playerId,
        result: opponentResult,
      },
    ]);

    // 🔍 obtener jugador
    const { data: player } = await supabase
      .from("players")
      .select("haki, wins, loses")
      .eq("id", playerId)
      .single();

    // 🔍 obtener rival
    const { data: opponent } = await supabase
      .from("players")
      .select("haki, wins, loses")
      .eq("id", opponentId)
      .single();

    // 🧠 actualizar jugador
    await supabase
      .from("players")
      .update({
        haki: player.haki + (result === "win" ? 2 : 0),
        wins: player.wins + (result === "win" ? 1 : 0),
        loses: player.loses + (result === "lose" ? 1 : 0),
      })
      .eq("id", playerId);

    // 🧠 actualizar rival
    await supabase
      .from("players")
      .update({
        haki: opponent.haki + (opponentResult === "win" ? 2 : 0),
        wins: opponent.wins + (opponentResult === "win" ? 1 : 0),
        loses: opponent.loses + (opponentResult === "lose" ? 1 : 0),
      })
      .eq("id", opponentId);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error servidor" });
  }
}
