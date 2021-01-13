import Game from "../components/Game";
import Event from "../components/Event";
import Hint from "../components/Hint"
import SliderHint from "../components/SliderHint"

export default function HomeAdmin({ token }) {
  
  return (
    <section>
      <Game token={token} />
      <Event token={token} />
      <Hint token={token} />
      <SliderHint token={token} />

    </section>
  );
}
