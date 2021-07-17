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

export const setNotfication = (message) => {
  return {
    type: "SET_NOTFICATION",
    data: { message },
  };
};
export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
    data: {},
  };
};

export default notificationReducer;
