import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Ranking() {
  const [players, setPlayers] = useState([]);

  const getLevel = (haki) => Math.floor(haki / 10) + 1;

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
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 20,
        background: "black",
        color: "white",
      }}
    >
      <h1 style={{ color: "gold" }}>🏆 Ranking</h1>

      {/* 🔥 BOTÓN PERFIL */}
      <button
        onClick={() => window.location.href = "/profile"}
        style={{
          display: "block",
          marginBottom: 20,
          padding: "15px",
          fontSize: 18,
          background: "gold",
          border: "none",
          borderRadius: 10,
          cursor: "pointer",
        }}
      >
        👤 IR A MI PERFIL
      </button>

      {players.map((p, i) => (
        <div key={p.id} style={{ marginBottom: 10 }}>
          {i + 1}. {p.name} — HAKI: {p.haki} — LVL: {getLevel(p.haki)}
        </div>
      ))}
    </div>
  );
}
