import {useEffect, useState} from "react";

export default function SliderHint({token}){
  const [sliderHints, setSliderHints] = useState([]);
  const [name, setName] = useState([]);
  const [link, setLink] = useState([]);
  const [isVisible, setIsVisible] = useState([]);
  const [gameId, setGameId] = useState([]);

  useEffect(async () => {
    let data = await fetch ("http://localhost:4000/sliderhint",{
      method:"GET",
      headers:{ 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, 
    })
    let res = await data.json();
    if(res.type === "success"){
      setSliderHints(res.data);
    }
  },
  
  );
  async function postSliderHint(){
    let data = await fetch("http://localhost:4000/sliderhint", {
        method: "POST",
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
       },
      
        body: JSON.stringify({
          name,
          link,
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
 async function deleteSliderHint(id){
  console.log(id);

    try{
      
    let data = await fetch ("http://localhost:4000/sliderhint/"+id,{ 
      method:"DELETE",
      headers:{ 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, 

  }); 
}
  catch{};
  
}
    return (
      <section id="sliderhint">
        
        {sliderHints.map((sliderHint) => (
          <div key={sliderHint.id}>
            <p>Id : {sliderHint.id}</p>
            <p>Name : {sliderHint.name}</p>
            
            <p>Is Visible ?{sliderHint.isVisible ? "true" : "false"}</p>
            <input value="supr" type="button" onClick={() => {deleteSliderHint(sliderHint.id)}}/>
          </div>
        ))}
         <form>
          <h2> Post a SliderHint</h2> 
          <input
            type="text"
            value={name}
            name="name"
            placeholder="name of the SliderHint"
            onChange={({ target: { value } }) => setName(value)}
          />
          <input
            type="text"
            value={link}
            name="link"
            placeholder="Link"
            onChange={({ target: { value } }) => setLink(value)}
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
        <input type="button" value="add game" onClick={postSliderHint} />
      </form>
         </section>
    )
  
  }
