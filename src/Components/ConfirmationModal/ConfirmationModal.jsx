import useClickOutside from "../../Hooks/useClickOutside";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import "./ConfirmationModal.css";
import useAxiosConfig from "../../Hooks/useAxiosConfig";
import { useState } from "react";

const ConfirmationModal = ({ confirmationRef, setOpenConfirmationModal, eventId, setError, setMessage, setShowErrorMessage, setShowSuccessMessage, refetchMyEvents }) => {
  const [loading, setLoading] = useState(false);

  useClickOutside(confirmationRef, setOpenConfirmationModal);
  const axiosConfig = useAxiosConfig()

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setShowErrorMessage(false);
      const response = await axiosConfig.delete(`/api/v1/events/${id}`);
      if (response.data.data.deletedCount > 0) {
        refetchMyEvents()
        setOpenConfirmationModal(false);
      }
      setLoading(false);
      setShowSuccessMessage(true);
      setMessage("Event deleted successfully");
    } catch (error) {
      setLoading(false);
      setShowErrorMessage(true);
      setError(error.response.data.error);
      setShowSuccessMessage(false)
      setMessage("");
      setOpenConfirmationModal(false)
    }
  }

  return (
    <div className="back-drop fixed top-0 left-0 w-full h-full backdrop-blur-[3px] z-[11]">
      <div ref={confirmationRef} className="relative bg-white confimation-modal-content px-14 py-9 rounded-3xl">
        <button className="clsoe-btn absolute top-6 right-10 p-2 rounded-xl" onClick={() => setOpenConfirmationModal(false)} title="Close">
          <IoClose />
        </button>
        <div className="text-center">
          <div className="flex justify-center">
            <div className="delete-icon text-red-accent-color p-4 rounded-xl">
              <RiDeleteBin7Fill />
            </div>
          </div>
          <h1 className="text-5xl font-bold py-3">Are you Sure?</h1>
          <p className="mb-20 text-gray-600">Are you sure you want to delete the event. This action can not be undone.</p>
          <div className="flex flex-col">
            <button
              className={`text-white py-3 rounded-2xl mb-3 font-medium ${loading ? "delete-icon-disable" : "bg-red-accent-color"}`}
              onClick={() => handleDelete(eventId)}
              disabled={loading}
            >
              Delete Event
            </button>
            <button className="py-3 cancel-btn rounded-2xl mt-3 font-medium" onClick={() => setOpenConfirmationModal(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal;
