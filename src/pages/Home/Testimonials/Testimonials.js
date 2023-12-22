import { useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Testimonial.css";

const Testimonials = () => {
  useEffect(() => {
    const buttons = document.querySelectorAll("[data-carousel-button]");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button
          .closest("[data-carousel]")
          .querySelector("[data-slides]");

        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
      });
    });
  }, []);

  return (
    <section className="my-[7em] px-4">
      <div className="text-5xl text-accent-color text-center mb-[2em]">
        Testimonials
      </div>

      <div className="carousel" data-carousel>
        <button
          type="button"
          className="carousel-button prev"
          data-carousel-button="prev"
        >
          <FaArrowLeft></FaArrowLeft>
        </button>
        <button
          type="button"
          className="carousel-button next"
          data-carousel-button="next"
        >
          <FaArrowRight></FaArrowRight>
        </button>

        <ul data-slides>
          <li className="slide" data-active>
            <div className="slide-img">
              <img src="/images/3.jpg" alt="pic" />
            </div>
            <div className="ml-6">
              <p className="break-words max-w-5xl description">
                Excepteur excepteur magna aute velit sunt voluptate enim ullamco
                eiusmod. Nulla qui non esse sint. Commodo anim ipsum nisi
                voluptate ut incididunt labore duis consequat veniam duis quis
                incididunt. Esse non ut velit sint eu aliqua. Cupidatat do
                consectetur consequat magna laboris.
              </p>
              <p className="font-bold mt-6"> - Name</p>
            </div>
          </li>
          <li className="slide">
            <div className="slide-img">
              <img src="/images/1.jpg" alt="pic" />
            </div>
            <div className="ml-6">
              <p className="break-words max-w-5xl description">
                Ipsum amet aute deserunt nisi cillum. Aliqua elit exercitation quis pariatur et proident in dolore do voluptate officia.
              </p>
              <p className="font-bold mt-6 description"> - new</p>
            </div>
          </li>
          <li className="slide">
            <div className="slide-img">
              <img src="/images/2.jpg" alt="pic" />
            </div>
            <div className="ml-6">
              <p className="break-words max-w-5xl description">
                Commodo anim ipsum nisi
                voluptate ut incididunt labore duis consequat veniam duis quis
                incididunt. Esse non ut velit sint eu aliqua. Cupidatat do
                consectetur consequat magna laboris.
              </p>
              <p className="font-bold mt-6"> - no name</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Testimonials;
