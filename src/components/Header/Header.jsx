import React from "react";

import "./Header.css";
import Logo from "../../img/png/color-predict-logo.png";

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <a className="logo" href=".">
          <div className="logo-app">
            <img src={Logo} className="d-inline-block align-top" alt="" />
            <div>Color Predict</div>
          </div>
        </a>
      </nav>
    );
  }
}

export default Header;