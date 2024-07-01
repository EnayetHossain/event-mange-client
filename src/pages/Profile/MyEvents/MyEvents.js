import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../../Components/EventCard/EventCard";
import axios from "../../../Utils/axiosConfig";
import "./MyEvents.css";

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    const getAllMyEvents = async () => {
      try {
        const events = await axios.get("/api/v1/events/getEventByUser");
        setMyEvents(events.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllMyEvents();
  }, []);

  console.log(myEvents);

  return (
    <div className="desktop-max !mt-14">
      <div className="mb-11 flex justify-between items-center">
        <span className="work-sans inline-block font-bold text-3xl">
          My Events
        </span>
        <Link
          className="no-underline bg-accent-color text-primary-color px-5 py-4 font-semibold rounded-2xl"
          to={"/profile/create-event"}
        >
          Create an Event
        </Link>
      </div>

      <div className="card-container">
        {myEvents?.map((event) => (
          <EventCard
            key={event._id}
            isButtonVisible={false}
            event={event}
          ></EventCard>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
