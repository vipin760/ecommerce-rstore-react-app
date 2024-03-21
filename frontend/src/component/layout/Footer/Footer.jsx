import React from "react";
import Appstore from "../../../images/Appstore.png";
import playstore from "../../../images/playstore.png";
import './Footer.css'

const Footer = () => {
  return (
    <footer if="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download app Android and ios mobile phone</p>
        <img src={playstore} alt="playstore" />
        <img src={Appstore} alt="appstore" />
      </div>
      <div className="midFooter">
        <h1>R-Store</h1>
        <p>Highquality is our priority</p>
        <p>copy right 2024 &copy vipin m</p>
      </div>
      <div className="rightFooter">
        <h4>Follow us</h4>
        <a href="http://instagram.com/meabhisingh">Instagram</a>
        <a href="http://youtube.com/6packprogramemr">Youtube</a>
        <a href="http://instagram.com/meabhisingh">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
