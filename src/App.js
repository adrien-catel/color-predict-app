import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";

import Header from "./Header";
import Board from "./Board";
import Footer from "./Footer";

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <Board />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
