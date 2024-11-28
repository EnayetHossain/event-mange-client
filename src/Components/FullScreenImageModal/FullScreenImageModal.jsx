import { useRef } from "react";
import useClickOutside from "../../Hooks/useClickOutside";
import "./FullScreenImageModal.css";
import { IoClose } from "react-icons/io5";

const FullScreenImageModal = ({ setShowImageModal, imageUrl }) => {
  const imageModalRef = useRef(null);

  useClickOutside(imageModalRef, setShowImageModal);

  return (
    <div className="fixed top-0 left-0 z-20 w-full h-full backdrop-blur-[3px] full-screen-image">
      <div className="relative flex justify-center items-center h-[100dvh]">
        <button className="absolute top-12 right-24 close-btn text-white text-4xl bg-gray-700 rounded-full p-2" onClick={() => setShowImageModal(false)}>
          <IoClose />
        </button>
        <div ref={imageModalRef} className="mx-auto full-screen-image-container">
          <img src={imageUrl} alt="maximize view" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  )
}

export default FullScreenImageModal;
