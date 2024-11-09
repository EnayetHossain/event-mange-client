import React, { useEffect, useState } from "react";
import ErrorNotification from "../Components/ErrorNotification/ErrorNotification";
import EventCard from "../Components/EventCard/EventCard";
import SkeletonCard from "../Components/SkeletonCard/SkeletonCard";
import useAxiosConfig from "../Hooks/useAxiosConfig";
import Sidebar from "../pages/shared/Sidebar/Sidebar";
import Topbar from "../pages/shared/Topbar/Topbar";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosConfig = useAxiosConfig();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [error, setError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const events = await axiosConfig.get("/api/v1/events?fields=title,eventDate,eventPhoto");
        setEvents(events.data.data);
        setLoading(false);
        setError("");
        setShowErrorNotification(false);
      } catch (error) {
        setLoading(false);
        setError(`${error.message}. ${error?.response?.data?.error}`);
        setShowErrorNotification(true);
      }
    };

    getAllEvents();
  }, [axiosConfig]);

  return (
    <div className="event-layout relative max-w-screen-2xl mx-auto">
      {
        (error && showErrorNotification) && (
          <ErrorNotification
            error={error}
            setError={setError}
            setOpen={setShowErrorNotification}
          />
        )
      }
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}>
      </Sidebar>
      <div className={`event-overlay ${openSidebar ? "block" : "hidden"}`}></div>

      <div className="pt-10">
        <Topbar
          setLoading={setLoading}
          setEvents={setEvents}
          setOpenSidebar={setOpenSidebar}
          openSidebar={openSidebar}
        ></Topbar>
        <div className="card-container mx-[1.5rem] mb-12">

          {loading ? (
            <>
              <SkeletonCard></SkeletonCard>
              <SkeletonCard></SkeletonCard>
              <SkeletonCard></SkeletonCard>
              <SkeletonCard></SkeletonCard>
              <SkeletonCard></SkeletonCard>
              <SkeletonCard></SkeletonCard>
              <SkeletonCard></SkeletonCard>
              <SkeletonCard></SkeletonCard>
            </>
          ) : (
            events.length > 0
              ?
              events.map((event) => (
                <EventCard
                  key={event._id}
                  isButtonVisible={true}
                  isEditable={false}
                  event={event}
                ></EventCard>
              ))
              :
              <div className="text-center text-gray-500 text-4xl font-medium">We are all caught up! No events left</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
