import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Button,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import {
  initializeBlogs,
  updateBlog,
  deleteBlog,
  commentBlog,
} from "../reducers/blogReducer";
import "../index.css";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const likeBlog = async (blog) => {
    const newBlog = {
      user: blog.user?.id || "",
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    dispatch(updateBlog(blog.id, newBlog));
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const remove = async (blog) => {
    if (window.confirm(`remove blog "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
    }
  };
  const addComment = async (event) => {
    event.preventDefault();
    dispatch(commentBlog(blog.id, comment));
    setComment("");
    dispatch(initializeBlogs());
  };

  if (!blog) return <></>;
  return (
    <Container
      className="blogSingle"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>
        {blog.title} {blog.author}
      </h1>
      <p>
        url: <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        likes: {blog.likes}{" "}
        <Button
          variant="outlined"
          color="primary"
          className="btn"
          onClick={() => likeBlog(blog)}
        >
          like
        </Button>
      </p>
      <p>added by user: {blog.user?.name || "anonynmous"}</p>
      {user?.name === blog.user?.name ? (
        <Button
          variant="outlined"
          color="primary"
          className="btn"
          onClick={() => remove(blog)}
        >
          remove
        </Button>
      ) : (
        <></>
      )}
      <h3>comments</h3>
      <form
        onSubmit={addComment}
        style={{ display: "flex", alignItems: "center" }}
      >
        <TextField
          type="string"
          value={comment}
          label="Comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant="outlined" color="primary">
          add comment
        </Button>
      </form>
      <List>
        {blog.comments.map((c, index) => (
          <ListItem key={index} style={{ padding: 0 }}>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary={c} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Blog;
