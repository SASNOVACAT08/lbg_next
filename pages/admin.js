import { useEffect, useState } from "react";
import Login from "../components/Login";
import HomeAdmin from "../components/HomeAdmin";

export default function Admin() {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(async () => {
    let tokenStorage = localStorage.getItem("token");
    if (tokenStorage) {
      let data = await fetch("http://localhost:4000/valid/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenStorage}`,
        },
      });
      let res = await data.json();
      if (res.type === "success") {
        setToken(tokenStorage);
      }
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  function getToken(token) {
    setToken(token);
  }

  function Route() {
    if (!token) {
      return <Login getToken={getToken} />;
    }
    return <HomeAdmin token={token} />;
  }

  return (
    <section>
       <input type="button" value="Log out" onClick={logout}></input>
      <Route />
    </section>
  );
}
