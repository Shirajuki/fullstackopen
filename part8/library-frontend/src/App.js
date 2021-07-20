import React, { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Recommend from "./components/Recommend";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";

const App = () => {
  const [page, setPage] = useState("authors");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };
  useEffect(() => {
    const token = localStorage.getItem("library-user-token") || null;
    setToken(token);
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      <p>{error}</p>

      <Authors show={page === "authors"} setError={setError} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setError={setError} />

      <Recommend show={page === "recommend"} token={token} />

      <Login
        show={page === "login"}
        setPage={setPage}
        setError={setError}
        setToken={setToken}
      />
    </div>
  );
};

export default App;
