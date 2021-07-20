import React, { useEffect, useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Recommend from "./components/Recommend";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { BOOK_ADDED, ALL_BOOKS } from "./queries";

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

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);
    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      console.log(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

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

      <NewBook
        show={page === "add"}
        setError={setError}
        updateCacheWith={updateCacheWith}
      />

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
