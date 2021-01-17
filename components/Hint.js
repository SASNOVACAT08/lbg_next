import {useEffect, useState} from "react";

export default function Hint({token}){
  const [hints, setHints] = useState([]);
  const [name, setName] = useState([]);
  const [content, setContent] = useState([]);
  const [isVisible, setIsVisible] = useState([]);
  const [gameId, setGameId] = useState([]);
  const [hintId, setHintId] = useState([]);

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
  async function postHint(){
    let data = await fetch("http://localhost:4000/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
       },
      
        body: JSON.stringify({
          name,
          content,
          isVisible,
          gameId,
        }),
      });
  
      let res = await data.json();
      console.log(res);
      if (res.type === "success") {
       
        console.log(res.data);
      }
    }
    async function putHint(){
      console.log("ok");
      let data = await fetch ("http://localhost:4000/hint/"+hintId,{ 
      method:"PUT",
      headers:{ 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, 
      body: JSON.stringify({
        name,
        isVisible,
        content,
      })
  }); 
  let res = await data.json();
  console.log(res);
  if (res.type === "success") {
   
    console.log(res.data);
  }
}
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
            <p>Id : {hint.id}</p>
            <p>Name :{hint.name}</p>
            <p>Content :{hint.content}</p>
            <p>GameId : {hint.gameId}</p>
            <p>is visible? {hint.isVisible ? "true" : "false"}</p>
            <input value="supr" type="button" onClick={async () => {deleteHint(hint.id)}}/>
          </div>

        ))}
        <form>
          <h2> Post a hint</h2> 
          <input
            type="text"
            value={name}
            name="name"
            placeholder="name of the hint"
            onChange={({ target: { value } }) => setName(value)}
          />
          <input
            type="textarea"
            value={content}
            name="content"
            placeholder="content of the hint"
            onChange={({ target: { value } }) => setContent(value)}
          />
          <input
            type="checkbox"
            value={isVisible}
            name="isVisible"
            placeholder="isVisible"
            onChange={({ target: { value } }) => setIsVisible(value == "true")  }
          />
          <input
            type="text"
            value={gameId}
            name="gameId"
            placeholder="gameId"
            onChange={({ target: { value } }) => setGameId(parseInt(value))  }
          />
        <input type="button" value="add game" onClick={postHint} />
      </form>
      <hr/>
      <form>
          <h2> Put a hint</h2> 
          <input 
            type="text"
            value={name}
            name="name"
            placeholder="name of the hint"
            onChange={({target: {value}} )=> setName(value)}
          />
          <input 
            type="text"
            value={content}
            name="content"
            placeholder="content of the hint"
            onChange={({target: {value}} )=> setContent(value)}
          />
          <input
            type="checkbox"
            value={isVisible}
            name="isVisible"
            placeholder="isVisible"
            onChange={({ target: { value } }) => setIsVisible(value == "true")  }
          />
          <input
            type="text"
            value={hintId}
            name="hintId"
            placeholder="hintId"
            onChange={({ target: { value } }) => setHintId(parseInt(value))  }
          />
        <input type="button" value="add game" onClick={putHint} />
      </form>
         </section>
    )
  
  }
