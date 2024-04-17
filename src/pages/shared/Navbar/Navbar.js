import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../../Hooks/useAuthContext";
import useLogOut from "../../../Hooks/useLogOut";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { logOut } = useLogOut();

  let menuItems = [...document.querySelectorAll(".menu-item")];
  let options = {};

  const { user } = useAuthContext();

  const handleLogout = () => {
    logOut();
  };

  // stagger animation of menu
  const showItem = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        menuItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("menu-item-active");
          }, index * 100);
        });
      } else {
        menuItems.forEach((item) => {
          setTimeout(() => {
            item.classList.remove("menu-item-active");
          });
        });
      }
    });
  };

  let observer = new IntersectionObserver(showItem, options);

  menuItems.forEach((item) => {
    observer.observe(item);
  });

  useEffect(() => {
    gsap.to(".navbar", {
      y: 0,
      duration: 0.8,
    });
  }, []);

  return (
    <nav className="navbar desktop-max">
      <div className="logo">
        Ev<span className="blue">ent</span>M<span className="blue">ang</span>e
      </div>

      <div onClick={() => setOpen(!open)} className="ham-bar">
        <div className={`bar ${!open ? "" : "bar-active"}`}></div>
      </div>

      <div className={`main-menu ${!open ? "" : "main-menu-active"}`}>
        <ul className="menu-items">
          <li className="menu-item">
            <Link to={"/"} onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          <li className="menu-item">
            <Link to={"/events"} onClick={() => setOpen(false)}>
              Events
            </Link>
          </li>
          {user && (
            <>
              <li className="menu-item">
                <Link to={"/profile"} onClick={() => setOpen(false)}>
                  Profile
                </Link>
              </li>
              <li className="menu-item">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}

          {!user && (
            <>
              <li className="menu-item">
                <Link to={"/sign-in"} onClick={() => setOpen(false)}>
                  Sign In
                </Link>
              </li>
              <li className="menu-item">
                <Link to={"/sign-up"} onClick={() => setOpen(false)}>
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
