import io from "socket.io-client";
import { useEffect, useState } from "react";
import MyHead from "../components/MyHead";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [hint, setHint] = useState([]);
  const [sliderHint, setSliderHint] = useState([]);
  const [day, setDay] = useState("00");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");

  // const image = require ("/images/logo_la_belle_blanc.png");

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
    console.log(res.data);
    data = await fetch("http://localhost:4000/public/sliderhint", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    res = await data.json();
    setSliderHint(res.data);
  }
  return (
    <section>
      <MyHead/>
  <Header/>
    <main>
      <article className="slider_hint">
      <h2>Slider Hint</h2>
        {sliderHint.map((slh) => (
          <div key={slh.id}>
            <p>{slh.name}</p>
            <iframe width="90%" height="90%" src={slh.link} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        ))}
      </article>
      <div className="timer"><span> {`${day} : ${hour} : ${minute} : ${second}`}</span></div>
      <article className="hint">
      <h2>Hint</h2>
          {hint.map((h) => (
           <div key={h.id}>
            <p>{h.name}</p>
             <p>{h.content}</p>
           </div>
      ))}
      <div className="bg"></div>
    </article>
    </main>
      <Footer/>
    </section>
  );
}
