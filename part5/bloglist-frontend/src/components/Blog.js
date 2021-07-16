import React from "react";
import Togglable from "./Toggleable";
import "../index.css";
const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const remove = () => {
    if (window.confirm(`remove blog "${blog.title}" by ${blog.author}?`)) {
      deleteBlog(blog);
    }
  };

  return (
    <div className="blog">
      <p>
        {blog.title} {blog.author}
      </p>
      <Togglable buttonLabel="view" buttonLabelClose="hide">
        <p>
          url: <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          likes: {blog.likes}{" "}
          <button className="btn" onClick={() => likeBlog(blog)}>
            like
          </button>
        </p>
        <p>added by user: {blog.user?.name || "anonynmous"}</p>
        <button className="btn" onClick={remove}>
          remove
        </button>
      </Togglable>
    </div>
  );
};

export default Blog;
