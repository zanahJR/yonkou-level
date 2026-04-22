import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Ranking() {
  const [players, setPlayers] = useState([]);

  const getLevel = (haki) => Math.floor(haki / 10) + 1;

  const getLeague = (haki) => {
    if (haki < 10) return "Bronce 🟤";
    if (haki < 30) return "Plata ⚪";
    if (haki < 60) return "Oro 🟡";
    if (haki < 100) return "Diamante 💎";
    return "Yonkou 👑🔥";
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order("haki", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setPlayers(data);

    // 🔥 CLAVE PARA ADMIN PANEL
    localStorage.setItem("players_list", JSON.stringify(data));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      padding: 20
    }}>
      <h1 style={{ color: "gold" }}>🏆 Ranking</h1>

      <button
        onClick={() => window.location.href = "/profile"}
        style={{
          marginBottom: 20,
          padding: "10px 15px",
          background: "gold",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        👤 Mi perfil
      </button>

      {players.map((p, i) => {
        const progress = (p.haki % 10) * 10;

        return (
          <div
            key={p.id}
            style={{
              padding: 10,
              borderBottom: "1px solid #333"
            }}
          >
            <div>
              {i + 1}.{" "}
              <span
                onClick={() => window.location.href = `/player/${p.id}`}
                style={{
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              >
                {p.name}
              </span>
            </div>

            <div>{getLeague(p.haki)}</div>
            <div>🔥 HAKI: {p.haki}</div>
            <div>🏆 Nivel: {getLevel(p.haki)}</div>

            {/* 🔥 barra progreso */}
            <div style={{
              width: "100%",
              height: 6,
              background: "#333",
              marginTop: 4
            }}>
              <div style={{
                width: `${progress}%`,
                height: "100%",
                background: "gold"
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
