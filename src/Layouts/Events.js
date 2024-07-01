import React, { useEffect, useState } from "react";
import axios from "../Utils/axiosConfig";
import EventCard from "../../src/Components/EventCard/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const events = await axios.get("/api/v1/events");
        setEvents(events.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllEvents();
  }, []);

  console.log(events);

  return (
    <div className="card-container desktop-max !my-20">
      {events.map((event) => (
        <EventCard
          key={event._id}
          isButtonVisible={true}
          event={event}
        ></EventCard>
      ))}
    </div>
  );
};

export default Events;
