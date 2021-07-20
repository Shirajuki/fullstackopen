import React, { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useQuery, useMutation } from "@apollo/client";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  if (!props.show) return null;
  if (result.loading) return <div>loading...</div>;
  const authors = result.data.allAuthors || [];
  const submit = (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, born: Number(born) } });

    setName("");
    setBorn("");
  };
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
