import "./SkeletonCard.css";

const SkeletonCard = () => {
  return (
    <div className="rounded-2xl overflow-hidden p-7 skeleton-card">
      <div className="rounded-2xl overflow-hidden mb-7 w-full h-72 bg-gray-400"></div>
      <div>
        <div className="mb-5 w-full h-5 bg-gray-400 rounded-[1rem]"></div>
        <div className="mb-5 w-10/12 h-5 bg-gray-400 rounded-[1rem]"></div>
        <p className="mt-5 w-[6rem] h-5 bg-gray-400 rounded-[1rem]"></p>
      </div>
      <div className="rounded-2xl w-32 h-16 mt-14 bg-gray-400"></div>
    </div>
  );
};

export default SkeletonCard;
