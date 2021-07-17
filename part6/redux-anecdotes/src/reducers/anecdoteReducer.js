import anecdotesService from "../services/anecdotes";
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
        anecdote.id === id ? action.data : anecdote
      );
      nstate.sort((a, b) => b.votes - a.votes);
      return nstate;
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTE":
      return action.data;
    default:
      return state;
  }
};

export const voteAnecdote = (id, data) => {
  return async (dispatch) => {
    try {
      await anecdotesService.vote(id, data);
      dispatch({
        type: "VOTE",
        data: data,
      });
    } catch (exception) {}
  };
};
export const createAnecdote = (content) => {
  return async (dispatch) => {
    dispatch({
      type: "NEW_ANECDOTE",
      data: asObject(content),
    });
  };
};
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: "INIT_ANECDOTE",
      data: anecdotes,
    });
  };
};

export default anecdoteReducer;
