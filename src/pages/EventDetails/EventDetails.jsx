import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosConfig from "../../Hooks/useAxiosConfig";
import "./EventDetails.css";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { MdEmojiEvents } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";

const EventDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({});
  const [formattedDate, setFormattedDate] = useState("");

  const axiosConfig = useAxiosConfig();

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosConfig.get(`/api/v1/events/${id}`);
        setEventData(response.data.data);
        const date = new Date(response.data.data.eventDate).toISOString().split("T")[0].split("-").reverse().join("-");
        setFormattedDate(date);
        console.log(response.data.data)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    getEventDetails();
  }, [axiosConfig, id])

  return (
    <div>
      {
        loading
          ?
          <div>loading..</div>
          :
          <div className="desktop-max details-container">
            <div className="event-details-image-container">
              <img src={eventData.eventPhoto} alt={eventData.title} />
            </div>

            <div className="ml-3 event-info">
              <div>
                {
                  eventData.totalTickets > 0
                    ?
                    <div className="bg-accent-color text-white w-max px-4 py-1 rounded-full">{eventData.totalTickets} Tickets available</div>
                    :
                    <div className="bg-red-accent-color text-white w-max px-4 py-1 rounded-full">Tickets not available</div>
                }
              </div>
              <div className="text-6xl font-semibold py-9">{eventData.title}</div>
              <div className="text-4xl mb-6 font-medium">${eventData.ticketPrice}</div>

              <div className="flex items-center">
                <div className="mr-4">
                  <BsFillCalendar2DateFill />
                </div>
                <div>
                  {formattedDate}
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <IoLocationSharp />
                </div>
                <div>
                  {eventData.eventLocation}
                </div>
              </div>
              <div>{eventData.description}</div>
              <div className="mt-10">
                <div className="flex items-center">
                  <button className="flex justify-center items-center bg-accent-color text-primary-color w-full py-2 rounded-xl text-[1.7rem] font-medium mr-2">
                    <div className="mr-3">
                      <MdEmojiEvents />
                    </div>
                    <div>
                      Buy Tickets
                    </div>
                  </button>
                  <button className="flex justify-center items-center bg-red-accent-color text-primary-color w-full py-2 rounded-xl text-[1.7rem] font-medium ml-2">
                    <div className="mr-3">
                      <FaHeart />
                    </div>
                    <div>
                      Add to favorite
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default EventDetails;
