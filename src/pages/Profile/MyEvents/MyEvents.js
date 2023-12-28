import { Link } from "react-router-dom";
import EventCard from "../EventCard/EventCard";
import "./MyEvents.css";

const MyEvents = () => {
  return (
    <div className="desktop-max !mt-56">
      <div className="mb-11 flex justify-between items-center">
        <span className="work-sans inline-block font-bold text-3xl">
          My Events
        </span>
        <Link className="no-underline bg-accent-color text-primary-color px-5 py-4 font-semibold rounded-2xl" to={"/create-event"}>Create an Event</Link>
      </div>

      <div className="card-container">
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
      </div>
    </div>
  );
};

export default MyEvents;
