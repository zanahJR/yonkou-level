export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0a0a0a, #1a1a1a)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "3rem", color: "gold" }}>
        🏴‍☠️ Yonkou Level
      </h1>

      <p>Conviértete en el pirata más fuerte</p>

      <div style={{ marginTop: 30 }}>
        <a href="/login">
          <button style={btn}>Entrar</button>
        </a>

        <a href="/ranking">
          <button style={btn}>Ranking</button>
        </a>
      </div>
    </div>
  );
}

const btn = {
  margin: 10,
  padding: "12px 20px",
  background: "gold",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold"
};
