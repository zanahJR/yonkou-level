import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    const { playerId, result } = req.body;

    // 🔒 validación
    if (!playerId || !result) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    // 🔍 obtener datos actuales
    const { data, error } = await supabase
      .from("players")
      .select("haki, wins, loses")
      .eq("id", playerId)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // 🧠 calcular nuevos valores
    const newHaki = data.haki + (result === "win" ? 2 : 0);
    const newWins = data.wins + (result === "win" ? 1 : 0);
    const newLoses = data.loses + (result === "lose" ? 1 : 0);

    // ➕ actualizar
    const { error: updateError } = await supabase
      .from("players")
      .update({
        haki: newHaki,
        wins: newWins,
        loses: newLoses,
      })
      .eq("id", playerId);

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Error servidor" });
  }
}
