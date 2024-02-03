import useAuthContext from "./useAuthContext";

const useLogOut = () => {
  const { dispatch } = useAuthContext();

  const logOut = () => {
    // remove the token from localStorage
    localStorage.removeItem("token");
    // reset the local state
    dispatch({ type: "LOGOUT" });
  };

  return { logOut };
};

export default useLogOut;
