import { Link } from "react-router-dom";
import { FormatDate } from "../../Utils/FormatDate";
import SliceText from "../../Utils/SliceText";
import "./EventCard.css";

const EventCard = ({ isButtonVisible, event, isEditable }) => {
  return (
    <div className="rounded-2xl overflow-hidden p-7 card">
      <Link
        to={"/profile/my-events/id"}
        className="rounded-2xl overflow-hidden mb-7 inline-block no-underline h-[13.7em] w-full bg-gray-300"
      >
        <img
          className="h-full w-full object-cover"
          src={event.eventPhoto ? event.eventPhoto : "/images/7.jpg"}
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
       <div className="flex justify-between items-center">
          <button className="no-underline bg-accent-color text-primary-color px-5 py-3 mt-4 font-semibold rounded-2xl">
            Buy ticket
          </button>

          <div className="cursor-pointer" title="Add to favorite">love</div>
        </div> 
      )}

      {
        isEditable && (
       <div>three dot</div> 
        )
      }
    </div>
  );
};

export default EventCard;
