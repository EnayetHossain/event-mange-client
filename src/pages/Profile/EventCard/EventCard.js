import { Link } from "react-router-dom";
import SliceText from "../../../Utils/SliceText";
import "./EventCard.css";

const EventCard = () => {
  return (
    <div className="rounded-2xl overflow-hidden p-7 card">
      <Link className="rounded-2xl overflow-hidden mb-7 inline-block no-underline">
        <img src="/images/2.jpg" alt="my event" />
      </Link>

      <div>
        <Link className="font-semibold mb-5 inline-block no-underline text-secondary-color">{SliceText("Eiusmod aute deserunt sit dolor nulla aute consequat.", 53)}</Link>
        <p className="date">12 December 2023</p>
      </div>
    </div>
  );
};

export default EventCard;
