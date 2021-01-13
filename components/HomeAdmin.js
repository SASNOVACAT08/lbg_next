import Game from "../components/Game";

export default function HomeAdmin({ token }) {
  return (
    <section>
      <Game token={token} />
    </section>
  );
}
