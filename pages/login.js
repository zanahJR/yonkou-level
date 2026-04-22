import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [name, setName] = useState("");

  const handleLogin = async () => {
    if (!name) return alert("Escribe un nombre");

    // 🔍 buscar jugador
    const { data: existing, error } = await supabase
      .from("players")
      .select("*")
      .eq("name", name)
      .maybeSingle();

    let player = existing;

    // 🆕 si no existe → crear
    if (!player) {
      const { data: newPlayer, error: insertError } = await supabase
        .from("players")
        .insert([{ name, haki: 0 }])
        .select()
        .single();

      if (insertError) {
        alert(insertError.message);
        return;
      }

      player = newPlayer;
    }

    // 💾 guardar sesión
    localStorage.setItem("player", JSON.stringify(player));

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
