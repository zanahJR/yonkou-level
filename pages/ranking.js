export default function Ranking() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "40px",
      fontFamily: "Arial"
    }}>
      <h1 style={{ textAlign: "center" }}>
        🏴‍☠️ Pirate Ranking
      </h1>

      <div style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px"
      }}>
        <p>Jugador: Barbanegra</p>
        <p>Puntos: 900</p>

        <div style={{
          height: "10px",
          background: "#333",
          marginTop: "10px"
        }}>
          <div style={{
            width: "90%",
            height: "100%",
            background: "gold"
          }} />
        </div>
      </div>
    </div>
  );
}
