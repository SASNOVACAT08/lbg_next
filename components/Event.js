import { useEffect, useState } from "react";
import Game from "../components/Game";

export default function Event({ token }) {
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    let data = await fetch("http://localhost:4000/event", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let res = await data.json();
    if (res.type === "success") {
      setEvents(res.data);
    }
  }, []);

  return (
    <section id="events">
      {events.map((event) => (
        <div id={event.id, event.name} key={event.id}>
          <h3>Hint</h3>
          <h2>Events about {Game.id}</h2>
          <p>{event.id}</p>
          <p>{event.name}</p>
          <p>{event.content}</p>
          <p>{event.isVisible ? "true" : "false"}</p>
        </div>
      ))}
    </section>
  );
}
