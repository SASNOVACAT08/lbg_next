import { useEffect, useState } from "react";

export default function Event({ token }) {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState([]);
  const [isVisible, setIsVisible] = useState([]);
  const [isValid, setIsValid] = useState([]);
  const [timestamp, setTimeStamp] = useState([]);

  useEffect(async () => {
    let data = await fetch("http://localhost:4000/event", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let res = await data.json();
    if (res.type === "success") {
      setEvents(res.data);
    }
  });
  // async function postEvent(){
  //   let data = await fetch("http://localhost:4000/event", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`
  //    },

  //     body: JSON.stringify({
  //       name,
  //       isVisible,
  //       isValid,
  //       timestamp,
  //     }),
  //   });

  //   let res = await data.json();
  //   console.log(res);
  //   if (res.type === "success") {

  //     console.log(res.data);
  //   }
  // }
  async function deleteEvent(id) {
    console.log(id);
    // Similaire à componentDidMount et componentDidUpdate :
    //useEffect(async () => {
    try {
      let data = await fetch("http://localhost:4000/event/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // })
      });
    } catch {}
  }
  return (
    <section id="events">
      {events.map((event) => (
        <div key={event.id}>
          <p>{event.id}</p>
          <p>{event.name}</p>

          <p>{event.isVisible ? "true" : "false"}</p>
          <input
            value="supr"
            type="button"
            onClick={async () => {
              deleteEvent(event.id);
            }}
          />
        </div>
      ))}
      <h2>post</h2>
      {/* <form>

        <input
          type="text"
          value={name}
          name="name"
          placeholder="name of the game"
          onChange={({ target: { value } }) => setName(value)}
        />
        <input
          type="checkbox"
          value={isValid}
          name="isValid"
          placeholder="isValid"
          onChange={({ target: { value } }) => setIsValid(value == "true")  }
        />
        <input
          type="date"  name="trip-start"
          value="2018-07-22"
          min="2018-01-01" 
          max="2018-12-31"
          name="date"
          value={this.state.expiration_date}
          onChange={event => this.setState({expiration_date: event.target.value})} />

      <input type="button" value="add game" onClick={postEvent} />
      </form> */}
    </section>
  );
}
