import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import "./TeamMember.css";

const TeamMember = () => {
  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 10 },
      },
    },
    slides: { perView: 1 },
  });

  return (
    <section className="my-[11em]">
      <div className="text-5xl text-accent-color text-center mb-[2em]">
        World Class Team
      </div>

      <div
        ref={sliderRef}
        className="keen-slider desktop-max hover:cursor-grab"
      >
        <div className="keen-slider__slide number-slide1 flex flex-col">
          <div className="team-img w-[25rem] h-[25rem] bg-red-500">
            <img src="/images/image-1.jpg" alt="team member" />
          </div>

          <div className="team-info flex flex-col text-center text-secondary-color mt-5">
            <p className="text-3xl work-sans font-bold">Jhon Arora</p>
            <p className="text-2xl work-sans">- CEO</p>
          </div>
        </div>

        <div className="keen-slider__slide number-slide2 flex flex-col">
          <div className="team-img w-[25rem] h-[25rem] bg-red-500">
            <img src="/images/image-2.jpg" alt="team member" />
          </div>

          <div className="team-info flex flex-col text-center text-secondary-color mt-5">
            <p className="text-3xl work-sans font-bold">Jhon Arora</p>
            <p className="text-2xl work-sans">- CTO</p>
          </div>
        </div>

        <div className="keen-slider__slide number-slide3 flex flex-col">
          <div className="team-img w-[25rem] h-[25rem] bg-red-500">
            <img src="/images/image-3.jpg" alt="team member" />
          </div>

          <div className="team-info flex flex-col text-center text-secondary-color mt-5">
            <p className="text-3xl work-sans font-bold">Jhon Arora</p>
            <p className="text-2xl work-sans">- Director</p>
          </div>
        </div>

        <div className="keen-slider__slide number-slide4 flex flex-col">
          <div className="team-img w-[25rem] h-[25rem] bg-red-500">
            <img src="/images/image-4.jpg" alt="team member" />
          </div>

          <div className="team-info flex flex-col text-center text-secondary-color mt-5">
            <p className="text-3xl work-sans font-bold">Jhon Arora</p>
            <p className="text-2xl work-sans">- HR.</p>
          </div>
        </div>

        <div className="keen-slider__slide number-slide5 flex flex-col">
          <div className="team-img w-[25rem] h-[25rem] bg-red-500">
            <img src="/images/image-5.jpg" alt="team member" />
          </div>

          <div className="team-info flex flex-col text-center text-secondary-color mt-5">
            <p className="text-3xl work-sans font-bold">Jhon Arora</p>
            <p className="text-2xl work-sans">- Manager</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMember;
