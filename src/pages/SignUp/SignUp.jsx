import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useSignUp from "../../Hooks/useSignUp";
import "./SignUp.css";
import { useNavigate, useLocation } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { error, loading, signUp } = useSignUp();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const isLoggedIn = await signUp(data);
    reset();
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="form-container">
      <form className="sign-form work-sans" onSubmit={handleSubmit(onSubmit)}>
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
              {...register("name", { required: true })}
              placeholder="Your Name"
            />
          </div>
        </div>
        {errors.name && <span className="error">Name is required</span>}

        <div className="input-container">
          <label className="mb-3" htmlFor="email">
            Email Address
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3 form-icon">
              <MdEmail></MdEmail>
            </span>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="example@gamil.com"
            />
          </div>
        </div>
        {errors.email && <span className="error">Email is required</span>}

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
              {...register("password", { required: true })}
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
        {errors.password && <span className="error">Password id required</span>}

        <div className="input-container">
          <label className="mb-3" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3 form-icon">
              <RiLockPasswordFill></RiLockPasswordFill>
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: true,
                validate: (val) => {
                  if (watch("password") !== val)
                    return "Your passwords do no match";
                },
              })}
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
        {errors.confirmPassword && (
          <span className="error">Confirm your password</span>
        )}

        <div className="input-container">
          <label className="mb-3" htmlFor="profilePhoto">
            Profile Picture
          </label>
          <div className="flex items-center justify-between">
            <span className="mr-3 form-icon">
              <FaImage></FaImage>
            </span>
            <input type="file" name="profilePhoto" />
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
            <input type="file" name="coverPhoto" />
          </div>
        </div>

        {error && <span className="error mb-7">{error}</span>}

        <button
          type="submit"
          disabled={loading}
          className="bg-accent-color text-primary-color py-5 text-center rounded-2xl text-3xl cursor-pointer flex justify-center items-center w-full font-medium"
        >
          Sign Up
          <span className="ml-5">
            <PiSignInBold></PiSignInBold>
          </span>
        </button>

        <div className="mt-10">
          Already have an account? <Link to={"/sign-in"}>Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
