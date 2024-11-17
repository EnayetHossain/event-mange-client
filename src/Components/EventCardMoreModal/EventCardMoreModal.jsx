import { IoMdMore } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import "./EventCardMoreModal.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EventCardMoreModal = ({ openMoreModal, setOpenMoreModal, moreModalRef, eventId }) => {
  const [position, setPosition] = useState({});

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

  return (
    <div ref={moreModalRef}>
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

            <button className="flex justify-start items-center mt-2 rounded-xl delete-btn">
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
