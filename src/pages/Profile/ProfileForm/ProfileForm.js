import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { PiSignInBold } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";

const ProfileForm = ({ setShowModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setConfirmNewPassword] = useState(false);

  return (
    <div className="form-container bg-primary-color overflow-hidden rounded-2xl">
      <form className="sign-form work-sans !py-0 md:!px-[1em]">
        <div className="input-container">
          <label className="mb-3" htmlFor="oldPassword">
            Old Password
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3 form-icon">
              <RiLockPasswordFill></RiLockPasswordFill>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="Old Password"
            />
            <span
              className="ml-3 cursor-pointer form-icon"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
          </div>
        </div>

        <div className="input-container">
          <label className="mb-3" htmlFor="newPassword">
            New Password
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3 form-icon">
              <RiLockPasswordFill></RiLockPasswordFill>
            </span>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
            />
            <span
              className="ml-3 cursor-pointer form-icon"
              onClick={() => setShowNewPassword(!showNewPassword)}
              title={showNewPassword ? "Hide Password" : "Show Password"}
            >
              {showNewPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
          </div>
        </div>

        <div className="input-container">
          <label className="mb-3" htmlFor="confirm-password">
            Confirm New Password
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3 form-icon">
              <RiLockPasswordFill></RiLockPasswordFill>
            </span>
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              name="confirmNewPassword"
              placeholder="Confirm New Password"
            />
            <span
              className="ml-3 cursor-pointer form-icon"
              onClick={() => setConfirmNewPassword(!showConfirmNewPassword)}
              title={showConfirmNewPassword ? "Hide Password" : "Show Password"}
            >
              {showConfirmNewPassword ? (
                <FaEyeSlash></FaEyeSlash>
              ) : (
                <FaEye></FaEye>
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full pb-[1.5em]">
          <div className="bg-accent-color mb-10 sm:mb-0 text-primary-color py-5 text-center rounded-2xl text-3xl cursor-pointer flex justify-center items-center w-full mx-3">
            <input
              className="cursor-pointer"
              type="submit"
              value="Change Password"
            />
            <span className="ml-5">
              <PiSignInBold></PiSignInBold>
            </span>
          </div>

          <div
            className="border-accent-color border-2 text-secondary-color py-5 text-center rounded-2xl text-3xl cursor-pointer flex justify-center items-center w-full mx-3"
            onClick={() => setShowModal(false)}
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

export default ProfileForm;
