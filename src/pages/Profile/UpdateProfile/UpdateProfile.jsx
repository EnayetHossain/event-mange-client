import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { FaImage, FaUserAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { PiSignInBold } from "react-icons/pi";
import useClickOutside from "../../../Hooks/useClickOutside";

const UpdateProfile = ({ setShowUpdateProfileModal }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const updateProfileRef = useRef(null);

  // close modal on click outside
  useClickOutside(updateProfileRef, setShowUpdateProfileModal);

  return (
    <div className="form-container bg-primary-color overflow-hidden rounded-2xl" ref={updateProfileRef}>
      <form
        className="sign-form work-sans !py-0 md:!px-[1em]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="input-container">
          <label className="mb-3" htmlFor="name">
            Full Name
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3 form-icon">
              <FaUserAlt></FaUserAlt>
            </span>
            <input
              type="text"
              {...register("name")}
              placeholder="Your Name"
              defaultValue={"User name"}
            />
          </div>
        </div>

        <div className="input-container">
          <label className="mb-3" htmlFor="profilePhoto">
            Profile Picture
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3 form-icon">
              <FaImage></FaImage>
            </span>
            <input type="file" {...register("profilePhoto")} />
          </div>
        </div>

        <div className="input-container">
          <label className="mb-3" htmlFor="coverPhoto">
            Cover Picture
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3 form-icon">
              <FaImage></FaImage>
            </span>
            <input type="file" {...register("coverPhoto")} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full pb-[1.5em]">
          <div className="bg-accent-color mb-10 sm:mb-0 text-primary-color py-5 text-center rounded-2xl text-3xl cursor-pointer flex justify-center items-center w-full mx-3">
            <input
              className="cursor-pointer"
              type="submit"
              value="Update Profile"
            />
            <span className="ml-5">
              <PiSignInBold></PiSignInBold>
            </span>
          </div>

          <div
            className="border-accent-color border-2 text-secondary-color py-5 text-center rounded-2xl text-3xl cursor-pointer flex justify-center items-center w-full mx-3"
            onClick={() => setShowUpdateProfileModal(false)}
          >
            <button className="cursor-pointer font-semibold" type="button">
              Cancel
            </button>
            <span className="ml-5">
              <IoCloseSharp></IoCloseSharp>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
