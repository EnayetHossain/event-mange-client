import React from 'react';
import "./Achievements.css";

const Achievements = () => {
    return (
        <div className='achievements-container'>
            <h4 className='achievements-title'>We are BlooZoom</h4>
            
            <div>
                <span>600+</span>
                <p>Ideal Events</p>
            </div>

            <div>
                <span>12k+</span>
                <p>Customers</p>
            </div>
            
            <div>
                <span>10+</span>
                <p>Years Of Exp</p>
            </div>
        </div>
    );
};

export default Achievements;