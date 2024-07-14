import React, { useEffect, useState } from "react";
import EventCard from "../Components/EventCard/EventCard";
import SkeletonCard from "../Components/SkeletonCard/SkeletonCard";
// import axios from "../Utils/axiosConfig";
import useAxiosConfig from "../Hooks/useAxiosConfig";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosConfig = useAxiosConfig();

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const events = await axiosConfig.get("/api/v1/events");
        setEvents(events.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getAllEvents();
  }, [axiosConfig]);

  return (
    <div className="card-container desktop-max !my-20">
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
        events.map((event) => (
          <EventCard
            key={event._id}
            isButtonVisible={true}
            event={event}
          ></EventCard>
        ))
      )}
    </div>
  );
};

export default Events;
