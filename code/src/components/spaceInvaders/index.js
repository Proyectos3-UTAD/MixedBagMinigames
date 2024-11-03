import React from "react";
import ReactDOM from "react-dom";
import SpaceInvaders from './space-invaders';

const App = () => <SpaceInvaders />
const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
