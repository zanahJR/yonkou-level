export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1 className="glow" style={{ fontSize: "4rem" }}>
        🏴‍☠️ Yonkou Level
      </h1>

      <p>Domina los mares. Sube de nivel.</p>

      <div style={{ marginTop: 30 }}>
        <a href="/login">
          <button className="btn">Entrar</button>
        </a>

        <a href="/ranking">
          <button className="btn">Ranking</button>
        </a>
      </div>
    </div>
  );
}
