import { useEffect, useState } from "react";

export default function Ranking() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("/api/player")
      .then(res => res.json())
      .then(data => setPlayers([data]));
  }, []);

  return (
    <div style={{
      backgroundImage: "url('/bg.jpg')",
      backgroundSize: "cover",
      minHeight: "100vh",
      padding: "40px",
      color: "white",
      fontFamily: "sans-serif"
    }}>
      
      <h1 style={{
        fontSize: "50px",
        textAlign: "center",
        textShadow: "2px 2px 10px black"
      }}>
        🏴‍☠️ PIRATE RANKING
      </h1>

      <div style={{
        maxWidth: "600px",
        margin: "40px auto",
        background: "rgba(0,0,0,0.7)",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 0 20px black"
      }}>
        
        {players.length === 0 ? (
          <p>Cargando...</p>
        ) : (
          players.map((p, i) => (
            <div key={i} style={{
              marginBottom: "20px",
              padding: "20px",
              background: "#1e293b",
              borderRadius: "10px"
            }}>
              <h2>☠️ {p.name}</h2>
              <p>💰 Puntos: {p.points}</p>
              <p>⭐ Nivel: {p.level}</p>

              {/* Barra de nivel */}
              <div style={{
                background: "#333",
                borderRadius: "10px",
                overflow: "hidden",
                marginTop: "10px"
              }}>
                <div style={{
                  width: `${(p.points % 100)}%`,
                  background: "gold",
                  height: "10px"
                }} />
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
