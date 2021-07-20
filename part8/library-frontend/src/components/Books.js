import React, { useEffect, useState } from "react";
import { ALL_BOOKS } from "../queries";
import { useLazyQuery } from "@apollo/client";

const Books = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const books = result?.data?.allBooks || [];

  useEffect(() => {
    if (result.data) {
      const genres = [...new Set(books.map((b) => b.genres).flat())];
      setGenres(genres);
    }
  }, [result.data]); // eslint-disable-line

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    getBooks();
  }, [genre]); // eslint-disable-line

  if (!props.show) return null;
  if (result.loading) return <div>loading...</div>;
  return (
    <div>
      <h2>books</h2>
      <p>{genre !== "" ? `in genre ${genre}` : ""}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((a) => a.genres.includes(genre) || genre === "")
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author?.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {genres.map((g, index) => (
        <button key={g + index} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
