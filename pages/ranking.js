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

    if (error) console.log(error);

    setPlayers(data || []);
  };

  return (
    <div style={{ padding: 20, color: "white", background: "black", minHeight: "100vh" }}>
      <h1>🏆 Ranking</h1>

      {players.map((p, i) => (
        <div key={p.id}>
          {i + 1}. {p.name} — HAKI: {p.haki}
        </div>
      ))}
    </div>
  );
}
