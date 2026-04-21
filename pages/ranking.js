export default function Ranking() {
  const players = [
    { name: "Luffy", level: 100 },
    { name: "Zoro", level: 90 },
    { name: "Sanji", level: 85 }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#111",
      color: "white",
      padding: 40
    }}>
      <h1>🏆 Ranking</h1>

      {players.map((p, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <div>{p.name}</div>

          <div style={{
            background: "#333",
            height: 20,
            borderRadius: 10
          }}>
            <div style={{
              width: `${p.level}%`,
              background: "gold",
              height: "100%",
              borderRadius: 10
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}
