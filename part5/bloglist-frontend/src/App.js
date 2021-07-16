import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const initalBlog = {
  title: "",
  author: "",
  url: "",
};
const validBlog = (blog) => {
  if (blog) return true;
  return false;
};
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [blog, setBlog] = useState(initalBlog);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      setErrorMessage({
        type: "success",
        message: `Logged in successfully as ${user.name}`,
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage({ type: "error", message: "Invalid input" });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleLogout = () => {
    if (user) {
      window.localStorage.removeItem("loggedBloglistUser");
      setUser(undefined);
      blogService.setToken(undefined);
    }
  };
  const handleCreateBlog = async (event) => {
    event.preventDefault();
    if (validBlog(blog)) {
      try {
        const createdBlog = await blogService.create(blog);
        setBlogs(blogs.concat(createdBlog));
        setErrorMessage({
          type: "success",
          message: `a new blog "${createdBlog.title}" by ${createdBlog.author} added`,
        });
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      } catch (exception) {
        setErrorMessage({ type: "error", message: "Invalid input" });
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
      setBlog(initalBlog);
    }
  };

  // Auto login if user exists in localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      {!user ? (
        <>
          <h2>Log in to application</h2>
          <Notification errorMessage={errorMessage} />
          <form onSubmit={handleLogin}>
            <div>
              username{" "}
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password{" "}
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <Notification errorMessage={errorMessage} />
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <h2>create new</h2>
          <form onSubmit={handleCreateBlog}>
            <div>
              title{" "}
              <input
                type="text"
                value={blog.title}
                name="title"
                onChange={({ target }) =>
                  setBlog({ ...blog, title: target.value })
                }
              />
            </div>
            <div>
              author{" "}
              <input
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
                type="text"
                value={blog.url}
                name="url"
                onChange={({ target }) =>
                  setBlog({ ...blog, url: target.value })
                }
              />
            </div>
            <button type="submit">create</button>
          </form>
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
