import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [activeTicketNumber, setActiveTicketNumber] = useState(true);

  const ticketNumberRef = useRef(null);

  const handleTicketNumberButton = (ticketNumber) => {
    ticketNumberRef.current.value = "";
    setNumberOfTickets(ticketNumber);
    setActiveTicketNumber(true);
  }

  const handleTicketsChange = (e) => {
    const ticketNumber = parseInt(e.target.value);
    setNumberOfTickets(ticketNumber);
    setActiveTicketNumber(false);
  }

  const axiosConfig = useAxiosConfig();

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosConfig.get(`/api/v1/events/${id}`);
        setEventData(response.data.data);
        const date = new Date(response.data.data.eventDate).toISOString().split("T")[0].split("-").reverse().join("-");
        setFormattedDate(date);
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
                    <div className="bg-accent-color text-white w-max px-4 py-1 rounded-full">Tickets available</div>
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

              <div className="flex justify-between flex-wrap mb-5">
                <div>
                  <div>Number of tickets</div>
                  <div className="flex">
                    <button
                      className={`${numberOfTickets === 1 && activeTicketNumber ? "bg-secondary-color text-primary-color" : "ticket-number"} mx-2 w-14 h-14 flex justify-center items-center font-semibold text-3xl rounded-lg`}
                      onClick={() => handleTicketNumberButton(1)}
                    >
                      1
                    </button>

                    <button
                      className={`${numberOfTickets === 3 && activeTicketNumber ? "bg-secondary-color text-primary-color" : "ticket-number"} mx-2 w-14 h-14 flex justify-center items-center font-semibold text-3xl rounded-lg`}
                      onClick={() => handleTicketNumberButton(3)}
                    >
                      3
                    </button>

                    <button
                      className={`${numberOfTickets === 5 && activeTicketNumber ? "bg-secondary-color text-primary-color" : "ticket-number"} mx-2 w-14 h-14 flex justify-center items-center font-semibold text-3xl rounded-lg`}
                      onClick={() => handleTicketNumberButton(5)}
                    >
                      5
                    </button>

                    <div className="flex justify-center items-center mx-8 relative separator">OR</div>
                    <div className="mx-2 w-32 h-14 flex justify-center items-center font-medium text-2xl rounded-lg ticket-number">
                      <input
                        className="inline-block w-full h-full outline-none border-0 px-2"
                        type="number"
                        step={1}
                        max={eventData.totalTickets}
                        min={1}
                        placeholder="Enter"
                        onChange={(e) => handleTicketsChange(e)}
                        ref={ticketNumberRef}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div>Available tickets</div>
                  <div className="bg-secondary-color text-primary-color mx-2 w-32 h-14 flex justify-center items-center font-semibold text-3xl rounded-lg">{eventData.totalTickets}</div>
                </div>
              </div>

              <div>{eventData.description}</div>

              <div className="mt-10">
                <div className="flex items-center">
                  <Link
                    to={`/checkout/${eventData._id}?numberOfTickets=${numberOfTickets}`}
                    className="flex no-underline justify-center items-center bg-accent-color text-primary-color w-full py-2 rounded-xl text-[1.7rem] font-medium mr-2"
                  >
                    <div className="mr-3">
                      <MdEmojiEvents />
                    </div>
                    <div>
                      Buy Tickets
                    </div>
                  </Link>
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
