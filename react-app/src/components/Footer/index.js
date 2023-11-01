import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer__container">
      <p>Created by Ian Kaneshiro</p>
      <div className="footer__socials">
        <a
          href="https://www.linkedin.com/in/iandkaneshiro/"
          rel="noreferrer"
          target="_blank"
        >
          <i className="fa-brands fa-linkedin fa-2xl"></i>
        </a>
        <a
          href="https://github.com/IanKaneshiro"
          rel="noreferrer"
          target="_blank"
        >
          <i className="fa-brands fa-github fa-2xl"></i>
        </a>
        <a
          href="https://www.iankaneshiro.dev/"
          rel="noreferrer"
          target="_blank"
        >
          <i className="fa-solid fa-earth-americas fa-2xl"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
