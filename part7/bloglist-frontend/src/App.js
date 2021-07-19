import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import usersService from "./services/users";
import { sessionLogin } from "./reducers/userReducer";
import Home from "./components/Home";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import { login, logout } from "./reducers/userReducer";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";

const Navigation = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5,
  };
  const margin = {
    marginRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        <Button variant="outlined" color="primary">
          blogs
        </Button>
      </Link>
      <Link style={padding} to="/users">
        <Button variant="outlined" color="primary">
          users
        </Button>
      </Link>
      {user ? (
        <span>
          <Button
            onClick={handleLogout}
            variant="outlined"
            color="primary"
            style={margin}
          >
            logout
          </Button>
          {user.name} logged in
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const initializeUsers = async () => {
      const users = await usersService.getAll();
      setUsers(users);
    };
    initializeUsers();
  }, []);

  const handleLogout = async () => {
    if (user) {
      dispatch(logout());
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(username, password));
    setUsername("");
    setPassword("");
  };
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(sessionLogin(user));
    }
  }, []);

  const userMatch = useRouteMatch("/users/:id");
  const routeUser = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null;
  const blogMatch = useRouteMatch("/blogs/:id");
  const routeBlog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null;

  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <Navigation user={user} handleLogout={handleLogout} />
      </Grid>
      {user ? (
        <>
          <h2>blogs</h2>
          <Notification />
        </>
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "calc(100vh - 20px)", textAlign: "center" }}
        >
          <Grid item xs={3}>
            <h2>Log in to application</h2>
            <Notification />
            <form onSubmit={handleLogin}>
              <div>
                <TextField
                  id="username"
                  type="text"
                  value={username}
                  label="Username"
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>
              <div>
                <TextField
                  id="password"
                  type="password"
                  value={password}
                  label="Password"
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                id="login-button"
                type="submit"
                style={{ width: "100%", marginTop: "10px" }}
              >
                login
              </Button>
            </form>
          </Grid>
        </Grid>
      )}
      <br />
      <Switch>
        <Route path="/users/:id">
          <User user={routeUser} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={routeBlog} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
