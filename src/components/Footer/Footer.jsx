import React from "react";

import './Footer.css';
import Poweredby from "/img/poweredby-darkbackground.png";

class Footer extends React.Component {
  render() {
    return (
        <div className="footer">
            <a target="_blank" href="https://darksky.net/poweredby/">
                <img src={Poweredby} />
            </a>
        </div>
    );
  }
}

export default Footer;