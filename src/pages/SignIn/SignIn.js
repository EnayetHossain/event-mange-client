import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-container">
      <form className="sign-form work-sans">
        <div className="input-container">
          <label className="mb-3" htmlFor="email">
            Email Address
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3 form-icon"><MdEmail></MdEmail></span>
            <input type="email" name="email" placeholder="example@gamil.com" />
          </div>
        </div>

        <div className="input-container">
          <label className="mb-3" htmlFor="password">
            Password
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3 form-icon"><RiLockPasswordFill></RiLockPasswordFill></span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
            />
            <span
              className="ml-3 cursor-pointer form-icon"
              title={showPassword ? "Hide Password" : "Show Password"}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
          </div>
        </div>

        <div className="bg-accent-color text-primary-color py-5 text-center rounded-2xl text-3xl cursor-pointer flex justify-center items-center">
          <input className="cursor-pointer" type="submit" value="Sign In" />
          <span className="ml-5"><PiSignInBold></PiSignInBold></span>
        </div>

        <div className="mt-10">
          Don't have an account? <Link to={"/sign-up"}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
