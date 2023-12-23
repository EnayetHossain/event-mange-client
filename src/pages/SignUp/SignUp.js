import { useState } from "react";
import { FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="form-container">
      <form className="sign-form work-sans">
        <div className="input-container">
          <label className="mb-3" htmlFor="full-name">
            Full Name
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3 form-icon">
              <FaUserAlt></FaUserAlt>
            </span>
            <input type="text" name="full-name" placeholder="Your Name" />
          </div>
        </div>

        <div className="input-container">
          <label className="mb-3" htmlFor="email">
            Email Address
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3 form-icon">
              <MdEmail></MdEmail>
            </span>
            <input type="email" name="email" placeholder="example@gamil.com" />
          </div>
        </div>

        <div className="input-container">
          <label className="mb-3" htmlFor="password">
            Password
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3 form-icon">
              <RiLockPasswordFill></RiLockPasswordFill>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
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
          <label className="mb-3" htmlFor="confirm-password">
            Confirm Password
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3 form-icon">
              <RiLockPasswordFill></RiLockPasswordFill>
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm-password"
              placeholder="Confirm password"
            />
            <span
              className="ml-3 cursor-pointer form-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              title={showConfirmPassword ? "Hide Password" : "Show Password"}
            >
              {showConfirmPassword ? (
                <FaEyeSlash></FaEyeSlash>
              ) : (
                <FaEye></FaEye>
              )}
            </span>
          </div>
        </div>

        <div className="bg-accent-color text-primary-color py-5 text-center rounded-2xl text-3xl cursor-pointer">
          <input className="cursor-pointer" type="submit" value="Sign Up" />
          <span className="ml-3">icon</span>
        </div>

        <div className="mt-10">
          Already have an account? <Link to={"/sign-in"}>Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
