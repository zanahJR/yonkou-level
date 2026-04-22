import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    const { playerId, result } = req.body;

    // ⚠️ validación básica
    if (!playerId || !result) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    // 🧠 puntos según resultado
    const points = result === "win" ? 2 : 0;

    // 🔍 obtener haki actual
    const { data, error } = await supabase
      .from("players")
      .select("haki")
      .eq("id", playerId)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // ➕ actualizar haki
    const { error: updateError } = await supabase
      .from("players")
      .update({ haki: data.haki + points })
      .eq("id", playerId);

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Error servidor" });
  }
}
