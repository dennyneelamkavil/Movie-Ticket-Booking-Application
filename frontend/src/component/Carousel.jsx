import { useState } from "react";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Movie 1",
      description: "An epic adventure of a lifetime.",
      image: "path-to-image1.jpg",
    },
    {
      title: "Movie 2",
      description: "The most anticipated sequel of the year.",
      image: "path-to-image2.jpg",
    },
    {
      title: "Movie 3",
      description: "A heartwarming tale that will move you.",
      image: "path-to-image3.jpg",
    },
    // Add more slides as needed
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="carousel w-full relative">
      <div className="carousel-inner w-full h-96 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item absolute w-full h-full transition-transform duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="carousel-caption bg-opacity-50 bg-black text-white p-4">
              <h2 className="text-3xl font-bold">{slide.title}</h2>
              <p className="text-lg">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
}
