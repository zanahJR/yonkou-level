export default function Login() {
  async function handleLogin() {
    await fetch('/api/createUser', {
      method: 'POST',
    });
    alert('Usuario creado 🚀');
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Crear usuario</button>
    </div>
  );
}
