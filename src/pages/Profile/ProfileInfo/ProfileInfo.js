import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import ProfileForm from "../ProfileForm/ProfileForm";
import "./ProfileInfo.css";

const ProfileInfo = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="desktop-max !mt-14">
      <div className="work-sans font-semibold text-3xl mb-8">About me</div>
      <div className="flex items-center work-sans">
        <FaUserAlt className="mr-3"></FaUserAlt> User Name
      </div>

      <div className="flex items-center work-sans my-4">
        <MdEmail className="mr-3"></MdEmail> useremail@gamil.com
      </div>

      <button
        className="flex items-center mb-4 underline text-accent-color"
        onClick={() => setShowModal(true)}
      >
        <RiLockPasswordFill className="mr-3"></RiLockPasswordFill> Change
        password
      </button>

      {showModal && (
        <div className="overlay flex justify-center items-center">
          <div className="modal-content">
            <ProfileForm setShowModal={setShowModal}></ProfileForm>
          </div>
        </div>
      )}

      <button className="bg-accent-color text-primary-color px-8 py-4 rounded-2xl">
        Update Profile
      </button>
    </div>
  );
};

export default ProfileInfo;
