import "./SuccessNotification.css";
import { IoCloseSharp } from "react-icons/io5";
import { useCallback, useEffect } from "react";

const SuccessNotification = ({ message, setMessage, setOpen }) => {
  const handleClose = useCallback(() => {
    setOpen(false);
    setMessage("");
  }, [setOpen, setMessage])

  useEffect(() => {
    let timeOut;

    if (message) timeOut = setTimeout(handleClose, 10 * 1000);

    return () => clearTimeout(timeOut)
  }, [handleClose, message]);

  return (
    <div className="fixed top-0 success-container bg-green-500 flex justify-between items-center text-primary-color">
      <div>
        {
          message
        }
      </div>

      <div>
        <button className="text-5xl" type="button" onClick={handleClose}>
          <IoCloseSharp />
        </button>
      </div>
    </div>
  )
}

export default SuccessNotification;
