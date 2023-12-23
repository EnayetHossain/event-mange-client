import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="form-container">
      <form className="sign-form work-sans">
        <div className="input-container">
          <label className="mb-5" htmlFor="full-name">
            Full Name
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3">icon</span>
            <input type="text" name="full-name" placeholder="Your Name" />
          </div>
        </div>

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

        <div className="input-container">
          <label className="mb-5" htmlFor="confirm-password">
            Confirm Password
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3">icon</span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm-password"
              placeholder="Confirm password"
            />
            <span className="ml-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "hide" : "show"}</span>
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
