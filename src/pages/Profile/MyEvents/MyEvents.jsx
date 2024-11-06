import { useEffect, useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import AutoCompleteSearch from "../../../Components/AutoCompleteSearch/AutoCompleteSearch";
import ErrorNotification from "../../../Components/ErrorNotification/ErrorNotification";
import EventCard from "../../../Components/EventCard/EventCard";
import SkeletonCard from "../../../Components/SkeletonCard/SkeletonCard.jsx";
import useAxiosConfig from "../../../Hooks/useAxiosConfig";
import "./MyEvents.css";

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const axiosConfig = useAxiosConfig();
  // const staticData = ["data 1", "data 2", "data 3"];

  useEffect(() => {
    const getAllMyEvents = async () => {
      try {
        const events = await axiosConfig.get("/api/v1/events/getEventByUser");
        setMyEvents(events.data.data);
        setLoading(false);
        setError("");
        setShowErrorNotification(false);
      } catch (error) {
        setLoading(false);
        setError(`${error.message}. ${error?.response?.data?.error}`);
        setShowErrorNotification(true);
      }
    };

    getAllMyEvents();
  }, [axiosConfig]);

  const fetchSuggetions = async (query, fields = "") => {
    try {
      const events = await axiosConfig.get(
        `/api/v1/events/getEventByUser?title=${query}&fields=${fields}`
      );
      if (events.status !== 200) {
        throw new Error("Network error! cannot fetch data.");
      }
      setError("");
      setShowErrorNotification(false);
      return events.data.data;
    } catch (error) {
      console.log(error);
      setError(`${error.message}. ${error?.response?.data?.error}`);
      setShowErrorNotification(true);
    }
  };

  const handleOnSelect = async (suggetion) => {
    setLoading(true);
    const result = await fetchSuggetions(
      suggetion.title ? suggetion.title : ""
    );
    setLoading(false);
    setMyEvents(result);
  };

  const handleOnChange = async (suggetion) => {
    if (!suggetion) {
      try {
        const events = await axiosConfig.get("api/v1/events/getEventByUser");
        setMyEvents(events.data.data);
        setLoading(false);
        setError("");
        setShowErrorNotification(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(`${error.message}. ${error?.response?.data?.error}`);
        setShowErrorNotification(true);
      }
    }
  };

  return (
    <div className="desktop-max !mt-14">
      {error && showErrorNotification && (
        <ErrorNotification
          error={error}
          setError={setError}
          setOpen={setShowErrorNotification}
        />
      )}
      <div className="mb-24 flex-col items-start sm:flex-row flex justify-between sm:items-center">
        <AutoCompleteSearch
          placeholder={"Search an event"}
          // staticData={staticData}
          fetchSuggetions={fetchSuggetions}
          dataKey={"title"}
          customLoading={<>Loading...</>}
          onSelect={handleOnSelect}
          onChange={handleOnChange}
          onBlur={(e) => {}}
          onFocus={(e) => {}}
        />

        <Link
          className="min-w-max mt-6 sm:mt-0 no-underline bg-accent-color text-primary-color px-5 py-4 font-semibold rounded-2xl"
          to={"/profile/create-event"}
        >
          Create an Event
        </Link>
      </div>

      <div className="card-container">
        {loading ? (
          <>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
          </>
        ) : myEvents.length > 0 ? (
          myEvents?.map((event) => (
            <EventCard
              key={event._id}
              isButtonVisible={false}
              isEditable={true}
              event={event}
            ></EventCard>
          ))
        ) : (
          <div className="flex justify-center">
            <Link
              className="text-center add-event-border px-20 py-7 rounded-2xl no-underline"
              to={"/profile/create-event"}
            >
              <div className="text-4xl font-semibold text-gray-500">
                You have no Event
              </div>
              <div className="flex justify-center my-4">
                <RiAddCircleLine className="text-[6rem] text-gray-500" />
              </div>
              <div className="text-3xl font-semibold text-gray-500">
                Create An Event
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
