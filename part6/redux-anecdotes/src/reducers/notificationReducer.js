const initialState = "";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTFICATION":
      const message = action.data.message;
      return message;
    case "REMOVE_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export const setNotfication = (message, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTFICATION",
      data: { message },
    });
    setTimeout(() => {
      dispatch(removeNotification());
    }, seconds * 1000);
  };
};
export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
    data: {},
  };
};

export default notificationReducer;
