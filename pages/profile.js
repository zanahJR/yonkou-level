import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Profile() {
  const [player, setPlayer] = useState(null);

  const getLevel = (haki) => Math.floor(haki / 10) + 1;

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
      background: "black",
      color: "white",
      padding: 20
    }}>
      <h1 style={{ color: "gold" }}>👤 Tu Perfil</h1>

      <h2>{player.name}</h2>

      <p>🔥 HAKI: {player.haki}</p>
      <p>🏆 Nivel: {getLevel(player.haki)}</p>

      <hr />

      <p>✅ Wins: {player.wins}</p>
      <p>❌ Loses: {player.loses}</p>
      <p>📊 Winrate: {winrate}%</p>

      <br />

      <button onClick={() => window.location.href = "/ranking"}>
        Volver al ranking
      </button>
    </div>
  );
}
