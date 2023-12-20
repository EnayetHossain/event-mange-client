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
        slides: { perView: 3, spacing: 10 },
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
        <div className="keen-slider__slide number-slide1">1</div>
        <div className="keen-slider__slide number-slide2">2</div>
        <div className="keen-slider__slide number-slide3">3</div>
        <div className="keen-slider__slide number-slide4">4</div>
        <div className="keen-slider__slide number-slide5">5</div>
        <div className="keen-slider__slide number-slide6">6</div>
      </div>
    </section>
  );
};

export default TeamMember;
