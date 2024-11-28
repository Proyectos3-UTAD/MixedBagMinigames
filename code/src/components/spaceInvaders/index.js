import React from "react";
import ReactDOM from "react-dom";
import GameApp from "./GameApp";

const App = () => <GameApp />;
const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
