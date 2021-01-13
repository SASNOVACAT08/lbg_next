import { useEffect, useState } from "react";

export default function Game({ token }) {
  const [games, setGames] = useState([]);

  useEffect(async () => {
    let data = await fetch("http://localhost:4000/game", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let res = await data.json();
    if (res.type === "success") {
      setGames(res.data);
    }
  }, []);

  return (
    <section>
      {games.map((game) => (
        <div key={game.id}>
          <p>{game.name}</p>
          <p>{game.isVisible ? "true" : "false"}</p>
        </div>
      ))}
    </section>
  );
}
