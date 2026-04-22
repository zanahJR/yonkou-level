import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!name || !password) {
      alert("Completa todo");
      return;
    }

    // 🔍 buscar usuario
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("name", name)
      .single();

    if (data) {
      // 👉 existe → comprobar password
      if (data.password !== password) {
        alert("Password incorrecta");
        return;
      }

      localStorage.setItem("player", JSON.stringify(data));
      window.location.href = "/ranking";
      return;
    }

    // 👉 no existe → crear usuario
    const { data: newUser, error: insertError } = await supabase
      .from("players")
      .insert([
        {
          name,
          password,
          haki: 0,
          wins: 0,
          loses: 0
        },
      ])
      .select()
      .single();

    if (insertError) {
      alert(insertError.message);
      return;
    }

    localStorage.setItem("player", JSON.stringify(newUser));
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
      <div style={{ padding: 30, border: "1px solid gold" }}>
        <h2>Login</h2>

        <input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}
