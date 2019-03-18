import React from "react";

import './Footer.css';
import Poweredby from "../../img/png/poweredby-darkbackground.png";

class Footer extends React.Component {
  render() {
    return (
        <div className="footer">
            <a target="_blank" rel="noopener noreferrer" href="https://darksky.net/poweredby/"> 
                <img src={Poweredby} alt="Powered by DarkSky" />
            </a>
        </div>
    );
  }
}

export default Footer;