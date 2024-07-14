import { useState } from "react";
import useAuthContext from "./useAuthContext";
import useAxiosConfig from "../Hooks/useAxiosConfig.js";

const useSignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const axiosConfig = useAxiosConfig();

  const signUp = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosConfig.post("/api/v1/auth/sign-up", data);
      const jsonData = response.data;

      localStorage.setItem("token", `${jsonData.token}`);
      dispatch({ type: "LOGIN", payload: jsonData.token });

      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      setError(error.response ? error.response.data.error : "Network error");
      return false;
    }

    // const response = await fetch("http://localhost:5000/api/v1/auth/sign-up", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
    //
    // const jsonData = await response.json();
    //
    // // check if there is any error
    // if (!response.ok) {
    //   setLoading(false);
    //   setError(jsonData.error);
    // }
    //
    // if (response.ok) {
    //   // if there is no error
    //   localStorage.setItem("token", `${jsonData.token}`);
    //   // update the local state
    //   dispatch({ type: "LOGIN", payload: jsonData.token });
    //
    //   setLoading(false);
    // }
  };

  return { error, loading, signUp };
};

export default useSignUp;
