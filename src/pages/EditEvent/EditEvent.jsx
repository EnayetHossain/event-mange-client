import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
import { FaTicketAlt } from "react-icons/fa";
import { FaImage, FaMoneyCheck } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmojiEvents, MdTitle } from "react-icons/md";
import { useParams } from "react-router-dom";
import ErrorNotification from "../../Components/ErrorNotification/ErrorNotification";
import SuccessNotification from "../../Components/SuccessNotification/SuccessNotification";
import useAxiosConfig from "../../Hooks/useAxiosConfig";

const EditEvent = () => {
	const { id } = useParams();
	const axiosConfig = useAxiosConfig();

	const [eventData, setEventData] = useState({});
	const [loadingEvent, setLoadingEvent] = useState(false);
	const [loading, setLoading] = useState(false);
	const [defaultDate, setDefaultDate] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [showSuccessNotification, setShowSuccessNotification] = useState(false);
	const [showErrorNotification, setShowErrorNotification] = useState(false);
	const [file, setFile] = useState(null);
	const [previewFile, setPreviewFile] = useState(null);

	useEffect(() => {
		const getEventData = async () => {
			try {
				setLoadingEvent(true);
				const response = await axiosConfig(`/api/v1/events/${id}?fields=-__v,-updatedAt,-createdAt,-userId`);
				setEventData(response.data.data);
				setLoadingEvent(false);
				// set default date for the event
				const eventDate = new Date(response.data.data.eventDate).toISOString().split("T")[0]
				setDefaultDate(eventDate);
			} catch (error) {
				setLoadingEvent(false);
			}
		}

		getEventData();
	}, [axiosConfig, id]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			eventTitle: eventData?.title,
		}
	});

	useEffect(() => {
		if (eventData) {
			reset();
		}
	}, [eventData, reset]);

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
		setPreviewFile(URL.createObjectURL(event.target.files[0]));
	}

	const handleUpdateEvent = async (data) => {
		const formData = new FormData();

		if (file) formData.append("eventPhoto", file);
		if (data.eventTitle !== eventData.title) formData.append("eventTitle", data.eventTitle);
		if (data.eventDescription !== eventData.description) formData.append("eventDescription", data.eventDescription);
		if (data.eventDate !== defaultDate) formData.append("eventDate", data.eventDate);
		if (data.eventLocation !== eventData.eventLocation) formData.append("eventLocation", data.eventLocation);
		if (data.ticketPrice !== eventData.ticketPrice.toString()) formData.append("ticketPrice", data.ticketPrice);
		if (data.totalTickets !== eventData.totalTickets.toString()) formData.append("totalTickets", data.totalTickets);

		try {
			setLoading(true);
			setError("");
			setShowErrorNotification(false);
			await axiosConfig.patch(`/api/v1/events/${id}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				}
			});
			setLoading(false);
			setMessage("Event updated successfully");
			setShowSuccessNotification(true);
		} catch (error) {
			setLoading(false);
			setMessage("");
			setError(error.response.data.error);
			setShowSuccessNotification(false);
			setShowErrorNotification(true);
		}
	}

	return (
		<div>
			{
				(error && showErrorNotification) && <ErrorNotification
					error={error}
					setError={setError}
					setOpen={setShowErrorNotification}
				/>
			}

			{
				(message && showSuccessNotification) && <SuccessNotification
					message={message}
					setMessage={setMessage}
					setOpen={setShowSuccessNotification}
				/>
			}

			<div>
				{
					loadingEvent
						?
						<div>loading...</div>
						:
						<form className="sign-form work-sans" onSubmit={handleSubmit(handleUpdateEvent)}>
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
										{...register("eventTitle", { required: false })}
										placeholder="Event Title"
										defaultValue={eventData.title}
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
									<textarea
										className="w-full border-none outline-transparent"
										placeholder="Event Description"
										cols={4}
										rows={4}
										{...register("eventDescription", { required: false })}
										defaultValue={eventData.description}
									></textarea>
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
										{...register("eventDate", { required: false })}
										placeholder="Event Date"
										defaultValue={defaultDate}
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
										{...register("eventLocation", { required: false })}
										placeholder="Event Location"
										defaultValue={eventData.eventLocation}
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
										step={"any"}
										{...register("ticketPrice", { required: false })}
										placeholder="Ticket Price"
										defaultValue={eventData.ticketPrice}
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
										{...register("totalTickets", { required: false })}
										placeholder="Total Ticket"
										defaultValue={eventData.totalTickets}
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
									<input
										type="file"
										{...register("eventPhoto", { required: false })}
										onChange={handleFileChange}
									/>
								</div>

								<div className="w-48 h-48 overflow-hidden">
									<img src={previewFile ? previewFile : eventData?.eventPhoto} alt={eventData.title} className="w-full h-full object-contain" />
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
				}
			</div>
		</div>
	)
}

export default EditEvent;
