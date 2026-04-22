import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [players, setPlayers] = useState([]);
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const { data } = await supabase
      .from("players")
      .select("*")
      .order("haki", { ascending: false });

    setPlayers(data || []);
  };

  const playMatch = async (winnerId) => {
    if (!p1 || !p2) {
      alert("Selecciona 2 jugadores");
      return;
    }

    const loserId = winnerId === p1.id ? p2.id : p1.id;

    // ganador
    await fetch("/api/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerId: winnerId,
        opponentId: loserId,
        result: "win"
      }),
    });

    // perdedor
    await fetch("/api/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerId: loserId,
        opponentId: winnerId,
        result: "lose"
      }),
    });

    alert("🔥 Partida guardada");

    setP1(null);
    setP2(null);
    fetchPlayers();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      padding: 20
    }}>
      <h1 style={{ color: "gold" }}>🏪 TORNEO TIENDA</h1>

      <h3>Selecciona jugadores</h3>

      {players.map((p) => (
        <div key={p.id} style={{ marginBottom: 10 }}>
          <button onClick={() => setP1(p)}>
            🅰️ {p.name}
          </button>

          <button onClick={() => setP2(p)} style={{ marginLeft: 10 }}>
            🅱️ {p.name}
          </button>
        </div>
      ))}

      <hr />

      <h3>Combate</h3>

      {p1 && p2 && (
        <div>
          <h2>{p1.name} 🆚 {p2.name}</h2>

          <button onClick={() => playMatch(p1.id)}>
            🏆 Gana {p1.name}
          </button>

          <button onClick={() => playMatch(p2.id)} style={{ marginLeft: 10 }}>
            🏆 Gana {p2.name}
          </button>
        </div>
      )}
    </div>
  );
}
