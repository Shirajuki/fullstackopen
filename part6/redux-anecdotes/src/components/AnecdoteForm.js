import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotfication } from "../reducers/notificationReducer";

const AnecdoteForm = ({ createAnecdote, setNotfication }) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    createAnecdote(content);
    setNotfication(`you created "${content}"`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" required />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const ConnectedAnecdoteForm = connect(null, { createAnecdote, setNotfication })(
  AnecdoteForm
);
export default ConnectedAnecdoteForm;
