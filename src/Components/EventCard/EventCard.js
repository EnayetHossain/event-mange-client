import { Link } from "react-router-dom";
import { FormatDate } from "../../Utils/FormatDate";
import SliceText from "../../Utils/SliceText";
import eventPhoto from "../../assets/7.jpg";
import "./EventCard.css";

const EventCard = ({ isButtonVisible, event }) => {
  return (
    <div className="rounded-2xl overflow-hidden p-7 card">
      <Link
        to={"/profile/my-events/id"}
        className="rounded-2xl overflow-hidden mb-7 inline-block no-underline"
      >
        <img
          src={event.eventPhoto ? event.eventPhoto : eventPhoto}
          alt={event.title}
        />
      </Link>

      <div>
        <Link
          to={"/profile/my-events/id"}
          className="font-semibold mb-5 inline-block no-underline text-secondary-color"
        >
          {SliceText(event.title, 53)}
        </Link>
        <p className="date">{FormatDate(event.eventDate)}</p>
      </div>

      {isButtonVisible && (
        <button className="no-underline bg-accent-color text-primary-color px-5 py-3 mt-4 font-semibold rounded-2xl">
          Buy ticket
        </button>
      )}
    </div>
  );
};

export default EventCard;
