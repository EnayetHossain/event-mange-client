import React from 'react';
import MissionImage from "../../../assets/mission.jpg";
import VisionImage from "../../../assets/vision.jpg";
import "./Missions.css";

const Missions = () => {
    return (
        <div className='mission-container desktop-max'>
            <div className='mission'>
                <div className='mission-img'>
                    <img src={MissionImage} alt='Mission' />
                </div>

                <div className='mission-info'>
                    <h1>Our Mission</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                </div>
            </div>

            <div className='vision'>
                <div className='vision-img'>
                    <img src={VisionImage} alt='Mission' />
                </div>

                <div className='vision-info'>
                    <h1>Our Vision</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                </div>
            </div>
        </div>
    );
};

export default Missions;