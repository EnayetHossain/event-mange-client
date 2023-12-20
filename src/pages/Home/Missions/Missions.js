import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect } from "react";
import SplitType from "split-type";
import MissionImage from "../../../assets/mission.jpg";
import VisionImage from "../../../assets/vision.jpg";
import "./Missions.css";

const Missions = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    new SplitType("#split-text");
    new SplitType("#split-pera");
    new SplitType("#split-text2");
    new SplitType("#split-pera2");

    const tl = gsap.timeline({defaults: {ease: "power1.inOut"}});
    const tl2 = gsap.timeline({defaults: {ease: "power1.inOut"}});

    tl
    // overlay animation of image
    .to(".mission-img .overlay", {
      scaleX: 0,
      transformOrigin: "right",
      duration: 1,
    })
    // image animation
    .to(".mission-img img", {
      scale: 1,
      duration: 1,
    }, "<")
    // heading text animation
    .fromTo("#split-text .char", {
      y: "50%",
      opacity: 0,
    }, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.3
    }, "-=0.5")
    // paragraph animation
    .fromTo("#split-pera .word", {
        y: "30%",
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.2
    }, "-=0.5")

    ScrollTrigger.create({
        animation: tl,
        trigger: ".mission",
        toggleActions: "play pause resume none",
        markers: false,
        start: "top 70%"
    });

    tl2
    // overlay animation of image
    .to(".vision-img .overlay", {
      scaleX: 0,
      transformOrigin: "left",
      duration: 1,
    })
    // image animation
    .to(".vision-img img", {
      scale: 1,
      duration: 1,
    }, "<")
    // heading text animation
    .fromTo("#split-text2 .char", {
      y: "50%",
      opacity: 0,
    }, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.3
    }, "-=0.5")
    // paragraph animation
    .fromTo("#split-pera2 .word", {
        y: "30%",
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.2
    }, "-=0.5")

    ScrollTrigger.create({
      animation: tl2,
      trigger: ".vision",
      toggleActions: "play pause resume none",
      markers: false,
      start: "top 70%"
  });
  }, []);

  return (
    <div className="mission-container desktop-max">
      <div className="mission">
        <div className="mission-img relative">
          <div className="bg-accent-color w-full h-full overlay absolute top-0 left-0 z-20"></div>
          <img className="relative z-10" src={MissionImage} alt="Mission" />
        </div>

        <div className="mission-info">
          <h1 id="split-text">Our Mission</h1>
          <p id="split-pera">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
        </div>
      </div>

      <div className="vision">
        <div className="vision-img relative">
        <div className="bg-accent-color w-full h-full overlay absolute top-0 left-0 z-20"></div>
          <img className="relative z-10" src={VisionImage} alt="Mission" />
        </div>

        <div className="vision-info">
          <h1 id="split-text2">Our Vision</h1>
          <p id="split-pera2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
        </div>
      </div>
    </div>
  );
};

export default Missions;
