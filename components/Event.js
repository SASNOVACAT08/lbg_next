import {useEffect, useState} from "react";

export default function Event({token}){
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    let data = await fetch ("http://localhost:4000/event",{
      method:"GET",
      headers:{ 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, 
    })
    let res = await data.json();
    if(res.type === "success"){
      setEvents(res.data);
    }
  },
  
  );
 async function deleteEvent(id){
  console.log(id);
  // Similaire à componentDidMount et componentDidUpdate :
  //useEffect(async () => {
    try{
      
    let data = await fetch ("http://localhost:4000/event/"+id,{ 
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
      <section id="events">
        {events.map((event) => (
          <div key={event.id}>
            <p>{event.id}</p>
            <p>{event.name}</p>
            
            <p>{event.isVisible ? "true" : "false"}</p>
            <input value="supr" type="button" onClick={async () => {deleteEvent(event.id)}}/>
          </div>
        ))}
         </section>
    )
  
  }
