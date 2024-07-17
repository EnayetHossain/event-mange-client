import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect } from "react";
import SplitType from "split-type";
import "./Achievements.css";

const Achievements = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    new SplitType(".achievements-title");

    const tl = gsap.timeline({
      defaults: {
        duration: 2,
        snap: "innerText",
        ease: "power1.inOut",
      },
    });

    tl.fromTo(
      ".achievements-title .char",
      {
        y: "50%",
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.05,
        delay: 0.1,
      }
    )

      .to(
        "#events",
        {
          innerText: 600,
        },
        "<"
      )

      .to(
        "#customers",
        {
          innerText: 12,
        },
        "<"
      )

      .to(
        "#experience",
        {
          innerText: 10,
        },
        "<"
      );

    ScrollTrigger.create({
      animation: tl,
      trigger: ".achievements-container",
      start: "top 70%",
      markers: false,
      toggleActions: "play none none none",
    });
  }, []);

  return (
    <div className="achievements-container accent-font">
      <h4 className="achievements-title">We are BlooZoom</h4>

      <div>
        <span id="events">0</span>+<p>Ideal Events</p>
      </div>

      <div>
        <span id="customers">0</span>k+
        <p>Customers</p>
      </div>

      <div>
        <span id="experience">0</span>+<p>Years Of Exp</p>
      </div>
    </div>
  );
};

export default Achievements;
