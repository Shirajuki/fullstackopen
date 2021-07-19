import blogsService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";
const initialState = null;

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return action.data;
    }
    case "USER_LOGOUT":
      return action.data;
    default:
      return state;
  }
};

export const sessionLogin = (user) => {
  return async (dispatch) => {
    blogsService.setToken(user.token);
    dispatch({
      type: "USER_LOGIN",
      data: user,
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      window.localStorage.removeItem("loggedBloglistUser");
      blogsService.setToken(undefined);
      dispatch({
        type: "USER_LOGOUT",
        data: null,
      });
      dispatch(
        setNotification(
          {
            type: "success",
            message: "Logged out user",
          },
          5
        )
      );
    } catch (exception) {
      dispatch(
        setNotification({ type: "error", message: "Error logging out" }, 5)
      );
    }
  };
};
export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      blogsService.setToken(user.token);
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      dispatch({
        type: "USER_LOGIN",
        data: user,
      });
      dispatch(
        setNotification(
          {
            type: "success",
            message: `Logged in successfully as ${user.name}`,
          },
          5
        )
      );
    } catch (exception) {
      dispatch(
        setNotification({ type: "error", message: "wrong credentials" }, 5)
      );
    }
  };
};

export default blogReducer;
