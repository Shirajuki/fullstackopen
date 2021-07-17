const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const nstate = state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
      nstate.sort((a, b) => b.votes - a.votes);
      return nstate;
    case "NEW_ANECDOTE":
      const data = action.data;
      return [...state, data];
    case "INIT_ANECDOTE":
      return action.data;
    default:
      return state;
  }
};

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};
export const createAnecdote = (data) => {
  return {
    type: "NEW_ANECDOTE",
    data: data,
  };
};
export const initializeAnecdotes = (data) => {
  return {
    type: "INIT_ANECDOTE",
    data: data,
  };
};

export default anecdoteReducer;
