import React from "react";
import { Link } from "@reach/router";

import "./Header.css";
import Logo from "../../img/png/logo.png";

class Header extends React.Component {
  render() {
    return (
        <div>
            <header>
                <Link to="/">
                    <div className="logo">
                        <img src={Logo} alt="Color Predict" />
                        <div className="logo-text">
                            <div className="logo-row">COLOR</div>
                            <div className="logo-row">PREDICT</div>
                        </div>
                    </div>
                </Link>
            </header>
            <div className="pitch">
                <p>
                    This app want predict potential colorful sunrise and sunset based on your location.
                    Cloud density,
                    temperature,
                    atmospheric pressure, humidity.. tbc
                </p>
            </div>
        </div>
    );
  }
}

export default Header;