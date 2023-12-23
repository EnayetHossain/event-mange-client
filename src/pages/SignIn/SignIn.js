import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-container">
      <form className="sign-form work-sans">
        <div className="input-container">
          <label className="mb-5" htmlFor="email">
            Email Address
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3">icon</span>
            <input type="email" name="email" placeholder="example@gamil.com" />
          </div>
        </div>

        <div className="input-container">
          <label className="mb-5" htmlFor="password">
            Password
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3">icon</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
            />
            <span
              className="ml-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "hide" : "show"}
            </span>
          </div>
        </div>

        <div className="bg-accent-color text-primary-color py-5 text-center rounded-2xl text-3xl cursor-pointer">
          <input className="cursor-pointer" type="submit" value="Sign In" />
          <span className="ml-3">icon</span>
        </div>

        <div className="mt-10">
          Don't have an account? <Link to={"/sign-up"}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
