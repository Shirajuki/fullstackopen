import React from "react";
const Anecdote = ({ anecdote }) => {
  console.log(anecdote);
  if (!anecdote) return <></>;
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <a href={anecdote.url}>{anecdote.url}</a>
      </p>
    </div>
  );
};
export default Anecdote;
