import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useSignIn from "../../Hooks/useSignIn";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorNotification from "../../Components/ErrorNotification/ErrorNotification";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { error, setError, showErrorNotification, setShowErrorNotification, loading, signIn } = useSignIn();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const isLoggedIn = await signIn(data);
    reset();
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="form-container">
      {
        (error && showErrorNotification) && <ErrorNotification
          error={error}
          setError={setError}
          setOpen={setShowErrorNotification}
        />
      }
      <form className="sign-form work-sans" onSubmit={handleSubmit(onSubmit)}>
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
              title={showPassword ? "Hide Password" : "Show Password"}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
          </div>
        </div>
        {errors.password && <span className="error">Password is required</span>}

        {error && <span className="error mb-7">{error}</span>}

        <button
          type="submit"
          disabled={loading}
          className={`py-5 text-center rounded-2xl text-3xl flex justify-center items-center w-full font-medium ${loading ? "disabled-btn" : "normal-btn cursor-pointer"}`}
        >
          Sign In
          <span className="ml-5">
            <PiSignInBold></PiSignInBold>
          </span>
        </button>

        <div className="mt-10">
          Don't have an account? <Link to={"/sign-up"}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
