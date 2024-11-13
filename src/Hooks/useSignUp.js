import { useState } from "react";
import useAuthContext from "./useAuthContext";
import useAxiosConfig from "../Hooks/useAxiosConfig.js";

const useSignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const { dispatch } = useAuthContext();
  const axiosConfig = useAxiosConfig();

  const signUp = async (data) => {
    try {
      setShowErrorNotification(false);
      setLoading(true);
      setError("");
      const response = await axiosConfig.post("/api/v1/auth/sign-up", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      const jsonData = response.data;

      localStorage.setItem("token", `${jsonData.token}`);
      dispatch({ type: "LOGIN", payload: jsonData.token });

      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      setShowErrorNotification(true);
      setError(error.response ? error.response.data.error : "Network error");
      return false;
    }
  };

  return { error, setError, showErrorNotification, setShowErrorNotification, loading, signUp };
};

export default useSignUp;
