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
    // jugador
    const { data } = await supabase
      .from("players")
      .select("*")
      .eq("id", id)
      .single();

    setPlayer(data);

    // 🔥 historial con JOIN (nombre rival)
    const { data: matchData } = await supabase
      .from("matches")
      .select(`
        id,
        result,
        opponent:players!matches_opponent_id_fkey ( id, name )
      `)
      .eq("player_id", id)
      .order("created_at", { ascending: false })
      .limit(10);

    setMatches(matchData || []);
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

      {/* 🔥 HISTORIAL CON NOMBRES */}
      <h3 style={{ marginTop: 20 }}>📜 Historial</h3>

      {matches.map((m, i) => (
        <div key={i} style={{
          color: m.result === "win" ? "lime" : "red",
          marginBottom: 5
        }}>
          {m.result === "win" ? "🏆 Victoria" : "💀 Derrota"} 
          {m.opponent?.name ? ` vs ${m.opponent.name}` : ""}
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
