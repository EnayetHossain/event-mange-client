import { Outlet } from "react-router-dom";
import ProfileCover from "../ProfileCover/ProfileCover";
import ProfileNav from "../ProfileNav/ProfileNav";
import "./Profile.css";

const Profile = () => {
  return (
    <section>
      <ProfileCover></ProfileCover>
      <ProfileNav></ProfileNav>
      <Outlet></Outlet>
    </section>
  );
};

export default Profile;
