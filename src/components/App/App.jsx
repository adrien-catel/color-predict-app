import React from "react";
import ReactDOM from "react-dom";

import './App.css';

import Header from "/components/Header";
import Board from "/components/Board";
import Footer from "/components/Footer";

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

export default App;