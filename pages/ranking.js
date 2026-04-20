export default function Ranking() {
  const players = [
    { name: "Barbanegra", points: 900 },
    { name: "Corsario Rojo", points: 700 },
    { name: "Capitán Sombra", points: 500 },
    { name: "Lobo del Mar", points: 300 },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏴‍☠️ Pirate Ranking</h1>

      {players.map((p, i) => (
        <div key={i} style={styles.card}>
          <span>{p.name}</span>

          <div style={styles.barContainer}>
            <div
              style={{
                ...styles.bar,
                width: `${p.points / 10}%`,
              }}
            />
          </div>

          <span>{p.points} pts</span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
    backgroundSize: "cover",
    color: "white",
    fontFamily: "Arial",
  },

  title: {
    fontSize: "40px",
    textAlign: "center",
    marginBottom: "30px",
    textShadow: "0 0 10px black",
  },

  card: {
    background: "rgba(0,0,0,0.7)",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
  },

  barContainer: {
    height: "10px",
    background: "#222",
    marginTop: "5px",
  },

  bar: {
    height: "100%",
    background: "gold",
  },
};
