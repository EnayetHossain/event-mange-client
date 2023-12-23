import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";
import SplitType from "split-type";
import "./NewsLetter.css";

const NewsLetter = () => {

    gsap.registerPlugin(ScrollTrigger);

    useEffect(()=>{
        new SplitType(".news-title");
        new SplitType(".news-description");

        const tl = gsap.timeline();

        tl.fromTo(".news-title .char", {
            y: "50%",
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            delay: 0.2,
            duration: 0.2
        })

        .fromTo(".news-description .word", {
            y: "50%",
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            delay: 0.2,
            duration: 0.2,
        }, "-=1")

        .to(".subscribe-form", {
            clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
            duration: 0.5
        }, "-=1")

        ScrollTrigger.create({
            animation: tl,
            trigger: ".letter-section",
            markers: false,
            start: "top 70%",
            toggleActions: "play pause resume none",
        })

    }, []);

  return (
    <section className="bg-secondary-color text-primary-color text-center py-36 letter-section">
      <div className="letter-container px-4">
        <div className="text-3xl md:text-5xl news-title">Subscribe to our Newsletter</div>
        <p className="pt-5 pb-11 font-normal news-description">
          Reprehenderit ad mollit amet ea est deserunt culpa enim velit ullamco
          non nulla.
        </p>

        <form className="subscribe-form flex flex-col py-24 work-sans">
          <input
            className="bg-transparent text-center outline-none w-10/12 mx-auto"
            type="email"
            placeholder="Your Email Id"
            name="email"
          />
          <input
            className="font-semibold py-3 px-10"
            type="submit"
            value={"Subscribe now"}
          />
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
