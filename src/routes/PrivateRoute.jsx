import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../Hooks/useAuthContext.js";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) return <div className="loader">Loading...</div>;

  if (user) {
    return children;
  }

  return (
    <Navigate to={"/sign-in"} state={{ from: location }} replace={true}
    />
  )
}

export default PrivateRoute;
