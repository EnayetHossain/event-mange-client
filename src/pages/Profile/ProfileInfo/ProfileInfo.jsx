import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import ProfileForm from "../ProfileForm/ProfileForm";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import "./ProfileInfo.css";

const ProfileInfo = () => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

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
        onClick={() => setShowChangePasswordModal(true)}
      >
        <RiLockPasswordFill className="mr-3"></RiLockPasswordFill> Change
        password
      </button>

      {showChangePasswordModal && (
        <div className="modal-overlay flex justify-center items-center">
          <div className="modal-content">
            <ProfileForm
              setShowChangePasswordModal={setShowChangePasswordModal}
            ></ProfileForm>
          </div>
        </div>
      )}

      {showUpdateProfileModal && (
        <div className="modal-overlay flex justify-center items-center">
          <div className="modal-content">
            <UpdateProfile
              setShowUpdateProfileModal={setShowUpdateProfileModal}
            ></UpdateProfile>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowUpdateProfileModal(true)}
        className="bg-accent-color text-primary-color px-8 py-4 rounded-2xl"
      >
        Update Profile
      </button>
    </div>
  );
};

export default ProfileInfo;
