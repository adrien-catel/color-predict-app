import React from "react";
import { Provider } from "react-redux";
import store from "../../store/index";

import './App.css';

import Header from "../../components/Header";
import CardBoard from "../../components/CardBoard";
import Footer from "../../components/Footer";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container-fluid app-container">
          <Header />
          <CardBoard />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;