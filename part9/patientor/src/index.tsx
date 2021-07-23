import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { reducer, StateProvider } from "./state";

ReactDOM.render(
  <StateProvider reducer={reducer}>
    <Router>
      <App />
    </Router>
  </StateProvider>,
  document.getElementById("root")
);
