import io from "socket.io-client";
import { useEffect, useState } from "react";

export default function Home() {
  const [hint, setHint] = useState([]);
  const [sliderHint, setSliderHint] = useState([]);
  const [day, setDay] = useState("00");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");

  useEffect(async () => {
    const socket = io("http://localhost:4000/");
    socket.on("RES_SEND_TIMER", (timer) => {
      if (timer.date) {
        let time = Date.parse(timer.date) - Date.now();
        setInterval(() => {
          time -= 1000;
          let delta = Math.abs(time) / 1000;
          let days = Math.floor(delta / 86400);
          delta -= days * 86400;
          let hours = Math.floor(delta / 3600) % 24;
          delta -= hours * 3600;
          let minutes = Math.floor(delta / 60) % 60;
          delta -= minutes * 60;
          let seconds = Math.round(delta % 60);
          setDay(days);
          setHour(hours);
          setMinute(minutes);
          setSecond(seconds);
        }, 1000);
      }
    });
    socket.on("RES_NEW_EVENT", async () => {
      await fetchAll();
    });
    await fetchAll();
  }, []);

  async function fetchAll() {
    let data = await fetch("http://localhost:4000/public/hint", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    let res = await data.json();
    setHint(res.data);
    data = await fetch("http://localhost:4000/public/sliderhint", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    res = await data.json();
    setSliderHint(res.data);
  }

  return (
    <section>
      {`${day} : ${hour} : ${minute} : ${second}`}
      <h2>Hint</h2>
      <article>
        {hint.map((hin) => (
          <div key={hin.id}>
            <p>{hin.name}</p>
            <p>{hin.content}</p>
          </div>
        ))}
      </article>
      <h2>Slider Hint</h2>
      <article>
        {sliderHint.map((slh) => (
          <div key={slh.id}>
            <p>{slh.name}</p>
            <p>{slh.link}</p>
          </div>
        ))}
      </article>
    </section>
  );
}
