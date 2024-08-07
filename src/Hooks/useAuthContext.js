import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  console.log("context from auth hook: ", context);

  if (!context) {
    throw Error("useAuthContext must be used within the auth context provider");
  }

  return context;
};

export default useAuthContext;
