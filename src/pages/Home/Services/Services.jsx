import { BsBalloonFill } from "react-icons/bs";
import { FaLightbulb, FaPeopleGroup } from "react-icons/fa6";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import "./Services.css";

const Services = () => {
  return (
    <div className="desktop-max service-container">
      <div className="service-card">
        <TfiHeadphoneAlt className="icon"></TfiHeadphoneAlt>
        <p>24x7 Support</p>
      </div>

      <div className="service-card">
        <BsBalloonFill className="icon"></BsBalloonFill>
        <p>Perfect Venues</p>
      </div>

      <div className="service-card">
        <FaPeopleGroup className="icon"></FaPeopleGroup>
        <p>Great Team</p>
      </div>

      <div className="service-card">
        <FaLightbulb className="icon"></FaLightbulb>
        <p>Brilliant Ideas</p>
      </div>
    </div>
  );
};

export default Services;
