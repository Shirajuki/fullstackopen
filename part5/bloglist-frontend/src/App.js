import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
import blogsService from "./services/blogs";
import loginService from "./services/login";

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
  const blogFormRef = useRef();

  useEffect(() => {
    const loadBlogs = async () => {
      const blogs = await blogsService.getAll();
      blogs.sort((a, b) => Number(b.likes) - Number(a.likes));
      setBlogs(blogs);
    };
    loadBlogs();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogsService.setToken(user.token);
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
      setErrorMessage({ type: "error", message: "wrong credentials" });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleLogout = async () => {
    if (user) {
      window.localStorage.removeItem("loggedBloglistUser");
      setUser(undefined);
      blogsService.setToken(undefined);
    }
  };
  const handleCreateBlog = async (blog) => {
    if (validBlog(blog)) {
      try {
        const createdBlog = await blogsService.create(blog);
        setBlogs(blogs.concat({ ...createdBlog, user: user }));
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
    }
  };

  const handleLike = async (blog) => {
    const newBlog = {
      user: blog.user?.id || "",
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    try {
      const updatedBlog = await blogsService.update(blog.id, newBlog);
      const nblogs = blogs.map((b) => {
        return b.id === updatedBlog.id ? updatedBlog : b;
      });
      nblogs.sort((a, b) => Number(b.likes) - Number(a.likes));
      setBlogs(nblogs);
      setErrorMessage({
        type: "success",
        message: `blog "${updatedBlog.title}" by ${updatedBlog.author} has been liked`,
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage({ type: "error", message: "Couldn't like blog" });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleDeleteBlog = async (blog) => {
    try {
      await blogsService.remove(blog.id);
      const nblogs = blogs.filter((b) => b.id !== blog.id);
      setBlogs(nblogs);
      setErrorMessage({
        type: "success",
        message: `deleted blog "${blog.title}" by ${blog.author}`,
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage({ type: "error", message: "Couldn't delete blog" });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // Auto login if user exists in localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
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
                id="username"
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password{" "}
              <input
                id="password"
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button id="login-button" type="submit">
              login
            </button>
          </form>
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <Notification errorMessage={errorMessage} />
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog} />
          </Togglable>
          <br />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={handleLike}
              deleteBlog={handleDeleteBlog}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
