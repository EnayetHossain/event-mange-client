import { IoMdMore } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import "./EventCardMoreModal.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import SuccessNotification from "../SuccessNotification/SuccessNotification";
import ErrorNotification from "../ErrorNotification/ErrorNotification";

const EventCardMoreModal = ({ openMoreModal, setOpenMoreModal, moreModalRef, eventId, refetchMyEvents }) => {
  const [position, setPosition] = useState({});
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const confirmationRef = useRef(null);

  useEffect(() => {
    const adjustPosition = () => {
      if (moreModalRef.current) {
        const modalRect = moreModalRef.current.getBoundingClientRect();
        const isEnoughSpace = window.innerWidth - modalRect.right;
        const isEnoughBottomSpace = window.innerWidth - modalRect.bottom;

        const newPosition = {};

        if (isEnoughSpace <= 200) {
          newPosition.right = "4%";
        } else {
          newPosition.right = "-45%";
        }

        if (isEnoughBottomSpace >= 806) {
          newPosition.bottom = "-26%";
        } else {
          newPosition.bottom = "15%";
        }

        setPosition(newPosition);
      }
    }

    if (openMoreModal) {
      adjustPosition();
      window.addEventListener("resize", adjustPosition);
    }

    return () => {
      window.removeEventListener("resize", adjustPosition);
    }
  }, [openMoreModal, moreModalRef]);

  const handleConfirmationModalOpen = () => {
    setOpenConfirmationModal(true);
    setOpenMoreModal(false);
  }

  return (
    <div ref={moreModalRef}>
      {
        openConfirmationModal && <ConfirmationModal
          confirmationRef={confirmationRef}
          setOpenConfirmationModal={setOpenConfirmationModal}
          eventId={eventId}
          setError={setError}
          setMessage={setMessage}
          setShowErrorMessage={setShowErrorMessage}
          setShowSuccessMessage={setShowSuccessMessage}
          refetchMyEvents={refetchMyEvents}
        />
      }

      {
        (error && showErrorMessage) && <ErrorNotification error={error} setError={setError} setOpen={setShowErrorMessage} />
      }

      {
        (message && showSuccessMessage) && <SuccessNotification message={message} setMessage={setMessage} setOpen={setShowSuccessMessage} />
      }
      <button
        onClick={() => setOpenMoreModal(!openMoreModal)}
        className="w-[1.8em] h-[1.8em] rounded-full flex justify-center items-center hover:bg-gray-200"
      >
        <IoMdMore className="text-4xl" />
      </button>

      {
        openMoreModal && (
          <div className="absolute z-10 btn-group flex flex-col justify-center bg-white py-5 px-4 rounded-xl border border-gray-300" style={position}>
            <Link className="flex justify-start items-center mb-2 rounded-xl edit-btn no-underline" to={`/edit-event/${eventId}`}>
              <MdEditSquare className="text-3xl mr-2" />
              <span className="font-medium">Edit This Event</span>
            </Link>

            <button className="flex justify-start items-center mt-2 rounded-xl delete-btn" onClick={handleConfirmationModalOpen}>
              <AiFillDelete className="text-3xl mr-2" />
              <span className="font-medium">Delete This Event</span>
            </button>
          </div>
        )
      }
    </div>
  )
}

export default EventCardMoreModal;
