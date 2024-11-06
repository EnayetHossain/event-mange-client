import { createBrowserRouter } from "react-router-dom";
import Events from "../Layouts/Events";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home/Home";
import MyEvents from "../pages/Profile/MyEvents/MyEvents";
import Profile from "../pages/Profile/Profile/Profile";
import ProfileInfo from "../pages/Profile/ProfileInfo/ProfileInfo";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import ErrorPage from "../pages/shared/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
      {
        path: "/sign-in",
        element: <SignIn></SignIn>,
      },

      {
        path: "/profile",
        element: <PrivateRoute> <Profile></Profile> </PrivateRoute>,
        children: [
          {
            path: "/profile",
            element: <ProfileInfo></ProfileInfo>,
          },

          {
            path: "/profile/my-events",
            element: <MyEvents></MyEvents>,
          },
        ],
      },
    ],
  },

  {
    path: "/events",
    element: <Events></Events>,
    errorElement: <ErrorPage></ErrorPage>
  },
]);
