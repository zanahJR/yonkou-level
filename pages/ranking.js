import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Ranking() {
  const [players, setPlayers] = useState([]);

  const getLevel = (haki) => Math.floor(haki / 10) + 1;

  const getLeague = (haki) => {
    if (haki < 10) return "🟤";
    if (haki < 30) return "⚪";
    if (haki < 60) return "🟡";
    if (haki < 100) return "💎";
    return "👑";
  };

  const fetchPlayers = async () => {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order("haki", { ascending: false });

    if (error) console.log(error);

    setPlayers(data || []);
  };

  useEffect(() => {
    fetchPlayers();
    const interval = setInterval(fetchPlayers, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      padding: 20,
      background: "radial-gradient(circle at top, #1a1a1a, #000)",
      color: "white"
    }}>
      
      <h1 style={{
        color: "gold",
        textShadow: "0 0 20px gold"
      }}>
        🏆 Ranking
      </h1>

      {/* BOTÓN PERFIL PROPIO */}
      <button
        onClick={() => window.location.href = "/profile"}
        style={{
          marginBottom: 20,
          padding: "12px 20px",
          fontSize: 16,
          background: "gold",
          border: "none",
          borderRadius: 8,
          cursor: "pointer"
        }}
      >
        👤 Mi perfil
      </button>

      {/* LISTA JUGADORES */}
      {players.map((p, i) => (
        <div key={p.id} style={{
          marginBottom: 15,
          padding: 10,
          border: "1px solid #333",
          borderRadius: 8,
          color: i === 0 ? "gold" : "white"
        }}>
          {i + 1}.{" "}
          
          {/* 🔥 CLICK EN NOMBRE */}
          <span
            onClick={() => window.location.href = `/player/${p.id}`}
            style={{
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            {p.name}
          </span>

          {" "} {getLeague(p.haki)} — HAKI: {p.haki} — LVL: {getLevel(p.haki)}
        </div>
      ))}
    </div>
  );
}
