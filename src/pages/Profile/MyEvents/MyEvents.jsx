import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../../Components/EventCard/EventCard";
import "./MyEvents.css";
import SkeletonCard from "../../../Components/SkeletonCard/SkeletonCard.jsx";
import useAxiosConfig from "../../../Hooks/useAxiosConfig";
import AutoCompleteSearch from "../../../Components/AutoCompleteSearch/AutoCompleteSearch";

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosConfig = useAxiosConfig();
  // const staticData = ["data 1", "data 2", "data 3"];


  useEffect(() => {
    const getAllMyEvents = async () => {
      try {
        const events = await axiosConfig.get("/api/v1/events/getEventByUser");
        setMyEvents(events.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getAllMyEvents();
  }, [axiosConfig]);

  const fetchSuggetions = async (query, fields = "") => {
    console.log("fields: ", fields);

    try {
      const events = await axiosConfig.get(`/api/v1/events/getEventByUser?title=${query}&fields=${fields}`);
      if (events.status !== 200) {
        throw new Error("Network error! cannot fetch data.")
      }
      return events.data.data;
    } catch (error) {
      console.log(error);
    }
  }

  const handleOnSelect = async (suggetion) => {
    setLoading(true);
    const result = await fetchSuggetions(suggetion.title ? suggetion.title : "");
    setLoading(false);
    setMyEvents(result);
  }

  const handleOnChange = async (suggetion) => {
    if (!suggetion) {
      try {
        const events = await axiosConfig.get("api/v1/events/getEventByUser");
        setMyEvents(events.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }

  return (
    <div className="desktop-max !mt-14">
      <div className="mb-24 flex-col items-start sm:flex-row flex justify-between sm:items-center">
        <span className="hidden work-sans lg:inline-block font-bold text-3xl">
          My Events
        </span>

        <AutoCompleteSearch
          placeholder={"Search an event"}
          // staticData={staticData}
          fetchSuggetions={fetchSuggetions}
          dataKey={"title"}
          customLoading={<>Loading...</>}
          onSelect={handleOnSelect}
          onChange={handleOnChange}
          onBlur={(e) => { }}
          onFocus={(e) => { }}

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
        ) : (
          myEvents?.map((event) => (
            <EventCard
              key={event._id}
              isButtonVisible={false}
              event={event}
            ></EventCard>
          ))
        )}
      </div>
    </div>
  );
};

export default MyEvents;
