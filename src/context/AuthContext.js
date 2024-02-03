import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  const authInfo = {
    ...state,
    dispatch,
  };

  useEffect(() => {
    const user = localStorage.getItem("token");
    const token = user?.split(" ")[1];

    if (user) {
      dispatch({ type: "LOGIN", payload: token });
    }
  }, []);

  console.log("auth context state: ", state);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
