import {useEffect, useState} from "react";

export default function Game({token}){
  const [games, setGames ] = useState([]);
  const [name, setName]  = useState("New game");
  const [isVisible, setIsVisible]  = useState(false);

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
  let data = await fetch ("http://localhost:4000/game/"+id,{ 
    method:"DELETE",
    headers:{ 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }, 
}); 
  
}
async function putGame(){

      let data = await fetch ("http://localhost:4000/game/"+id,{ 
      method:"PUT",
      headers:{ 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, 
  }); 
}
async function postGame(){
  let data = await fetch("http://localhost:4000/game", {
      method: "POST",
      headers: { "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
     },
    
      body: JSON.stringify({
        name,
        isVisible,
      }),
    });

    let res = await data.json();
    console.log(res);
    if (res.type === "success") {
     
      console.log(res.data);
    }
  }

    return (
      <section id="games">
        {games.map((game) => (
          <div key={game.id}>
            <p>{game.id}</p>
            <p>{game.name}</p>
            <p>{game.isVisible ? "true" : "false"}</p>
            <hr/> 
            <h2>Delete</h2> 
            <input value="supr" type="button" onClick={async () => {deleteGame(game.id)}}/>
            <hr/> 
            <h2>Post</h2> 
            <form>
        <input
          type="text"
          value={name}
          name="name"
          placeholder="name of the game"
          onChange={({ target: { value } }) => setName(value)}
        />
        <input
          type="checkbox"
          value={isVisible}
          name="isVisible"
          placeholder="isVisible"
          onChange={({ target: { value } }) => setIsVisible(value == "true")  }
        />
      <input type="button" value="add game" onClick={postGame} />
      </form>
           
          </div>
        ))}
         </section>
    )
  
        }
