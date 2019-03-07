import React from "react";
import ReactDOM from "react-dom";

import './App.css';

import Header from "/components/Header";
import CardBoard from "/components/CardBoard";
import Footer from "/components/Footer";

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <CardBoard />
        <Footer />
      </div>
    );
  }
}

export default App;