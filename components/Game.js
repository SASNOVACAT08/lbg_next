import {useEffect, useState} from "react";

export default function Hint({token}){
  const [games, setGames] = useState([]);

  useEffect(async () => {
    let data = await fetch ("http://localhost:4000/game",{
      method:"GET",
      headers:{ 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, 
    })
    let res = await data.json();
    if(res.type === "success"){
      setGames(res.data);
    }
  },
  
  );
 async function deleteGame(id){
  console.log(id);
  // Similaire à componentDidMount et componentDidUpdate :
  //useEffect(async () => {
    try{
      
    let data = await fetch ("http://localhost:4000/game/"+id,{ 
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
      <section id="games">
        {games.map((game) => (
          <div key={game.id}>
            <p>{game.id}</p>
            <p>{game.name}</p>
            
            <p>{game.isVisible ? "true" : "false"}</p>
            <input value="supr" type="button" onClick={async () => {deleteGame(game.id)}}/>
          </div>
        ))}
         </section>
    )
  
  }
