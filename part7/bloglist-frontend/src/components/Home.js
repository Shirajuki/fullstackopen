import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Togglable from "./Toggleable";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, createBlog } from "../reducers/blogReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const validBlog = (blog) => {
  if (blog) return true;
  return false;
};
const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleCreateBlog = async (blog) => {
    if (validBlog(blog)) {
      const createdBlog = { ...blog, user: user };
      dispatch(createBlog(createdBlog));
    }
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {user ? (
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={handleCreateBlog} />
        </Togglable>
      ) : (
        <></>
      )}
      <br />
      <List component="nav">
        {blogs.map((blog, index) => (
          <div key={index} className="blog">
            <Link to={`/blogs/${blog.id}`}>
              <ListItem button>
                <ListItemText primary={`${blog.title} ${blog.author}`} />
              </ListItem>
            </Link>
          </div>
        ))}
      </List>
    </div>
  );
};
export default Home;
