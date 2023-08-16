import React from 'react';
import { Link } from 'react-router-dom';
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className='footer-container desktop-max'>
                <ul className='footer-menu-items'>
                    <li className='footer-menu-item'><Link to={"/"}>Home</Link></li>
                    <li className='footer-menu-item'><Link to={"/events"}>Events</Link></li>
                    <li className='footer-menu-item'><Link to={"/profile"}>Profile</Link></li>
                    <li className='footer-menu-item'><Link to={"/login"}>Login</Link></li>
                    <li className='footer-menu-item'><Link to={"/sign-up"}>Sign up</Link></li>
                    <li className='footer-menu-item'><Link to={"/logout"}>Logout</Link></li>
                </ul>

                <ul className='footer-socials-items'>
                    <li className='footer-socials-item'><Link to={"#"}>Facebook</Link></li>
                    <li className='footer-socials-item'><Link to={"#"}>Twitter</Link></li>
                    <li className='footer-socials-item'><Link to={"#"}>Linkedin</Link></li>
                    <li className='footer-socials-item'><Link to={"#"}>Instagram</Link></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;