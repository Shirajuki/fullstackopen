import React, { useEffect, useState } from "react";
import { BOOKS_BY_GENRE } from "../queries";
import { useLazyQuery } from "@apollo/client";

const Recommend = (props) => {
  const [getBooksByGenre, result] = useLazyQuery(BOOKS_BY_GENRE);
  const [genre, setGenre] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (props.token) {
      const favoriteGenre = JSON.parse(
        atob(props.token.split(".")[1] ?? "") || ""
      ).favoriteGenre;
      setGenre(favoriteGenre);
      getBooksByGenre({ variables: { genre: favoriteGenre } });
    }
  }, [props.token, getBooksByGenre]);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data?.allBooks);
    }
  }, [result.data]); // eslint-disable-line
  if (!props.show) return null;
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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author?.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
