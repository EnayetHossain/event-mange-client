import React, { useEffect, useState } from "react";
import EventCard from "../../../Components/EventCard/EventCard";
import SkeletonCard from "../../../Components/SkeletonCard/SkeletonCard";
import useAxiosConfig from "../../../Hooks/useAxiosConfig";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosConfig = useAxiosConfig();

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        setLoading(true);
        const events = await axiosConfig.get("/api/v1/favorite?fields=title,eventDate,eventPhoto");
        setFavorites(events.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getAllEvents();
  }, [axiosConfig]);

  return (
    <div className="card-container desktop-max !mt-16">
      {
        loading 
        ?
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
        :
        favorites.length > 0
          ?
          favorites.map((event) => (
            <EventCard
              key={event._id}
              isButtonVisible={true}
              isEditable={false}
              event={event}
            ></EventCard>
          ))
          :
          <div className="text-center text-gray-500 text-4xl font-medium">Add some events to your favorites to see them here</div>
      }
    </div>
  );
};

export default Favorites;
