import { Link } from "react-router-dom";
import { FormatDate } from "../../Utils/FormatDate";
import SliceText from "../../Utils/SliceText";
import "./EventCard.css";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useCallback, useEffect, useRef, useState } from "react";
import useAxiosConfig from "../../Hooks/useAxiosConfig";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import SuccessNotification from "../SuccessNotification/SuccessNotification";
import EventCardMoreModal from "../EventCardMoreModal/EventCardMoreModal";
import useClickOutside from "../../Hooks/useClickOutside";

const EventCard = ({ isButtonVisible, event, isEditable }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessNotificaion, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const [data, setData] = useState("");

  const moreModalRef = useRef(null);

  const axiosConfig = useAxiosConfig();

  const checkIfExistsInFavorite = useCallback(async () => {
    try {
      // trust issue
      if (event._id) {
        const response = await axiosConfig.get(`/api/v1/favorite/${event._id}`)
        if (response.status === 200) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      setIsFavorite(false)
    }
  }, [event._id, axiosConfig]);

  useEffect(() => {
    checkIfExistsInFavorite();
  }, [checkIfExistsInFavorite])

  const addToFavorite = async (id) => {
    try {
      setError("");
      setShowErrorNotification(false);

      const response = await axiosConfig.post(`/api/v1/favorite/${id}`);

      if (response.status === 201) {
        setData("Added to your favorite list");
        setIsFavorite(true);
      }

      if (response.status === 200) {
        setData("Removed from you favorite list")
        setIsFavorite(false);
      }

      if (response.data.status === "success") {
        setShowSuccessNotification(true);
      }

    } catch (error) {
      setError(error.response.data.error);
      setShowErrorNotification(true);
    }
  }

  useClickOutside(moreModalRef, setOpenMoreModal);

  return (
    <div className="rounded-2xl p-7 card relative">
      {
        (error && showErrorNotification) && (
          <ErrorNotification
            error={error}
            setError={setError}
            setOpen={setShowErrorNotification}
          />
        )
      }

      {
        (showSuccessNotificaion) && (
          <SuccessNotification
            message={data}
            setMessage={setData}
            setOpen={setShowSuccessNotification}
          />
        )
      }
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
        <div className="flex justify-between items-center">
          <p className="date">{FormatDate(event.eventDate)}</p>
          {
            //TODO: add a modal on click on the three dot to delete or edit the event
            isEditable && (
              <EventCardMoreModal
                openMoreModal={openMoreModal}
                setOpenMoreModal={setOpenMoreModal}
                moreModalRef={moreModalRef}
                eventId={event._id}
              />
            )
          }
        </div>
      </div>

      {isButtonVisible && (
        <div className="flex justify-between items-center">
          <button className="no-underline bg-accent-color text-primary-color px-5 py-3 mt-4 font-semibold rounded-2xl">
            Buy ticket
          </button>

          <div className="cursor-pointer" title="Add to favorite" onClick={() => addToFavorite(event._id)}>
            {
              isFavorite ? <FaHeart className="text-red-500 text-3xl" /> : <FaRegHeart className="text-3xl" />
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
