export default function Login() {
  return (
    <div style={{
      height: "100vh",
      background: "black",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <h1>Login 🏴‍☠️</h1>

      <input
        placeholder="Usuario"
        style={{ margin: 10, padding: 10 }}
      />

      <input
        placeholder="Contraseña"
        type="password"
        style={{ margin: 10, padding: 10 }}
      />

      <button style={{
        marginTop: 10,
        padding: 10,
        background: "gold",
        border: "none",
        cursor: "pointer"
      }}>
        Entrar
      </button>
    </div>
  );
}
