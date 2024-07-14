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
  };

  return { error, loading, signUp };
};

export default useSignUp;
