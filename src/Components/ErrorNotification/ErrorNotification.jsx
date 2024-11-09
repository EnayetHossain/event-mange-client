import "./ErrorNotification.css";
import { IoCloseSharp } from "react-icons/io5";
import { useCallback, useEffect } from "react";

const ErrorNotification = ({ error, setError, setOpen }) => {
  const handleClose = useCallback(() => {
    setOpen(false);
    setError("");
  }, [setError, setOpen])

  useEffect(() => {
    let timeOut;

    if (error) timeOut = setTimeout(handleClose, 5 * 1000);

    return () => clearTimeout(timeOut);

  }, [error, handleClose])

  return (
    <div className="fixed top-0 bg-red-500 text-primary-color error-container flex items-center justify-between rounded-lg">
      <div>
        {
          error
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

export default ErrorNotification;
