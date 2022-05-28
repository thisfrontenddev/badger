import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

function render() {
  ReactDOM.render(<App />, document.body);
}

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);
render();
