import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container desktop-max">
        <ul className="footer-menu-items">
          <li className="footer-menu-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="footer-menu-item">
            <Link to={"/events"}>Events</Link>
          </li>
          <li className="footer-menu-item">
            <Link to={"/profile"}>Profile</Link>
          </li>
          <li className="footer-menu-item">
            <Link to={"/login"}>Login</Link>
          </li>
          <li className="footer-menu-item">
            <Link to={"/sign-up"}>Sign up</Link>
          </li>
          <li className="footer-menu-item">
            <Link to={"/logout"}>Logout</Link>
          </li>
        </ul>

        <ul className="footer-socials-items">
          <li className="footer-socials-item" title="Facebook">
            <Link to={"#"}>
              <FaFacebookF></FaFacebookF>
            </Link>
          </li>
          <li className="footer-socials-item" title="Twitter">
            <Link to={"#"}><FaTwitter></FaTwitter></Link>
          </li>
          <li className="footer-socials-item" title="Linkedin">
            <Link to={"#"}><FaLinkedinIn></FaLinkedinIn></Link>
          </li>
          <li className="footer-socials-item" title="Instagram">
            <Link to={"#"}><RiInstagramFill></RiInstagramFill></Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
