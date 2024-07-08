import React, { useEffect, useState } from "react";
import EventCard from "../../src/Components/EventCard/EventCard";
import axios from "../Utils/axiosConfig";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const events = await axios.get("/api/v1/events");
        setEvents(events.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getAllEvents();
  }, []);

  return (
    <div className="card-container desktop-max !my-20">
      {loading ? (
        <div>Loading...</div>
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
