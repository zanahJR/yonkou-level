import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [winner, setWinner] = useState("");

  const sendResult = async () => {
    if (!p1 || !p2 || !winner) {
      alert("Completa todos los campos");
      return;
    }

    // 🔥 buscar jugador 1
    const { data: player1 } = await supabase
      .from("players")
      .select("*")
      .eq("name", p1)
      .single();

    // 🔥 buscar jugador 2
    const { data: player2 } = await supabase
      .from("players")
      .select("*")
      .eq("name", p2)
      .single();

    if (!player1 || !player2) {
      alert("Jugadores no encontrados en BD");
      return;
    }

    const result = winner === p1 ? "win" : "lose";

    await fetch("/api/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerId: player1.id,
        opponentId: player2.id,
        result
      }),
    });

    alert("✅ Resultado enviado correctamente");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      padding: 20
    }}>
      <h2 style={{ color: "gold" }}>🏪 Panel Tienda</h2>

      <input
        placeholder="Jugador 1"
        value={p1}
        onChange={(e) => setP1(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Jugador 2"
        value={p2}
        onChange={(e) => setP2(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Ganador"
        value={winner}
        onChange={(e) => setWinner(e.target.value)}
      />
      <br /><br />

      <button onClick={sendResult}>
        Enviar resultado
      </button>
    </div>
  );
}
