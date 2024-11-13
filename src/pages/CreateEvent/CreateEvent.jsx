import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa6";
import useAxiosConfig from "../../Hooks/useAxiosConfig";
import ErrorNotification from "../../Components/ErrorNotification/ErrorNotification";
import SuccessNotification from "../../Components/SuccessNotification/SuccessNotification";
import "./CreateEvent.css";
import { CgDetailsMore } from "react-icons/cg";
import { MdTitle } from "react-icons/md";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { FaMoneyCheck } from "react-icons/fa6";
import { FaTicketAlt } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";

const CreateEvent = ()=>{
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const axiosConfig = useAxiosConfig();

  const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

  const onFileChange = (event)=>{
    setFile(event.target.files[0]);
  }

  const createEvent = async (data)=>{
    const formData = new FormData();

    if(file){
      formData.append("eventPhoto", file);
    }

    //NOTE: If you console log the form data you will see an empty object but it accually contains the data you have appended. And surprisingly that is a normal behavior of form data
    formData.append("title", data.eventTitle);
    formData.append("description", data.eventDescription);
    formData.append("eventDate", data.eventDate);
    formData.append("eventLocation", data.eventLocation);
    formData.append("ticketPrice", data.ticketPrice);
    formData.append("totalTickets", data.totalTickets);

    try {
      setShowErrorNotification(false);
      setShowSuccessNotification(false);
      setLoading(true);
      const response = await axiosConfig.post("/api/v1/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      setLoading(false);

      if(response.data.event){
        reset();
        setMessage("Event Created Successfully");
        setShowSuccessNotification(true);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      setShowSuccessNotification(false);
      setShowErrorNotification(true);
    }
  }

  return (
    <form className="sign-form work-sans" onSubmit={handleSubmit(createEvent)}>
      {
        (error && showErrorNotification) &&
        <ErrorNotification
          error={error}
          setError={setError}
          setOpen={setShowErrorNotification}
        />
      }

      {
        (message && showSuccessNotification) &&
        <SuccessNotification
          message={message}
          setMessage={setMessage}
          setOpen={setShowSuccessNotification}
        />
      }
      <div className="input-container">
        <label className="mb-3" htmlFor="name">
          Title
        </label>
        <div className="flex items-center justify-between">
          <span className="mr-3 form-icon">
            <MdTitle></MdTitle>
          </span>
          <input
            type="text"
            {...register("eventTitle", { required: true })}
            placeholder="Event Title"
          />
        </div>
      </div>
      {errors.eventTitle && <span className="error">Title is required</span>}

      <div className="input-container">
        <label className="mb-3" htmlFor="email">
          Description
        </label>
        <div className="flex items-start justify-between">
          <span className="mr-3 form-icon mt-1">
            <CgDetailsMore></CgDetailsMore>
          </span>
          <textarea className="w-full border-none outline-transparent" placeholder="Event Description" cols={4} rows={4} {...register("eventDescription", {required: true})}></textarea>
        </div>
      </div>
      {errors.eventDescription && <span className="error">Description is required</span>}

      <div className="input-container">
        <label className="mb-3" htmlFor="name">
          Event Date 
        </label>
        <div className="flex items-center justify-between">
          <span className="mr-3 form-icon">
            <BsFillCalendar2DateFill></BsFillCalendar2DateFill>
          </span>
          <input
            type="date"
            {...register("eventDate", { required: true })}
            placeholder="Event Date"
          />
        </div>
      </div>
      {errors.eventDate && <span className="error">Date is required</span>}

      <div className="input-container">
        <label className="mb-3" htmlFor="name">
          Location
        </label>
        <div className="flex items-center justify-between">
          <span className="mr-3 form-icon">
            <IoLocationSharp></IoLocationSharp>
          </span>
          <input
            type="text"
            {...register("eventLocation", { required: true })}
            placeholder="Event Location"
          />
        </div>
      </div>
      {errors.eventLocation && <span className="error">Location is required</span>}

      <div className="input-container">
        <label className="mb-3" htmlFor="name">
          Price
        </label>
        <div className="flex items-center justify-between">
          <span className="mr-3 form-icon">
            <FaMoneyCheck></FaMoneyCheck>
          </span>
          <input
            type="number"
            {...register("ticketPrice", { required: true })}
            placeholder="Ticket Price"
          />
        </div>
      </div>
      {errors.ticketPrice && <span className="error">Price is required</span>}

      <div className="input-container">
        <label className="mb-3" htmlFor="name">
          Tickets 
        </label>
        <div className="flex items-center justify-between">
          <span className="mr-3 form-icon">
            <FaTicketAlt></FaTicketAlt>
          </span>
          <input
            type="number"
            {...register("totalTickets", { required: true })}
            placeholder="Total Ticket"
          />
        </div>
      </div>
      {errors.totalTickets && <span className="error">Total Tickets is required</span>}

      <div className="input-container">
        <label className="mb-3" htmlFor="profilePhoto">
          Event Photo
        </label>
        <div className="flex items-center justify-between">
          <span className="mr-3 form-icon">
            <FaImage></FaImage>
          </span>
          <input type="file" {...register("eventPhoto", {required: true})} onChange={onFileChange} />
        </div>
      </div>
      {errors.eventPhoto && <span className="error mb-7">Event photo is required</span>}

      <button
        type="submit"
        className={`py-5 text-center rounded-2xl text-3xl flex justify-center items-center w-full font-medium ${loading ? "disabled-btn" : "normal-btn cursor-pointer"}`}
        disabled={loading}
      >
        Create Event
        <span className="ml-5">
          <MdEmojiEvents></MdEmojiEvents>
        </span>
      </button>
    </form>
  )
}

export default CreateEvent;
