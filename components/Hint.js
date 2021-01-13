import {useEffect, useState} from "react";

export default function Hint({token}){
  const [hints, setHints] = useState([]);

  useEffect(async () => {
    let data = await fetch ("http://localhost:4000/hint",{
      method:"GET",
      headers:{ 
        "Content-Type": "application/json",
        Authorization: `Bearer${token}`,
      }, 
    })
    let res = await data.json();
    if(res.type === "success"){
      setHints(res.data);
    }
  },[]);

  return (
    <section id="hint">
      {hints.map((hint) => (
        <div key={hint.id}>
          <p>{hint.name}</p>
          <p>{hint.isVisible ? "true" : "false"}</p>
        </div>
      ))}
       </section>
  )
}