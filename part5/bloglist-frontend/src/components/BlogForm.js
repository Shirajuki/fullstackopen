import React, { useState } from "react";

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
          title{" "}
          <input
            id="title"
            type="text"
            value={blog.title}
            name="title"
            onChange={({ target }) => setBlog({ ...blog, title: target.value })}
          />
        </div>
        <div>
          author{" "}
          <input
            id="author"
            type="text"
            value={blog.author}
            name="author"
            onChange={({ target }) =>
              setBlog({ ...blog, author: target.value })
            }
          />
        </div>
        <div>
          url{" "}
          <input
            id="url"
            type="text"
            value={blog.url}
            name="url"
            onChange={({ target }) => setBlog({ ...blog, url: target.value })}
          />
        </div>
        <button id="submit-blog" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
