import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import ProfileForm from "../ProfileForm/ProfileForm";
import "./ProfileInfo.css";

const ProfileInfo = () => {
  const [showForm, setShowForm] = useState(false);
  
  return (
    <div className="desktop-max !mt-11">
      <div className="work-sans font-semibold text-3xl mb-8">About me</div>
      <div className="flex items-center work-sans">
        <FaUserAlt className="mr-3"></FaUserAlt> User Name
      </div>
      <div className="flex items-center work-sans">
        <MdEmail className="mr-3"></MdEmail> useremail@gamil.com
      </div>
      <button className="flex items-center" onClick={()=> setShowForm(true)}>
        <RiLockPasswordFill className="mr-3"></RiLockPasswordFill> Change
        password
      </button>

      {
        showForm && <ProfileForm setShowForm={setShowForm}></ProfileForm>
      }

      <Link className="" to={"/update-profile"}>
        Update Profile
      </Link>
    </div>
  );
};

export default ProfileInfo;
