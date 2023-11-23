import React from 'react';
import Achievements from '../Achievements/Achievements';
import Missions from '../Missions/Missions';
import Services from '../Services/Services';
import "./Info.css";

const Info = () => {
    return (
        <section className='info-container'>
            <Achievements></Achievements>
            <Missions></Missions>
            <Services></Services>
        </section>
    );
};

export default Info;