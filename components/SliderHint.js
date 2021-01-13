import react from "react";
import {useEffect, useState} from 'react';

export default function SliderHint({token}){
  const [sliderHints, setSliderHints] = useState([]);

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
      setSliderHints(res.data);
    }
  }, []);

  return (
    <section>
      {sliderHints.map((sliderHint) => (
        <div key={sliderHint.id}>
          <p>AAAA</p>
          <p>{sliderHint.name}</p>
          <p>{sliderHint.isVisible ? "true" : "false"}</p>
        </div>
      ))}
    </section>
  );
}
