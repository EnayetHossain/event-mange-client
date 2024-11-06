import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../../Hooks/useAuthContext";
import useClickOutside from "../../../Hooks/useClickOutside";
import useLogOut from "../../../Hooks/useLogOut";
import "./Sidebar.css";
import { IoCloseSharp } from "react-icons/io5";
import useAxiosConfig from "../../../Hooks/useAxiosConfig";
import ErrorNotification from "../../../Components/ErrorNotification/ErrorNotification";
import { CiHome } from "react-icons/ci";
import { BsCalendar4Event } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import { RiAccountCircleLine } from "react-icons/ri";
import { LuLogIn } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const sidebarRef = useRef(null);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const axiosConfig = useAxiosConfig();

  // close modal when click outside
  useClickOutside(sidebarRef, setOpenSidebar);

  const { user } = useAuthContext();
  const { logOut } = useLogOut();


  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axiosConfig.get("/api/v1/auth/getUserInfoById?fields=name,email");
        setUserInfo(response.data.data);
        setError("");
        setShowErrorNotification(false);
      } catch (error) {
        setError(`${error.message}. ${error?.response?.data?.error}`);
        setShowErrorNotification(true);
      }
    }

    getUserInfo();
  }, [axiosConfig])


  const navLinks = (
    <>
      <Link className="no-underline py-1 text-gray-600 event-link sidebar-links" to={"/"}>
        <div className="flex items-center">
          <CiHome />
          <div className="ml-2">Home</div>
        </div>
        <FaChevronRight className="right-arrow" />
      </Link>
      <Link className="no-underline py-1 text-gray-600 event-link sidebar-links" to={"/events"}>
        <div className="flex items-center">
          <BsCalendar4Event />
          <div className="ml-2">Event</div>
        </div>
        <FaChevronRight className="right-arrow" />
      </Link>
      {
        user && <Link className="no-underline py-1 text-gray-600 event-link sidebar-links" to={"/profile"}>
          <div className="flex items-center">
            <RiAccountCircleLine />
            <div className="ml-2">Profile</div>
          </div>
          <FaChevronRight className="right-arrow" />
        </Link>
      }

      {
        !user && (
          <>
            <Link className="no-underline py-1 text-gray-600 event-link sidebar-links" to={"/sign-in"}>
              <div>
                <div className="flex items-center">
                  <LuLogIn />
                  <div className="ml-2">Sign In</div>
                </div>
                <FaChevronRight className="right-arrow" />
              </div>
            </Link>
            <Link className="no-underline py-1 text-gray-600 event-link sidebar-links" to={"/sign-up"}>
              <div className="flex items-center">
                <div>
                  <LuLogIn />
                  <div className="ml-2">Sign In</div>
                </div>
                <FaChevronRight  className="right-arrow" />
              </div>  
            </Link>
          </>
        )
      }
    </>
  )

  return (
    <div>
      {
        (error && showErrorNotification) && (
          <ErrorNotification
            error={error}
            setError={setError}
            setOpen={setShowErrorNotification}
          />
        )
      }
      {/* desktop navigation sidebar */}
      <div className="bg-primary-color sidebar-container">
        <div>
          <h1 className="font-semibold text-3xl mb-3">Navigation</h1>
          <nav className="flex flex-col items-start">
            {navLinks}
          </nav>
        </div>

        {
          user && (
            <div className="flex flex-col items-start mt-10">
              <div className="flex justify-center items-center">
                <div className="w-[6rem] h-[6rem] overflow-hidden rounded-full">
                  <img src={"/images/image-1.jpg"} alt={"profile"} className="w-full h-full object-cover" />
                </div>

                <div className="ml-5">
                  <div className="font-semibold text-2xl text-gray-600">{userInfo?.name}</div>
                  <div className="text-[1.2rem]">{userInfo?.email}</div>
                </div>
              </div>

              <button onClick={logOut} className="bg-gray-300 w-full mt-4">
                <LuLogOut />
                <div>Logout</div>
              </button>
            </div>
          )
        }
      </div>

      {/* mobile navigation sidebar */}
      <div
        className={`bg-primary-color transition-all duration-300 ease-in-out ${openSidebar ? "sidebar-mobile-active" : "sidebar-mobile"}`}
        ref={sidebarRef}
      >
        <div className="flex justify-end">
          <button
            className="cursor-pointer text-5xl"
            onClick={() => setOpenSidebar(false)}
            type="button"
            title="close"
          >
            <IoCloseSharp />
          </button>
        </div>

        <div>
          <h1 className="font-semibold text-3xl mb-3">Navigation</h1>
          <nav className="flex flex-col items-start">
            {navLinks}
          </nav>
        </div>

        {
          user && (
            <div className="flex flex-col items-start mt-10">
              <div className="flex justify-center items-center">
                <div className="w-[6rem] h-[6rem] overflow-hidden rounded-full">
                  <img src={"/images/image-1.jpg"} alt={"profile"} className="w-full h-full object-cover" />
                </div>

                <div className="ml-5">
                  <div className="font-semibold text-2xl text-gray-600">{userInfo?.name}</div>
                  <div className="text-[1.2rem]">{userInfo?.email}</div>
                </div>
              </div>

              <button onClick={logOut} className="bg-gray-300 w-full mt-4">Logout</button>
            </div>
          )
        }
      </div>

    </div >
  )
}

export default Sidebar;
