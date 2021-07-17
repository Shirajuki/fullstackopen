import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotfication,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(setNotfication(`you voted "${content}"`));
    setTimeout(() => dispatch(removeNotification()), 5000);
  };
  return anecdotes
    .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter?.toLowerCase() || "")
    )
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>
            vote
          </button>
        </div>
      </div>
    ));
};
export default AnecdoteList;
