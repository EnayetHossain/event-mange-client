import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSignIn = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signIn = async (data) => {
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:5000/api/v1/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();

    // check if there is any error
    if (!response.ok) {
      setLoading(false);
      setError(jsonData.error);
    }

    if (response.ok) {
      // if there is no error
      localStorage.setItem("token", `Bearer ${jsonData.token}`);
      // update the local state
      dispatch({ type: "LOGIN", payload: jsonData.token });

      setLoading(false);
    }
  };

  return { error, loading, signIn };
};

export default useSignIn;
