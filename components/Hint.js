import {useEffect, useState} from "react";

export default function Hint({token}){
  const [hints, setHints] = useState([]);

  useEffect(async () => {
    let data = await fetch ("http://localhost:4000/hint",{
      method:"GET",
      headers:{ 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, 
    })
    let res = await data.json();
    if(res.type === "success"){
      setHints(res.data);
    }
  },
  
  );
 async function deleteHint(id){
  console.log(id);
  // Similaire à componentDidMount et componentDidUpdate :
  //useEffect(async () => {
    try{
      
    let data = await fetch ("http://localhost:4000/hint/"+id,{ 
      method:"DELETE",
      headers:{ 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, 
   // })

  }); 
}
  catch{};
  
}
    return (
      <section id="hint">
        {hints.map((hint) => (
          <div key={hint.id}>
            <p>{hint.id}</p>
            <p>{hint.name}</p>
            
            <p>{hint.isVisible ? "true" : "false"}</p>
            <input value="supr" type="button" onClick={async () => {deleteHint(hint.id)}}/>
          </div>
        ))}
         </section>
    )
  
  }
