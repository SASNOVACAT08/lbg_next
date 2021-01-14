import {useEffect, useState} from "react";

export default function Hint({token}){
  const [sliderHints, setSliderHints] = useState([]);

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
            <p>{sliderHint.id}</p>
            <p>{sliderHint.name}</p>
            
            <p>{sliderHint.isVisible ? "true" : "false"}</p>
            <input value="supr" type="button" onClick={() => {deleteSliderHint(sliderHint.id)}}/>
          </div>
        ))}
         </section>
    )
  
  }
