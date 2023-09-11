import React from 'react';
import Achievements from '../Achievements/Achievements';
import Missions from '../Missions/Missions';
import "./Info.css";

const Info = () => {
    return (
        <section className='info-container'>
            <Achievements></Achievements>
            <Missions></Missions>
        </section>
    );
};

export default Info;