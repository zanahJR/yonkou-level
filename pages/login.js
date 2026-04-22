import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [name, setName] = useState("");

  const handleLogin = async () => {
    if (!name) {
      alert("Escribe un nombre");
      return;
    }

    const { error } = await supabase
      .from("players")
      .insert([{ name, haki: 0 }]);

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    window.location.href = "/ranking";
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(circle, #1a1a1a, #000)",
      color: "white"
    }}>
      <div style={{
        padding: 30,
        borderRadius: 12,
        border: "1px solid gold"
      }}>
        <h2>Login 🏴‍☠️</h2>

        <input
          placeholder="Tu nombre pirata"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: 10,
            width: "100%",
            marginBottom: 10
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: 10,
            background: "gold",
            border: "none",
            cursor: "pointer"
          }}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
