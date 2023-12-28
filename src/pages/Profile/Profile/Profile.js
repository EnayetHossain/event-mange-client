import MyEvents from "../MyEvents/MyEvents";
import ProfileCover from "../ProfileCover/ProfileCover";
import "./Profile.css";

const Profile = () => {
    return (
        <section>
            <ProfileCover></ProfileCover>
            <MyEvents></MyEvents>
        </section>
    );
};

export default Profile;