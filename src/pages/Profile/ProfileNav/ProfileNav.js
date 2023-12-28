import { FaUserAlt } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "./ProfileNav.css";

const ProfileNav = () => {
  // location hook to get user route
  const location = useLocation();
  // get the pathname where user was trying to go
  const { pathname } = location;
  // split the path name to show the active route the user currently in
  const splitLocation = pathname.split("/");
  console.log(splitLocation)

  return (
    <nav className="desktop-max flex justify-start items-center !py-5 !mt-3">
      <Link
        to={"/profile"}
        className={`no-underline flex justify-start items-center mx-10 font-semibold ${splitLocation[splitLocation.length - 1] === "profile" ? "text-accent-color" : "text-secondary-color"}`}
      >
        <FaUserAlt className="mr-2"></FaUserAlt>Profile
      </Link>
      <Link
        to={"/profile/my-events"}
        className={`no-underline flex justify-start items-center font-semibold ${splitLocation[splitLocation.length - 1] === "my-events" ? "text-accent-color" : "text-secondary-color"}`}
      >
        {" "}
        <MdEmojiEvents className="text-3xl mr-2"></MdEmojiEvents> My Events
      </Link>
    </nav>
  );
};

export default ProfileNav;
