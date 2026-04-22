import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Ranking() {
  const [players, setPlayers] = useState([]);

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
    }

    setPlayers(data || []);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      color: "white",
      padding: 20
    }}>
      <h1>🏆 Ranking</h1>

      {players.map((p, i) => (
        <div key={i} style={{
          padding: 10,
          borderBottom: "1px solid #333"
        }}>
          {i + 1}. {p.name} — HAKI: {p.xp}
        </div>
      ))}
    </div>
  );
}
