import Game from "../components/Game";
import Event from "../components/Event";
import Hint from "../components/Hint";
import SliderHint from "../components/SliderHint";

export default function HomeAdmin({ token }) {
  
  return (
    <section>
      
       <Game token={token} />
      {/* <h2>Event</h2> */}
      {/* <Event token={token} />  */}
      {/* <h2>Hint</h2> */}
      {/* <Hint token={token} /> */}
      {/* <h2>SliderHint</h2>  */}
      <SliderHint token={token} />

    </section>
  );
}
