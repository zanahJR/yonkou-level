import { useEffect, useState } from 'react';

export default function Ranking() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('/api/ranking')
      .then(res => res.json())
      .then(data => setPlayers(data));
  }, []);

  return (
    <div>
      <h1>Ranking</h1>
      {players.map((p, i) => (
        <p key={i}>{p.name} - {p.points}</p>
      ))}
    </div>
  );
}
