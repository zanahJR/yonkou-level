import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Profile() {
  const [player, setPlayer] = useState(null);

  // 🔥 nivel
  const getLevel = (haki) => Math.floor(haki / 10) + 1;

  // 🔥 ligas
  const getLeague = (haki) => {
    if (haki < 10) return "Bronce 🟤";
    if (haki < 30) return "Plata ⚪";
    if (haki < 60) return "Oro 🟡";
    if (haki < 100) return "Diamante 💎";
    return "Yonkou 👑🔥";
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("player"));

    if (!stored) {
      window.location.href = "/login";
      return;
    }

    fetchPlayer(stored.id);
  }, []);

  const fetchPlayer = async (id) => {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setPlayer(data);
  };

  if (!player) {
    return <div style={{ color: "white" }}>Cargando...</div>;
  }

  const winrate =
    player.wins + player.loses === 0
      ? 0
      : ((player.wins / (player.wins + player.loses)) * 100).toFixed(1);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #1a1a1a, #000)",
      color: "white",
      padding: 20,
      textAlign: "center"
    }}>
      <h1 style={{ color: "gold", textShadow: "0 0 20px gold" }}>
        👤 PERFIL
      </h1>

      <h2>{player.name}</h2>

      {/* 🔥 LIGA */}
      <h3 style={{ marginBottom: 10 }}>
        {getLeague(player.haki)}
      </h3>

      <p>🔥 HAKI: {player.haki}</p>
      <p>🏆 Nivel: {getLevel(player.haki)}</p>

      <hr style={{ margin: "20px 0" }} />

      <p>✅ Wins: {player.wins}</p>
      <p>❌ Loses: {player.loses}</p>
      <p>📊 Winrate: {winrate}%</p>

      <button
        onClick={() => window.location.href = "/ranking"}
        style={{
          marginTop: 20,
          padding: "12px 20px",
          background: "gold",
          border: "none",
          borderRadius: 8,
          cursor: "pointer"
        }}
      >
        ⬅ Volver al ranking
      </button>
    </div>
  );
}
