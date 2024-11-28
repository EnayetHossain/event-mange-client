import { useState, useEffect } from "react";
import ErrorNotification from "../../../Components/ErrorNotification/ErrorNotification";
import FullScreenImageModal from "../../../Components/FullScreenImageModal/FullScreenImageModal";
import useAxiosConfig from "../../../Hooks/useAxiosConfig";
import "./ProfileCover.css";

const ProfileCover = () => {
  const [userInfo, setUserInfo] = useState({});
  const axiosConfig = useAxiosConfig();
  const [error, setError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [showProfileImage, setShowProfileImage] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axiosConfig.get("/api/v1/auth/getUserInfoById?fields=name,profilePhoto,coverPhoto");
        setUserInfo(response.data.data);
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
    <div className="desktop-max">
      {
        (error && showErrorNotification) && (
          <ErrorNotification
            error={error}
            setError={setError}
            setOpen={setShowErrorNotification}
          />
        )
      }

      {
        showProfileImage && <FullScreenImageModal setShowImageModal={setShowProfileImage} imageUrl={userInfo?.profilePhoto} />
      }

      <span className="work-sans font-bold text-4xl inline-block my-10">
        Profile Information
      </span>

      <div className="overflow-hidden h-[20em] rounded-2xl relative text-primary-color">
        <div className="absolute w-full h-full profile-photo flex flex-col justify-center items-center">
          <div className="w-[12rem] h-[12rem] overflow-hidden rounded-full cursor-pointer" onClick={() => setShowProfileImage(true)}>
            <img src={userInfo?.profilePhoto} alt="Profile" />
          </div>

          <div className="work-sans text-3xl font-semibold mt-4">{userInfo?.name}</div>
        </div>
        <img
          className="h-full object-cover object-center"
          src={userInfo?.coverPhoto}
          alt="cover"
        />
      </div>
    </div>
  );
};

export default ProfileCover;
