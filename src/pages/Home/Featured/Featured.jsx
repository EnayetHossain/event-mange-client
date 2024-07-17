import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";
import useCountDown from "../../../Hooks/useCountDown";
import "./Featured.css";

const Featured = () => {
  const { textDays, textHours, textMinutes, textSeconds, gap } = useCountDown(
    "December 30, 2024 00:00:00"
  );
  const [isFeatured, setIsFeatured] = useState(false);

  const [countDownValue, setCountDownValue] = useState({
    textDays,
    textHours,
    textMinutes,
    textSeconds,
  });

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (isFeatured) {
      const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });

      tl
        // overlay animation of image
        .to(".featured-img .overlay", {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1,
        })

        .to(
          ".featured-img img",
          {
            scale: 1,
            duration: 1,
          },
          "<"
        );

      ScrollTrigger.create({
        animation: tl,
        trigger: ".featured-container",
        toggleActions: "play none none none",
        markers: false,
        start: "top 70%",
      });
    }

    const interval = setInterval(() => {
      setCountDownValue({ textDays, textHours, textMinutes, textSeconds });

      if (gap <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    setIsFeatured(gap >= 0);

    return () => clearInterval(interval);
  }, [textDays, textHours, textMinutes, textSeconds, gap, isFeatured]);

  // let isFeatured = gap >= 0;

  return (
    <section className="desktop-max">
      {isFeatured && (
        <div className="featured-container">
          <div>
            <div className="flex items-center accent-font">
              <FaBookmark className="mr-2"></FaBookmark>
              <p>Featured Event</p>
            </div>

            <h1 className="featured-name font-regular my-6 lg:mt-[4em] lg:mb-12 accent-font">
              Featured event name
            </h1>

            <button
              type="button"
              className="bg-primary-color text-secondary-color font-semibold py-3 px-7 rounded-full"
            >
              Get Your Tickets
            </button>
          </div>

          <div className="timer">
            <p>Starts in...</p>
            <div className="flex items-center text-center mt-12 mb-6 lg:mt-20 lg:mb-12">
              <div className="mr-12">
                <h1 className="time-text accent-font">{countDownValue.textDays}</h1>
                <p>Days</p>
              </div>

              <div className="mr-12">
                <h1 className="time-text accent-font">{countDownValue.textHours}</h1>
                <p>Hours</p>
              </div>

              <div className="mr-12">
                <h1 className="time-text accent-font">{countDownValue.textMinutes}</h1>
                <p>Minutes</p>
              </div>

              <div>
                <h1 className="time-text accent-font">{countDownValue.textSeconds}</h1>
                <p>Seconds</p>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <SlLocationPin className="mr-7"></SlLocationPin>
                <p>Location of the event</p>
              </div>

              <div className="flex items-center">
                <GoClock className="mr-7"></GoClock>
                <p>Time of the event</p>
              </div>
            </div>
          </div>

          <div className="featured-img">
            <div className="bg-accent-color w-full h-full overlay absolute top-0 left-0 z-20"></div>
            <img src="/images/background.jpg" alt="featured" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Featured;
