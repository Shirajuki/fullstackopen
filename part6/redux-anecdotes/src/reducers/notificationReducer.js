const initialState = { message: "", timer: 0 };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTFICATION":
      clearTimeout(state.timer);
      return action.data;
    case "REMOVE_NOTIFICATION":
      clearTimeout(state.timer);
      return { ...initialState };
    default:
      return state;
  }
};

export const setNotfication = (message, seconds) => {
  return async (dispatch) => {
    const timer = setTimeout(() => {
      dispatch(removeNotification());
    }, seconds * 1000);
    dispatch({
      type: "SET_NOTFICATION",
      data: { message: message, timer: timer },
    });
  };
};
export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
    data: {},
  };
};

export default notificationReducer;
