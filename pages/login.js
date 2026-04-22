import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [name, setName] = useState("");

  const handleLogin = async () => {
    if (!name) return alert("Escribe un nombre");

    const { error } = await supabase
      .from("players")
      .insert([{ name, haki: 0 }]);

    if (error) {
      alert(error.message);
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
      background: "black",
      color: "white"
    }}>
      <div>
        <h2>Login 🏴‍☠️</h2>

        <input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}
