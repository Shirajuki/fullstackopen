import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const initalBlog = {
  title: "",
  author: "",
  url: "",
};
const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState(initalBlog);

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(blog);
    setBlog(initalBlog);
  };
  return (
    <div className="blogForm">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            id="title"
            type="text"
            value={blog.title}
            label="Title"
            name="title"
            onChange={({ target }) => setBlog({ ...blog, title: target.value })}
          />
        </div>
        <div>
          <TextField
            id="author"
            type="text"
            value={blog.author}
            label="Author"
            name="author"
            onChange={({ target }) =>
              setBlog({ ...blog, author: target.value })
            }
          />
        </div>
        <div>
          <TextField
            id="url"
            type="text"
            value={blog.url}
            label="Url"
            name="url"
            onChange={({ target }) => setBlog({ ...blog, url: target.value })}
          />
        </div>
        <Button
          id="submit-blog"
          type="submit"
          variant="contained"
          color="primary"
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
