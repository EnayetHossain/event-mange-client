import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import ErrorNotification from "../../../Components/ErrorNotification/ErrorNotification";
import useAxiosConfig from "../../../Hooks/useAxiosConfig";
import ProfileForm from "../ProfileForm/ProfileForm";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import "./ProfileInfo.css";

const ProfileInfo = () => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const axiosConfig = useAxiosConfig();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axiosConfig.get("/api/v1/auth/getUserInfoById?fields=name,email");
        setUserInfo(response.data.data)
        setError("");
        setShowErrorNotification(false);
      } catch (error) {
        setError(`${error.message}. ${error?.response?.data?.error}`);
        setShowErrorNotification(true);
      }
    }

    getUserInfo();
  }, [axiosConfig]);

  return (
    <div className="desktop-max !mt-14">
      {
        (error && showErrorNotification) && (
          <ErrorNotification
            error={error}
            setError={setError}
            setOpen={setShowErrorNotification}
          />
        )
      }
      <div className="work-sans font-semibold text-3xl mb-8">About me</div>
      <div className="flex items-center work-sans">
        <FaUserAlt className="mr-3"></FaUserAlt> {userInfo?.name}
      </div>

      <div className="flex items-center work-sans my-4">
        <MdEmail className="mr-3"></MdEmail> {userInfo?.email}
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
