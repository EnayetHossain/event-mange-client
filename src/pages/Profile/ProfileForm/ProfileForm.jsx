import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { PiSignInBold } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import ErrorNotification from "../../../Components/ErrorNotification/ErrorNotification";
import SuccessNotification from "../../../Components/SuccessNotification/SuccessNotification";
import useAxiosConfig from "../../../Hooks/useAxiosConfig";
import useClickOutside from "../../../Hooks/useClickOutside";

const ProfileForm = ({ setShowChangePasswordModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setConfirmNewPassword] = useState(false);
  const [error, setError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const changePasswordRef = useRef(null);
  const axiosConfig = useAxiosConfig();

  // close modal on click outside
  useClickOutside(changePasswordRef, setShowChangePasswordModal);

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axiosConfig.patch("/api/v1/auth/change-password", data)
      reset();
      setError("");
      setShowErrorNotification(false);
      setMessage(`${response.data.status}. ${response.data.message}`);
      setShowSuccessNotification(true);
    } catch (error) {
      setMessage("");
      setShowSuccessNotification(false);
      setError(`${error.message}. ${error?.response?.data?.error}`);
      setShowErrorNotification(true);
    }
  }

  return (
    <div className="form-container bg-primary-color overflow-hidden rounded-2xl" ref={changePasswordRef}>
      {
        (error && showErrorNotification) &&
        <ErrorNotification
          error={error}
          setError={setError}
          setOpen={setShowErrorNotification}
        />
      }

      {
        (message && showSuccessNotification) &&
        <SuccessNotification
          message={message}
          setMessage={setMessage}
          setOpen={setShowSuccessNotification}
        />
      }
      <form className="sign-form work-sans !py-0 md:!px-[1em]" onSubmit={handleSubmit(onSubmit)}>
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
              {...register("oldPassword", { required: true })}
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
        {errors.oldPassword && <span className="error">password required</span>}

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
              {...register("newPassword", { required: true })}
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
        {errors.newPassword && <span className="error">Provide new password</span>}

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
              {...register("confirmNewPassword", {
                required: true,
                validate: (val) => {
                  if (watch("newPassword") !== val) {
                    return "Confirm password doesn't match"
                  }
                }
              })}
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
        {errors.confirmNewPassword && <span className="error mb-10">Confirm new password</span>}

        <div className="flex flex-col sm:flex-row w-full pb-[1.5em]">
          <div className="bg-accent-color mb-10 sm:mb-0 text-primary-color text-center rounded-2xl text-3xl flex justify-center items-center w-full mx-3">
            <input
              className="cursor-pointer h-full py-5"
              type="submit"
              value="Change Password"
            />
            <span className="ml-5">
              <PiSignInBold></PiSignInBold>
            </span>
          </div>

          <div
            className="border-accent-color border-2 text-secondary-color py-5 text-center rounded-2xl text-3xl cursor-pointer flex justify-center items-center w-full mx-3"
            onClick={() => setShowChangePasswordModal(false)}
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
