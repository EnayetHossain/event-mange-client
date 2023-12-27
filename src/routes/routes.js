import {
    createBrowserRouter
} from "react-router-dom";
import Events from "../Layouts/Events";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home/Home";
import Profile from "../pages/Profile/Profile/Profile";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/sign-up",
                element: <SignUp></SignUp>
            },
            {
                path: "/sign-in", 
                element: <SignIn></SignIn>
            },
            {
                path: "/profile",
                element: <Profile></Profile>
            }
        ]
    },

    {
        path: "/events",
        element: <Events></Events>,
    }
]);