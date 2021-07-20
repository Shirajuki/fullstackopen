import React, { useEffect, useState } from "react";
import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const Recommend = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState("");
  const books = result?.data?.allBooks || [];

  useEffect(() => {
    if (result.data) {
      const favoriteGenre = JSON.parse(
        atob(props?.token?.split(".")[1] ?? "")
      ).favoriteGenre;
      setGenre(favoriteGenre);
    }
  }, [result.data]); // eslint-disable-line
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
    </div>
  );
};

export default Recommend;
