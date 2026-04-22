import { useState } from "react";

export default function Admin() {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [winner, setWinner] = useState("");

  const sendResult = async () => {
    const players = JSON.parse(localStorage.getItem("players_list") || "[]");

    const player1 = players.find(p => p.name === p1);
    const player2 = players.find(p => p.name === p2);

    if (!player1 || !player2) {
      alert("Jugadores no encontrados");
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

    alert("Resultado enviado");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Panel tienda</h2>

      <input placeholder="Jugador 1" onChange={e => setP1(e.target.value)} />
      <br /><br />

      <input placeholder="Jugador 2" onChange={e => setP2(e.target.value)} />
      <br /><br />

      <input placeholder="Ganador" onChange={e => setWinner(e.target.value)} />
      <br /><br />

      <button onClick={sendResult}>
        Enviar resultado
      </button>
    </div>
  );
}
