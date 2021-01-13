import { useState } from "react";

export default function Login({ getToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    let data = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    let res = await data.json();
    if (res.type === "success") {
      localStorage.setItem("token", res.token);
      getToken(res.token);
    }
  }

  return (
    <section>
      <h1>Se connecter</h1>
      <div>
        <input
          type="text"
          value={email}
          name="email"
          placeholder="Email"
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <input
          type="password"
          value={password}
          name="password"
          placeholder="Password"
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <input type="button" value="Se connecter" onClick={login} />
      </div>
    </section>
  );
}
