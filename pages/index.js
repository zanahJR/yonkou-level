export default function Home() {

  const playSound = () => {
    const audio = new Audio("/sounds/click.mp3");
    audio.play();
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(circle at center, #1a1a1a, #000)",
      color: "white"
    }}>
      
      <h1 className="glow" style={{ fontSize: "4rem" }}>
        🏴‍☠️ Yonkou Level
      </h1>

      <p>Domina los mares. Sube de nivel.</p>

      <div style={{ marginTop: 30 }}>
        <a href="/login">
          <button className="btn" onClick={playSound}>
            Entrar
          </button>
        </a>

        <a href="/ranking">
          <button className="btn" onClick={playSound}>
            Ranking
          </button>
        </a>
      </div>

    </div>
  );
}
