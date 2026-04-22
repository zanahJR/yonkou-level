import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Profile() {
  const [player, setPlayer] = useState(null);
  const [matches, setMatches] = useState([]);

  const getLevel = (haki) => Math.floor(haki / 10) + 1;

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
    // 🔥 traer jugador
    const { data: playerData } = await supabase
      .from("players")
      .select("*")
      .eq("id", id)
      .single();

    setPlayer(playerData);

    // 🔥 traer partidas
    const { data: matchData } = await supabase
      .from("matches")
      .select("*")
      .eq("player_id", id)
      .order("created_at", { ascending: false })
      .limit(10);

    // 🔥 traer nombres de rivales (CLAVE)
    const matchesWithNames = await Promise.all(
      (matchData || []).map(async (m) => {
        if (!m.opponent_id) {
          return { ...m, opponent_name: "Desconocido" };
        }

        const { data: opponent } = await supabase
          .from("players")
          .select("name")
          .eq("id", m.opponent_id)
          .single();

        return {
          ...m,
          opponent_name: opponent?.name || "???",
        };
      })
    );

    setMatches(matchesWithNames);
  };

  if (!player) return <div style={{ color: "white" }}>Cargando...</div>;

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
      <h1 style={{ color: "gold" }}>👤 PERFIL</h1>

      <h2>{player.name}</h2>
      <h3>{getLeague(player.haki)}</h3>

      <p>🔥 HAKI: {player.haki}</p>
      <p>🏆 Nivel: {getLevel(player.haki)}</p>

      <hr />

      <p>✅ Wins: {player.wins}</p>
      <p>❌ Loses: {player.loses}</p>
      <p>📊 Winrate: {winrate}%</p>

      {/* 🔥 HISTORIAL REAL */}
      <h3 style={{ marginTop: 20 }}>📜 Historial</h3>

      {matches.map((m, i) => (
        <div
          key={i}
          style={{
            color: m.result === "win" ? "lime" : "red",
            marginBottom: 5
          }}
        >
          {m.result === "win" ? "🏆 Victoria" : "💀 Derrota"} 
          {" vs "} {m.opponent_name}
        </div>
      ))}

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
        ⬅ Volver
      </button>
    </div>
  );
}
