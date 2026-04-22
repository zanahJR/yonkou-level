import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PlayerProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [player, setPlayer] = useState(null);

  const getLevel = (haki) => Math.floor(haki / 10) + 1;

  const getLeague = (haki) => {
    if (haki < 10) return "Bronce 🟤";
    if (haki < 30) return "Plata ⚪";
    if (haki < 60) return "Oro 🟡";
    if (haki < 100) return "Diamante 💎";
    return "Yonkou 👑🔥";
  };

  useEffect(() => {
    if (id) fetchPlayer(id);
  }, [id]);

  const fetchPlayer = async (id) => {
    const { data } = await supabase
      .from("players")
      .select("*")
      .eq("id", id)
      .single();

    setPlayer(data);
  };

  if (!player) return <div style={{ color: "white" }}>Cargando...</div>;

  const winrate =
    player.wins + player.loses === 0
      ? 0
      : ((player.wins / (player.wins + player.loses)) * 100).toFixed(1);

  return (
    <div style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      padding: 20,
      textAlign: "center"
    }}>
      <h1 style={{ color: "gold" }}>👤 Perfil Jugador</h1>

      <h2>{player.name}</h2>

      <h3>{getLeague(player.haki)}</h3>

      <p>🔥 HAKI: {player.haki}</p>
      <p>🏆 Nivel: {getLevel(player.haki)}</p>

      <hr />

      <p>✅ Wins: {player.wins}</p>
      <p>❌ Loses: {player.loses}</p>
      <p>📊 Winrate: {winrate}%</p>

      <button onClick={() => router.push("/ranking")}>
        ⬅ Volver
      </button>
    </div>
  );
}
