export default function Login() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div className="card" style={{ width: 300 }}>
        <h2 className="glow">Login 🏴‍☠️</h2>

        <input placeholder="Usuario" style={input} />
        <input placeholder="Contraseña" type="password" style={input} />

        <button className="btn" style={{ width: "100%" }}>
          Entrar
        </button>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: 10,
  margin: "10px 0",
  borderRadius: 5,
  border: "none"
};
