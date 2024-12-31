import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ErrorNotification from "../../Components/ErrorNotification/ErrorNotification";
import useAxiosConfig from "../../Hooks/useAxiosConfig";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa6";
import "./Checkout.css";
import { FormatDate } from "../../Utils/FormatDate";
import SliceText from "../../Utils/SliceText";
import LoadingSpiner from "../../Components/LoadingSpiner/LoadingSpiner";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [numberOfTickets, setNumberOfTickets] = useState(parseInt(searchParams.get("numberOfTickets")))
  const [eventData, setEventData] = useState({});
  const axiosConfig = useAxiosConfig();
  const [activeTicketNumber, setActiveTicketNumber] = useState(true);
  const [paymentType, setPaymentType] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [showPaymentError, setShowPaymentError] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

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

  useEffect(() => {
    const getEventDataById = async () => {
      try {
        setLoading(true);
        const response = await axiosConfig.get(`/api/v1/events/${id}?fields=-createdAt,-isActive,-isFeatured,-updatedAt,-__v`);
        setEventData(response.data.data);
        setLoading(false);
        setShowErrorNotification(false);
      } catch (error) {
        setLoading(false);
        setShowErrorNotification(true);
        setError(error.response.data.error)
      }
    }

    getEventDataById();
  }, [axiosConfig, id]);

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);

      if (!paymentType) {
        setShowPaymentError(true)
        setPaymentError("Select a payment type");
        return null;
      }

      setShowPaymentError(false);
      setPaymentError("");

      if (paymentType === "card") {
        const response = await axiosConfig.post(`/api/v1/payment/stripe/${id}`, { numberOfTickets })
        if (response.data.url) {
          window.location.href = response.data.url
        }
      }

      if (paymentType === "ssl") {
        const response = await axiosConfig.post(`/api/v1/payment/ssl/${id}`, { numberOfTickets });
        if (response.data.url) {
          window.location.href = response.data.url
        }
      }
    } catch (error) {
      console.log(error)
      setShowPaymentError(true);
      setPaymentError(error.response.data.error || "Something went wrong")
    } finally {
      setPaymentLoading(false);
    }
  }

  return (
    <div className="bg-primary-800 py-10">
      {
        (error && showErrorNotification) && <ErrorNotification error={error} setError={setError} setOpen={setShowErrorNotification} />
      }

      {
        (paymentError && showPaymentError) && <ErrorNotification error={paymentError} setError={setPaymentError} setOpen={setShowPaymentError} />
      }

      {
        loading
          ?
          <div>loading...</div>
          :
          <div className="max-w-screen-xl mx-auto py-8 flex gap-10 checkout-container">
            <div className="w-full bg-primary-color p-10 rounded-2xl">
              <h1 className="text-4xl font-semibold mb-7">Payment Method</h1>
              <div>
                <h2 className="font-medium mb-3">Payment</h2>
                <div className="bg-primary-800 p-5 rounded-2xl text-center">
                  <div className="font-medium">Your total payment</div>
                  <div className="text-5xl font-bold mt-4">USD {numberOfTickets * eventData.ticketPrice}</div>
                </div>
              </div>

              <div>
                <h2 className="font-medium mt-6">Select Method</h2>
                <div className="payment-container">
                  <div className="flex justify-between items-center payment-method">
                    <div className="flex">
                      <input type="radio" name="payment" id="credit" className="cursor-pointer" onClick={() => setPaymentType("card")} />
                      <label htmlFor="credit" className="ml-4 cursor-pointer" onClick={() => setPaymentType("card")}>Credit Card</label>
                    </div>

                    <div className="flex">
                      <FaCcMastercard className="text-4xl mx-2" />
                      <FaCcVisa className="text-4xl mx-2" />
                    </div>
                  </div>
                  <hr className="h-[2px] bg-secondary-color opacity-40 my-7" />
                  <div className="flex justify-between items-center payment-method">
                    <div className="flex">
                      <input type="radio" name="payment" id="ssl" className="cursor-pointer" onClick={() => setPaymentType("ssl")} />
                      <label htmlFor="ssl" className="ml-4 cursor-pointer" onClick={() => setPaymentType("ssl")}>Mobile Banking</label>
                    </div>

                    <div className="flex">
                      <div className="w-14 h-10 overflow-hidden mx-2">
                        <img className="w-full h-full object-contain" src={"/images/bkash.png"} alt="icon" />
                      </div>

                      <div className="w-14 h-10 overflow-hidden mx-2">
                        <img className="w-full h-full object-contain" src={"/images/nogod.png"} alt="icon" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-color event-info-card p-8 rounded-2xl">
              <div className="event-info-in-checkout px-4 py-8 rounded-2xl">
                <div className="w-full h-64 overflow-hidden rounded-2xl">
                  <img className="w-full h-full object-cover" src={eventData.eventPhoto} alt={eventData.title} />
                </div>

                <div className="flex justify-between mt-3">
                  <div className="text-[1.8rem] font-semibold">{SliceText(eventData?.title, 17)}</div>
                  <div className="text-2xl">USD {numberOfTickets * eventData.ticketPrice}</div>
                </div>

                <div className="text-2xl">{FormatDate(eventData.eventDate)}</div>
              </div>

              <div className="flex flex-col event-info-in-checkout p-4 my-4 rounded-2xl overflow-hidden">
                <div className="mb-6">
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
                        defaultValue={[1, 3, 5].includes(numberOfTickets) ? "" : numberOfTickets}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div>Available tickets</div>
                  <div className="bg-secondary-color text-primary-color mx-2 w-32 h-14 flex justify-center items-center font-semibold text-3xl rounded-lg">{eventData.totalTickets}</div>
                </div>
              </div>

              <div>
                <div className="mt-6 mb-2 font-semibold">Payment Summery</div>
                <div className="event-info-in-checkout p-4 rounded-2xl">
                  <div className="flex justify-between">
                    <div className="font-semibold">Total Tickets</div>
                    <div className="font-semibold">{numberOfTickets}</div>
                  </div>

                  <div className="flex justify-between">
                    <div className="font-semibold">Per Ticket Price</div>
                    <div className="font-semibold">USD {eventData.ticketPrice}</div>
                  </div>
                  <hr className="h-[2px] bg-secondary-color opacity-40 my-4" />
                  <div className="flex justify-between">
                    <div className="font-semibold">Total Price</div>
                    <div className="font-semibold">USD {numberOfTickets * eventData.ticketPrice}</div>
                  </div>
                </div>
              </div>

              <button className="bg-accent-color text-primary-color w-full py-3 rounded-3xl mt-6 font-medium" onClick={handlePayment}>
                {
                  paymentLoading
                    ?
                    <span>
                      <LoadingSpiner />
                    </span>
                    :
                    <span>Pay Now</span>
                }
              </button>
            </div>
          </div>
      }
    </div>
  )
}

export default Checkout;
