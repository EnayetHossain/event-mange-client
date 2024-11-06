import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, loading: false };
    case "LOGOUT":
      return { user: null, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
  });

  const authInfo = {
    ...state,
    dispatch,
  };

  useEffect(() => {
    const user = localStorage.getItem("token");
    // const token = user?.split(" ")[1];
    const token = user;

    if (token) {
      dispatch({ type: "LOGIN", payload: token });
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
