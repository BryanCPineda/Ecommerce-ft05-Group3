import React from "react";
import './Footer.css';

function Footer() {
  return (
    <div className="footer-container">
      <div className="d-flex justify-content-around">
        <div><img className="image-brand" src={"/images/brand4.png"} alt="Logo"/></div>
        <div>
          <h4>explore</h4>
          <h6>home</h6>
          <h6>about</h6>
        </div>
        <div>
          <h4>Follow</h4>
          <h6>Instagram</h6>
          <h6>Twitter</h6>
        </div>
        <div>
          <h4>Legal</h4>
          <h6>Terms</h6>
          <h6>Privacy</h6>
        </div>
      </div>
      <div className="d-flex justify-content-center">social media</div>
    </div>
  );
}

export default Footer;
