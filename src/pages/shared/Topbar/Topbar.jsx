import { useState } from "react";
import AutoCompleteSearch from "../../../Components/AutoCompleteSearch/AutoCompleteSearch";
import ErrorNotification from "../../../Components/ErrorNotification/ErrorNotification";
import useAxiosConfig from "../../../Hooks/useAxiosConfig";
import "./Topbar.css";

const Topbar = ({ setLoading, setEvents, setOpenSidebar, openSidebar }) => {
  const [error, setError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const axiosConfig = useAxiosConfig();

  const fetchSuggetions = async (query, fields = "") => {
    try {
      const events = await axiosConfig.get(`/api/v1/events?title=${query}&fields=${fields}`);
      if (events.status !== 200) {
        throw new Error("Network error! cannot fetch data.")
      }
      setError("");
      setShowErrorNotification(false);
      return events.data.data;
    } catch (error) {
      setError(`${error.message}. ${error?.response?.data?.error}`);
      setShowErrorNotification(true);
    }
  }

  const handleOnSelect = async (suggetion) => {
    setLoading(true);
    const result = await fetchSuggetions(suggetion.title ? suggetion.title : "");
    setLoading(false);
    setEvents(result);
  }

  const handleOnChange = async (suggetion) => {
    if (!suggetion) {
      try {
        const events = await axiosConfig.get("api/v1/events");
        setEvents(events.data.data);
        setLoading(false);
        setError("");
        setShowErrorNotification(false);
      } catch (error) {
        setLoading(false);
        setError(`${error.message}. ${error?.response?.data?.error}`);
        setShowErrorNotification(true);
      }
    }
  }

  return (
    <div className="shadow-lg mb-20 border-gray-300 border mx-6 flex justify-between items-center p-5 rounded-3xl">
      {
        (error && showErrorNotification) && (
          <ErrorNotification
            error={error}
            setError={setError}
            setOpen={setShowErrorNotification}
          />
        )
      }
      <div className="flex items-center topbar">
        <div onClick={() => setOpenSidebar(!openSidebar)} className="ham-bar mr-5 top-bar">
          <div className={`bar ${!openSidebar ? "" : "event-bar-active"}`}></div>
        </div>

        <div className="logo topbar-logo">
          Ev<span className="blue">ent</span>M<span className="blue">ang</span>e
        </div>
      </div>

      <div className="event-search-bar">
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
        ></AutoCompleteSearch>
      </div>
    </div>
  )
}

export default Topbar;
