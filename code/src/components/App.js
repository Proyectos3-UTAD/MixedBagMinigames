import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./Home";
import SpaceInvaders from "./SpaceInvaders";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <SpaceInvaders />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
