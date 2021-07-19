import blogsService from "../services/blogs";
import { setNotification } from "./notificationReducer";
const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_BLOG": {
      const updatedBlog = action.data;
      const nblogs = state.map((b) => {
        return b.id === updatedBlog.id ? updatedBlog : b;
      });
      nblogs.sort((a, b) => Number(b.likes) - Number(a.likes));
      return nblogs;
    }
    case "DELETE_BLOG": {
      const blog = action.data;
      const nblogs = state.filter((b) => b.id !== blog.id);
      return nblogs;
    }
    case "NEW_BLOG":
      return state.concat(action.data);
    case "INIT_BLOGS":
      return action.data;
    default:
      return state;
  }
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogsService.remove(blog.id);
      dispatch({
        type: "DELETE_BLOG",
        data: blog,
      });
      dispatch(
        setNotification(
          {
            type: "success",
            message: `deleted blog "${blog.title}" by ${blog.author}`,
          },
          5
        )
      );
    } catch (exception) {
      dispatch(
        setNotification({ type: "error", message: "Couldn't delete blog" }, 5)
      );
    }
  };
};
export const updateBlog = (id, blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogsService.update(id, blog);
      dispatch({
        type: "UPDATE_BLOG",
        data: updatedBlog,
      });
      dispatch(
        setNotification(
          {
            type: "success",
            message: `blog "${updatedBlog.title}" by ${updatedBlog.author} has been liked`,
          },
          5
        )
      );
    } catch (exception) {
      dispatch(
        setNotification({ type: "error", message: "Couldn't like blog" }, 5)
      );
    }
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogsService.create({
        ...blog,
        user: blog.user.id,
      });
      dispatch({
        type: "NEW_BLOG",
        data: createdBlog,
      });
      dispatch(
        setNotification(
          {
            type: "success",
            message: `a new blog "${createdBlog.title}" by ${createdBlog.author} added`,
          },
          5
        )
      );
    } catch (exception) {
      dispatch(setNotification({ type: "error", message: "Invalid input" }, 5));
    }
  };
};
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    blogs.sort((a, b) => Number(b.likes) - Number(a.likes));
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogsService.comment(id, comment);
      dispatch({
        type: "UPDATE_BLOG",
        data: updatedBlog,
      });
      dispatch(
        setNotification(
          {
            type: "success",
            message: `blog "${updatedBlog.title}" by ${updatedBlog.author} has been commented`,
          },
          5
        )
      );
    } catch (exception) {
      dispatch(
        setNotification({ type: "error", message: "Couldn't comment blog" }, 5)
      );
    }
  };
};

export default blogReducer;
