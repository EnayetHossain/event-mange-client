import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <header className="desktop-max !p-0 bg-secondary-color relative overflow-hidden header">
      <div className="banner-container desktop-max p-0">
        <div className="ml-[5rem] py-[17rem] text z-10 relative">
          <h1 className="banner-title">
            Exclusive
            <br />
            events priceless
            <br />
            memories
          </h1>
          <button className="mt-10 py-4 px-8 border-primary-color border-[1px]">
            Schedule Now
          </button>
        </div>
      </div>

      <div className="hero-img">
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 302 500"
        >
          <path
            d="M256.45.19S267.87,139.36,136,221.63a4.9,4.9,0,0,0,1.37,8.92c15.41,3.89,43.19,12.77,68.33,30.55a13.58,13.58,0,0,0,15.77,0c15.08-10.75,48.16-38.55,80.55-93.8V.19Z"
            fill="none"
            stroke="#4d49d4"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M273.4,369.09c-22.18-28-112-128.4-253.91-119.89a11.32,11.32,0,0,0-10.56,9.7c-1.56,10.85-3.15,31.08.29,58.75a11.9,11.9,0,0,0,10.7,10.42c32.94,3,145.51,21.06,210.6,128.69a6.71,6.71,0,0,0,12-1.09c7-18.2,20.06-50.95,32-72.21A12.93,12.93,0,0,0,273.4,369.09Z"
            fill="none"
            stroke="#4d49d4"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M302,500V411.8C273.63,450,265.9,500,265.9,500Z"
            fill="none"
            stroke="#4d49d4"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M14.89,374.92a8.42,8.42,0,0,0-7.64,8.46L8,448.25a8.36,8.36,0,0,0,7.76,8.27C34.7,458,84,465,106.34,500H208.67S150.35,362.5,14.89,374.92Z"
            fill="none"
            stroke="#4d49d4"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M17.75,204.56C224.52,198.86,219,0,219,0H131c3.33,100.68-88.3,120.4-113.83,123a8.87,8.87,0,0,0-7.83,7.32c-5.68,33.06-2.81,56.19-.56,67.15A8.87,8.87,0,0,0,17.75,204.56Z"
            fill="none"
            stroke="#4d49d4"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M46.71,77.1c21.36,0,43.84-26.65,43.84-51.58S69.92-8,51.87-8C30.51-8,.29,12.2.29,37.13S25.35,77.1,46.71,77.1Z"
            fill="none"
            stroke="#4d49d4"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </svg>
      </div>
    </header>
  );
};

export default Banner;
