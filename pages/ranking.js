export default function Ranking() {
  const players = [
    { name: "Capitán Rojo", level: 100 },
    { name: "Barbanegra", level: 90 },
    { name: "Lobo del Mar", level: 80 }
  ];

  return (
    <div style={{ padding: 40 }}>
      <h1 className="glow">🏆 Ranking de Piratas</h1>

      {players.map((p, i) => (
        <div key={i} className="card">
          <strong>{p.name}</strong>

          <div style={{
            background: "#222",
            height: 20,
            borderRadius: 10,
            marginTop: 10
          }}>
            <div style={{
              width: `${p.level}%`,
              height: "100%",
              background: "linear-gradient(90deg, gold, orange)",
              borderRadius: 10,
              boxShadow: "0 0 10px gold"
            }} />
          </div>

          <div>Nivel: {p.level}</div>
        </div>
      ))}
    </div>
  );
}
