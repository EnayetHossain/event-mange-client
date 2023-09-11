import React from 'react';
import "./Banner.css";

const Banner = () => {
    return (
        <header className='banner-container desktop-max'>
            {/* <Navbar></Navbar> */}
            
            <div className='hero-text-container'>
                <h1 className='hero-title'>Exclusive<br />events<br />priceless<br />memories</h1>
                <button className='btn hero-cta'>Schedule Now</button>
            </div>
            
        </header>
    );
};

export default Banner;