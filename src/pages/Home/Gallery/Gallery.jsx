import "./Gallery.css";

const Gallery = () => {
  return (
    <section className="gallery-section">
      <h1 className="text-accent-color text-center text-5xl mb-12 accent-font">Photo Gallery</h1>
      <div className="gallery">
        <figure className="gallery__item gallery__item--1">
          <img src="/images/1.jpg" className="gallery__img" alt="1" />
        </figure>
        <figure className="gallery__item gallery__item--2">
          <img src="/images/2.jpg" className="gallery__img" alt="2" />
        </figure>
        <figure className="gallery__item gallery__item--3">
          <img src="/images/3.jpg" className="gallery__img" alt="3" />
        </figure>
        <figure className="gallery__item gallery__item--4">
          <img src="/images/4.jpg" className="gallery__img" alt="4" />
        </figure>
        <figure className="gallery__item gallery__item--5">
          <img src="/images/5.jpg" className="gallery__img" alt="5" />
        </figure>
        <figure className="gallery__item gallery__item--6">
          <img src="/images/6.jpg" className="gallery__img" alt="6" />
        </figure>
        <figure className="gallery__item gallery__item--7">
          <img src="/images/7.jpg" className="gallery__img" alt="5" />
        </figure>
        <figure className="gallery__item gallery__item--8">
          <img src="/images/8.jpg" className="gallery__img" alt="6" />
        </figure>
      </div>
    </section>
  );
};

export default Gallery;
