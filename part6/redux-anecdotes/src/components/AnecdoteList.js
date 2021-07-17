import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotfication } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter?.toLowerCase() || "")
    );
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(
      voteAnecdote(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    );
    dispatch(setNotfication(`you voted "${anecdote.content}"`, 5));
  };
  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};
export default AnecdoteList;
