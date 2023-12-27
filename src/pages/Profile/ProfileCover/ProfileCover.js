import "./ProfileCover.css";

const ProfileCover = () => {
  return (
    <div className="desktop-max">
      <span className="work-sans font-bold text-4xl inline-block my-10">
        Profile Information
      </span>

      <div className="overflow-hidden h-[20em] rounded-2xl relative text-primary-color">
        <div className="absolute w-full h-full profile-photo flex flex-col justify-center items-center">
          <div className="w-[12rem] h-[12rem] overflow-hidden rounded-full">
            <img src="/images/image-1.jpg" alt="Profile" />
          </div>

          <div className="work-sans text-3xl font-semibold mt-4">User Name</div>
        </div>
        <img
          className="h-full object-cover object-center"
          src="/images/background.jpg"
          alt="cover"
        />
      </div>
    </div>
  );
};

export default ProfileCover;
